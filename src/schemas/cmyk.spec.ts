import { describe, it, expect } from "vitest";
import { isCMYK, CMYK2RGBA, RGBA2CMYK } from "./cmyk";

describe("CMYK Validation", () => {
    it("should validate correct CMYK strings", () => {
        expect(isCMYK("cmyk(0%, 100%, 100%, 0%)")).toBe(true);
    });

    it("should invalidate incorrect CMYK strings", () => {
        expect(isCMYK("cmyk(0, 100%, 100%, 0%)")).toBe(false);
        expect(isCMYK("cmyk(0%, 100%, 100%, 0)")).toBe(false);
        expect(isCMYK("cmyk(0%, 100%, 100%, 0%, 0%)")).toBe(false);
    });
});

describe("CMYK to RGBA Conversion", () => {
    it("should convert CMYK to RGBA correctly", () => {
        expect(CMYK2RGBA("cmyk(0%, 100%, 100%, 0%)")).toEqual({ r: 255, g: 0, b: 0, a: 1 });
        expect(CMYK2RGBA("cmyk(100%, 0%, 100%, 0%)")).toEqual({ r: 0, g: 255, b: 0, a: 1 });
        expect(CMYK2RGBA("cmyk(100%, 100%, 0%, 0%)")).toEqual({ r: 0, g: 0, b: 255, a: 1 });
        expect(CMYK2RGBA("cmyk(0%, 0%, 100%, 0%)")).toEqual({ r: 255, g: 255, b: 0, a: 1 });
        expect(CMYK2RGBA("cmyk(0%, 100%, 0%, 0%)")).toEqual({ r: 255, g: 0, b: 255, a: 1 });
        expect(CMYK2RGBA("cmyk(100%, 0%, 0%, 0%)")).toEqual({ r: 0, g: 255, b: 255, a: 1 });
        expect(CMYK2RGBA("cmyk(0%, 0%, 0%, 100%)")).toEqual({ r: 0, g: 0, b: 0, a: 1 });
    });

    it("should return null for invalid CMYK strings", () => {
        expect(() => CMYK2RGBA("cmyk(0, 100%, 100%, 0%)")).toThrow()
        expect(() => CMYK2RGBA("cmyk(0%, 100%, 100%, 0)")).toThrow()
        expect(() => CMYK2RGBA("cmyk(0%, 100%, 100%, 0%, 0%)")).toThrow()
    });
});


describe("RGBA to CMYK Conversion", () => {
    it("should convert RGBA to CMYK correctly", () => {
        expect(RGBA2CMYK(255, 0, 0, 1 )).toEqual("cmyk(0%, 100%, 100%, 0%)");
        expect(RGBA2CMYK( 0, 255, 0, 1 )).toEqual("cmyk(100%, 0%, 100%, 0%)");
        expect(RGBA2CMYK( 0, 0, 255, 1 )).toEqual("cmyk(100%, 100%, 0%, 0%)");
        expect(RGBA2CMYK( 255, 255, 0, 1 )).toEqual("cmyk(0%, 0%, 100%, 0%)");
        expect(RGBA2CMYK( 255, 0, 255, 1 )).toEqual("cmyk(0%, 100%, 0%, 0%)");
        expect(RGBA2CMYK( 0, 255, 255, 1 )).toEqual("cmyk(100%, 0%, 0%, 0%)");
        expect(RGBA2CMYK( 0, 0, 0, 1 )).toEqual("cmyk(0%, 0%, 0%, 100%)");
    });

    it("should return null for invalid RGBA strings", () => {
        expect(() => RGBA2CMYK(256, 0, 0, 1)).toThrow()
        expect(() => RGBA2CMYK(0, 256, 0, 1)).toThrow()
        expect(() => RGBA2CMYK(0, 0, 256, 1)).toThrow()
        expect(() => RGBA2CMYK(-1, 0, 0, 1)).toThrow()
        expect(() => RGBA2CMYK(0, -1, 0, 1)).toThrow()
        expect(() => RGBA2CMYK(0, 0, -1, 1)).toThrow()
        expect(() => RGBA2CMYK(0, 255, 0, 1.1)).toThrow()
        expect(() => RGBA2CMYK(0, 0, 255, -1)).toThrow()
        
    });
});

describe("Complex Conversion Tests", () => {
    it("should convert from CMYK to RGBA and back to HEX correctly", () => {
        const hexColors = [
            "cmyk(0%, 100%, 100%, 0%)",
            "cmyk(100%, 0%, 100%, 0%)",
            "cmyk(100%, 100%, 0%, 0%)",
            "cmyk(0%, 0%, 100%, 0%)",
            "cmyk(0%, 100%, 0%, 0%)",
            "cmyk(100%, 0%, 0%, 0%)",
            "cmyk(0%, 0%, 0%, 100%)",
          
        ];

        hexColors.forEach(hex => {
            const rgba = CMYK2RGBA(hex);
            if (rgba) {
                const convertedCmyk = RGBA2CMYK(rgba.r, rgba.g, rgba.b, rgba.a);
                expect(convertedCmyk).toBe(hex.toLowerCase());
            }
        });
    });
});