// Canvas 2D non può leggere le custom property CSS: questi valori replicano
// i design token del sito (src/styles/figma.css, tema chiaro) per il disegno
// su <canvas>, dove serve una stringa colore risolta.
export const PALETTE = {
  bluePrimary: "oklch(70.7% 0.165 254.624)", // --color-blue-primary (blue-400)
  blueSecondary: "oklch(50% 0.134 242.749)", // --color-blue-secondary (sky-700)
  blueTertiary: "oklch(82.8% 0.111 230.318)", // --color-blue-tertiary (sky-300)
  red: "oklch(58.6% 0.253 17.585)", // --color-red (rose-600)
  green: "oklch(76.5% 0.177 163.223)", // --color-green (emerald-400)
  grey: "oklch(86.9% 0.022 252.894)", // --color-grey (slate-300)
  textPrimary: "oklch(12.9% 0.042 264.695)", // --color-text-primary (slate-950)
}
