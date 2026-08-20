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
        'http://localhost:4001',
        'http://127.0.0.1:4001',
        'https://tudominio.com'
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
const catalogoRoutes = require('./store/routes/01_catalogoRoutes');
const authRoutes = require('./auth/routes/01_authRoutes');
const pagoRoutes = require('./store/routes/04_pagoRoutes');
const carritoRoutes = require('./store/routes/02_carritoRoutes');
const compraRoutes = require('./store/routes/03_compraRoutes');
const contactoRoutes = require('./store/routes/05_contactoRoutes');
const AuthController = require('./auth/controllers/01_AuthController');
const cuponRoutes = require('./auth/routes/06_cuponRoutes');

// --- ESTRUCTURA MVC: REGISTRO DE RUTAS ---
app.use('/api/catalogo', catalogoRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/pagos', pagoRoutes);
app.use('/api/carrito', carritoRoutes);
app.use('/api/compras', compraRoutes);
app.use('/api/contacto', contactoRoutes);
app.use('/api/cupones-sistema', cuponRoutes);

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
app.listen(PORT, '0.0.0.0', () => {
    console.log(`\x1b[32m%s\x1b[0m`, `[SERVIDOR MVC] HagamosTech - Full MVC Stack`);
    console.log(`\x1b[33m%s\x1b[0m`, `URL Local: http://localhost:${PORT}`);
    console.log(`\x1b[33m%s\x1b[0m`, `URL Red: http://${LOCAL_IP}:${PORT}`);
});
