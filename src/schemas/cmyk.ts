// Regex for parsing CMYK color strings
const cmykRegex = /^cmyk\(\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;

// Validation function for CMYK color strings
export function isCMYK(cmyk: string): boolean {
    return cmykRegex.test(cmyk);
}

// Conversion function from CMYK to RGBA
export function CMYK2RGBA(cmyk: string): { r: number, g: number, b: number, a: number } | null {
    if (!isCMYK(cmyk)) {
        return null;
    }

    const match = cmyk.match(cmykRegex);
    if (!match) {
        return null;
    }

    const [_, cStr, mStr, yStr, kStr] = match;
    const c = parseInt(cStr, 10) / 100;
    const m = parseInt(mStr, 10) / 100;
    const y = parseInt(yStr, 10) / 100;
    const k = parseInt(kStr, 10) / 100;

    const r = Math.round(255 * (1 - c) * (1 - k));
    const g = Math.round(255 * (1 - m) * (1 - k));
    const b = Math.round(255 * (1 - y) * (1 - k));

    return { r, g, b, a: 1 };
}
