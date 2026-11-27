import lawyer from '../data/lawyer.js';

// Logo oficial aplicada a partir dos recortes do arquivo do cliente (sem redesenho).
// - "inline": monograma + assinatura lado a lado (header, página de privacidade)
// - "stacked": logo completa, como no original (rodapé)
const picture = ({ src, width, height }, className, loading = 'eager') => `
  <picture>
    <source srcset="${src}.webp" type="image/webp" />
    <img src="${src}.png" alt="" width="${width}" height="${height}" class="${className}" loading="${loading}" decoding="async" />
  </picture>
`;

export default function Brand({ variant = 'inline', href = '#', label = `${lawyer.name}, Advogado — Página inicial` } = {}) {
  if (variant === 'stacked') {
    return `
      <a href="${href}" class="brand brand-stacked" aria-label="${label}">
        ${picture(lawyer.brand.logo, 'brand-logo', 'lazy')}
      </a>
    `;
  }

  return `
    <a href="${href}" class="brand" aria-label="${label}">
      ${picture(lawyer.brand.monogram, 'brand-monogram')}
      <span class="brand-rule" aria-hidden="true"></span>
      ${picture(lawyer.brand.signature, 'brand-signature')}
    </a>
  `;
}
