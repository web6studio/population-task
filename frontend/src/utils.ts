export const transformPopulationData = (data?: Population) => {
  return data?.years.map((year, index) => {
    let transformed: { [key: string]: number | string } = { year };
    data.countries.forEach((country) => {
      transformed[country.code] = country.data[index] ?? 0;
    });
    return transformed;
  }) ?? [];
};

export const formatNumber = (value: number) => {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toString();
};

export const generateColorByCode = (code: string) => {
  let hash = 0;
  for (let i = 0; i < code.length; i++) {
    hash = code.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360; // Spread colors evenly around HSL color wheel
  return `hsl(${hue}, 70%, 50%)`; // High saturation and medium lightness for contrast
};
