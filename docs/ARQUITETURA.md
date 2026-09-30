# Arquitetura e guia de replicação

Este documento explica como a landing page está organizada e como reaproveitar sua estrutura em outro projeto. A implementação atual usa **Vite, JavaScript ES Modules, HTML e CSS**. Ela não usa React, Vue ou outro framework de componentes.

## Visão geral

O site é uma página estática de uma só página (*single-page landing page*). O Vite inicia o desenvolvimento, processa os módulos e estilos e gera a versão publicável em `dist/`.

```text
index.html
└── src/main.js
    ├── importa os estilos
    ├── importa os componentes e dados
    ├── monta o conteúdo dentro de #app
    ├── sincroniza metadados
    └── ativa interações e dados estruturados
```

Os componentes são funções JavaScript que retornam trechos de HTML como strings. Os dados ficam em módulos separados e são importados pelos componentes que precisam deles. O CSS é global e organizado por responsabilidade.

## Pastas e responsabilidades

```text
.
├── index.html                 # Documento HTML inicial, metadados e ponto de entrada
├── vite.config.js             # Configuração do servidor e do build Vite
├── package.json               # Scripts e dependências do projeto
├── public/
│   └── images/                # Imagens estáticas servidas sem transformação
├── src/
│   ├── main.js                # Composição da página e comportamento global
│   ├── components/            # Seções e peças de interface reutilizáveis
│   ├── data/                  # Conteúdo e configuração editáveis
│   ├── styles/
│   │   ├── variables.css      # Tokens: cores, fontes, medidas e sombras
│   │   ├── global.css         # Estilos globais e padrões de componentes
│   │   └── responsive.css     # Layouts por breakpoint e movimento reduzido
│   └── utils/                 # Funções compartilhadas sem interface visual
└── docs/
    ├── README.md              # Instruções de edição e publicação
    └── ARQUITETURA.md         # Este guia
```

### `index.html`

É o esqueleto do documento: idioma, viewport, título e metadados de busca/compartilhamento, além do elemento `<div id="app"></div>`. O script de `src/main.js` preenche esse elemento no navegador.

### `src/main.js`

É o ponto de composição da interface. Importa CSS, dados e componentes; define metadados a partir de `siteConfig`; concatena as seções na ordem da página; e registra eventos para menu mobile, cabeçalho, animações, FAQ e botão flutuante do WhatsApp.

Ao criar uma seção, sua função deve ser importada aqui e chamada na posição desejada dentro do HTML de `#app`.

### `src/components/`

Cada arquivo representa uma parte visual da página:

- `Header.js`: marca, navegação desktop/mobile e CTA.
- `Hero.js`: apresentação principal e foto.
- `PracticeAreas.js`: lista de áreas, alimentada por dados.
- `Welcome.js`: contexto para familiares.
- `HowItWorks.js`: etapas do atendimento, alimentadas por dados.
- `BeforeContact.js`: informações úteis para o primeiro contato.
- `About.js`: seção profissional.
- `Differentials.js`: compromissos no atendimento.
- `FAQ.js`: perguntas nativas expansíveis com `<details>` e `<summary>`.
- `FinalCTA.js`: chamada para contato ao final da página.
- `Footer.js`: contatos e informações finais.
- `WhatsAppButton.js`: atalho flutuante.
- `Icon.js`: catálogo compartilhado de ícones SVG.

Padrão simplificado:

```js
import items from '../data/items.js';

export default function ExampleSection() {
  const cards = items
    .map((item) => `<article><h3>${item.title}</h3><p>${item.description}</p></article>`)
    .join('');

  return `<section class="section"><div class="container">${cards}</div></section>`;
}
```

O HTML é escrito em template strings. Para conteúdo controlado por usuários ou vindo de uma API, não se deve interpolar texto sem escapar caracteres HTML; o projeto atual usa conteúdo mantido nos próprios arquivos de dados.

### `src/data/`

Guarda conteúdo que pode ser atualizado sem misturá-lo à estrutura visual:

- `lawyer.js`: nome, profissão, áreas de foco, contatos, foto e biografia.
- `siteConfig.js`: mensagem padrão do WhatsApp e configurações de SEO.
- `navigation.js`: rótulos e destinos do menu.
- `practiceAreas.js`: cartões de atuação.
- `steps.js`: etapas do atendimento.
- `contactChecklist.js`: itens úteis antes de iniciar a conversa.
- `faq.js`: perguntas e respostas.

Os componentes importam apenas os dados de que precisam. Se uma seção repetir conteúdo ou for orientada por uma lista, prefira mover os itens para `data/` e renderizá-los com `.map()`.

### `src/utils/`

- `whatsapp.js`: transforma número e mensagem em um link `wa.me` codificado.
- `seo.js`: cria os dados estruturados JSON-LD e completa canonical/`og:url` quando a URL pública está configurada.

Uma função pertence a `utils/` quando é lógica reutilizável, e não marcação de uma seção.

