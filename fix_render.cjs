const fs = require('fs');
const path = require('path');
function walk(dir) {
    fs.readdirSync(dir).forEach(f => {
        const p = path.join(dir, f);
        if (fs.statSync(p).isDirectory()) {
            walk(p);
        } else if (path.basename(p).startsWith('Recorrido') && p.endsWith('.jsx')) {
            let c = fs.readFileSync(p, 'utf8');
            c = c.replace(/{p\.category}/g, '{p.category || (p.title ? p.title.split(":")[0] : "")}');
            c = c.replace(/{p\.firstPart}/g, '{p.firstPart || (p.title ? p.title.split(":")[0] + ":" : "")}');
            c = c.replace(/{p\.highlightPart}/g, '{p.highlightPart || (p.title ? p.title.split(":")[1] : "")}');
            fs.writeFileSync(p, c);
            console.log('Fixed', p);
        }
    });
}
walk('src/pages/Servicios');
