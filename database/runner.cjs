const mysql = require('../server/node_modules/mysql2/promise');
const fs = require('fs');
const path = require('path');

// =====================================================================
// HagamosTech - Database Migration & Seeder Tool
// Usa los scripts maestros:
//   01_esquema_HagamosTech.sql   -> crea toda la estructura (DROP + CREATE)
//   02_datos_HagamosTech.sql     -> inserta los datos semilla
// =====================================================================

const DB_CONFIG = {
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'HagamosTech',
  port: 3306,
  multipleStatements: true,
};

const DATABASE_DIR = __dirname;
const SCHEMA_FILE = path.join(DATABASE_DIR, '01_esquema_HagamosTech.sql');
const SEEDS_FILE = path.join(DATABASE_DIR, '02_datos_HagamosTech.sql');

let connection;

async function connect() {
  connection = await mysql.createConnection(DB_CONFIG);
}

async function runSqlFile(filePath, label) {
  const sql = fs.readFileSync(filePath, 'utf8');
  console.log(`\n=== ${label} ===`);
  await connection.query(sql);
  console.log(`  -> OK`);
}

async function runSchema() {
  await runSqlFile(SCHEMA_FILE, '01_esquema_LosCastoresSCZ.sql');
}

async function runSeeds() {
  await runSqlFile(SEEDS_FILE, '02_datos_LosCastoresSCZ.sql');
}

async function showStatus() {
  const [rows] = await connection.query(
    "SELECT TABLE_NAME AS tabla FROM information_schema.tables WHERE TABLE_SCHEMA = DATABASE() AND LEFT(TABLE_NAME, 2) <> '__' ORDER BY TABLE_NAME"
  );
  console.log('\n========== STATUS ==========');
  console.log(`Base de datos: ${DB_CONFIG.database}`);
  console.log(`Tablas (${rows.length}):`);
  for (const r of rows) {
    console.log(`  - ${r.tabla}`);
  }
}

async function dropAllTables() {
  console.log('\nDropping all tables...');
  await connection.query('SET FOREIGN_KEY_CHECKS = 0');
  const [tables] = await connection.query(
    "SELECT TABLE_NAME FROM information_schema.tables WHERE TABLE_SCHEMA = DATABASE()"
  );
  for (const t of tables) {
    await connection.query(`DROP TABLE IF EXISTS \`${t.TABLE_NAME}\``);
    console.log(`  Dropped: ${t.TABLE_NAME}`);
  }
  await connection.query('SET FOREIGN_KEY_CHECKS = 1');
}

async function main() {
  const command = process.argv[2] || 'status';

  switch (command) {
    case 'migrate':
      await connect();
      await runSchema();
      break;

    case 'seed':
      await connect();
      await runSeeds();
      break;

    case 'status':
      await connect();
      await showStatus();
      break;

    case 'refresh':
      await connect();
      await dropAllTables();
      await runSchema();
      await runSeeds();
      break;

    case 'fresh':
      await connect();
      await dropAllTables();
      await runSchema();
      await runSeeds();
      break;

    case 'rollback':
    case 'rollback-migrate':
    case 'rollback-seed':
      console.log(`
El sistema de migraciones usa scripts maestros idempotentes (DROP + CREATE).
Para reconstruir la base de datos por completo usa:
  npm run db:refresh   (drop + migrate + seed)
      `);
      break;

    default:
      console.log(`
HagamosTech - Database Tool
==========================

Usage: node database/runner.cjs <command>

Commands:
  status              Show current database tables
  migrate             Apply schema (01_esquema_HagamosTech.sql)
  seed                Apply seed data (02_datos_HagamosTech.sql)
  refresh / fresh     Drop all tables, then migrate + seed
      `);
  }

  if (connection) await connection.end();
}

main().catch((e) => {
  console.error('Fatal error:', e.message);
  process.exit(1);
});
