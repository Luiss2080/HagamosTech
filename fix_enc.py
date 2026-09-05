import os

safe_word_replacements = [
    ('conf+?-?an', 'confían'),
    ('l+?-?deres', 'líderes'),
    ('ayud+?-?ndolas', 'ayudándolas'),
    ('tecnolog+?-?a', 'tecnología'),
    ('confan', 'confían'),
    ('Diseo', 'Diseño'),
    ('ms ', 'más '),
    ('Ms ', 'Más '),
    ('rpidas', 'rápidas'),
    ('Pginas', 'Páginas'),
    ('Fciles', 'Fáciles'),
    ('fciles', 'fáciles'),
    ('Catlogos', 'Catálogos'),
    ('Informacin', 'Información'),
    ('Configuracin', 'Configuración'),
    ('Gestin', 'Gestión'),
    ('Integracin', 'Integración'),
    ('Educacin', 'Educación'),
    ('Creacin', 'Creación'),
    ('optimizacin', 'optimización'),
    ('Solucin', 'Solución'),
    ('Diseamos', 'Diseñamos'),
    ('ptimo', 'óptimo'),
    ('estratgicas', 'estratégicas'),
    ('Anlisis', 'Análisis'),
    ('Informtica', 'Informática'),
    ('Acadmico', 'Académico'),
    ('Automatizacin', 'Automatización')
]

def process_file(path):
    try:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception:
        return
    
    new_content = content
    for old, new in safe_word_replacements:
        new_content = new_content.replace(old, new)
        
    if content != new_content:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed {path}")

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith(('.jsx', '.js')):
            process_file(os.path.join(root, file))

print("Done")
