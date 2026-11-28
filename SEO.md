# SEO técnico: Dr. Renan Moraes, Advogado Criminalista

Documento da implementação de SEO técnico e local da landing page. Nenhum texto visível, layout, animação, imagem, fonte ou cor foi alterado: as mudanças estão no `<head>`, nos dados estruturados, na semântica do HTML e no servidor.

**Endereço oficial:** `https://renan.advogado.xn--vrion-sra.tech/`. É a forma ASCII (punycode) de `renan.advogado.værion.tech`. O domínio tem "æ", e DNS, certificados e buscadores trabalham com a forma punycode. A grafia `vaerion.tech` não existe no DNS e não deve ser usada em nenhuma configuração.

## 1. Diagnóstico inicial

Feito sobre o HTML entregue pelo servidor de produção, antes das mudanças.

| Item | Situação encontrada | Avaliação |
| --- | --- | --- |
| Renderização | HTML completo já no servidor (pré-renderizado no build). O conteúdo não depende de JavaScript. | Bom, mantido |
| `robots.txt` e `sitemap.xml` | Gerados no build a partir da URL do site, com as duas páginas | Bom, mantido |
| Página inexistente | Status 404 | Bom, mantido |
| HTTPS | Certificado Let's Encrypt válido, HTTP redireciona para HTTPS | Bom, mantido |
| Idioma | `<html lang="pt-BR">` | Bom, mantido |
| Imagens | WebP com `srcset`, `width`/`height`, `alt` e carregamento adiado abaixo da dobra | Bom, mantido |
| Title | 85 caracteres: o Google corta por volta de 60, perdendo "Cuiabá e Várzea Grande" | Corrigido |
| Meta description | 191 caracteres: corte entre 155 e 160 | Corrigido |
| H1 | Só o slogan "Sua defesa começa antes mesmo do processo.", sem nome nem especialidade. Os dois estavam num parágrafo acima, fora do H1. | Corrigido |
| Dados estruturados | `LegalService`, um tipo de estabelecimento físico, sem endereço, com o advogado como `employee` | Refeito |
| URLs duplicadas | `/index.html` e `/politica-de-privacidade` (sem `.html`) respondiam 200 | Corrigido (301) |
| Outros nomes de domínio | O container serviria o site para qualquer nome que chegasse até ele | Corrigido (301) |
| Canonical | Sem a barra final, diferente do sitemap e do `og:url` | Corrigido |
| Twitter/X | Faltava `twitter:image:alt` | Corrigido |
| Ambiente antigo (Vercel) | `landing-page-renan.vercel.app` já responde 404 | Sem conteúdo duplicado |
| `meta keywords` | Não existe | Correto, não usada |

## 2. Melhorias implementadas

### Metadados

| Tag | Antes | Depois |
| --- | --- | --- |
| `title` | Dr. Renan Moraes \| Advogado Criminalista · OAB/MT 37.334 · Cuiabá e Várzea Grande (85) | **Dr. Renan Moraes \| Advogado Criminalista em Cuiabá – MT** (55) |
| `description` | 191 caracteres | **Advogado criminalista com atuação em Cuiabá e Várzea Grande. Defesa criminal, acompanhamento em delegacias, processos penais e execução penal. OAB/MT 37.334.** (157) |
| `robots` | `index, follow` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` |
| `canonical` e `og:url` | sem barra final | `https://renan.advogado.xn--vrion-sra.tech/` |
| Open Graph | sem tipo da imagem | `og:image:type` adicionado; imagem institucional 1200×630 existente |
| Twitter/X | sem texto alternativo da imagem | `twitter:image:alt` adicionado |

O título mantém o "Dr." pedido pelo cliente e coloca o termo principal ("Advogado Criminalista em Cuiabá") dentro do limite de exibição. A descrição foi conferida com o conteúdo: delegacias, processos e execução penal aparecem na seção de atuação, e o registro na OAB aparece na abertura. `max-image-preview:large` permite a prévia grande da imagem nos resultados e no Discover. A mesma imagem e o mesmo título aparecem ao compartilhar o link no WhatsApp, no Instagram e no LinkedIn.

### H1 da abertura

O H1 passou a reunir a linha que já ficava acima do título e o próprio título:

> **Dr. Renan Moraes · Advogado criminalista** · Sua defesa começa antes mesmo do processo.

