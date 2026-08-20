import os

filepath = r'c:\laragon\www\LosHagamosTech\server\system\utils\01_mailer.js'
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
  <span style="color:#FFF5EC;font-size:10px;font-weight:800;letter-spacing:1px;text-transform:uppercase;">El sabor tradicional de Santa Cruz, Bolivia</span>
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
        <a href="${BASE_URL}/contacto" style="color:#8B3A13;font-size:11px;font-weight:700;text-decoration:none;margin-left:12px;text-transform:uppercase;">Ayuda</a>
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
}"""

start_idx = content.find('function plantillaBase(')
end_idx = content.find('function plantillaVerificacion(')

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + new_html + '\n\n' + content[end_idx:]
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print('Updated successfully')
else:
    print('Failed to find bounds')
