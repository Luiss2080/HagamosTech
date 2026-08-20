const prisma = require('../../models/prisma');

const ClienteController = {
    obtenerClientes: async (req, res) => {
        try {
            const { buscar } = req.query;
            let buscarFilter = {};
            if (buscar) {
                buscarFilter = {
                    OR: [
                        { nombre_completo: { contains: buscar } },
                        { ci_nit: { contains: buscar } },
                        { telefono: { contains: buscar } },
                        { email: { contains: buscar } }
                    ]
                };
            }

            const listado = await prisma.clientes.findMany({
                where: buscarFilter,
                orderBy: { nombre_completo: 'asc' }
            });

            // Obtener todas las compras del store para calcular el historial en memoria
            const listadoCompras = await prisma.compra.findMany();

            const clientes = listado.map(c => {
                const contactoObj = {
                    tipoCliente: c.tipo_cliente === 'INSTITUCION' ? 'JURIDICO' : 'NATURAL',
                    correo: c.email || '',
                    telefono: c.telefono || '',
                    direccion: c.direccion || '',
                    documento: c.ci_nit || '',
                    complemento: '',
                    ciudad: c.departamento || 'Santa Cruz',
                    rubro: 'Cliente',
                    estado: c.activo ? 'Activo' : 'Inactivo',
                    observaciones: c.observaciones || ''
                };

                const cName = (c.nombre_completo || '').toLowerCase();
                const cTel = c.telefono || '';
                const cCI = c.ci_nit || '';

                const comprasCliente = listadoCompras.filter(m => {
                    const mName = (m.nombreCompleto || '').toLowerCase();
                    const mCont = m.telefono || '';
                    return (mName && (mName.includes(cName) || cName.includes(mName))) || 
                           (mCont && (mCont === cTel || mCont === cCI));
                });

                const totalCompras = comprasCliente.length;
                const totalGastado = comprasCliente.reduce((acc, curr) => acc + Number(curr.totalBs || 0), 0);

                return {
                    id: c.id,
                    nombre: c.nombre_completo,
                    contacto: JSON.stringify(contactoObj),
                    codigo: c.codigo_cliente,
                    created_at: c.fecha_registro,
                    totalCompras,
                    totalGastado
                };
            });

            res.json({ success: true, clientes });
        } catch (error) {
            console.error('Error al obtener clientes:', error);
            res.status(500).json({ error: 'Error al obtener clientes' });
        }
    },

    registrarCliente: async (req, res) => {
        const { nombre, contacto, usuarioId } = req.body;
        try {
            let contactoObj = {};
            try {
                contactoObj = JSON.parse(contacto);
            } catch (e) {
                contactoObj = {};
            }

            // Generar código único robusto usando el id máximo (el id nunca se reutiliza,
            // a diferencia de count() que choca tras soft/hard deletes)
            const ultimo = await prisma.clientes.findFirst({
                orderBy: { id: 'desc' },
                select: { id: true }
            });
            const numero = (ultimo?.id || 0) + 1;
            const codigo_cliente = `CLI-${String(numero).padStart(3, '0')}`;

            const nuevoCliente = await prisma.clientes.create({
                data: {
                    codigo_cliente,
                    nombre_completo: nombre,
                    tipo_cliente: contactoObj.tipoCliente === 'JURIDICO' ? 'INSTITUCION' : 'PERSONA',
                    ci_nit: contactoObj.documento || '',
                    telefono: contactoObj.telefono || '',
                    email: contactoObj.correo || '',
                    direccion: contactoObj.direccion || '',
                    nacionalidad: 'Bolivia',
                    departamento: contactoObj.ciudad || 'Santa Cruz',
                    observaciones: contactoObj.observaciones || '',
                    activo: contactoObj.estado !== 'Inactivo'
                }
            });

            res.status(201).json({ success: true, cliente: nuevoCliente });
        } catch (error) {
            console.error('Error al registrar cliente:', error);
            res.status(500).json({ error: 'Error al registrar cliente' });
        }
    },

    editarCliente: async (req, res) => {
        const { nombreOriginal, nuevoNombre, nuevoContacto } = req.body;
        try {
            let contactoObj = {};
            try {
                contactoObj = JSON.parse(nuevoContacto);
            } catch (e) {
                contactoObj = {};
            }

            const cliente = await prisma.clientes.findFirst({
                where: { nombre_completo: nombreOriginal }
            });

            if (!cliente) {
                return res.status(404).json({ error: 'Cliente no encontrado' });
            }

            await prisma.clientes.update({
                where: { id: cliente.id },
                data: {
                    nombre_completo: nuevoNombre,
                    tipo_cliente: contactoObj.tipoCliente === 'JURIDICO' ? 'INSTITUCION' : 'PERSONA',
                    ci_nit: contactoObj.documento || '',
                    telefono: contactoObj.telefono || '',
                    email: contactoObj.correo || '',
                    direccion: contactoObj.direccion || '',
                    departamento: contactoObj.ciudad || 'Santa Cruz',
                    observaciones: contactoObj.observaciones || '',
                    activo: contactoObj.estado !== 'Inactivo'
                }
            });

            res.json({ success: true });
        } catch (error) {
            console.error('Error al editar cliente:', error);
            res.status(500).json({ error: 'Error al editar cliente' });
        }
    },

    eliminarCliente: async (req, res) => {
        const { nombre } = req.body;
        try {
            const cliente = await prisma.clientes.findFirst({
                where: { nombre_completo: nombre }
            });

            if (!cliente) {
                return res.status(404).json({ error: 'Cliente no encontrado' });
            }

            await prisma.clientes.update({
                where: { id: cliente.id },
                data: { activo: false }
            });

            res.json({ success: true });
        } catch (error) {
            console.error('Error al eliminar cliente:', error);
            res.status(500).json({ error: 'Error al eliminar cliente' });
        }
    }
};

module.exports = ClienteController;