### `src/styles/`

- `variables.css`: valores compartilhados, como paleta, fontes, container, raios, sombras e curvas de animação.
- `global.css`: reset, tipografia, botões, espaçamentos e padrões comuns.
- `responsive.css`: estilos da página por breakpoint, estados de interação e `prefers-reduced-motion`.

Centralize uma cor ou medida reutilizada em `variables.css`. Mantenha no CSS responsivo as mudanças de layout para tablet e celular, em vez de duplicar componentes para cada tela.

## Como a página é construída

1. O navegador abre `index.html`.
2. O Vite carrega `src/main.js` e os três arquivos CSS.
3. `main.js` lê `siteConfig.js` e atualiza título, descrição e imagens de compartilhamento.
4. Cada função de componente gera seu trecho HTML; listas usam dados de `src/data/`.
5. Os trechos são inseridos dentro de `#app` na ordem escolhida em `main.js`.
6. Depois da renderização, `main.js` associa eventos aos elementos que precisam de interação.
7. No build, o Vite prepara os arquivos finais em `dist/`; os arquivos em `public/` são copiados mantendo seus caminhos.

Como o conteúdo das seções é criado no navegador, essa arquitetura é simples de hospedar como site estático. Para projetos em que conteúdo precisa estar presente no HTML inicial para indexação, páginas independentes ou renderização no servidor, considere uma arquitetura com SSR/SSG.

## Como adaptar para outro cliente/site

### 1. Confirme conteúdo e limites

Antes do layout, reúna nome, serviços, público, dúvidas comuns, contatos, localização, credenciais que podem ser publicadas, imagem autorizada, domínio e objetivo principal. Não preencha lacunas com suposições. Para profissões reguladas, revise também as regras de comunicação aplicáveis.

### 2. Atualize primeiro os dados

Edite `src/data/lawyer.js`, `siteConfig.js`, `navigation.js`, `practiceAreas.js`, `steps.js`, `contactChecklist.js` e `faq.js`, conforme a página nova exigir. Remova itens que não se aplicam em vez de deixar placeholders visíveis.

Mantenha o número de WhatsApp no formato internacional com apenas dígitos (código do país + DDD + número). A mensagem inicial está em `siteConfig.contact.whatsappMessage`; os botões compartilham o link produzido por `createWhatsAppLink()`.

### 3. Troque as imagens com cuidado

Coloque arquivos públicos em `public/images/` e atualize os caminhos usados nos dados. Prefira WebP/AVIF otimizados e dimensões adequadas ao uso. O `alt` deve descrever a imagem com concisão e não repetir texto próximo sem necessidade.

Para usar foto diferente no compartilhamento, atualize `siteConfig.seo.ogImage` e os metadados iniciais de `index.html`. URLs de Open Graph precisam ser absolutas no site publicado.

### 4. Ajuste a narrativa e as seções

Reordene as chamadas de componentes em `src/main.js`. Edite um componente quando a estrutura visual precisar mudar; edite o arquivo em `data/` quando mudar apenas o conteúdo. Ao incluir uma seção nova, crie o componente, importe-o em `main.js` e adicione os estilos necessários.

Mantenha uma função por seção enquanto ela tiver responsabilidade clara e tamanho razoável. Extraia um componente compartilhado apenas quando houver repetição real, não apenas para fragmentar arquivos.

### 5. Aplique a identidade visual

Atualize tokens em `variables.css` primeiro. Depois ajuste tipografia e padrões em `global.css` e detalhes de composição em `responsive.css`. Verifique contraste, foco de teclado, navegação em telas pequenas, alvos de toque e `prefers-reduced-motion`.

### 6. Configure o SEO e publique

Em `siteConfig.seo`, confirme título, descrição, URL canônica e imagem de compartilhamento. Use um domínio real e estável; não publique endereços fictícios. Revise os metadados de `index.html` e teste a prévia depois do deploy.

Comandos:

```bash
npm install       # instalar dependências na primeira configuração
npm run dev       # iniciar servidor local
npm run build     # gerar a versão de produção em dist/
npm run preview   # testar localmente a versão de produção
```

Publique o conteúdo de `dist/` em uma hospedagem estática, como Vercel. Após publicar, confira links, imagens, WhatsApp, metadados sociais, versão mobile e Console do navegador.

## Princípios para manter a base saudável

- **Conteúdo separado de layout:** texto em `data/`; marcação e estrutura em `components/`.
- **Composição explícita:** a ordem da página fica visível em `main.js`.
- **Sem dependências por conveniência:** HTML e CSS resolvem os componentes simples desta página.
- **Acessibilidade desde o início:** semântica HTML, rótulos, `alt`, foco visível, teclado e movimento reduzido.
- **Sem promessas ou fatos presumidos:** publique somente dados confirmados e autorizados.
- **Mudança validada:** rode `npm run build` depois de alterar código e teste a página nos tamanhos desktop e mobile.