Nenhuma palavra visível mudou. Só a marcação mudou: o parágrafo virou parte do H1, e o CSS repõe a fonte e a altura de linha que o H1 trocaria. A comparação pixel a pixel deu **zero pixels de diferença** (ver a seção 6). A hierarquia segue com um H1, um H2 por seção (incluindo "Dr. Renan Moraes" no Sobre) e H3 nos itens.

### Dados estruturados (JSON-LD)

Um grafo com quatro entidades ligadas por `@id`, gerado de `src/data/` (sem textos duplicados no código):

| Entidade | Conteúdo |
| --- | --- |
| `WebPage` (`#pagina`) | título, descrição, idioma, imagem principal, `about` → pessoa, `mainEntity` → serviço |
| `WebSite` (`#site`) | nome "Renan Moraes Advogado", nome alternativo "Dr. Renan Moraes", publicado pela pessoa |
| `Person` (`#pessoa`) | nome, "Dr.", cargo "Advogado Criminalista", bio, retrato, telefone, e-mail, Instagram (`sameAs`), formação (UNIVAG), credenciais (OAB/MT 37.334 reconhecida pela OAB/MT; pós-graduação em Direito Penal e Processual Penal), áreas de conhecimento (as mesmas da página) e ponto de contato com a área atendida |
| `Service` (`#advocacia-criminal`) | advocacia criminal, prestada pela pessoa, com área atendida (Cuiabá, Várzea Grande, Mato Grosso e Brasil), canal WhatsApp e catálogo com as cinco etapas da seção de atuação |

Escolhas deliberadas:

- **Sem `LegalService` nem `LocalBusiness`.** São tipos de estabelecimento, e o Google exige endereço físico para eles. O profissional não tem escritório, então a região aparece em `areaServed`, sem endereço, coordenadas ou horário inventados.
- **Sem `ProfilePage`.** No Google, esse tipo se destina a perfis de autores em fóruns e redes sociais. Esta é uma página de serviços profissionais, então `WebPage` descreve melhor.
- **Sem `FAQPage`.** Desde 2023 o Google só exibe esse resultado enriquecido para sites governamentais e de saúde, e um segundo tipo de página na mesma URL deixaria o grafo ambíguo. As perguntas continuam no HTML, legíveis para os buscadores.
- **Cidades com `sameAs` da Wikipédia,** para desambiguar Cuiabá e Várzea Grande (MT) de outras cidades com o mesmo nome.
- **Validade não é elegibilidade.** O grafo é válido no vocabulário do Schema.org, mas `Person` e `Service` não geram resultado enriquecido no Google. Eles ajudam o buscador a entender quem é o profissional e o que ele faz. O `WebSite` é usado pelo Google para o nome do site nos resultados.

### Rastreamento e respostas HTTP

| Pedido | Resposta |
| --- | --- |
| `/` e `/politica-de-privacidade.html` | 200 |
| `/index.html` | 301 → `/` |
| `/politica-de-privacidade` (sem `.html`) | 301 → `/politica-de-privacidade.html` (mantém a query string) |
| Qualquer outro nome de domínio (www, domínio antigo) | 301 → mesmo caminho no endereço oficial |
| Página inexistente | 404 (mostra a página inicial, com status 404) |
| `/healthz` | 200 em qualquer nome (verificação de saúde do container) |
| `/robots.txt` e `/sitemap.xml` | 200, apontando para o endereço oficial |

O redirecionamento de outros nomes é gerado no build da imagem a partir de `SITE_URL` (`deploy/canonical-host.mjs`). Ele também é o mecanismo da futura migração de domínio (seção 9).

### Desempenho

Nada foi alterado, porque as medições não justificaram mudança. O site já tem conteúdo pré-renderizado, retrato da abertura com `preload` e `fetchpriority="high"`, fontes próprias com `preload`, vídeo só no computador (`preload="none"`), imagens abaixo da dobra com `loading="lazy"`, CSS e JS com hash e cache de 1 ano, gzip e CLS 0.

O elemento LCP no celular é o retrato da abertura. Ele chega em cerca de 100 ms, e o restante é atraso de renderização ligado à entrada animada aprovada no design. Mudar isso exigiria alterar a animação, o que o escopo não permite.

## 3. Arquivos modificados

