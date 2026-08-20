import { useState, useCallback } from 'react';
import apiClient from '../../../../servicios/clienteApi';

const useSuscripciones = (user) => {
    const [suscripciones, setSuscripciones] = useState([]);
    const [buscarSuscripcion, setBuscarSuscripcion] = useState('');
    const [suscripcionForm, setSuscripcionForm] = useState({
        usuarioId: '',
        estado: 'invitado',
        diasPrueba: 3
    });

    const cargarSuscripciones = useCallback(async () => {
        try {
            const { data } = await apiClient.get('/suscripciones-sistema/listar');
            if (data.success) {
                setSuscripciones(data.suscripciones || []);
            }
        } catch (error) {
            console.error('Error al cargar suscripciones', error);
        }
    }, []);

    const submitSuscripcion = async (e, options = {}) => {
        if (e) e.preventDefault();
        try {
            const esEdicion = !!suscripcionForm.id;
            const endpoint = esEdicion ? '/suscripciones-sistema/editar' : '/suscripciones-sistema/registrar';
            const method = esEdicion ? 'put' : 'post';

            const { data } = await apiClient[method](endpoint, suscripcionForm);

            if (data.success) {
                await cargarSuscripciones();
                if (options.onSuccess) options.onSuccess();
            }
        } catch (error) {
            console.error('Error al guardar suscripcion', error);
        }
    };

    const eliminarSuscripcion = async (suscripcion, options = {}) => {
        try {
            const { data } = await apiClient.delete('/suscripciones-sistema/eliminar', {
                data: { id: suscripcion.id }
            });
            if (data.success) {
                await cargarSuscripciones();
                if (options.onSuccess) options.onSuccess();
            }
        } catch (error) {
            console.error('Error al eliminar/vencer suscripcion', error);
        }
    };

    return {
        suscripciones,
        buscarSuscripcion,
        setBuscarSuscripcion,
        suscripcionForm,
        setSuscripcionForm,
        cargarSuscripciones,
        submitSuscripcion,
        eliminarSuscripcion
    };
};

export default useSuscripciones;
