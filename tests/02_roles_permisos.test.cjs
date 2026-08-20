// Tests de los MÓDULOS ROLES, PERMISOS y MATRIZ (Sistema)
// Verifica crear roles personalizados y asignarles permisos.
// Datos con la palabra "test". Requiere el servidor en http://localhost:3000
// Ejecutar: node --test tests/02_roles_permisos.test.cjs
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
  const conn = await mysql.createConnection({ host: '127.0.0.1', user: 'root', password: '', database: 'LosCastoresSCZ', port: 3306, charset: 'utf8mb4' });
  try { return await fn(conn); } finally { await conn.end(); }
};

const marca = Date.now();
const nombrePermiso = `TEST_PERMISO_${marca % 100000}`;
const nombreRol = `ROL TEST ${marca % 100000}`;
let permisoId = null;
let rolId = null;

after(async () => {
  await db(async (c) => {
    // Limpieza de roles y permisos TEST que hayan quedado (por seguridad)
    const [roles] = await c.query("SELECT id FROM roles WHERE nombre LIKE 'ROL TEST%'");
    for (const r of roles) {
      await c.query('DELETE FROM detalle_rol_permisos WHERE fk_id_r=?', [r.id]);
      await c.query('DELETE FROM roles WHERE id=?', [r.id]);
    }
    const [perms] = await c.query("SELECT id FROM permisos WHERE nombre LIKE 'TEST_PERMISO%'");
    for (const p of perms) {
      await c.query('DELETE FROM detalle_rol_permisos WHERE fk_id_p=?', [p.id]);
      await c.query('DELETE FROM permisos WHERE id=?', [p.id]);
    }
    if (rolId) {
      await c.query('DELETE FROM detalle_rol_permisos WHERE fk_id_r=?', [rolId]);
      await c.query('DELETE FROM roles WHERE id=?', [rolId]);
    }
    if (permisoId) {
      await c.query('DELETE FROM detalle_rol_permisos WHERE fk_id_p=?', [permisoId]);
      await c.query('DELETE FROM permisos WHERE id=?', [permisoId]);
    }
  });
});

// ── PERMISOS ──
test('GET /permisos-sistema → catálogo de permisos', async () => {
  const r = await api('GET', '/permisos-sistema');
  assert.equal(r.status, 200);
  assert.equal(r.json.success, true);
  assert.ok(Array.isArray(r.json.permisos));
  console.log(`  ✓ ${r.json.permisos.length} permisos en el catálogo`);
});

test('POST /permisos-sistema → crear permiso TEST personalizado', async () => {
  const r = await api('POST', '/permisos-sistema', { nombre: nombrePermiso });
  assert.equal(r.status, 201, 'debe crear el permiso');
  assert.equal(r.json.success, true);
  permisoId = r.json.permiso.id;
  assert.equal(r.json.permiso.nombre, nombrePermiso);
  console.log(`  ✓ permiso TEST creado id=${permisoId} nombre=${nombrePermiso}`);
});

test('PUT /permisos-sistema/:id → editar permiso TEST (fuerza mayúsculas)', async () => {
  const nuevoNombre = `TEST_PERMISO_EDITADO_${marca % 100000}`;
  const r = await api('PUT', `/permisos-sistema/${permisoId}`, { nombre: nuevoNombre.toLowerCase() });
  assert.equal(r.status, 200);
  assert.equal(r.json.success, true);
  assert.equal(r.json.permiso.nombre, nuevoNombre.toUpperCase(), 'el nombre debe guardarse en mayúsculas');
  console.log('  ✓ permiso TEST editado (mayúsculas)');
});

test('POST /permisos-sistema → nombre duplicado → 400', async () => {
  const r = await api('POST', '/permisos-sistema', { nombre: `TEST_PERMISO_EDITADO_${marca % 100000}` });
  assert.equal(r.status, 400);
  assert.ok(r.json.mensaje.includes('ya existe'), 'debe rechazar el nombre duplicado');
});

// ── ROLES ──
test('GET /roles-sistema → listado de roles', async () => {
  const r = await api('GET', '/roles-sistema');
  assert.equal(r.status, 200);
  assert.equal(r.json.success, true);
  assert.ok(Array.isArray(r.json.roles));
  console.log(`  ✓ ${r.json.roles.length} roles en el listado`);
});

test('POST /roles-sistema → crear rol TEST con permisos personalizados', async () => {
  const r = await api('POST', '/roles-sistema', {
    nombre: nombreRol,
    permisoIds: [permisoId, 14, 16] // permiso TEST + ACCESO_CATALOGO + ACCESO_VENTAS
  });
  assert.equal(r.status, 201, 'debe crear el rol');
  assert.equal(r.json.success, true);
  rolId = r.json.rol.id;
  console.log(`  ✓ rol TEST creado id=${rolId} nombre=${nombreRol} con 3 permisos`);
});

