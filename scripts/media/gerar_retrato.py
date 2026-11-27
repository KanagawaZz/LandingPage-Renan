"""Gera as versões web e a imagem de compartilhamento do retrato aprovado.

Uso na raiz do projeto: python scripts/media/gerar_retrato.py
"""
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / 'brand' / 'originais' / 'renan-moraes-foto-aprovada.png'
INSTITUTIONAL = ROOT / 'brand' / 'originais' / 'renan-moraes-retrato-institucional.webp'
MASK = ROOT / 'brand' / 'tratadas' / 'renan-moraes-mascara.png'
IMAGES = ROOT / 'public' / 'images'


def export_portrait(portrait, name, widths, quality=91):
    for width in widths:
        height = round(portrait.height * width / portrait.width)
        image = portrait.resize((width, height), Image.Resampling.LANCZOS)
        image.save(IMAGES / f'{name}-{width}.webp', quality=quality, method=6)


def export_share_image(portrait):
    canvas = Image.new('RGB', (1200, 630), (11, 12, 14))
    crop = portrait.crop((26, 0, 1060, 1060))
    width = round(crop.width * canvas.height / crop.height)
    crop = crop.resize((width, canvas.height), Image.Resampling.LANCZOS)

    horizontal_fade = Image.new('L', crop.size, 255)
    horizontal = ImageDraw.Draw(horizontal_fade)
    fade_width = round(width * 0.42)
    for x in range(fade_width):
        horizontal.line((x, 0, x, canvas.height), fill=round(255 * (x / fade_width) ** 1.6))

    vertical_fade = Image.new('L', crop.size, 255)
    vertical = ImageDraw.Draw(vertical_fade)
    for y in range(120):
        vertical.line((0, 510 + y, width, 510 + y), fill=round(255 * (1 - y / 120) ** 1.3))

    canvas.paste(crop, (canvas.width - width + 40, 0), ImageChops.multiply(horizontal_fade, vertical_fade))
    with Image.open(IMAGES / 'brand' / 'rm-logo.png') as logo:
        logo = logo.resize((400, round(logo.height * 400 / logo.width)), Image.Resampling.LANCZOS).convert('RGBA')
        canvas.paste(logo, (90, (canvas.height - logo.height) // 2), logo)
    canvas.save(IMAGES / 'og-renan-moraes-2026.jpg', quality=88, optimize=True, progressive=True)


if __name__ == '__main__':
    with Image.open(SOURCE) as source:
        portrait = source.convert('RGB')

    # A máscara define apenas a transparência. A cor vem da fotografia aprovada.
    with Image.open(MASK) as mask:
        cutout = portrait.crop((0, 0, mask.width, mask.height))
        cutout.putalpha(mask)

    desktop = cutout.crop((0, 0, 1086, 1340))
    mobile = cutout.crop((93, 0, 993, 1125))
    export_portrait(desktop, 'renan-retrato-recorte', (560, 840, 1086))
    export_portrait(mobile, 'renan-retrato-recorte-mobile', (480, 800))
    export_share_image(portrait)

    with Image.open(INSTITUTIONAL) as source:
        export_portrait(source, 'renan-retrato-institucional', (480, 800, 1199), quality=90)