| Arquivo | Mudança |
| --- | --- |
| `src/data/siteConfig.js` | Title e meta description |
| `src/utils/seo.js` | Canonical com barra, `og:image:type`, `twitter:image:alt` e o novo grafo JSON-LD |
| `index.html` | Diretivas de `meta robots` |
| `src/components/Hero.js` | Linha do nome dentro do H1 (mesmo texto e mesmas classes) |
| `src/styles/global.css` | `.hero-heading` e fonte e altura de linha explícitas em `.hero-eyebrow` (visual idêntico) |
| `deploy/canonical-host.mjs` (novo) | Gera o redirecionamento 301 para o endereço oficial |
| `deploy/nginx/default.conf` | 301 de `/index.html`, de URL sem `.html` e de outros nomes de domínio |
| `Dockerfile` | Gera e copia o trecho de redirecionamento no build |
| `SEO.md` (novo), `README.md`, `docs/arquitetura.md` | Documentação |

## 4. Estratégia de palavras-chave

Os termos foram aplicados onde já são verdadeiros para o conteúdo, sem mudar textos visíveis e sem repetição artificial. Não há `meta keywords`.

| Termo | Onde aparece |
| --- | --- |
| Advogado criminalista em Cuiabá | title, description, H1 ("Advogado criminalista"), abertura ("Cuiabá e Várzea Grande"), JSON-LD (`jobTitle`, `areaServed`) |
| Advogado criminalista em Várzea Grande | description, abertura, Sobre, rodapé, JSON-LD (`areaServed`) |
| Advogado criminalista em Mato Grosso | title ("– MT"), rodapé ("Mato Grosso"), JSON-LD (`State` Mato Grosso) |
| Renan Moraes advogado / advogado criminalista | title, H1, H2 do Sobre, `og:site_name`, JSON-LD (`Person`, `WebSite`) |
| Defesa criminal / assistência jurídica criminal | description, abertura, rodapé, JSON-LD (`serviceType`) |
| Acompanhamento em delegacia | description, etapa "Delegacias e diligências" |
| Direito Penal / Processo Penal | formação no Sobre, JSON-LD (`knowsAbout`, credencial) |
| Execução penal | description, etapa "Execução penal", seção de familiares |

## 5. SEO local sem estabelecimento físico

- **Sem endereço.** A região de atuação está nos metadados, no JSON-LD (`areaServed` com Cuiabá, Várzea Grande, Mato Grosso e Brasil) e no texto visível que já existia.
- **Perfil da Empresa no Google: criado em 28/11/2026** como "Renan Moraes Advogado", categoria "Advogado criminal", área de atendimento em Cuiabá e Várzea Grande, sem endereço, com site, telefone, descrição e Instagram. Endereço permanente: <https://www.google.com/maps?cid=13907588790021713486>, ligado ao site pelo `sameAs` da pessoa nos dados estruturados (`googleBusinessProfileUrl` em `src/data/lawyer.js`). Pendências: preencher o horário de funcionamento. Avaliações só de clientes reais e espontâneas: o Google remove as de quem trabalha para o negócio, inclusive quem faz o site ou o perfil.
- **Critérios de elegibilidade, para referência.** A elegibilidade depende da modalidade de atendimento. O Google exige contato presencial com clientes. Um negócio sem loja pode se cadastrar como "empresa de área de cobertura", com o endereço oculto, desde que atenda presencialmente na região (o site menciona atendimento presencial e visitas a unidades prisionais, conforme o caso). Atendimento só online não é elegível. A verificação é feita pelo Google e exige um endereço real, que não aparece no perfil. Se for elegível, o perfil deve ter as áreas Cuiabá e Várzea Grande, a categoria de advogado criminalista e o link deste site.
- **Consistência de citações.** Use sempre o mesmo nome ("Dr. Renan Moraes, Advogado Criminalista"), o mesmo telefone e o link do site no Instagram, no WhatsApp Business e em perfis profissionais.

## 6. Validações realizadas

Feitas na imagem Docker de produção rodando localmente, com comparação contra a versão anterior. Data: 27/11/2026.

| Validação | Resultado |
| --- | --- |
| Build de produção | Sem erros |
| Comparação visual pixel a pixel (1366, 768 e 390 px, página inteira) | **0 pixels diferentes** nas três larguras |
| Responsividade (verificador em 320, 390, 768, 1024, 1366 e 1920 px, duas páginas) | 12 telas, 0 alertas |
| Console do navegador | Sem erros nem avisos |
| Funcionalidades | Animações da abertura, FAQ (uma aberta por vez), âncoras do menu (80 px abaixo do topo) e menu do celular: iguais à versão anterior |
| Imagens sem `alt` | 0 |
| JSON-LD no vocabulário oficial do Schema.org (tipos, propriedades, domínio e faixa de valores) | 0 erros, 0 avisos. A versão anterior tinha 1 aviso (`alumniOf` como texto). |
| Respostas HTTP, robots e sitemap | Conforme a tabela da seção 2 |
| HTML entregue pelo servidor | title com 55 caracteres, description com 157, canonical, Open Graph, Twitter, robots e `lang` presentes |

