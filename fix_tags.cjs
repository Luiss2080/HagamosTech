const fs = require('fs');
const path = require('path');
function walk(dir) {
    fs.readdirSync(dir).forEach(f => {
        const p = path.join(dir, f);
        if (fs.statSync(p).isDirectory()) {
            walk(p);
        } else if (path.basename(p).startsWith('Recorrido') && p.endsWith('.jsx')) {
            let c = fs.readFileSync(p, 'utf8');
            c = c.replace(/color: 'text-slate-650', bg: 'bg-neutral-900\/40', border: 'border-slate-100'/g, "color: 'text-[#A3E635]', bg: 'bg-[#A3E635]/10', border: 'border-[#A3E635]/20'");
            
            // Also let's replace the Unsplash images for specific services!
            if (p.includes('InteligenciaArtificial')) {
                c = c.replace(/1556742049-0cfed4f6a45d/g, "1515503240222-14c115c56f54"); // data
                c = c.replace(/1607082348824-0a96f2a4b9da/g, "1451187580459-43490279c0fa"); // machine learning
                c = c.replace(/1460925895917-afdab827c52f/g, "1550751827-4bd374c3f58b"); // ai
            }
            if (p.includes('SistemasApps')) {
                c = c.replace(/1556742049-0cfed4f6a45d/g, "1517694712202-14dd9538aa97"); // code
                c = c.replace(/1607082348824-0a96f2a4b9da/g, "1523314591509-14a04d3e582d"); // smartphone
                c = c.replace(/1460925895917-afdab827c52f/g, "1555066931-4365d14bab8c"); // coding
            }
            if (p.includes('Automatizacion')) {
                c = c.replace(/1556742049-0cfed4f6a45d/g, "1504384308090-c894fdcc538d"); // gears/machine
                c = c.replace(/1607082348824-0a96f2a4b9da/g, "1485827404703-89b55fcc595e"); // automation
                c = c.replace(/1460925895917-afdab827c52f/g, "1580894908361-9671951555ca"); // robots
            }
            if (p.includes('Negocio')) {
                c = c.replace(/1556742049-0cfed4f6a45d/g, "1542744094-11ac94541dc5"); // branding
                c = c.replace(/1607082348824-0a96f2a4b9da/g, "1556761175-5973dc0f32b7"); // business
                c = c.replace(/1460925895917-afdab827c52f/g, "1542744173-8e7e53415bb0"); // meeting
            }
            if (p.includes('Academico')) {
                c = c.replace(/1556742049-0cfed4f6a45d/g, "1434030216411-0b793f4b4173"); // student
                c = c.replace(/1607082348824-0a96f2a4b9da/g, "1503676260728-1c00da094a0b"); // learning
                c = c.replace(/1460925895917-afdab827c52f/g, "1523050854058-8df90110c9f1"); // books
            }
            fs.writeFileSync(p, c);
            console.log('Fixed tags', p);
        }
    });
}
walk('src/pages/Servicios');
