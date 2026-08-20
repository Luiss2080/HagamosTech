import os
import re

filepath = r'c:\laragon\www\HagamosTech\server\system\utils\01_mailer.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix CID
content = content.replace('cid:logoHeader', 'cid:logoHeader@HagamosTech.com')
content = content.replace('cid:logoFooter', 'cid:logoFooter@HagamosTech.com')
content = content.replace("'cid': 'logoHeader'", "'cid': 'logoHeader@HagamosTech.com',\n        contentDisposition: 'inline'")
content = content.replace("cid: 'logoHeader'", "cid: 'logoHeader@HagamosTech.com',\n        contentDisposition: 'inline'")
content = content.replace("cid: 'logoFooter'", "cid: 'logoFooter@HagamosTech.com',\n        contentDisposition: 'inline'")

# Remove automatic email text
content = re.sub(r'<p[^>]*>Correo generado automáticamente\. No respondas\.</p>', '', content)

# Center main table
content = content.replace('<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:32px;box-shadow:0 20px 50px rgba(139,69,19,0.08);overflow:hidden;margin-bottom:20px;">', '<table align="center" role="presentation" width="600" cellpadding="0" cellspacing="0" style="margin:0 auto;max-width:600px;width:100%;background:#ffffff;border-radius:32px;box-shadow:0 20px 50px rgba(139,69,19,0.08);overflow:hidden;margin-bottom:20px;">')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print('Update successful!')