test('GET /roles-sistema → el rol TEST tiene sus permisos asignados', async () => {
  const r = await api('GET', '/roles-sistema');
  const rol = r.json.roles.find(x => x.id === rolId);
  assert.ok(rol, 'el rol TEST debe existir');
  const ids = rol.detalleRolPermisos.map(d => d.fkIdP);
  assert.ok(ids.includes(permisoId), 'debe tener el permiso TEST asignado');
  assert.ok(ids.includes(14), 'debe tener ACCESO_CATALOGO');
  assert.ok(ids.includes(16), 'debe tener ACCESO_VENTAS');
  console.log(`  ✓ rol TEST con ${ids.length} permisos asignados`);
});

test('PUT /roles-sistema/:id → editar rol TEST (cambiar permisos personalizados)', async () => {
  const r = await api('PUT', `/roles-sistema/${rolId}`, {
    nombre: `${nombreRol} EDITADO`,
    permisoIds: [permisoId, 14, 16, 2] // + ACCESO_CLIENTES
  });
  assert.equal(r.status, 200);
  assert.equal(r.json.success, true);

  const list = await api('GET', '/roles-sistema');
  const rol = list.json.roles.find(x => x.id === rolId);
  assert.equal(rol.nombre, `${nombreRol} EDITADO`);
  const ids = rol.detalleRolPermisos.map(d => d.fkIdP);
  assert.equal(ids.length, 4, 'debe tener 4 permisos tras la edición');
  console.log('  ✓ rol TEST editado con 4 permisos personalizados');
});

test('POST /roles-sistema/matriz-permisos → actualizar matriz (permisos personalizados)', async () => {
  const r = await api('POST', '/roles-sistema/matriz-permisos', {
    rolId,
    permisoIds: [14, 2] // reemplaza el set completo
  });
  assert.equal(r.status, 200);
  assert.equal(r.json.success, true);
  assert.ok(r.json.mensaje.includes('actualizados'), 'debe confirmar la actualización');

  const list = await api('GET', '/roles-sistema');
  const rol = list.json.roles.find(x => x.id === rolId);
  const ids = rol.detalleRolPermisos.map(d => d.fkIdP);
  assert.deepEqual(ids.slice().sort((a, b) => a - b), [2, 14], 'la matriz debe quedar exactamente con [2,14]');
  console.log('  ✓ matriz actualizada: rol TEST ahora solo con [2, 14]');
});

test('GET /roles-sistema/matriz-permisos → devuelve roles y permisos', async () => {
  const r = await api('GET', '/roles-sistema/matriz-permisos');
  assert.equal(r.status, 200);
  assert.equal(r.json.success, true);
  assert.ok(Array.isArray(r.json.roles));
  assert.ok(Array.isArray(r.json.permisos));
});

test('POST /roles-sistema → nombre de rol duplicado → 400', async () => {
  const r = await api('POST', '/roles-sistema', { nombre: `${nombreRol} EDITADO`, permisoIds: [] });
  assert.equal(r.status, 400);
  assert.ok(r.json.mensaje.includes('ya existe'), 'debe rechazar el rol duplicado');
});

test('DELETE /roles-sistema/2 → rol con usuarios → 400', async () => {
  const r = await api('DELETE', '/roles-sistema/2');
  assert.equal(r.status, 400);
  assert.ok(r.json.mensaje.includes('asignado'), 'debe proteger roles con usuarios');
});

test('DELETE /roles-sistema/:id → eliminar rol TEST', async () => {
  const r = await api('DELETE', `/roles-sistema/${rolId}`);
  assert.equal(r.status, 200);
  assert.equal(r.json.success, true);
  const list = await api('GET', '/roles-sistema');
  assert.ok(!list.json.roles.some(x => x.id === rolId), 'el rol TEST debe haberse eliminado');
  rolId = null;
  console.log('  ✓ rol TEST eliminado');
});

test('DELETE /permisos-sistema/:id → eliminar permiso TEST', async () => {
  const r = await api('DELETE', `/permisos-sistema/${permisoId}`);
  assert.equal(r.status, 200);
  assert.equal(r.json.success, true);
  const list = await api('GET', '/permisos-sistema');
  assert.ok(!list.json.permisos.some(p => p.id === permisoId), 'el permiso TEST debe haberse eliminado');
  permisoId = null;
  console.log('  ✓ permiso TEST eliminado');
});
