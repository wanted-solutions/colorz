import { describe, it, expect } from "vitest";
import { isHSL, HSL2RGBA } from "./hsl";

describe("HSL Validation", () => {
    it("should validate correct HSL strings", () => {
        expect(isHSL("hsl(120, 100%, 50%)")).toBe(true);
        expect(isHSL("hsla(120, 100%, 50%, 0.5)")).toBe(true);
        expect(isHSL("hsl( 120 , 100% , 50% )")).toBe(true);
        expect(isHSL("hsla( 120 , 100% , 50% , 0.5 )")).toBe(true);
    });

    it("should invalidate incorrect HSL strings", () => {
        expect(isHSL("hsl(120, 100, 50%)")).toBe(false);
        expect(isHSL("hsla(120%, 100%, 50%)")).toBe(false);
        expect(isHSL("hsl(120, 100%, 50%, 0.5)")).toBe(false);
        expect(isHSL("hsla(120, 100%, 50%)")).toBe(false);
        expect(isHSL("hsl(120, 100%, 50%, 0.5, 1)")).toBe(false);
    });
});

describe("HSL to RGBA Conversion", () => {
    it("should convert HSL to RGBA correctly", () => {
        expect(HSL2RGBA("hsl(0, 100%, 50%)")).toEqual({ r: 255, g: 0, b: 0, a: 1 });
        expect(HSL2RGBA("hsla(120, 100%, 50%, 0.5)")).toEqual({ r: 0, g: 255, b: 0, a: 0.5 });
        expect(HSL2RGBA("hsl( 0 , 100% , 50% )")).toEqual({ r: 255, g: 0, b: 0, a: 1 });
        expect(HSL2RGBA("hsla( 120 , 100% , 50% , 0.5 )")).toEqual({ r: 0, g: 255, b: 0, a: 0.5 });
        expect(HSL2RGBA("hsl(240, 100%, 50%)")).toEqual({ r: 0, g: 0, b: 255, a: 1 });
        expect(HSL2RGBA("hsla(240, 100%, 50%, 0.5)")).toEqual({ r: 0, g: 0, b: 255, a: 0.5 });
        expect(HSL2RGBA("hsl(60, 100%, 50%)")).toEqual({ r: 255, g: 255, b: 0, a: 1 });
        expect(HSL2RGBA("hsla(60, 100%, 50%, 0.5)")).toEqual({ r: 255, g: 255, b: 0, a: 0.5 });
    });

    it("should return null for invalid HSL strings", () => {
        expect(HSL2RGBA("hsl(120, 100, 50%)")).toBeNull();
        expect(HSL2RGBA("hsla(120%, 100%, 50%)")).toBeNull();
        expect(HSL2RGBA("hsl(120, 100%, 50%, 0.5)")).toBeNull();
        expect(HSL2RGBA("hsla(120, 100%, 50%)")).toBeNull();
        expect(HSL2RGBA("hsl(120, 100%, 50%, 0.5, 1)")).toBeNull();
    });

    it("should handle HSLA without the last parameter correctly", () => {
        expect(HSL2RGBA("hsla(120, 100%, 50%)")).toBeNull();
    });
});
