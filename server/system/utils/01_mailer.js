const nodemailer = require('nodemailer');
const path = require('path');

const BRAND = 'HAGAMOSTECH SCZ';
const config = {
    host: process.env.SMTP_HOST || '',
    port: parseInt(process.env.SMTP_PORT || '465', 10),
    secure: (process.env.SMTP_SECURE || 'true') === 'true',
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.SMTP_FROM || (process.env.SMTP_USER ? `${BRAND} <${process.env.SMTP_USER}>` : `${BRAND} <no-reply@loscatores.com>`)
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
<body style="margin:0;padding:0;background-color:#FFFFFF;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF;padding:20px 10px;">
<tr>
<td align="center">

<!-- ── TARJETA PRINCIPAL ── -->
<table align="center" role="presentation" width="600" cellpadding="0" cellspacing="0" style="margin:0 auto;max-width:600px;width:100%;background:#ffffff;border-radius:20px;border:1px solid #FFE3D5;border-bottom:6px solid #FF4D00;box-shadow:0 15px 35px rgba(139,69,19,0.06);overflow:hidden;">

<!-- ── TOP BAR (DINÁMICO) ── -->
<tr>
<td style="background-color:#FF4D00;padding:6px 20px;text-align:center;">
  <span style="color:#FFF5EC;font-size:10px;font-weight:800;letter-spacing:1px;text-transform:uppercase;">CONFIRMACIÓN DE SEGURIDAD DE TU CUENTA</span>
</td>
</tr>

<!-- ── HEADER MODERNO ── -->
<tr>
<td style="background-color:#FFF5EC;border-bottom:1px solid rgba(255,77,0,0.15);padding:15px 30px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <!-- Logo a la izquierda -->
      <td align="left" style="width:110px;">
        <img src="cid:logoheader@hagamostech.com" alt="${BRAND}" width="110" style="display:block; max-width:100%; height:auto;">
      </td>
      <!-- Menú interactivo -->
      <td align="right" valign="middle">
        <a href="${BASE_URL}/" style="color:#8B3A13;font-size:11px;font-weight:700;text-decoration:none;margin-left:12px;text-transform:uppercase;">Inicio</a>
        <a href="${BASE_URL}/productos" style="color:#8B3A13;font-size:11px;font-weight:700;text-decoration:none;margin-left:12px;text-transform:uppercase;">Menú</a>
        <a href="${BASE_URL}/promociones" style="color:#8B3A13;font-size:11px;font-weight:700;text-decoration:none;margin-left:12px;text-transform:uppercase;">Promos</a>
        <a href="${BASE_URL}/servicios" style="color:#8B3A13;font-size:11px;font-weight:700;text-decoration:none;margin-left:12px;text-transform:uppercase;">Servicios</a>
        <a href="${BASE_URL}/sucursales" style="color:#8B3A13;font-size:11px;font-weight:700;text-decoration:none;margin-left:12px;text-transform:uppercase;">Locales</a>
        <a href="${BASE_URL}/perfil" style="display:inline-block;background-color:#FF4D00;color:#ffffff;padding:5px 12px;border-radius:12px;font-size:10px;font-weight:800;text-decoration:none;margin-left:12px;text-transform:uppercase;box-shadow:0 4px 10px rgba(255,77,0,0.2);">Mi Cuenta</a>
      </td>
    </tr>
  </table>
</td>
</tr>

<!-- ── CONTENIDO ── -->
<tr>
<td style="padding:30px 35px 20px;">
  <h1 style="margin:0 0 8px;color:#8B3A13;font-size:28px;font-weight:900;line-height:1.2;text-align:center;letter-spacing:-0.5px;">${titulo}</h1>
  <p style="margin:0 0 25px;color:#FF4D00;font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:2px;text-align:center;">${subtitulo}</p>
  
  ${contenido}
</td>
</tr>

<!-- ── FOOTER (Estilo original sin logo) ── -->
<tr>
<td style="background-color:#8B3A13;background-image:linear-gradient(180deg, #8B3A13 0%, #5C2307 100%);border-top:5px solid #FF4D00;padding:35px 40px;text-align:center;">
  <p style="margin:0 0 8px;color:#FFE8D6;font-size:13px;font-weight:600;line-height:1.5;">El verdadero sabor tradicional, horneado diariamente para alegrar tus mañanas.</p>
  <p style="margin:0;color:#C4A88C;font-size:10px;font-weight:400;letter-spacing:1px;">&copy; ${anio} ${BRAND} · Todos los derechos reservados.</p>
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
  <p style="margin:0 0 10px;color:#FF4D00;font-size:22px;font-weight:800;text-align:center;">
    ¡Hola${nombre ? ' ' + nombre : ''}!
  </p>

  <p style="margin:0 0 35px;color:#5D3A1F;font-size:15px;line-height:1.7;font-weight:600;text-align:center;">
    Estás a un paso de probar las mejores salteñas. Utiliza el siguiente código para verificar tu identidad de forma segura:
  </p>

  <!-- ── CÓDIGO (Estilo Header/Moderno) ── -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 35px;">
    <tr>
      <td align="center" style="background:#FFF5EC;border-bottom:3px solid #FF4D00;border-top:1px solid rgba(255,77,0,0.15);border-radius:16px;padding:35px 10px;box-shadow:0 10px 15px -3px rgba(255,77,0,0.1);">
        <p style="margin:0 0 12px;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#FF4D00;font-weight:900;">CÓDIGO DE VERIFICACIÓN</p>
        <span style="font-size:52px;font-weight:900;letter-spacing:18px;color:#8B3A13;font-family:'Poppins',sans-serif;margin-left:18px;display:block;">${codigo}</span>
      </td>
    </tr>
  </table>

  <!-- ── INSTRUCCIONES Y SEGURIDAD (2 Columnas) ── -->
  <h3 style="margin:0 0 15px;color:#8B3A13;font-size:14px;text-transform:uppercase;letter-spacing:1px;text-align:center;font-weight:800;">Instrucciones de Seguridad</h3>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
    <tr>
      <!-- Columna 1: Pasos -->
      <td width="55%" valign="top" style="padding-right:8px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;padding:12px 10px;border:1px solid rgba(255,77,0,0.2);box-shadow:0 4px 6px rgba(255,77,0,0.05);height:100%;">
          <tr>
            <td style="padding:4px 0;width:30px;vertical-align:middle;">
              <div style="width:20px;height:20px;line-height:20px;text-align:center;background:#FF4D00;color:#fff;border-radius:6px;font-size:11px;font-weight:900;">1</div>
            </td>
            <td style="padding:4px 0;color:#5D3A1F;font-size:11px;font-weight:700;">Copia el código superior.</td>
          </tr>
          <tr>
            <td style="padding:4px 0;width:30px;vertical-align:middle;">
              <div style="width:20px;height:20px;line-height:20px;text-align:center;background:#FF4D00;color:#fff;border-radius:6px;font-size:11px;font-weight:900;">2</div>
            </td>
            <td style="padding:4px 0;color:#5D3A1F;font-size:11px;font-weight:700;">Pégalo en la ventana.</td>
          </tr>
          <tr>
            <td style="padding:4px 0;width:30px;vertical-align:middle;">
              <div style="width:20px;height:20px;line-height:20px;text-align:center;background:#FF4D00;color:#fff;border-radius:6px;font-size:11px;font-weight:900;">3</div>
            </td>
            <td style="padding:4px 0;color:#5D3A1F;font-size:11px;font-weight:700;">¡Empieza a disfrutar!</td>
          </tr>
        </table>
      </td>
      
      <!-- Columna 2: Seguridad -->
      <td width="45%" valign="top" style="padding-left:8px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFF6F6;border-radius:12px;padding:15px;border:2px solid #FF4D00;box-shadow:0 4px 6px rgba(255,77,0,0.1);height:100%;">
          <tr>
            <td style="color:#5D3A1F;font-size:12px;font-weight:600;text-align:center;">
              <strong style="color:#FF4D00;text-transform:uppercase;font-size:11px;letter-spacing:1px;display:block;margin-bottom:6px;">Seguridad</strong>
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
  <p style="margin:0 0 10px;color:#FF4D00;font-size:22px;font-weight:800;text-align:center;">
    ¡Hola${nombre ? ' ' + nombre : ''}!
  </p>

  <p style="margin:0 0 35px;color:#5D3A1F;font-size:15px;line-height:1.7;font-weight:600;text-align:center;">
    Recibimos una solicitud para restablecer tu contraseña en <strong>${BRAND}</strong>. 
    Haz clic en el botón de abajo para elegir una nueva contraseña de forma segura.
  </p>

  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 35px;width:100%;">
    <tr>
      <td align="center">
        <a href="${enlace}" target="_blank" style="display:inline-block;background-color:#FF4D00;background-image:linear-gradient(135deg, #FF4D00 0%, #CC3D00 100%);padding:20px 45px;color:#ffffff;font-size:16px;font-weight:800;text-transform:uppercase;letter-spacing:2px;text-decoration:none;border-radius:40px;box-shadow:0 10px 25px rgba(255,77,0,0.4);">Cambiar mi contraseña</a>
      </td>
    </tr>
  </table>

  <!-- ── ALERTA ── -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFF6F6;border-radius:16px;padding:16px 20px;border-left:5px solid #FF4D00;margin-bottom:20px;">
    <tr>
      <td style="color:#5D3A1F;font-size:13px;font-weight:600;">
        <strong style="color:#FF4D00;text-transform:uppercase;font-size:11px;letter-spacing:1px;display:block;margin-bottom:4px;">Enlace seguro</strong>
        Expirará en <strong>${expiraMin} minutos</strong>.
      </td>
    </tr>
  </table>

  <p style="margin:0;color:#C4A88C;font-size:12px;font-weight:600;text-align:center;">Si no solicitaste esto, puedes ignorar el mensaje.</p>`;

    return plantillaBase({ titulo: 'Restablecer contraseña', subtitulo: 'Recupera tu acceso', contenido });
}

// Obtenemos los attachments fijos para el header y footer
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

module.exports = { enviarCorreoVerificacion, enviarCorreoRecuperacion, plantillaVerificacion, plantillaRecuperacion, smtpConfigurado };
