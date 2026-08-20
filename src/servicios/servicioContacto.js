import apiClient from './clienteApi';

const ContactService = {
    sendEmbeddedContact: async (data) => {
        const payload = {
            nombre: data?.name || '',
            correo: data?.email || '',
            telefono: data?.phone || '',
            asunto: data?.subject || 'Contacto desde web',
            mensaje: data?.message || '',
            tipo: 'contacto'
        };

        const resp = await apiClient.post('/contacto', payload);
        return resp?.data;
    }
};

export default ContactService;
