const express = require('express');
const cors = require('cors');
const os = require('os');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const LOCAL_IP = (Object.values(os.networkInterfaces()).flat().find(i => i.family === 'IPv4' && !i.internal) || {}).address || 'localhost';

const app = express();

// CORS dinámico según entorno
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:4000';
app.use(cors({
    origin: [
        FRONTEND_URL,
        'http://localhost:4000',
        'http://127.0.0.1:4000',
        'http://localhost:4000',
        'http://127.0.0.1:4000',
        'https://hagamostech.bo'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

// --- ESTRUCTURA MVC: IMPORTACIÓN DE RUTAS ---
const authRoutes = require('./auth/routes/authRoutes');
const contactoRoutes = require('./store/routes/contactoRoutes');
const AuthController = require('./auth/controllers/AuthController');
const cuponRoutes = require('./auth/routes/cuponRoutes');

// --- ESTRUCTURA MVC: REGISTRO DE RUTAS ---
app.use('/api/auth', authRoutes);
app.use('/api/contacto', contactoRoutes);
app.use('/api/cupones-sistema', cuponRoutes);

// --- ENDPOINTS RETIRADOS (Spec 003) ---
// El vertical de restaurante/e-commerce ya no existe: se responde 410 Gone
// en lugar de dejar que el catch-all mock devuelva un éxito falso.
['/api/catalogo', '/api/carrito', '/api/compras', '/api/pagos'].forEach((base) => {
    app.use(base, (req, res) => {
        res.status(410).json({
            error: 'Endpoint retirado',
            mensaje: 'El vertical de restaurante/e-commerce ya no está disponible.',
        });
    });
});

// --- MOCK ROUTES TEMPORALES ---
// Esto silencia los errores 404 en consola de los hooks que aún no tienen backend real
const mockRouter = express.Router();
mockRouter.post('/activar', (req, res) => {
    // Simula la activación del cupón para que el Modal funcione
    res.json({ success: true, fechaFinPrueba: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() });
});
mockRouter.post('/:id/extender-modo-invitado', (req, res) => {
    res.json({ success: true });
});
mockRouter.use((req, res) => {
    res.json({ success: true, data: [], items: [], total: 0, invitados: [] });
});

app.use('/api/colegios-sistema', mockRouter);
app.use('/api/suscripciones-sistema', mockRouter);
app.use('/api/invitados-sistema', mockRouter);
app.use('/api/libros-sistema', mockRouter);
// ------------------------------

// Rutas de perfil y sesión
app.get('/api/perfil', AuthController.perfil);
app.put('/api/perfil', AuthController.actualizarPerfil);
app.post('/api/logout', (req, res) => res.json({ exito: true }));

// Gestión del doble factor (2FA / Google Authenticator)
app.get('/api/perfil/2fa/setup', AuthController.obtenerSetup2FA);
app.post('/api/perfil/2fa/enable', AuthController.activar2FA);
app.post('/api/perfil/2fa/disable', AuthController.desactivar2FA);

// --- MOCK CATCH-ALL: silencia 404 de endpoints aún sin backend real ---
// Cubre módulos que el frontend consulta pero que aún no tienen controlador:
// inventario-sistema, reportes-sistema, soporte, perfil (password/sessions/exportar/certificado),
// compras (historial/factura). Si en el futuro se implementan, sus rutas deben registrarse ANTES.
app.use('/api', (req, res) => {
    res.json({ success: true, data: [], items: [], total: 0, invitados: [], mensaje: null, exito: true });
});

// --- Inicio del Servidor ---
// Sondea si un puerto responde; si nadie escucha, está libre. Es más fiable
// que intentar enlazar (en Windows dos sockets pueden compartir el puerto).
const net = require('net');
const puertoOcupado = (puerto) =>
    new Promise((resolve) => {
        const socket = net.connect({ port: puerto, host: '127.0.0.1' });
        socket.setTimeout(400);
        const terminar = (ocupado) => {
            socket.destroy();
            resolve(ocupado);
        };
        socket.once('connect', () => terminar(true));
        socket.once('timeout', () => terminar(false));
        socket.once('error', () => terminar(false));
    });

const buscarPuertoLibre = async (puertoInicial, intentosMaximos) => {
    for (let i = 0; i < intentosMaximos; i++) {
        const puerto = puertoInicial + i;
        // eslint-disable-next-line no-await-in-loop
        const ocupado = await puertoOcupado(puerto);
        if (!ocupado) return puerto;
        console.warn(`\x1b[33m%s\x1b[0m`, `[SERVIDOR MVC] Puerto ${puerto} ocupado; probando ${puerto + 1}...`);
    }
    return puertoInicial + intentosMaximos - 1;
};

(async () => {
    const puerto = await buscarPuertoLibre(Number(PORT), 3);
    app.listen(puerto, '0.0.0.0', () => {
        console.log(`\x1b[32m%s\x1b[0m`, `[SERVIDOR MVC] HagamosTech - Full MVC Stack`);
        console.log(`\x1b[33m%s\x1b[0m`, `URL Local: http://localhost:${puerto}`);
        console.log(`\x1b[33m%s\x1b[0m`, `URL Red: http://${LOCAL_IP}:${puerto}`);
    });
})();
