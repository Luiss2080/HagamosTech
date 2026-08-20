import os

filepath = r'c:\laragon\www\HagamosTech\server\system\utils\01_mailer.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Header Nav with 2 more options
old_nav = """<a href="${BASE_URL}/" style="color:#8B3A13;font-size:11px;font-weight:700;text-decoration:none;margin-left:12px;text-transform:uppercase;">Inicio</a>
        <a href="${BASE_URL}/productos" style="color:#8B3A13;font-size:11px;font-weight:700;text-decoration:none;margin-left:12px;text-transform:uppercase;">Menú</a>
        <a href="${BASE_URL}/sucursales" style="color:#8B3A13;font-size:11px;font-weight:700;text-decoration:none;margin-left:12px;text-transform:uppercase;">Sucursales</a>
        <a href="${BASE_URL}/perfil" style="display:inline-block;background-color:#FF4D00;color:#ffffff;padding:5px 12px;border-radius:12px;font-size:10px;font-weight:800;text-decoration:none;margin-left:12px;text-transform:uppercase;box-shadow:0 4px 10px rgba(255,77,0,0.2);">Mi Cuenta</a>"""

new_nav = """<a href="${BASE_URL}/" style="color:#8B3A13;font-size:11px;font-weight:700;text-decoration:none;margin-left:12px;text-transform:uppercase;">Inicio</a>
        <a href="${BASE_URL}/productos" style="color:#8B3A13;font-size:11px;font-weight:700;text-decoration:none;margin-left:12px;text-transform:uppercase;">Menú</a>
        <a href="${BASE_URL}/promociones" style="color:#8B3A13;font-size:11px;font-weight:700;text-decoration:none;margin-left:12px;text-transform:uppercase;">Promos</a>
        <a href="${BASE_URL}/servicios" style="color:#8B3A13;font-size:11px;font-weight:700;text-decoration:none;margin-left:12px;text-transform:uppercase;">Servicios</a>
        <a href="${BASE_URL}/sucursales" style="color:#8B3A13;font-size:11px;font-weight:700;text-decoration:none;margin-left:12px;text-transform:uppercase;">Locales</a>
        <a href="${BASE_URL}/perfil" style="display:inline-block;background-color:#FF4D00;color:#ffffff;padding:5px 12px;border-radius:12px;font-size:10px;font-weight:800;text-decoration:none;margin-left:12px;text-transform:uppercase;box-shadow:0 4px 10px rgba(255,77,0,0.2);">Mi Cuenta</a>"""

content = content.replace(old_nav, new_nav)

# 2. Update Code Verification box and Steps layout in plantillaVerificacion
old_body = """  <!-- ── CÓDIGO (Estilo Hero) ── -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 35px;">
    <tr>
      <td align="center" style="background:#FFF6F6;border:3px solid #FF4D00;border-radius:24px;padding:30px 10px;box-shadow:0 10px 25px rgba(255,77,0,0.15);">
        <p style="margin:0 0 12px;font-size:12px;letter-spacing:4px;text-transform:uppercase;color:#FF4D00;font-weight:900;">CÓDIGO DE VERIFICACIÓN</p>
        <span style="font-size:52px;font-weight:900;letter-spacing:18px;color:#FF4D00;font-family:'Poppins',sans-serif;margin-left:18px;display:block;">${codigo}</span>
      </td>
    </tr>
  </table>

  <!-- ── PASOS (Compactos) ── -->
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
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFF6F6;border-radius:12px;padding:12px 15px;border-left:4px solid #FF4D00;">
    <tr>
      <td style="color:#5D3A1F;font-size:13px;font-weight:600;">
        <strong style="color:#FF4D00;text-transform:uppercase;font-size:11px;letter-spacing:1px;display:block;margin-bottom:4px;">Seguridad</strong>
        Este código expirará en <strong>${expiraMin} minutos</strong>.
      </td>
    </tr>
  </table>`;"""

new_body = """  <!-- ── CÓDIGO (Estilo Header/Moderno) ── -->
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
  </table>`;"""

content = content.replace(old_body, new_body)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated successfully')
