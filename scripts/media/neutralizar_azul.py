"""Neutralização parcial do azul da fotografia oficial (sem retoque de rosto/aparência).

A) Fundo azul-noite (saturação alta, pouco brilho): perde até 72% da saturação.
B) Reflexo lilás sobre a camisa e o braço (azul-violeta pouco saturado e claro): perde 40%.
Pele, barba, cinto, relógio e a gravata azul (saturação média) ficam como estão.
Só operações de canal do Pillow (tabelas de consulta), sem numpy.
Uso: python grade_photo.py <entrada.png> <saida.png> [preview.jpg]
"""
import sys
from PIL import Image, ImageChops

src, dst = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGB')
H, S, V = im.convert('HSV').split()


def smooth(x, a, b):
    t = min(1.0, max(0.0, (x - a) / (b - a)))
    return t * t * (3 - 2 * t)


def lut(fn):
    return [round(255 * fn(i / 255.0)) for i in range(256)]


mul = ImageChops.multiply  # a * b / 255

blue = H.point(lut(lambda x: smooth(x * 360, 205, 225) * (1 - smooth(x * 360, 290, 310))))
bg = mul(mul(blue, S.point(lut(lambda x: smooth(x, 0.66, 0.82)))), V.point(lut(lambda x: 1 - smooth(x, 0.24, 0.38))))
cast = mul(mul(blue, S.point(lut(lambda x: 1 - smooth(x, 0.22, 0.34)))), V.point(lut(lambda x: smooth(x, 0.38, 0.5))))

# C) Contorno lilás da luz de recorte (braços e ombros). Gravata, calça e mostrador do
#    relógio também são azuis: ficam protegidos por região (coordenadas do original 1199x1600).
from PIL import ImageDraw, ImageFilter
sx, sy = im.width / 1199, im.height / 1600
protect = Image.new('L', im.size, 0)
pd = ImageDraw.Draw(protect)
for x0, y0, x1, y1 in [(455, 440, 680, 1150), (280, 1120, 930, 1600), (740, 1320, 850, 1440)]:
    pd.rectangle([x0 * sx, y0 * sy, x1 * sx, y1 * sy], fill=255)
protect = protect.filter(ImageFilter.GaussianBlur(18))
fringe = mul(mul(mul(blue, S.point(lut(lambda x: smooth(x, 0.28, 0.42) * (1 - smooth(x, 0.7, 0.82))))),
                 V.point(lut(lambda x: smooth(x, 0.12, 0.22) * (1 - smooth(x, 0.62, 0.75))))),
             ImageChops.invert(protect))

bg = mul(bg, ImageChops.invert(protect))  # a roupa azul-marinho também fica fora da regra do fundo

S2 = mul(mul(S, bg.point(lut(lambda x: 1 - 0.72 * x))), cast.point(lut(lambda x: 1 - 0.4 * x)))
S2 = mul(S2, fringe.point(lut(lambda x: 1 - 0.55 * x)))
res = Image.merge('HSV', (H, S2, V)).convert('RGB')
res.save(dst, optimize=True)

if len(sys.argv) > 3:
    w = 600
    a = im.resize((w, round(im.height * w / im.width)))
    b = res.resize(a.size)
    board = Image.new('RGB', (w * 2 + 10, a.height), (11, 12, 14))
    board.paste(a, (0, 0))
    board.paste(b, (w + 10, 0))
    board.save(sys.argv[3], quality=88)
print('ok')
