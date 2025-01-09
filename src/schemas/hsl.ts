import { isRGBA } from "./rgba";
// Regex for parsing HSL and HSLA strings with flexible spaces
const hslRegex = /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*(?:,\s*(0|1|0?\.\d+)\s*)?\)$/;

// Validation function for HSL and HSLA strings
export function isHSL(hsl: string): boolean {
    const match = hsl.match(hslRegex);
    if (!match) {
        return false;
    }
    const [_, hStr, sStr, lStr, aStr] = match;
    if (hsl.startsWith("hsla") && aStr === undefined) {
        return false;
    }
    if (hsl.startsWith("hsl(") && aStr !== undefined) {
        return false;
    }
    return true;
}

// Conversion function from HSL/HSLA to RGBA
export function HSL2RGBA(hsl: string): { r: number, g: number, b: number, a: number } | null {
    if (!isHSL(hsl)) {
        throw new Error("Invalid color value");
    }

    const match = hsl.match(hslRegex);
    if (!match) {
        throw new Error("Invalid color value");
    }

    let [_, hStr, sStr, lStr, aStr] = match;
    let h = parseInt(hStr, 10);
    let s = parseInt(sStr, 10) / 100;
    let l = parseInt(lStr, 10) / 100;
    let a = aStr !== undefined ? parseFloat(aStr) : 1;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;

    let r = 0, g = 0, b = 0;
    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return { r, g, b, a };
}

export function RGBA2HSL(r: number, g: number, b: number, a: number = 1): string {
    if (!isRGBA(r, g, b, a)) {
        throw new Error("Invalid color value");
    }

    let h = 0, s = 0 , l = 0;
    let rRelative = r/255, gRelative = g/255, bRelative = b/255;
    let maxRgba = Math.max(rRelative, gRelative, bRelative);
    let minRgba = Math.min(rRelative, gRelative, bRelative);
    let delta = maxRgba - minRgba;

    l = (maxRgba + minRgba) / 2;
    if (l === 0) {
        s = 0;
    }
    else if (l === 1) {
        s = 1;
    } else {
        s = delta / (1 - Math.abs(2*l - 1));
    }

    if (delta === 0) {
        h = 0;
    }
    else if (maxRgba === rRelative){
        h = 60 * ((gRelative - bRelative) / delta % 6) 
    } else if (maxRgba == gRelative) {
        h = 60 * ((bRelative - rRelative) / delta + 2)
    } else {
        h = 60 * ((rRelative - gRelative) / delta + 4)
    }
    if (h<0){
        h = 360 + h;
    }
    h = Math.round(h % 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    if (a < 1) {
        return `hsla(${h}, ${s}%, ${l}%, ${a})`;
    } else {
        return `hsl(${h}, ${s}%, ${l}%)`;
    }
}