// Tests del MÓDULO USUARIOS (Sistema)
// Verifica backend (API Node). Datos con la palabra "test".
// Requiere el servidor corriendo en http://localhost:3000
// Ejecutar: node --test tests/03_usuarios.test.cjs
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

// Datos de prueba (siempre contienen "test")
const marca = Date.now();
const correoTest = `test.usuario.${marca}@test.com`;
const datosUsuarioTest = {
  usuario: `test.usuario.${marca}`,
  nombre: 'Test Usuario',
  apellido: 'Test',
  numci: `123${marca % 100000}`,
  fenac: '2005-01-01',
  numtel: `600${marca % 100000}`,
  nomcol: 'Colegio Test',
  correo: correoTest,
  contrasena: 'test1234',
  rolId: '4'
};
let usuarioId = null;

after(async () => {
  await db(async (c) => {
    if (usuarioId) {
      await c.query('DELETE FROM verificacion_correos WHERE usuario_id=?', [usuarioId]);
      await c.query('DELETE FROM recuperacion_password WHERE usuario_id=?', [usuarioId]);
      await c.query('DELETE FROM suscripciones WHERE usuarioId=?', [usuarioId]);
      await c.query('DELETE FROM usuarios WHERE id=?', [usuarioId]);
    }
  });
});

test('GET /usuarios-sistema → listado de usuarios', async () => {
  const r = await api('GET', '/usuarios-sistema');
  assert.equal(r.status, 200);
  assert.equal(r.json.success, true);
  assert.ok(Array.isArray(r.json.usuarios));
  console.log(`  ✓ ${r.json.usuarios.length} usuarios en el listado`);
});

test('POST /usuarios-sistema → crear usuario TEST (rol Invitado)', async () => {
  const r = await api('POST', '/usuarios-sistema', datosUsuarioTest);
  assert.equal(r.status, 201, 'debe crear el usuario');
  assert.equal(r.json.success, true);
  usuarioId = r.json.usuario.id;
  assert.equal(r.json.usuario.rolId, 4);
  console.log(`  ✓ usuario TEST creado id=${usuarioId} correo=${correoTest}`);
});

test('GET /usuarios-sistema/invitados → contiene al usuario TEST', async () => {
  const r = await api('GET', '/usuarios-sistema/invitados');
  assert.equal(r.status, 200);
  assert.equal(r.json.success, true);
  const found = r.json.invitados.find(u => u.id === usuarioId);
  assert.ok(found, 'el usuario TEST (rol 4) debe aparecer en invitados');
});

test('GET /usuarios-sistema → contiene al usuario TEST con rolNombre', async () => {
  const r = await api('GET', '/usuarios-sistema');
  const found = r.json.usuarios.find(u => u.id === usuarioId);
  assert.ok(found, 'el usuario TEST debe aparecer en el listado');
  assert.equal(found.correo, correoTest);
  assert.equal(found.rolNombre, 'Invitado');
  assert.equal(found.activo, true);
  assert.ok(!('contrasena' in found), 'el listado NO debe exponer la contraseña');
});

test('PUT /usuarios-sistema/:id → editar usuario TEST (cambiar rol a Vendedor)', async () => {
  const r = await api('PUT', `/usuarios-sistema/${usuarioId}`, {
    ...datosUsuarioTest,
    nombre: 'Test Usuario Editado',
    rolId: '11'
  });
  assert.equal(r.status, 200);
  assert.equal(r.json.success, true);

  const list = await api('GET', '/usuarios-sistema');
  const found = list.json.usuarios.find(u => u.id === usuarioId);
  assert.equal(found.nombre, 'Test Usuario Editado');
  assert.equal(found.rolId, 11);
  assert.equal(found.rolNombre, 'Vendedor');
  console.log('  ✓ usuario TEST editado (rol → Vendedor)');
});

test('PUT /usuarios-sistema/:id/estado → desactivar usuario TEST', async () => {
  const r = await api('PUT', `/usuarios-sistema/${usuarioId}/estado`, { activo: false });
  assert.equal(r.status, 200);
  assert.equal(r.json.success, true);
  assert.ok(r.json.mensaje.includes('desactivado'), 'debe confirmar la desactivación');

  const list = await api('GET', '/usuarios-sistema');
  const found = list.json.usuarios.find(u => u.id === usuarioId);
  assert.equal(found.activo, false);
  console.log('  ✓ usuario TEST desactivado');

  // Reactivar
  const r2 = await api('PUT', `/usuarios-sistema/${usuarioId}/estado`, { activo: true });
  assert.equal(r2.json.success, true);
});

test('POST /usuarios-sistema → correo duplicado → 400', async () => {
  const r = await api('POST', '/usuarios-sistema', datosUsuarioTest);
  assert.equal(r.status, 400);
  assert.ok(r.json.mensaje.includes('ya está registrado'), 'debe rechazar el correo duplicado');
});
