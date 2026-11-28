// Gera, no build da imagem (Dockerfile), o trecho do nginx que leva para o endereço
// oficial (SITE_URL) qualquer acesso que chegue por outro nome: www, um domínio antigo
// depois de uma migração etc. Redirecionamento 301, que transfere a relevância no Google.
// O /healthz fica de fora, para a verificação de saúde do container continuar funcionando.
//
// Uso: SITE_URL=https://dominio node deploy/canonical-host.mjs > canonical-host.conf

const siteUrl = process.env.SITE_URL;
if (!siteUrl) {
  console.error('Defina SITE_URL (ex.: https://renan.advogado.xn--vrion-sra.tech).');
  process.exit(1);
}

// new URL converte domínio com acento, ç ou æ para punycode, a forma que o navegador
// envia no cabeçalho Host (ex.: værion → xn--vrion-sra)
const { origin, hostname } = new URL(siteUrl);

process.stdout.write(`# Gerado no build por deploy/canonical-host.mjs a partir de SITE_URL.
set $redirect_to_canonical 0;
if ($host != "${hostname}") {
  set $redirect_to_canonical 1;
}
if ($uri = /healthz) {
  set $redirect_to_canonical 0;
}
if ($redirect_to_canonical) {
  return 301 ${origin}$request_uri;
}
`);
