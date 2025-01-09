import { isRGB, RGB2RGBA } from "./schemas/rgb";
import { isHSL, HSL2RGBA } from "./schemas/hsl";
import { isHEX, HEX2RGBA } from "./schemas/hex";
import { isCMYK, CMYK2RGBA } from "./schemas/cmyk";

export class Color {
    private rgba: { r: number, g: number, b: number, a: number } | null = null;
    private rgb: string | null = null;
    private hsl: string | null = null;
    private hex: string | null = null;
    private cmyk: string | null = null;

    constructor(color: string) {
        if (isRGB(color)) {
            this.rgb = color;
            this.rgba = RGB2RGBA(color);
        } else if (isHSL(color)) {
            this.hsl = color;
            this.rgba = HSL2RGBA(color);
        } else if (isHEX(color)) {
            this.hex = color;
            this.rgba = HEX2RGBA(color);
        } else if (isCMYK(color)) {
            this.cmyk = color;
            this.rgba = CMYK2RGBA(color);
        } else {
            throw new Error("Invalid color format");
        }
    }

    get RGBA(): { r: number, g: number, b: number, a: number } | null {
        return this.rgba;
    }
    get RGB(): string | null {
        return this.rgb;
    }
    get HSL(): string | null {
        return this.hsl;
    }
    get HEX(): string | null {
        return this.hex;
    }
    get CMYK(): string | null {
        return this.cmyk;
    }
}