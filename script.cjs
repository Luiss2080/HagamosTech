const fs = require('fs');
const path = require('path');

const dir = 'c:/laragon/www/HagamosTech/src/pages/Servicios';
const files = [];

const walkSync = (d) => {
  const list = fs.readdirSync(d);
  list.forEach(file => {
    const filePath = path.join(d, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      walkSync(filePath);
    } else {
      if (file.startsWith('Recorrido') && file.endsWith('.jsx')) {
        files.push(filePath);
      }
    }
  });
};

walkSync(dir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  if (!content.includes('ModernServiceGrid')) {
    content = "import ModernServiceGrid from '../../../components/ui/ModernServiceGrid';\n" + content;
  }

  const regex = /\{\/\*\s*Vertical interleaved list\s*\*\/\}.*?<\/section>/s;
  
  if (regex.test(content)) {
    content = content.replace(regex, '<div className="mt-16">\n          <ModernServiceGrid projects={PROJECTS} />\n        </div>\n      </section>');
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  } else {
    console.log('Could not match regex in', file);
  }
});
