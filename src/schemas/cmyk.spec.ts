import { describe, it, expect } from "vitest";
import { isCMYK, CMYK2RGBA } from "./cmyk";

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
        expect(CMYK2RGBA("cmyk(0, 100%, 100%, 0%)")).toBeNull();
        expect(CMYK2RGBA("cmyk(0%, 100%, 100%, 0)")).toBeNull();
        expect(CMYK2RGBA("cmyk(0%, 100%, 100%, 0%, 0%)")).toBeNull();
    });
});
