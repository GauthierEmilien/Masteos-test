export const toTime = new Intl.NumberFormat("fr-FR", {
  minimumIntegerDigits: 2,
  maximumFractionDigits: 0,
}).format;