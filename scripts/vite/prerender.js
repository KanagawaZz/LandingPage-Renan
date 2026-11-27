import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

function seoAssets(siteUrl) {
  const today = new Date().toISOString().slice(0, 10);

  return {
    'robots.txt': {
      contentType: 'text/plain; charset=utf-8',
      source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
    },
    'sitemap.xml': {
      contentType: 'application/xml; charset=utf-8',
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
    },
  };
}

export default function prerender() {
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
      server.middlewares.use(async (request, response, next) => {
        const [path] = request.url?.split('?') ?? [];
        if (path !== '/robots.txt' && path !== '/sitemap.xml') return next();

        try {
          const { siteUrl } = await loadRender();
          const { contentType, source } = seoAssets(siteUrl)[path.slice(1)];
          response.setHeader('Content-Type', contentType);
          response.end(request.method === 'HEAD' ? undefined : source);
        } catch (error) {
          next(error);
        }
      });
    },
    async transformIndexHtml(html) {
      const { renderApp, renderSeoHead, renderPrivacyPage, siteUrl } = await loadRender();

      return html
        .replace('<!--app-head-->', () => renderSeoHead())
        .replace('<!--app-html-->', () => renderApp())
        .replace('<!--privacy-head-->', siteUrl ? `<link rel="canonical" href="${siteUrl}/politica-de-privacidade.html" />` : '')
        .replace('<!--privacy-html-->', () => renderPrivacyPage());
    },
    async generateBundle() {
      const { siteUrl } = await loadRender();
      for (const [fileName, { source }] of Object.entries(seoAssets(siteUrl))) {
        this.emitFile({ type: 'asset', fileName, source });
      }
    },
  };
}
