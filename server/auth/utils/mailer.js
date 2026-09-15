const nodemailer = require('nodemailer');
const path = require('path');

const BRAND = 'HAGAMOSTECH';

// ── Paleta de marca (igual que la web): oscuro + verde lima ──
const LIMA = '#A3E635';
const LIMA_HOVER = '#84CC16';
const BG = '#0A0A0A';
const SURFACE = '#111827';
const SURFACE_2 = '#171717';
const TEXTO = '#E5E7EB';
const TEXTO_MUTED = '#9CA3AF';
const BORDE_LIMA = 'rgba(163,230,53,0.25)';

const config = {
    host: process.env.SMTP_HOST || '',
    port: parseInt(process.env.SMTP_PORT || '465', 10),
    secure: (process.env.SMTP_SECURE || 'true') === 'true',
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.SMTP_FROM || (process.env.SMTP_USER ? `${BRAND} <${process.env.SMTP_USER}>` : `${BRAND} <no-reply@hagamostech.com>`)
};

const smtpConfigurado = () => !!(config.host && config.user && config.pass);

let transporter = null;

function obtenerTransporter() {
    if (!transporter) {
        transporter = nodemailer.createTransport({
            host: config.host,
            port: config.port,
            secure: config.secure,
            auth: { user: config.user, pass: config.pass },
            tls: { rejectUnauthorized: false },
            pool: true,
            maxConnections: 3,
            connectionTimeout: 10000,
            greetingTimeout: 5000,
            socketTimeout: 10000
        });
    }
    return transporter;
}

// Precalentar SMTP al iniciar
if (smtpConfigurado()) {
    obtenerTransporter().verify().then(() => console.log('[SMTP] OK')).catch(e => console.error('[SMTP] Error:', e.message));
}

function enviarAsync(opts, fallback) {
    obtenerTransporter().sendMail(opts).catch(err => {
        console.error('[MAIL ERROR]', err.message);
        if (fallback) console.log('[MAIL FALLBACK]', fallback);
    });
}

const BASE_URL = process.env.FRONTEND_URL || 'http://localhost:4000';

