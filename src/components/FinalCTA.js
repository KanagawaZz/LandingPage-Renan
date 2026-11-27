import lawyer from '../data/lawyer.js';
import Icon from './Icon.js';
import { createWhatsAppLink } from '../utils/whatsapp.js';

// Encerramento da página: chamada à esquerda, canais em linhas à direita (sem cards).
// Telefone e @ do Instagram nunca quebram; o e-mail só pode quebrar antes do "@".
export default function FinalCTA() {
  const channels = [
    {
      label: 'WhatsApp',
      value: `<span class="nowrap">${lawyer.whatsappDisplay}</span>`,
      caption: 'Contato direto',
      href: createWhatsAppLink(),
      external: true,
      aria: `WhatsApp ${lawyer.whatsappDisplay} (abre em nova aba)`,
    },
    {
      label: 'E-mail',
      value: lawyer.email.replace('@', '<wbr>@'),
      caption: 'Contato profissional',
      href: `mailto:${lawyer.email}`,
      external: false,
      aria: `Enviar e-mail para ${lawyer.email}`,
    },
    {
      label: 'Instagram',
      value: `<span class="nowrap">${lawyer.instagram}</span>`,
      caption: 'Perfil profissional',
      href: lawyer.instagramUrl,
      external: true,
      aria: `Instagram ${lawyer.instagram} (abre em nova aba)`,
    },
  ];

  const channelsHtml = channels
    .map(
      (c) => `
      <li>
        <a
          href="${c.href}"
          class="contact-channel"
          aria-label="${c.aria}"
          ${c.external ? 'target="_blank" rel="noopener noreferrer"' : ''}
        >
          <span class="contact-channel-label">${c.label}</span>
          <span class="contact-channel-value">${c.value}</span>
          <span class="contact-channel-caption">${c.caption}</span>
          ${Icon('arrow-up-right', 'contact-channel-arrow')}
        </a>
      </li>
    `
    )
    .join('');

  return `
    <section class="contact-section" id="contato" aria-labelledby="cta-title">
      <div class="container contact-layout">
        <div class="contact-intro reveal">
          <p class="eyebrow">Contato</p>
          <h2 id="cta-title" class="contact-title">Fale com o ${lawyer.shortName}</h2>
          <p class="contact-description">Conte o que aconteceu e combine a primeira conversa.</p>
          <p class="contact-note">${Icon('lock')} Sigilo profissional</p>
          <a
            href="${createWhatsAppLink()}"
            class="button button-primary button-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            ${Icon('whatsapp', 'btn-icon')}
            <span>Falar no WhatsApp</span>
            ${Icon('arrow-up-right', 'btn-arrow')}
          </a>
        </div>

        <ul class="contact-channels reveal" style="--stagger: 1">
          ${channelsHtml}
        </ul>
      </div>
    </section>
  `;
}
