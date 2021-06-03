const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
const rR = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
export function hexToRgb(hex: string) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });

  const result = rR.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
}
export default hexToRgb;
