import os

filepath = r'c:\laragon\www\LosHagamosTech\server\system\utils\01_mailer.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Change top bar text
content = content.replace(
    'El sabor tradicional de Santa Cruz, Bolivia',
    'CONFIRMACIÓN DE SEGURIDAD DE TU CUENTA'
)

# 2. Add 3 options to header
old_nav = """<a href="${BASE_URL}/" style="color:#8B3A13;font-size:11px;font-weight:700;text-decoration:none;margin-left:12px;text-transform:uppercase;">Inicio</a>
        <a href="${BASE_URL}/contacto" style="color:#8B3A13;font-size:11px;font-weight:700;text-decoration:none;margin-left:12px;text-transform:uppercase;">Ayuda</a>
        <a href="${BASE_URL}/perfil" style="display:inline-block;background-color:#FF4D00;color:#ffffff;padding:5px 12px;border-radius:12px;font-size:10px;font-weight:800;text-decoration:none;margin-left:12px;text-transform:uppercase;box-shadow:0 4px 10px rgba(255,77,0,0.2);">Mi Cuenta</a>"""

new_nav = """<a href="${BASE_URL}/" style="color:#8B3A13;font-size:11px;font-weight:700;text-decoration:none;margin-left:12px;text-transform:uppercase;">Inicio</a>
        <a href="${BASE_URL}/productos" style="color:#8B3A13;font-size:11px;font-weight:700;text-decoration:none;margin-left:12px;text-transform:uppercase;">Menú</a>
        <a href="${BASE_URL}/sucursales" style="color:#8B3A13;font-size:11px;font-weight:700;text-decoration:none;margin-left:12px;text-transform:uppercase;">Sucursales</a>
        <a href="${BASE_URL}/perfil" style="display:inline-block;background-color:#FF4D00;color:#ffffff;padding:5px 12px;border-radius:12px;font-size:10px;font-weight:800;text-decoration:none;margin-left:12px;text-transform:uppercase;box-shadow:0 4px 10px rgba(255,77,0,0.2);">Mi Cuenta</a>"""
content = content.replace(old_nav, new_nav)

# 3. Make Steps block more compact
old_steps = """<!-- ── PASOS (Modernos) ── -->
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
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFF6F6;border-radius:16px;padding:16px 20px;border-left:5px solid #FF4D00;">"""

new_steps = """<!-- ── PASOS (Compactos) ── -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 15px;background:#FFF9F5;border-radius:16px;padding:12px 20px;">
    <tr>
      <td style="padding:5px 0;width:35px;vertical-align:middle;">
        <div style="width:24px;height:24px;line-height:24px;text-align:center;background:#FF4D00;color:#fff;border-radius:8px;font-size:12px;font-weight:900;">1</div>
      </td>
      <td style="padding:5px 0;color:#5D3A1F;font-size:13px;font-weight:700;">Copia el código superior.</td>
    </tr>
    <tr>
      <td style="padding:5px 0;width:35px;vertical-align:middle;">
        <div style="width:24px;height:24px;line-height:24px;text-align:center;background:#FF4D00;color:#fff;border-radius:8px;font-size:12px;font-weight:900;">2</div>
      </td>
      <td style="padding:5px 0;color:#5D3A1F;font-size:13px;font-weight:700;">Pégalo en la ventana de registro.</td>
    </tr>
    <tr>
      <td style="padding:5px 0;width:35px;vertical-align:middle;">
        <div style="width:24px;height:24px;line-height:24px;text-align:center;background:#FF4D00;color:#fff;border-radius:8px;font-size:12px;font-weight:900;">3</div>
      </td>
      <td style="padding:5px 0;color:#5D3A1F;font-size:13px;font-weight:700;">¡Empieza a disfrutar!</td>
    </tr>
  </table>

  <!-- ── ALERTA ── -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFF6F6;border-radius:12px;padding:12px 15px;border-left:4px solid #FF4D00;">"""

content = content.replace(old_steps, new_steps)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated successfully')