function plantillaBase({ titulo, subtitulo, contenido, anio = new Date().getFullYear() }) {
    return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${titulo} · ${BRAND}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&display=swap');
  body, table, td, p, h1, h2, span, a { font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important; }
</style>
</head>
<body style="margin:0;padding:0;background-color:${BG};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BG};padding:20px 10px;">
<tr>
<td align="center">

<!-- ── TARJETA PRINCIPAL ── -->
<table align="center" role="presentation" width="600" cellpadding="0" cellspacing="0" style="margin:0 auto;max-width:600px;width:100%;background:${SURFACE};border-radius:20px;border:1px solid ${BORDE_LIMA};border-bottom:6px solid ${LIMA};box-shadow:0 15px 35px rgba(0,0,0,0.5);overflow:hidden;">

<!-- ── TOP BAR ── -->
<tr>
<td style="background-color:${LIMA};padding:6px 20px;text-align:center;">
  <span style="color:${BG};font-size:10px;font-weight:800;letter-spacing:1px;text-transform:uppercase;">SOLUCIONES TECNOLÓGICAS A TU MEDIDA</span>
</td>
</tr>

<!-- ── HEADER ── -->
<tr>
<td style="background-color:${BG};border-bottom:1px solid ${BORDE_LIMA};padding:15px 30px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="left" style="width:110px;">
        <img src="cid:logoheader@hagamostech.com" alt="${BRAND}" width="110" style="display:block; max-width:100%; height:auto;">
      </td>
      <td align="right" valign="middle">
        <a href="${BASE_URL}/" style="color:${TEXTO};font-size:11px;font-weight:700;text-decoration:none;margin-left:12px;text-transform:uppercase;">Inicio</a>
        <a href="${BASE_URL}/#/que-hacemos/tecnologia" style="color:${TEXTO};font-size:11px;font-weight:700;text-decoration:none;margin-left:12px;text-transform:uppercase;">Soluciones</a>
        <a href="${BASE_URL}/#/promociones" style="color:${TEXTO};font-size:11px;font-weight:700;text-decoration:none;margin-left:12px;text-transform:uppercase;">Promos</a>
        <a href="${BASE_URL}/#/contactanos" style="color:${TEXTO};font-size:11px;font-weight:700;text-decoration:none;margin-left:12px;text-transform:uppercase;">Contacto</a>
        <a href="${BASE_URL}/#/perfil" style="display:inline-block;background-color:${LIMA};color:${BG};padding:5px 12px;border-radius:12px;font-size:10px;font-weight:800;text-decoration:none;margin-left:12px;text-transform:uppercase;box-shadow:0 4px 10px rgba(163,230,53,0.25);">Mi Cuenta</a>
      </td>
    </tr>
  </table>
</td>
</tr>

<!-- ── CONTENIDO ── -->
<tr>
<td style="padding:30px 35px 20px;">
  <h1 style="margin:0 0 8px;color:#ffffff;font-size:28px;font-weight:900;line-height:1.2;text-align:center;letter-spacing:-0.5px;">${titulo}</h1>
  <p style="margin:0 0 25px;color:${LIMA};font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:2px;text-align:center;">${subtitulo}</p>

  ${contenido}
</td>
</tr>

<!-- ── FOOTER ── -->
<tr>
<td style="background-color:${BG};border-top:5px solid ${LIMA};padding:35px 40px;text-align:center;">
  <p style="margin:0 0 8px;color:${TEXTO};font-size:13px;font-weight:600;line-height:1.5;">Transformamos ideas y necesidades en soluciones de software, web y automatización.</p>
  <p style="margin:0;color:${TEXTO_MUTED};font-size:10px;font-weight:400;letter-spacing:1px;">&copy; ${anio} ${BRAND} · Todos los derechos reservados.</p>
</td>
</tr>

</table>

</td>
</tr>
</table>
</body>
</html>`;
}

function plantillaVerificacion({ nombre, codigo, expiraMin = 15 }) {
    const contenido = `
  <p style="margin:0 0 10px;color:${LIMA};font-size:22px;font-weight:800;text-align:center;">
    ¡Hola${nombre ? ' ' + nombre : ''}!
  </p>

  <p style="margin:0 0 35px;color:${TEXTO};font-size:15px;line-height:1.7;font-weight:600;text-align:center;">
    Estás a un paso de activar tu cuenta. Usá el siguiente código para verificar tu identidad de forma segura:
  </p>

  <!-- ── CÓDIGO ── -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 35px;">
    <tr>
      <td align="center" style="background:${BG};border-bottom:3px solid ${LIMA};border-top:1px solid ${BORDE_LIMA};border-radius:16px;padding:35px 10px;box-shadow:0 10px 15px -3px rgba(0,0,0,0.4);">
        <p style="margin:0 0 12px;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:${LIMA};font-weight:900;">CÓDIGO DE VERIFICACIÓN</p>
        <span style="font-size:52px;font-weight:900;letter-spacing:18px;color:${LIMA};font-family:'Poppins',sans-serif;margin-left:18px;display:block;">${codigo}</span>
      </td>
    </tr>
  </table>

  <!-- ── INSTRUCCIONES Y SEGURIDAD ── -->
  <h3 style="margin:0 0 15px;color:#ffffff;font-size:14px;text-transform:uppercase;letter-spacing:1px;text-align:center;font-weight:800;">Instrucciones de Seguridad</h3>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
    <tr>
      <!-- Columna 1: Pasos -->
      <td width="55%" valign="top" style="padding-right:8px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG};border-radius:12px;padding:12px 10px;border:1px solid ${BORDE_LIMA};box-shadow:0 4px 6px rgba(0,0,0,0.3);height:100%;">
          <tr>
            <td style="padding:4px 0;width:30px;vertical-align:middle;">
              <div style="width:20px;height:20px;line-height:20px;text-align:center;background:${LIMA};color:${BG};border-radius:6px;font-size:11px;font-weight:900;">1</div>
            </td>
            <td style="padding:4px 0;color:${TEXTO};font-size:11px;font-weight:700;">Copia el código superior.</td>
          </tr>
          <tr>
            <td style="padding:4px 0;width:30px;vertical-align:middle;">
              <div style="width:20px;height:20px;line-height:20px;text-align:center;background:${LIMA};color:${BG};border-radius:6px;font-size:11px;font-weight:900;">2</div>
            </td>
            <td style="padding:4px 0;color:${TEXTO};font-size:11px;font-weight:700;">Pégalo en la ventana.</td>
          </tr>
          <tr>
            <td style="padding:4px 0;width:30px;vertical-align:middle;">
              <div style="width:20px;height:20px;line-height:20px;text-align:center;background:${LIMA};color:${BG};border-radius:6px;font-size:11px;font-weight:900;">3</div>
            </td>
            <td style="padding:4px 0;color:${TEXTO};font-size:11px;font-weight:700;">¡Ya podés empezar!</td>
          </tr>
        </table>
      </td>

      <!-- Columna 2: Seguridad -->
      <td width="45%" valign="top" style="padding-left:8px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG};border-radius:12px;padding:15px;border:2px solid ${LIMA};box-shadow:0 4px 6px rgba(0,0,0,0.3);height:100%;">
          <tr>
            <td style="color:${TEXTO};font-size:12px;font-weight:600;text-align:center;">
              <strong style="color:${LIMA};text-transform:uppercase;font-size:11px;letter-spacing:1px;display:block;margin-bottom:6px;">Seguridad</strong>
              Este código expirará automáticamente en <strong style="font-size:14px;display:block;margin-top:4px;">${expiraMin} min.</strong>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`;

    return plantillaBase({ titulo: 'Verificá tu correo', subtitulo: 'Un último paso para empezar', contenido });
}

function plantillaRecuperacion({ nombre, enlace, expiraMin = 30 }) {
    const contenido = `
  <p style="margin:0 0 10px;color:${LIMA};font-size:22px;font-weight:800;text-align:center;">
    ¡Hola${nombre ? ' ' + nombre : ''}!
  </p>

  <p style="margin:0 0 35px;color:${TEXTO};font-size:15px;line-height:1.7;font-weight:600;text-align:center;">
    Recibimos una solicitud para restablecer tu contraseña en <strong>${BRAND}</strong>.
    Hacé clic en el botón de abajo para elegir una nueva contraseña de forma segura.
  </p>

  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 35px;width:100%;">
    <tr>
      <td align="center">
        <a href="${enlace}" target="_blank" style="display:inline-block;background-color:${LIMA};background-image:linear-gradient(135deg, ${LIMA} 0%, ${LIMA_HOVER} 100%);padding:20px 45px;color:${BG};font-size:16px;font-weight:800;text-transform:uppercase;letter-spacing:2px;text-decoration:none;border-radius:40px;box-shadow:0 10px 25px rgba(163,230,53,0.35);">Cambiar mi contraseña</a>
      </td>
    </tr>
  </table>

  <!-- ── ALERTA ── -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG};border-radius:16px;padding:16px 20px;border-left:5px solid ${LIMA};margin-bottom:20px;">
    <tr>
      <td style="color:${TEXTO};font-size:13px;font-weight:600;">
        <strong style="color:${LIMA};text-transform:uppercase;font-size:11px;letter-spacing:1px;display:block;margin-bottom:4px;">Enlace seguro</strong>
        Expirará en <strong>${expiraMin} minutos</strong>.
      </td>
    </tr>
  </table>

  <p style="margin:0;color:${TEXTO_MUTED};font-size:12px;font-weight:600;text-align:center;">Si no solicitaste esto, podés ignorar el mensaje.</p>`;

    return plantillaBase({ titulo: 'Restablecer contraseña', subtitulo: 'Recupera tu acceso', contenido });
}

const fs = require('fs');
const obtenerAttachments = () => [
    {
        filename: 'LogoHeader.png',
        content: fs.readFileSync(path.join(__dirname, '../../../public/img/02_Logos/LogoHeader.png')),
        cid: 'logoheader@hagamostech.com',
        contentType: 'image/png',
        contentDisposition: 'inline'
    }
];

async function enviarCorreoVerificacion({ to, nombre, codigo, expiraMin = 15 }) {
    const html = plantillaVerificacion({ nombre, codigo, expiraMin });
    const text = `Tu código de verificación para ${BRAND} es: ${codigo}\n\nVálido por ${expiraMin} minutos. No compartas este código.`;

    if (!smtpConfigurado()) {
        console.log('[MAIL DEV]', to, codigo);
        return { success: true, enviado: false, modoDev: true };
    }

    enviarAsync({
        from: config.from,
        to,
        subject: `Código de verificación · ${BRAND}`,
        html,
        text,
        attachments: obtenerAttachments(),
        headers: { 'X-Priority': '1', 'X-MSMail-Priority': 'High', 'Importance': 'High' }
    }, `Código: ${codigo}`);

    return { success: true, enviado: true };
}

async function enviarCorreoRecuperacion({ to, nombre, enlace, expiraMin = 30 }) {
    const html = plantillaRecuperacion({ nombre, enlace, expiraMin });
    const text = `Restablecé tu contraseña de ${BRAND}:\n\n${enlace}\n\nVence en ${expiraMin} minutos.`;

    if (!smtpConfigurado()) {
        console.log('[MAIL DEV]', to, enlace);
        return { success: true, enviado: false, modoDev: true };
    }

    enviarAsync({
        from: config.from,
        to,
        subject: `Restablecé tu contraseña · ${BRAND}`,
        html,
        text,
        attachments: obtenerAttachments()
    });

    return { success: true, enviado: true };
}

const escapeHtml = (valor = '') =>
    String(valor)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

function plantillaContacto({ nombre, correo, telefono, asunto, mensaje }) {
    const fila = (etiqueta, valor) => `
      <tr>
        <td style="padding:6px 10px;color:${LIMA};font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:1px;width:120px;">${etiqueta}</td>
        <td style="padding:6px 10px;color:${TEXTO};font-size:14px;font-weight:600;">${valor || '—'}</td>
      </tr>`;

    const contenido = `
  <p style="margin:0 0 20px;color:${TEXTO};font-size:15px;line-height:1.7;font-weight:600;text-align:center;">
    Recibiste un nuevo mensaje desde el formulario de contacto del sitio.
  </p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG};border-radius:16px;padding:8px 12px;border-left:5px solid ${LIMA};margin-bottom:20px;">
    ${fila('Nombre', escapeHtml(nombre))}
    ${fila('Correo', escapeHtml(correo))}
    ${fila('Teléfono', escapeHtml(telefono))}
    ${fila('Asunto', escapeHtml(asunto))}
  </table>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG};border-radius:16px;padding:14px 16px;border:1px solid ${BORDE_LIMA};margin-bottom:20px;">
    <tr>
      <td style="color:${TEXTO};font-size:14px;line-height:1.7;font-weight:500;white-space:pre-wrap;">${escapeHtml(mensaje)}</td>
    </tr>
  </table>
  <p style="margin:0;color:${TEXTO_MUTED};font-size:12px;font-weight:600;text-align:center;">Respondé directamente a este correo para contestar al contacto.</p>`;

    return plantillaBase({ titulo: 'Nuevo contacto', subtitulo: 'Mensaje desde la web', contenido });
}

async function enviarCorreoContacto({ nombre, correo, telefono, asunto, mensaje }) {
    const destino = process.env.CONTACT_EMAIL || 'contacto@hagamostech.bo';
    const html = plantillaContacto({ nombre, correo, telefono, asunto, mensaje });
    const text = `Nuevo contacto desde la web\n\nNombre: ${nombre || '—'}\nCorreo: ${correo || '—'}\nTeléfono: ${telefono || '—'}\nAsunto: ${asunto || '—'}\n\n${mensaje || ''}`;

    if (!smtpConfigurado()) {
        console.log('[MAIL DEV] contacto ->', destino, correo);
        return { success: true, enviado: false, modoDev: true };
    }

    enviarAsync({
        from: config.from,
        to: destino,
        replyTo: correo,
        subject: `Nuevo contacto: ${asunto || 'Consulta desde la web'}`,
        html,
        text,
        attachments: obtenerAttachments()
    });

    return { success: true, enviado: true };
}

module.exports = {
    enviarCorreoVerificacion,
    enviarCorreoRecuperacion,
    enviarCorreoContacto,
    plantillaVerificacion,
    plantillaRecuperacion,
    plantillaContacto,
    smtpConfigurado
};
