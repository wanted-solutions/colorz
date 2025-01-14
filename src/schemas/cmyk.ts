// Regex for parsing CMYK color strings
const cmykRegex = /^cmyk\(\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;
const rgbRegex = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(0|1|0?\.\d+)\s*)?\)$/;
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

export function RGBA2CMYK(r: number, g: number, b: number, a: number = 1): string {
    const validate = (value: number, max: number) => {
        if (value < 0 || value > max) {
            throw new Error("Invalid color value");
        }
    };

    let k: number;

    validate(r, 255);
    validate(g, 255);
    validate(b, 255);
    validate(a, 1);

    r = r / 255;
    g = g / 255;
    b = b / 255; 

    if (r >= g && r >= b) {
        k = 1 - r } 
    else if (g >= r && g >= b) {
        k = 1 - g }
    else {k = 1 - b}
    

    let c;
    let m;
    let y;

    if (k === 1) { 
        c = 0;  
        m = 0;  
        y = 0;
    } else { 
        c = (1 - r - k) / (1 - k);
        m = (1 - g - k) / (1 - k);
        y = (1 - b - k) / (1 - k);
    }
    
     c = Math.round(c * 100);
     m = Math.round(m * 100);
     y = Math.round(y * 100);
     k = Math.round(k * 100);

     return `cmyk(${c}%, ${m}%, ${y}%, ${k}%)`;
}