**Lighthouse 13.6.0** (laboratório: Edge sem interface, rede e processador simulados; não são dados de visitantes reais):

| Execução | Desempenho | Acessibilidade | Boas práticas | SEO | LCP | CLS |
| --- | --- | --- | --- | --- | --- | --- |
| Antes, celular (local) | 90 | 100 | 100 | 100 | 2,79 s | 0 |
| Depois, celular (local) | 92 | 100 | 100 | 100 | 2,80 s | 0 |
| Antes, computador (local) | 100 | 100 | 100 | 100 | 0,56 s | 0 |
| Depois, computador (local) | 100 | 100 | 100 | 100 | 0,60 s | 0 |
| Produção atual, celular (servidor real) | 98 | 100 | 100 | 100 | 2,17 s | 0 |

As diferenças de desempenho entre antes e depois estão dentro da variação normal entre execuções nesta máquina. As mudanças de SEO não alteraram o carregamento. O LCP no celular fica perto do limite de "bom" (2,5 s) na simulação de 4G lento. Os dados reais aparecem no relatório de Core Web Vitals do Search Console quando houver visitas suficientes.

**Não validado aqui:** o Teste de resultados avançados do Google e o validador do Schema.org são ferramentas web que leem a página publicada, então só funcionam com esta versão no ar. Depois do deploy, cole a URL em <https://search.google.com/test/rich-results> e em <https://validator.schema.org/>.

## 7. Configurações externas pendentes

Dependem de acesso a contas e não podem ser feitas pelo código:

1. **Deploy** desta versão no Dokploy (push na `main` com Autodeploy, ou Deploy manual).
2. **Google Search Console:** concluído em 28/11/2026. Propriedade verificada por arquivo HTML, sitemap processado (2 páginas) e indexação solicitada (seção 8). Acompanhe se a página entra no índice.
3. **Bing Webmaster Tools** (opcional): importar a propriedade do Search Console em <https://www.bing.com/webmasters>.
4. **Perfil da Empresa no Google:** criado (seção 5). Falta o horário de funcionamento.
5. **Domínio próprio `.adv.br`:** decisão do cliente (seção 9).

## 8. Google Search Console

### Verificação em uso

A propriedade foi criada como **Prefixo do URL** (`https://renan.advogado.værion.tech/`) e verificada por **arquivo HTML**: `public/google942b024c1ca438a7.html`, publicado em `https://renan.advogado.xn--vrion-sra.tech/google942b024c1ca438a7.html`. **Não remova nem altere esse arquivo:** o Google confere periodicamente, e a propriedade perde a verificação se ele sumir. Na migração para `.adv.br`, a nova propriedade terá outro arquivo ou outro registro.

A verificação pelo DNS (abaixo) é a alternativa, para uma propriedade do tipo **Domínio**.

### Cadastrar e verificar (registro DNS TXT)

1. Acesse <https://search.google.com/search-console> com a conta Google que vai acompanhar o site. Pode ser a do cliente, com você como usuário.
2. Em **Adicionar propriedade**, escolha **Domínio** e digite `renan.advogado.xn--vrion-sra.tech`. Use a forma punycode. Uma propriedade de domínio no subdomínio cobre `http`, `https` e todos os caminhos, sem incluir os outros sites de `værion.tech`.
3. O Google mostra um valor no formato `google-site-verification=...`. Copie exatamente o que aparecer na tela. O valor é único por conta e não está neste documento.
4. Na Hostinger, em **DNS** de `værion.tech`, adicione um registro:
   - Tipo: `TXT`
   - Nome: `renan.advogado`
   - Valor: o texto copiado do Search Console
   - TTL: o padrão
   O registro TXT convive com o registro `A` de mesmo nome.
5. Volte ao Search Console e clique em **Verificar**. Se falhar, aguarde a propagação, que costuma levar minutos e pode chegar a algumas horas, e tente de novo. Mantenha o registro TXT depois da verificação.

### Enviar o sitemap

