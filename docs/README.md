# Renan Botelho — Advocacia Criminal

Landing page em Vite com JavaScript, HTML e CSS. O conteúdo do advogado e as seções ficam separados da apresentação para facilitar futuras atualizações.

## Executar localmente

Requer Node.js instalado.

```bash
npm install
npm run dev
```

## Gerar a versão de produção

```bash
npm run build
npm run preview
```

Os arquivos finais são gerados na pasta `dist/`.

## Atualizar os dados do advogado

Edite `src/data/lawyer.js` para alterar nome, profissão, foco, OAB, cidade, WhatsApp, Instagram, foto e biografia. O número do WhatsApp deve conter somente o código do país, DDD e número. A mensagem inicial neutra está em `src/data/siteConfig.js`; o link é gerado por `src/utils/whatsapp.js`.

Troque a foto WebP em `public/images/renan-botelho.webp` e atualize o caminho `photo` em `src/data/lawyer.js` se o nome do arquivo mudar.

## Atualizar as seções

- Áreas de atuação: `src/data/practiceAreas.js`
- Etapas do atendimento: `src/data/steps.js`
- Perguntas e respostas: `src/data/faq.js`
- Informações úteis para iniciar o contato: `src/data/contactChecklist.js`
- Itens do menu: `src/data/navigation.js`
- Componentes da página: `src/components/`

## Alterar aparência e SEO

- Cores, fontes, sombras e medidas compartilhadas: `src/styles/variables.css`
- Regras globais e componentes visuais: `src/styles/global.css`
- Layout responsivo e preferência por movimento reduzido: `src/styles/responsive.css`
- Título, descrição, URL pública e imagem Open Graph: `src/data/siteConfig.js`

Informe a URL pública em `siteConfig.seo.url` após publicar; canonical e `og:url` são adicionados quando esse valor estiver preenchido. Não inclua endereço, avaliações ou credenciais que não tenham sido confirmados.

## Antes de publicar

1. Informe e confirme o número da OAB/UF e as cidades/comarcas atendidas em `src/data/lawyer.js`.
2. Confirme o WhatsApp em `src/data/lawyer.js`.
3. Informe o Instagram em `src/data/lawyer.js`.
4. Substitua os campos entre colchetes da biografia pelos dados confirmados e use um retrato profissional aprovado, se disponível.
5. Configure a URL do site em `src/data/siteConfig.js` e confira a imagem Open Graph.
6. Revise o conteúdo e a publicidade conforme as normas aplicáveis à advocacia.

## Publicação

Execute `npm run build` e publique o conteúdo da pasta `dist/` em um serviço de hospedagem estática compatível. Configure a URL final em `src/data/siteConfig.js` e gere novamente a versão de produção.
