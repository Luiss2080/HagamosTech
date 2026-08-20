import os

filepath = r'c:\laragon\www\LosHagamosTech\server\system\utils\01_mailer.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix background
content = content.replace(
    '<body style="margin:0;padding:0;background-color:#FFF5EC;background-image:linear-gradient(180deg, #FFF5EC 0%, #FFE3D5 100%);">',
    '<body style="margin:0;padding:0;background-color:#FFFFFF;">'
)
content = content.replace(
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FFF5EC;background-image:linear-gradient(180deg, #FFF5EC 0%, #FFE3D5 100%);padding:40px 10px;">',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF;padding:40px 10px;">'
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated successfully')