Em **Indexação → Sitemaps**, informe `https://renan.advogado.xn--vrion-sra.tech/sitemap.xml` e clique em **Enviar**. O status deve ficar "Concluído", com 2 URLs encontradas.

### Solicitar a indexação

Em **Inspeção de URL** (barra superior), cole `https://renan.advogado.xn--vrion-sra.tech/`. Clique em **Testar URL publicada** para confirmar que o Google vê a página, e depois em **Solicitar indexação**. Repita para a política de privacidade, se quiser. Depois de grandes mudanças no conteúdo, solicite de novo.

### Verificar problemas de rastreamento

- **Indexação → Páginas:** mostra o que está indexado e os motivos de não indexação (redirecionamento, 404, canônica alternativa). Os 301 de `/index.html` e de outros domínios devem aparecer como "Página com redirecionamento", o que é esperado.
- **Experiência → Core Web Vitals:** LCP, INP e CLS de visitantes reais. Aparece quando há tráfego suficiente.
- **Experiência → HTTPS:** confirma que as páginas são servidas com HTTPS.
- **Configurações → Estatísticas de rastreamento:** frequência e respostas do servidor ao Googlebot.
- **Melhorias:** avisos de dados estruturados que o Google reconhecer.

### Acompanhar desempenho

Em **Desempenho → Resultados da pesquisa**, ative **Total de cliques**, **Total de impressões**, **CTR média** e **Posição média**. Na aba **Consultas**, veja os termos que trouxeram impressões. Filtre por consulta (ex.: contém "criminalista") e por **País = Brasil**, e compare períodos de 28 dias. Os primeiros dados aparecem alguns dias depois da verificação.

## 9. Migração para um domínio próprio (.adv.br)

A URL base é centralizada: `SITE_URL` (Dokploy) alimenta canonical, Open Graph, JSON-LD, `sitemap.xml`, `robots.txt` e o redirecionamento 301 do nginx. Não há URL fixa no código. Passo a passo:

1. Registre o domínio no Registro.br. O `.adv.br` exige inscrição ativa na OAB.
2. No DNS do novo domínio, crie um registro `A` para o IP da VPS. Se quiser o `www`, crie outro para ele também.
3. No Dokploy, na aba **Domains**, **adicione** o novo domínio com HTTPS e Let's Encrypt, **sem remover** o antigo `renan.advogado.xn--vrion-sra.tech`.
4. Só com o novo domínio já abrindo com HTTPS, troque `SITE_URL` para o novo endereço e faça o deploy. A partir daí, todo acesso ao domínio antigo recebe 301 para o mesmo caminho no novo, e canonical, sitemap, Open Graph e JSON-LD passam a usar o novo domínio.
5. No Search Console, crie e verifique a propriedade do novo domínio (seção 8) e envie o novo sitemap. Na propriedade antiga, use **Configurações → Mudança de endereço**, se a ferramenta estiver disponível para ela. Os 301 já transferem os sinais mesmo sem ela.
6. Mantenha o domínio antigo cadastrado no Dokploy, redirecionando, por **pelo menos 12 meses**.
7. Atualize o link na bio do Instagram, no WhatsApp Business e em perfis externos.

## 10. Acompanhamento recomendado

- **Primeiras 4 semanas:** veja em **Indexação → Páginas** se a página inicial foi indexada, e use a Inspeção de URL se não foi.
- **Mensalmente:** acompanhe impressões, cliques, CTR e posição média por consulta. Se o CTR estiver baixo para consultas com muitas impressões, revise title e description sem prometer resultado.
- **Core Web Vitals:** se o LCP real no celular passar de 2,5 s, as opções são uma versão de 640 px do retrato da abertura e rever o `preload` da fonte itálica. Isso exige validar o efeito visual com o cliente antes.
- **Conteúdo:** artigos informativos sobre temas que o público pesquisa (prisão em flagrante, audiência de custódia, progressão de regime) são o principal caminho para crescer em buscas. São permitidos pelo Provimento 205/2021 da OAB desde que tenham caráter informativo, sem promessa de resultado e sem captação indevida.
- **Não fazer:** comprar avaliações, criar endereço fictício, repetir palavras-chave em texto escondido ou publicar promessas de resultado. Isso viola as diretrizes do Google e as normas da OAB.

Nenhuma posição nos resultados de pesquisa é garantida. O trabalho técnico deixa a página pronta para ser rastreada, entendida e indexada corretamente.
