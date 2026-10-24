import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Pré-renderiza as páginas: os componentes (strings HTML) rodam no Node durante o
// build e o resultado vai direto para o HTML. Assim buscadores e prévias de
// link (WhatsApp, Instagram) recebem a página completa, sem depender de JavaScript.
// Também gera robots.txt e sitemap.xml a partir de siteConfig.seo.url.
function prerender() {
  let server;
  let root;

  const loadRender = () =>
    server
      ? server.ssrLoadModule('/src/render.js')
      : import(pathToFileURL(resolve(root, 'src/render.js')).href);

  return {
    name: 'prerender-app',
    configResolved(config) {
      root = config.root;
    },
    configureServer(devServer) {
      server = devServer;
    },
    async transformIndexHtml(html) {
      const { renderApp, renderSeoHead, renderPrivacyPage, siteUrl } = await loadRender();

      return html
        .replace('<!--app-head-->', renderSeoHead())
        .replace('<!--app-html-->', renderApp())
        .replace('<!--privacy-head-->', siteUrl ? `<link rel="canonical" href="${siteUrl}/politica-de-privacidade.html" />` : '')
        .replace('<!--privacy-html-->', renderPrivacyPage());
    },
    async generateBundle() {
      const { siteUrl } = await loadRender();
      const today = new Date().toISOString().slice(0, 10);

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      });

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteUrl}/politica-de-privacidade.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
`,
      });
    },
  };
}

export default defineConfig({
  plugins: [prerender()],
  build: {
    rollupOptions: {
      // Duas páginas: a landing e a Política de Privacidade (LGPD)
      input: {
        main: resolve(process.cwd(), 'index.html'),
        privacidade: resolve(process.cwd(), 'politica-de-privacidade.html'),
      },
    },
  },
  server: {
    open: true,
  },
});
