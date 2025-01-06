import { isRGB, RGB2RGBA } from "./schemas/rgb";
import { isHSL, HSL2RGBA } from "./schemas/hsl";
import { isHEX, HEX2RGBA } from "./schemas/hex";
import { isCMYK, CMYK2RGBA } from "./schemas/cmyk";

export class Color {
    private rgba: { r: number, g: number, b: number, a: number } | null = null;

    constructor(color: string) {
        if (isRGB(color)) {
            this.rgba = RGB2RGBA(color);
        } else if (isHSL(color)) {
            this.rgba = HSL2RGBA(color);
        } else if (isHEX(color)) {
            this.rgba = HEX2RGBA(color);
        } else if (isCMYK(color)) {
            this.rgba = CMYK2RGBA(color);
        } else {
            throw new Error("Invalid color format");
        }
    }

    getRGBA(): { r: number, g: number, b: number, a: number } | null {
        return this.rgba;
    }
}