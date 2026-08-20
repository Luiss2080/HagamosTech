import os
path = r'c:\laragon\www\LosHagamosTech\src\components\Modales\RegistroModal.jsx'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()
replacements = [
    ('Ã¡', 'á'), ('Ã©', 'é'), ('Ã³', 'ó'), ('Ã­', 'í'), ('Ãº', 'ú'),
    ('Ã±', 'ñ'), ('Ã‘', 'Ñ'), ('Ã“', 'Ó'), ('Ãš', 'Ú'), ('Ã‰', 'É'),
    ('ÃƒÂ³', 'ó'), ('ÃƒÂ±', 'ñ'), ('ÃƒÂ¡', 'á'), ('ÃƒÂ©', 'é'),
    ('ÃƒÂ­', 'í'), ('ÃƒÂº', 'ú')
]
for old, new in replacements:
    c = c.replace(old, new)
with open(path, 'w', encoding='utf-8') as f:
    f.write(c)
print('Done!')
