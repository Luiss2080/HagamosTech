import os

filepath = r'c:\laragon\www\LosCastores\server\system\utils\01_mailer.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

new_html = """function plantillaBase({ titulo, subtitulo, contenido, anio = new Date().getFullYear() }) {
    return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${titulo} · ${BRAND}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&display=swap');
  body, table, td, p, h1, h2, span, a { font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important; }
  .header-link { color:#8B3A13; text-decoration:none; font-weight:700; font-size:12px; text-transform:uppercase; letter-spacing:1px; margin:0 12px; }
</style>
</head>
<body style="margin:0;padding:0;background-color:#FFFFFF;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF;padding:40px 10px;">
<tr>
<td align="center">

<!-- ── TARJETA PRINCIPAL ── -->
<table align="center" role="presentation" width="600" cellpadding="0" cellspacing="0" style="margin:0 auto;max-width:600px;width:100%;background:#ffffff;border-radius:32px;box-shadow:0 20px 50px rgba(139,69,19,0.08);border:1px solid rgba(139,69,19,0.05);overflow:hidden;">

<!-- ── HEADER COMPLETO Y DINÁMICO ── -->
<tr>
<td style="background-color:#FFF5EC;border-bottom:1px solid rgba(255,77,0,0.15);box-shadow:0 10px 15px -3px rgba(255,77,0,0.05);padding:25px 30px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <!-- Logo a la izquierda -->
      <td align="left" style="width:130px;">
        <img src="cid:logoheader@loscastores.com" alt="${BRAND}" width="120" style="display:block; max-width:100%; height:auto;">
      </td>
      <!-- Menú de navegación a la derecha (Estilo Web) -->
      <td align="right" valign="middle">
        <a href="${BASE_URL}/" class="header-link">Inicio</a>
        <a href="${BASE_URL}/sobre-nosotros" class="header-link">Nosotros</a>
        <a href="${BASE_URL}/contactanos" class="header-link" style="color:#FF4D00;">Contacto</a>
      </td>
    </tr>
  </table>
</td>
</tr>

<!-- ── CONTENIDO ── -->
<tr>
<td style="padding:40px 45px 30px;">
  <h1 style="margin:0 0 10px;color:#8B3A13;font-size:32px;font-weight:900;line-height:1.2;text-align:center;letter-spacing:-0.5px;">${titulo}</h1>
  <p style="margin:0 0 35px;color:#FF4D00;font-size:14px;font-weight:800;text-transform:uppercase;letter-spacing:3px;text-align:center;">${subtitulo}</p>
  
  ${contenido}
</td>
</tr>

<!-- ── FOOTER ── -->
<tr>
<td style="background-color:#8B3A13;background-image:linear-gradient(180deg, #8B3A13 0%, #5C2307 100%);border-top:5px solid #FF4D00;padding:30px 40px;text-align:center;">
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
}"""

attachments = """const fs = require('fs');
const obtenerAttachments = () => [
    {
        filename: 'LogoHeader.png',
        content: fs.readFileSync(path.join(__dirname, '../../../public/img/02_Logos/LogoHeader.png')),
        cid: 'logoheader@loscastores.com',
        contentType: 'image/png',
        contentDisposition: 'inline'
    }
];"""

# Replace plantillaBase
start_idx = content.find('function plantillaBase(')
end_idx = content.find('function plantillaVerificacion(')
content = content[:start_idx] + new_html + '\n\n' + content[end_idx:]

# Replace attachments
a_start = content.find("const fs = require('fs');")
a_end = content.find('async function enviarCorreoVerificacion')
content = content[:a_start] + attachments + '\n\n' + content[a_end:]

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated successfully')
