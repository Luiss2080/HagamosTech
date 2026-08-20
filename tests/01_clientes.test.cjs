// Tests del MÓDULO CLIENTES (Sistema)
// Verifica backend (API Node) y deja datos identificables con la palabra "test".
// Requiere el servidor corriendo en http://localhost:3000
// Ejecutar: node --test tests/01_clientes.test.cjs
const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const mysql = require('../server/node_modules/mysql2/promise');

const BASE = process.env.API_BASE_URL || 'http://localhost:3000/api';
const ADMIN_TOKEN = `token-user-1-${Date.now()}`;

const api = async (method, path, body) => {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { Authorization: `Bearer ${ADMIN_TOKEN}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  });
  let json = null;
  try { json = await res.json(); } catch { json = null; }
  return { status: res.status, json };
};

const db = async (fn) => {
  const conn = await mysql.createConnection({ host: '127.0.0.1', user: 'root', password: '', database: 'loscatores', port: 3306, charset: 'utf8mb4' });
  try { return await fn(conn); } finally { await conn.end(); }
};

// ── Datos de prueba (siempre contienen "test") ──
const marca = Date.now();
const nombreTest = `Test Cliente ${marca}`;
const contactoTest = {
  tipoCliente: 'NATURAL',
  correo: `test.cliente.${marca}@test.com`,
  telefono: `700${marca % 100000}`,
  direccion: 'Av. Test #123',
  documento: `${marca % 1000000}`,
  complemento: '',
  ciudad: 'La Paz',
  rubro: 'Particular',
  estado: 'Activo',
  observaciones: 'Cliente creado para pruebas automatizadas (TEST)'
};

after(async () => {
  await db(async (c) => {
    await c.query("DELETE FROM clientes WHERE nombre_completo LIKE 'Test Cliente %'");
  });
});

test('GET /clientes-sistema → listado de clientes', async () => {
  const r = await api('GET', '/clientes-sistema');
  assert.equal(r.status, 200);
  assert.equal(r.json.success, true);
  assert.ok(Array.isArray(r.json.clientes));
  console.log(`  ✓ ${r.json.clientes.length} clientes en el listado`);
});

test('POST /clientes-sistema/registrar → crear cliente TEST', async () => {
  const r = await api('POST', '/clientes-sistema/registrar', {
    nombre: nombreTest,
    contacto: JSON.stringify(contactoTest),
    usuarioId: 1
  });
  assert.equal(r.status, 201);
  assert.equal(r.json.success, true);
  assert.ok(r.json.cliente.id > 0);
  assert.ok(r.json.cliente.codigo_cliente.startsWith('CLI-'), 'debe generar código CLI-XXX');
  console.log(`  ✓ cliente TEST creado id=${r.json.cliente.id} codigo=${r.json.cliente.codigo_cliente}`);
});

test('GET /clientes-sistema → contiene al cliente TEST con datos parseados', async () => {
  const r = await api('GET', '/clientes-sistema');
  const found = r.json.clientes.find(c => c.nombre === nombreTest);
  assert.ok(found, 'el cliente TEST debe aparecer en el listado');
  const parsed = JSON.parse(found.contacto);
  assert.equal(parsed.correo, contactoTest.correo);
  assert.equal(parsed.documento, contactoTest.documento);
  assert.equal(parsed.ciudad, 'La Paz');
  assert.equal(parsed.estado, 'Activo');
  assert.ok(found.codigo, 'debe tener código');
});

test('PUT /clientes-sistema/editar → editar cliente TEST', async () => {
  const nuevoNombre = `Test Cliente Editado ${marca}`;
  const nuevoContacto = { ...contactoTest, ciudad: 'Santa Cruz', estado: 'Activo', observaciones: 'Editado en prueba TEST' };
  const r = await api('PUT', '/clientes-sistema/editar', {
    nombreOriginal: nombreTest,
    nuevoNombre,
    nuevoContacto: JSON.stringify(nuevoContacto)
  });
  assert.equal(r.status, 200);
  assert.equal(r.json.success, true);

  const list = await api('GET', '/clientes-sistema');
  const found = list.json.clientes.find(c => c.nombre === nuevoNombre);
  assert.ok(found, 'debe existir el cliente con el nombre editado');
  const parsed = JSON.parse(found.contacto);
  assert.equal(parsed.ciudad, 'Santa Cruz');
  console.log('  ✓ cliente TEST editado correctamente');
});

test('PUT /clientes-sistema/editar → nombre inexistente → 404', async () => {
  const r = await api('PUT', '/clientes-sistema/editar', {
    nombreOriginal: 'Test Cliente No Existe 999999',
    nuevoNombre: 'Test Cliente X',
    nuevoContacto: JSON.stringify(contactoTest)
  });
  assert.equal(r.status, 404);
});

test('POST /clientes-sistema/eliminar → dar de baja cliente TEST (soft delete)', async () => {
  const nombreActual = `Test Cliente Editado ${marca}`;
  const r = await api('POST', '/clientes-sistema/eliminar', { nombre: nombreActual, contacto: '' });
  assert.equal(r.status, 200);
  assert.equal(r.json.success, true);

  // El listado NO filtra por activo, pero el estado parseado debe quedar Inactivo
  const list = await api('GET', '/clientes-sistema');
  const found = list.json.clientes.find(c => c.nombre === nombreActual);
  assert.ok(found, 'el cliente permanece en el listado (soft delete)');
  const parsed = JSON.parse(found.contacto);
  assert.equal(parsed.estado, 'Inactivo');
  console.log('  ✓ cliente TEST dado de baja (soft delete, estado=Inactivo)');
});
