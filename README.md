# Renan Moraes · Advocacia Criminal

Landing page e política de privacidade pré-renderizadas pelo Vite. O site usa HTML, CSS e JavaScript, com Lenis para a rolagem suave.

## Executar localmente

```sh
npm ci
npm run dev
```

## Conferir o build

```sh
npm run build
npm run preview
```

A saída publicável fica em `dist/`. A versão de prévia serve a landing em `/` e a política em `/politica-de-privacidade.html`.

## Publicar na VPS (Dokploy)

O site sobe no Dokploy como serviço **Docker Compose**. O [Dockerfile](Dockerfile) faz o build com Node e entrega só o resultado num nginx sem root, na porta 8080, com compressão, cache longo para arquivos com hash e cabeçalhos de segurança ([deploy/nginx/](deploy/nginx/)). O HTTPS fica com o Traefik do Dokploy.

Endereço atual: **renan.advogado.værion.tech**. Como `værion` tem "æ", DNS, certificados e o Dokploy usam a forma ASCII (punycode) do domínio: **renan.advogado.xn--vrion-sra.tech**. É a forma que o navegador envia ao servidor; na barra de endereço, ele pode mostrar qualquer uma das duas.

1. **DNS:** no painel da Hostinger, o registro `A` `renan.advogado` deve apontar para o IP da VPS onde o Dokploy roda.
2. **Serviço:** no projeto do Dokploy, crie um serviço *Compose* do tipo *Docker Compose*, ligado a este repositório no GitHub, branch `main`, com o caminho `./docker-compose.yml`.
3. **Environment:** defina `SITE_URL=https://renan.advogado.xn--vrion-sra.tech` (sem barra no final). É o endereço usado no link canônico, no compartilhamento, no `sitemap.xml` e no `robots.txt`. O build converte para punycode mesmo se for digitado com "æ". Sem a variável, o deploy para com uma mensagem de erro.
4. **Domains:** adicione o host `renan.advogado.xn--vrion-sra.tech` (em punycode, nunca com "æ") com o serviço `web`, a porta `8080`, o caminho `/`, HTTPS ligado e certificado Let's Encrypt.
5. **Deploy.** Com o Autodeploy ligado, cada push na `main` publica o site de novo.

Ao trocar de domínio no futuro (ex.: um `.adv.br` próprio), basta mudar o `SITE_URL`, o host na aba Domains e o DNS. Se o novo domínio tiver um `www`, cadastre-o também em Domains: o nginx redireciona o `www` para o domínio principal.

Depois do deploy, confira:

- `https://renan.advogado.xn--vrion-sra.tech/healthz` responde `ok`.
- A página abre com o cadeado do HTTPS, e `/politica-de-privacidade.html` também.
- `/robots.txt` e `/sitemap.xml` mostram o domínio novo.
- O link compartilhado no WhatsApp mostra a imagem de prévia.
- A aba de logs do serviço no Dokploy não mostra erros.

Para testar a imagem no próprio computador, antes de subir:

```sh
docker build --build-arg SITE_URL=http://localhost:8080 -t renan-site .
docker run --rm -p 8080:8080 renan-site
```

Consulte [Arquitetura do projeto](docs/arquitetura.md) para localizar conteúdos, interações, mídias e configuração de SEO.
