export default function GoldDivider(id) {
  return `
    <div class="gold-divider" aria-hidden="true">
      <svg class="gold-divider-star" viewBox="0 0 48 48">
        <defs>
          <linearGradient id="goldStar-${id}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#e6cf9c" />
            <stop offset="50%" stop-color="#c5a15d" />
            <stop offset="100%" stop-color="#7a5f2c" />
          </linearGradient>
        </defs>
        <path d="M24 2 C25.6 16 32 22.4 46 24 C32 25.6 25.6 32 24 46 C22.4 32 16 25.6 2 24 C16 22.4 22.4 16 24 2 Z" fill="url(#goldStar-${id})" />
      </svg>
    </div>
  `;
}
