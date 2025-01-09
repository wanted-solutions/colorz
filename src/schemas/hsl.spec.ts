import { describe, it, expect } from "vitest";
import { isHSL, HSL2RGBA, RGBA2HSL } from "./hsl";

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
        expect(() => HSL2RGBA("hsl(120, 100, 50%)")).toThrow();
        expect(() => HSL2RGBA("hsla(120%, 100%, 50%)")).toThrow();
        expect(() => HSL2RGBA("hsl(120, 100%, 50%, 0.5)")).toThrow();
        expect(() => HSL2RGBA("hsla(120, 100%, 50%)")).toThrow();
        expect(() => HSL2RGBA("hsl(120, 100%, 50%, 0.5, 1)")).toThrow();
    });

    it("should handle HSLA without the last parameter correctly", () => {
        expect(() => HSL2RGBA("hsla(120, 100%, 50%)")).toThrow();
    });
});

describe("RGBA to HSL Conversion", () => {
    it("should convert RGBA to HSL correctly", () => {
        expect(RGBA2HSL(255, 0, 0)).toEqual("hsl(0, 100%, 50%)");
        expect(RGBA2HSL(0, 255, 0, 0.5)).toEqual("hsla(120, 100%, 50%, 0.5)");
        expect(RGBA2HSL(255, 0, 0, 1)).toEqual("hsl(0, 100%, 50%)");
        expect(RGBA2HSL(0, 255, 0, 0.5)).toEqual("hsla(120, 100%, 50%, 0.5)");
        expect(RGBA2HSL(0, 0, 255)).toEqual("hsl(240, 100%, 50%)");
        expect(RGBA2HSL(0, 0, 255, 0.5)).toEqual("hsla(240, 100%, 50%, 0.5)");
        expect(RGBA2HSL(255, 255, 0)).toEqual("hsl(60, 100%, 50%)");
        expect(RGBA2HSL(255, 255, 0, 0.5)).toEqual("hsla(60, 100%, 50%, 0.5)");
    });

    it("should handle the edge cases correctly", () => {
        expect(RGBA2HSL(0, 0, 0, 0)).toEqual("hsla(0, 0%, 0%, 0)");
        expect(RGBA2HSL(255, 255, 255, 1)).toEqual("hsl(0, 100%, 100%)");
        expect(RGBA2HSL(255, 255, 255, 0.5)).toEqual("hsla(0, 100%, 100%, 0.5)");

    });

        it("should handle cases where two RGB components are the same", () => {
        expect(RGBA2HSL(128, 128, 255)).toEqual("hsl(240, 100%, 75%)");
        expect(RGBA2HSL(255, 128, 128)).toEqual("hsl(0, 100%, 75%)");
        expect(RGBA2HSL(128, 255, 128, 0.8)).toEqual("hsla(120, 100%, 75%, 0.8)");
        expect(RGBA2HSL(128, 128, 64)).toEqual("hsl(60, 33%, 38%)");
    });

        it("should handle cases where one RGB component is higher or lower", () => {
        expect(RGBA2HSL(200, 50, 50)).toEqual("hsl(0, 60%, 49%)");
        expect(RGBA2HSL(50, 200, 50, 0.7)).toEqual("hsla(120, 60%, 49%, 0.7)");
        expect(RGBA2HSL(50, 50, 200)).toEqual("hsl(240, 60%, 49%)");
        expect(RGBA2HSL(200, 200, 50)).toEqual("hsl(60, 60%, 49%)");
    });

        it("should handle grayscale values", () => {
        expect(RGBA2HSL(128, 128, 128)).toEqual("hsl(0, 0%, 50%)");
        expect(RGBA2HSL(192, 192, 192, 0.6)).toEqual("hsla(0, 0%, 75%, 0.6)");
        expect(RGBA2HSL(64, 64, 64)).toEqual("hsl(0, 0%, 25%)");
    });
    
    it("should handle invalid input values gracefully", () => {
            expect(() => RGBA2HSL(-1, 0, 0)).toThrow();
            expect(() => RGBA2HSL(0, -1, 0)).toThrow();
            expect(() => RGBA2HSL(0, 0, -1)).toThrow();
            expect(() => RGBA2HSL(256, 0, 0)).toThrow();
            expect(() => RGBA2HSL(0, 256, 0)).toThrow();
            expect(() => RGBA2HSL(0, 0, 256)).toThrow();
            expect(() => RGBA2HSL(0, 0, 0, -0.1)).toThrow();
            expect(() => RGBA2HSL(0, 0, 0, 1.1)).toThrow();
        });

});

describe("Complex Conversion Tests", () => {
    it("should convert from HSL to RGBA and back correctly.", () => {
        const hslaColors = [
            "hsl(0, 100%, 50%)",
            "hsla(120, 100%, 50%, 0.5)",
            "hsla( 120 , 100% , 50% , 0.5 )",
            "hsl(240, 100%, 50%)",
            "hsla(240, 100%, 50%, 0.5)",
            "hsl(60, 100%, 50%)",
            "hsla(60, 100%, 50%, 0.5)"
        ];
        hslaColors.forEach(hsla => {
            const rgba = HSL2RGBA(hsla);
            expect(RGBA2HSL(rgba.r, rgba.g, rgba.b, rgba.a)).toBe(hsla.replace(/\s*,/g, ',').replace(/\(\s*/g, '(').replace(/\s*\)/g, ')'));
        })
    
    });
});