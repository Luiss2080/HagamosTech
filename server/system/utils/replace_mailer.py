import os

filepath = r'c:\laragon\www\LosHagamosTech\server\system\utils\01_mailer.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

start_idx = content.find('function plantillaBase(')
end_idx = content.find('async function enviarCorreoVerificacion(')

if start_idx == -1 or end_idx == -1:
    print('Failed to find boundaries')
    exit(1)

new_content = """const BASE_URL = process.env.FRONTEND_URL || 'http://localhost:4000';

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
<body style="margin:0;padding:0;background-color:#FFF5EC;background-image:linear-gradient(180deg, #FFF5EC 0%, #FFE3D5 100%);">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FFF5EC;background-image:linear-gradient(180deg, #FFF5EC 0%, #FFE3D5 100%);padding:40px 10px;">
<tr>
<td align="center">

<!-- ── HEADER (Estilo Web) ── -->
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:transparent;margin-bottom:20px;">
  <tr>
    <td align="center">
      <img src="${BASE_URL}/img/02_Logos/LogoHeader.png" alt="${BRAND}" width="260" style="display:block; max-width:100%; height:auto;">
    </td>
  </tr>
</table>

<!-- ── TARJETA PRINCIPAL (Estilo Hero) ── -->
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:32px;box-shadow:0 20px 50px rgba(139,69,19,0.08);overflow:hidden;">

<!-- ── CONTENIDO ── -->
<tr>
<td style="padding:50px 45px 30px;">
  <h1 style="margin:0 0 10px;color:#8B3A13;font-size:32px;font-weight:900;line-height:1.2;text-align:center;letter-spacing:-0.5px;">${titulo}</h1>
  <p style="margin:0 0 35px;color:#FF4D00;font-size:14px;font-weight:800;text-transform:uppercase;letter-spacing:3px;text-align:center;">${subtitulo}</p>
  
  ${contenido}
</td>
</tr>

<!-- ── FOOTER (Estilo Web) ── -->
<tr>
<td style="background-color:#8B3A13;background-image:linear-gradient(180deg, #8B3A13 0%, #5C2307 100%);border-top:5px solid #FF4D00;padding:35px 40px;text-align:center;">
  <img src="${BASE_URL}/img/02_Logos/LogoFooter.png" alt="${BRAND}" width="160" style="display:block; margin:0 auto 15px; max-width:100%; height:auto; opacity:0.95;">
  <p style="margin:0 0 8px;color:#FFE8D6;font-size:13px;font-weight:600;line-height:1.5;">El verdadero sabor tradicional, horneado diariamente para alegrar tus mañanas.</p>
  <p style="margin:0;color:#C4A88C;font-size:10px;font-weight:400;letter-spacing:1px;">&copy; ${anio} ${BRAND} · Todos los derechos reservados.</p>
</td>
</tr>

</table>

<p style="color:#C4A88C;font-size:11px;margin:24px 0 0;text-align:center;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Correo generado automáticamente. No respondas.</p>

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

  <!-- ── CÓDIGO (Estilo Hero) ── -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 35px;">
    <tr>
      <td align="center" style="background:#FFF6F6;border:3px solid #FF4D00;border-radius:24px;padding:30px 10px;box-shadow:0 10px 25px rgba(255,77,0,0.15);">
        <p style="margin:0 0 12px;font-size:12px;letter-spacing:4px;text-transform:uppercase;color:#FF4D00;font-weight:900;">CÓDIGO DE VERIFICACIÓN</p>
        <span style="font-size:52px;font-weight:900;letter-spacing:18px;color:#FF4D00;font-family:'Poppins',sans-serif;margin-left:18px;display:block;">${codigo}</span>
      </td>
    </tr>
  </table>

  <!-- ── PASOS (Modernos) ── -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 30px;background:#FFF9F5;border-radius:20px;padding:24px;">
    <tr>
      <td style="padding:10px 0;width:45px;vertical-align:middle;">
        <div style="width:32px;height:32px;line-height:32px;text-align:center;background:#FF4D00;color:#fff;border-radius:10px;font-size:16px;font-weight:900;box-shadow:0 4px 10px rgba(255,77,0,0.3);">1</div>
      </td>
      <td style="padding:10px 0;color:#5D3A1F;font-size:15px;font-weight:700;">Copia el código superior.</td>
    </tr>
    <tr>
      <td style="padding:10px 0;width:45px;vertical-align:middle;">
        <div style="width:32px;height:32px;line-height:32px;text-align:center;background:#FF4D00;color:#fff;border-radius:10px;font-size:16px;font-weight:900;box-shadow:0 4px 10px rgba(255,77,0,0.3);">2</div>
      </td>
      <td style="padding:10px 0;color:#5D3A1F;font-size:15px;font-weight:700;">Pégalo en la ventana de registro.</td>
    </tr>
    <tr>
      <td style="padding:10px 0;width:45px;vertical-align:middle;">
        <div style="width:32px;height:32px;line-height:32px;text-align:center;background:#FF4D00;color:#fff;border-radius:10px;font-size:16px;font-weight:900;box-shadow:0 4px 10px rgba(255,77,0,0.3);">3</div>
      </td>
      <td style="padding:10px 0;color:#5D3A1F;font-size:15px;font-weight:700;">¡Empieza a disfrutar!</td>
    </tr>
  </table>

  <!-- ── ALERTA ── -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFF6F6;border-radius:16px;padding:16px 20px;border-left:5px solid #FF4D00;">
    <tr>
      <td style="color:#5D3A1F;font-size:13px;font-weight:600;">
        <strong style="color:#FF4D00;text-transform:uppercase;font-size:11px;letter-spacing:1px;display:block;margin-bottom:4px;">Seguridad</strong>
        Este código expirará en <strong>${expiraMin} minutos</strong>.
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
"""

final_content = content[:start_idx] + new_content + content[end_idx:]

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(final_content)

print('Update successful!')
