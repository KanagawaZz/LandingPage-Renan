# Projeto Renan Moraes

Landing page estática e política de privacidade em Vite, JavaScript e CSS. Ambas recebem HTML pré-renderizado durante o desenvolvimento e o build.

| Pasta | Conteúdo |
| --- | --- |
| `src/components/`, `src/data/`, `src/styles/` | Seções, conteúdo e estilos. |
| `src/interactions/` | Vídeo do hero, linha do tempo e navegação. |
| `public/` e `brand/` | Mídia publicada e materiais de edição, respectivamente. |
| `scripts/vite/` e `scripts/media/` | Pré-renderização e ferramentas de mídia. |
| `Dockerfile`, `docker-compose.yml` e `deploy/nginx/` | Deploy na VPS com Dokploy (nginx na porta 8080). |

Use `npm run dev` para desenvolver, `npm run build` para validar a compilação e `npm run preview` para conferir a saída. O deploy de produção exige a variável `SITE_URL` (veja o README). Verifique `/` e `/politica-de-privacidade.html` ao alterar a pré-renderização. Edite o código-fonte em vez dos arquivos gerados em `dist/`.

Veja [docs/arquitetura.md](docs/arquitetura.md) para o mapa completo.
