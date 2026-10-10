from pathlib import Path
from PIL import Image
root=Path(__file__).resolve().parents[1]
source=root.parent/'public'
for file in list((source/'images').rglob('*'))+[source/'logo.jpeg']:
    if file.suffix.lower() not in ['.png','.jpg','.jpeg']: continue
    relative=file.relative_to(source/'images') if file.parent!=source else Path(file.name)
    output=root/'site/assets/images'/relative.with_suffix('.webp')
    output.parent.mkdir(parents=True,exist_ok=True)
    with Image.open(file) as image:
        image.thumbnail((1600,1600))
        image.save(output,'WEBP',quality=85,method=6)
print('Optimized existing imagery to WebP.')

