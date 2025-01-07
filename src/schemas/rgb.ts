// Regex for parsing RGB and RGBA color strings
const rgbRegex = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(0|1|0?\.\d+)\s*)?\)$/;

// Validation function for RGB and RGBA color strings
export function isRGB(rgb: string): boolean {
    const match = rgb.match(rgbRegex);
    if (!match) {
        return false;
    }
    const [_, rStr, gStr, bStr, aStr] = match;
    const r = parseInt(rStr, 10);
    const g = parseInt(gStr, 10);
    const b = parseInt(bStr, 10);
    const a = aStr !== undefined ? parseFloat(aStr) : 1;

    if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255 || a < 0 || a > 1) {
        return false;
    }

    if (rgb.startsWith("rgba") && aStr === undefined) {
        return false;
    }
    if (rgb.startsWith("rgb(") && aStr !== undefined) {
        return false;
    }
    return true;
}

// Conversion function from RGB/RGBA to RGBA
export function RGB2RGBA(rgb: string): { r: number, g: number, b: number, a: number } | null {
    if (!isRGB(rgb)) {
        return null;
    }

    const match = rgb.match(rgbRegex);
    if (!match) {
        return null;
    }

    let [_, rStr, gStr, bStr, aStr] = match;
    let r = parseInt(rStr, 10);
    let g = parseInt(gStr, 10);
    let b = parseInt(bStr, 10);
    let a = aStr !== undefined ? parseFloat(aStr) : 1;

    return { r, g, b, a };
}
