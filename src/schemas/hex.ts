import { isRGBA } from "./rgba";
// Regex for parsing hexadecimal color strings
const hexRegex = /^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{4}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})$/;

// Validation function for hexadecimal color strings
export function isHEX(hex: string): boolean {
    return hexRegex.test(hex);
}

// Conversion function from hexadecimal to RGBA
export function HEX2RGBA(hex: string): { r: number, g: number, b: number, a: number } {
    if (!isHEX(hex)) {
         throw new Error("Invalid color value");
    }

    hex = hex.replace("#", "");

    if (hex.length === 3 || hex.length === 4) {
        hex = hex.split("").map(char => char + char).join("");
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    let a  = hex.length === 8 ? parseInt(hex.substring(6, 8), 16) : 255;
    a = a/255;
    return { r, g, b, a };
}

// Conversion function from RGBA to hexadecimal
export function RGBA2HEX(r: number, g: number, b: number, a: number = 1): string {
    if (!isRGBA(r, g, b, a)) {
        throw new Error("Invalid color value");
    }

    const toHex = (value: number) => value.toString(16).padStart(2, "0");
    const alphaHex = a < 1 ? Math.round(a * 255).toString(16).padStart(2, "0") : "";
    return `#${toHex(r)}${toHex(g)}${toHex(b)}${alphaHex}`;
}
