const fs = require('fs');
let lines = fs.readFileSync('src/app/App.jsx', 'utf8').split('\n');
let seen = new Set();
let out = [];
for (let line of lines) {
    if (line.includes('import SistemasApps') || line.includes('import Automatizacion') || line.includes('import InteligenciaArtificial') || line.includes('import Negocio') || line.includes('import Academico') || line.includes('<Route path="/servicios/sistemas-apps"') || line.includes('<Route path="/servicios/automatizacion"') || line.includes('<Route path="/servicios/inteligencia-artificial"') || line.includes('<Route path="/servicios/para-tu-negocio"') || line.includes('<Route path="/servicios/apoyo-academico"')) {
        if (!seen.has(line.trim())) {
            seen.add(line.trim());
            out.push(line);
        }
    } else {
        out.push(line);
    }
}
fs.writeFileSync('src/app/App.jsx', out.join('\n'));
