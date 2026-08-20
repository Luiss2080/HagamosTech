const express = require('express');
const cors = require('cors');
require('dotenv').config();

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
const authRoutes = require('./system/routes/01_authRoutes');
const pagoRoutes = require('./store/routes/04_pagoRoutes');
const carritoRoutes = require('./store/routes/02_carritoRoutes');
const compraRoutes = require('./store/routes/03_compraRoutes');
const contactoRoutes = require('./store/routes/05_contactoRoutes');
const AuthController = require('./system/controllers/01_AuthController');

// Rutas modulares del panel administrativo
const usuarioRoutes = require('./system/routes/03_usuarioRoutes');
const rolRoutes = require('./system/routes/04_rolRoutes');
const permisoRoutes = require('./system/routes/05_permisoRoutes');
const clienteRoutes = require('./system/routes/02_clienteRoutes');
const cuponRoutes = require('./system/routes/06_cuponRoutes');
const productoRoutes = require('./system/routes/08_productoRoutes');
const ventaRoutes = require('./system/routes/09_ventaRoutes');
const stockRoutes = require('./system/routes/10_stockRoutes');
const compraInsumoRoutes = require('./system/routes/11_compraInsumoRoutes');
const sucursalRoutes = require('./system/routes/12_sucursalRoutes');
const deliveryRoutes = require('./system/routes/13_deliveryRoutes');
const hornoRoutes = require('./system/routes/14_hornoRoutes');

const { SystemController, LOCAL_IP, PORT } = require('./system/controllers/06_SystemController');

// --- ESTRUCTURA MVC: REGISTRO DE RUTAS ---
app.use('/api/catalogo', catalogoRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/pagos', pagoRoutes);
app.use('/api/carrito', carritoRoutes);
app.use('/api/compras', compraRoutes);
app.use('/api/contacto', contactoRoutes);

// Registro de rutas modulares del panel
app.use('/api/usuarios-sistema', usuarioRoutes);
app.use('/api/roles-sistema', rolRoutes);
app.use('/api/permisos-sistema', permisoRoutes);
app.use('/api/clientes-sistema', clienteRoutes);
app.use('/api/cupones-sistema', cuponRoutes);
app.use('/api/productos-sistema', productoRoutes);
app.use('/api/ventas-sistema', ventaRoutes);
app.use('/api/stock-sistema', stockRoutes);
app.use('/api/compras-sistema', compraInsumoRoutes);
app.use('/api/sucursales-sistema', sucursalRoutes);
app.use('/api/delivery-sistema', deliveryRoutes);
app.use('/api/horno-sistema', hornoRoutes);

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

// Rutas de sistema
app.get('/api/config', SystemController.getConfig);
app.get('/api/estado', SystemController.getStatus);

// --- MOCK CATCH-ALL: silencia 404 de endpoints aún sin backend real ---
// Cubre módulos que el frontend consulta pero que aún no tienen controlador:
// inventario-sistema, reportes-sistema, soporte, perfil (password/sessions/exportar/certificado),
// compras (historial/factura). Si en el futuro se implementan, sus rutas deben registrarse ANTES.
app.use('/api', (req, res) => {
    res.json({ success: true, data: [], items: [], total: 0, invitados: [], mensaje: null, exito: true });
});

// --- Inicio del Servidor ---
app.listen(PORT, '0.0.0.0', () => {
    console.log(`\x1b[32m%s\x1b[0m`, `[SERVIDOR MVC] Los Castores - Full MVC Stack`);
    console.log(`\x1b[33m%s\x1b[0m`, `URL Local: http://localhost:${PORT}`);
    console.log(`\x1b[33m%s\x1b[0m`, `URL Red: http://${LOCAL_IP}:${PORT}`);
});
