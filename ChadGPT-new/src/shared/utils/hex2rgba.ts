export function hex2rgba(hex: string, alpha = 1) {
  hex = hex.replace(/^#/, "");

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  let a = alpha;
  if (hex.length === 8) {
    a = parseInt(hex.slice(6, 8), 16) / 255;
  }

  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
