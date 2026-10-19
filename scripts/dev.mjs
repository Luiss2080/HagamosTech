import { spawn } from 'node:child_process'
import net from 'node:net'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const projectRoot = fileURLToPath(new URL('../', import.meta.url))
const viteCli = path.join(projectRoot, 'node_modules', 'vite', 'bin', 'vite.js')
const host = '0.0.0.0'

function reserveAvailablePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer()
    server.once('error', reject)
    server.listen(0, host, () => {
      const address = server.address()
      const port = typeof address === 'object' && address ? address.port : null
      server.close((error) => error ? reject(error) : resolve(port))
    })
  })
}

const port = await reserveAvailablePort()
if (!port) throw new Error('No se pudo reservar un puerto libre para Vite.')

const vite = spawn(process.execPath, [viteCli, '--host', '--port', String(port), ...process.argv.slice(2)], {
  cwd: projectRoot,
  env: process.env,
  stdio: 'inherit',
})

vite.once('error', (error) => {
  console.error('No se pudo iniciar Vite:', error.message)
  process.exitCode = 1
})
vite.once('exit', (code, signal) => {
  process.exitCode = signal ? 1 : (code ?? 0)
})
