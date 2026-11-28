# syntax=docker/dockerfile:1

# ---------------------------------------------------------------------------
# Etapa 1: build do site (Vite + pré-renderização) e compactação dos arquivos
# ---------------------------------------------------------------------------
FROM node:22-alpine AS build
WORKDIR /app

# Dependências primeiro: a camada fica em cache enquanto o package-lock não mudar
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .

# Endereço público do site (canonical, Open Graph, sitemap.xml e robots.txt).
# Vem da aba Environment do Dokploy, repassado pelo docker-compose.yml.
ARG SITE_URL
RUN test -n "$SITE_URL" || (echo "Defina SITE_URL (ex.: https://seudominio.com.br) na aba Environment do Dokploy." >&2 && exit 1)
ENV SITE_URL=${SITE_URL}

# Gera dist/ e deixa ao lado de cada arquivo de texto uma versão .gz pronta
# (o nginx entrega essa versão sem gastar processamento a cada visita)
RUN npm run build \
  && find dist -type f \( -name '*.html' -o -name '*.css' -o -name '*.js' -o -name '*.svg' -o -name '*.xml' -o -name '*.txt' -o -name '*.json' \) \
     -exec sh -c 'gzip -9 -c "$1" > "$1.gz"' _ {} \;

# Redirecionamento 301 de outros nomes (www, domínio antigo) para o endereço oficial
RUN node deploy/canonical-host.mjs > canonical-host.conf

# ---------------------------------------------------------------------------
# Etapa 2: servidor final, só com o nginx e os arquivos prontos (sem Node)
# ---------------------------------------------------------------------------
FROM nginxinc/nginx-unprivileged:1.30-alpine

COPY deploy/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY deploy/nginx/security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=build /app/canonical-host.conf /etc/nginx/snippets/canonical-host.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:8080/healthz || exit 1
