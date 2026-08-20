import os

filepath = r'c:\laragon\www\LosCastores\server\system\utils\01_mailer.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix Header Style & CID
content = content.replace(
    '<td align="center" style="background-color:#ffffff;border-bottom:2px solid #FFF5EC;padding:25px 0;">\n  <img src="cid:headerlogo"',
    '<td align="center" style="background-color:#FFF5EC;border-bottom:1px solid rgba(255,77,0,0.15);box-shadow:0 10px 15px -3px rgba(255,77,0,0.05);padding:20px 0;">\n  <img src="cid:logoheader@loscastores.com"'
)

# Fix Footer CID in HTML
content = content.replace('src="cid:footerlogo"', 'src="cid:logofooter@loscastores.com"')

# Fix attachments logic to use fs.readFileSync and new CIDs
attachments_old = """const obtenerAttachments = () => [
    {
        filename: 'LogoHeader.png',
        path: path.join(__dirname, '../../../public/img/02_Logos/LogoHeader.png'),
        cid: 'headerlogo',
        contentType: 'image/png',
        contentDisposition: 'inline'
    },
    {
        filename: 'LogoFooter.png',
        path: path.join(__dirname, '../../../public/img/02_Logos/LogoFooter.png'),
        cid: 'footerlogo',
        contentType: 'image/png',
        contentDisposition: 'inline'
    }
];"""

attachments_new = """const fs = require('fs');
const obtenerAttachments = () => [
    {
        filename: 'LogoHeader.png',
        content: fs.readFileSync(path.join(__dirname, '../../../public/img/02_Logos/LogoHeader.png')),
        cid: 'logoheader@loscastores.com',
        contentType: 'image/png',
        contentDisposition: 'inline'
    },
    {
        filename: 'LogoFooter.png',
        content: fs.readFileSync(path.join(__dirname, '../../../public/img/02_Logos/LogoFooter.png')),
        cid: 'logofooter@loscastores.com',
        contentType: 'image/png',
        contentDisposition: 'inline'
    }
];"""

content = content.replace(attachments_old, attachments_new)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated successfully')
