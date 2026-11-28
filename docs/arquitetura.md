# Arquitetura do projeto

## Onde fica cada parte

| Caminho | Responsabilidade |
| --- | --- |
| `index.html` e `politica-de-privacidade.html` | Entradas HTML da landing e da política. |
| `src/render.js` e `src/components/` | Ordem das seções e geração do HTML. |
| `src/data/` | Conteúdo institucional, navegação, contato e configuração do site. |
| `src/main.js` e `src/interactions/` | Inicialização, vídeo da abertura, navegação e linha do tempo. |
| `src/privacy.js` e `src/utils/` | Entrada da política e funções para consentimento, SEO e links de WhatsApp. |
| `src/styles/` | Fontes, variáveis, estilos globais, marca, responsividade, animações e estilos da política. |
| `src/assets/fonts/` | Fontes do site (Playfair Display e Plus Jakarta Sans), servidas pelo próprio site. |
| `public/` | Imagens, ícones e vídeos servidos diretamente pelo site. |
| `Dockerfile`, `docker-compose.yml` e `deploy/nginx/` | Imagem de produção, serviço do Dokploy e configuração do nginx. |
| `brand/` | Originais, arquivos tratados, referências e rascunhos locais de edição. |
| `scripts/vite/` | Plugin de pré-renderização e geração dos arquivos de SEO. |
| `scripts/media/` | Ferramentas opcionais para preparar imagens. |
| `docs/referencias/` | Briefing e referências que orientaram o design. |

## Pré-renderização e SEO

O Vite preenche os marcadores das duas entradas HTML com o conteúdo gerado em `src/render.js`. Os scripts do navegador cuidam das interações sobre esse HTML. A URL do site é a referência para as tags canônicas, os metadados de compartilhamento, os dados estruturados (`src/utils/seo.js`), `robots.txt` e `sitemap.xml`. Em produção ela vem da variável `SITE_URL`, definida no Dokploy. No build local, vale o endereço padrão em `src/data/siteConfig.js`. O plugin disponibiliza `robots.txt` e `sitemap.xml` no servidor de desenvolvimento e os gera em `dist/` no build.

## Produção

A imagem do `Dockerfile` roda o build com Node e copia `dist/` para um nginx sem root, que atende na porta 8080. O nginx entrega versões `.gz` geradas no build e guarda em cache por um ano o que tem hash no nome (`/assets/`). Imagens e vídeo ficam em cache por 30 dias, e as páginas são sempre revalidadas. Os cabeçalhos de segurança, incluindo a política de conteúdo (CSP), estão em `deploy/nginx/security-headers.conf`. Se uma nova ferramenta externa for adicionada ao site, o domínio dela precisa entrar na CSP. No build da imagem, `deploy/canonical-host.mjs` gera o redirecionamento 301 de qualquer outro nome de domínio para o `SITE_URL`. O passo a passo do deploy está no `README.md`, e as decisões de SEO estão em `SEO.md`.

## Organização das mídias

Os originais das fotografias, da marca e do vídeo ficam em `brand/originais/`. Máscaras e tratamentos ficam em `brand/tratadas/`. As versões públicas responsivas ficam em `public/images/`, e o vídeo usado no hero fica em `public/videos/`. As primeiras versões do filme de abertura e a cópia do retrato recebido ficam na pasta local ignorada `brand/rascunhos/`.

Para regenerar os WebP dos retratos e o JPG de compartilhamento, use Python com Pillow instalado:

```sh
python scripts/media/gerar_retrato.py
```

O build do site usa os arquivos já preparados em `public/` e roda apenas com Node.js e npm.
