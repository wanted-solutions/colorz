import { describe, it, expect } from "vitest";
import { isHEX, HEX2RGBA, RGBA2HEX } from "./hex";

describe("Hexadecimal Validation", () => {
    it("should validate correct hexadecimal strings", () => {
        expect(isHEX("#ff0000")).toBe(true);
        expect(isHEX("#f00")).toBe(true);
        expect(isHEX("ff0000")).toBe(true);
        expect(isHEX("f00")).toBe(true);
    });

    it("should invalidate incorrect hexadecimal strings", () => {
        expect(isHEX("#ff000")).toBe(false);
        expect(isHEX("ff000")).toBe(false);
        expect(isHEX("#ff00000")).toBe(false);
        expect(isHEX("ff00000")).toBe(false);
    });
});

describe("Hexadecimal to RGBA Conversion", () => {
    it("should convert hexadecimal to RGBA correctly", () => {
        expect(HEX2RGBA("#ff0000")).toEqual({ r: 255, g: 0, b: 0, a: 1 });
        expect(HEX2RGBA("#f00")).toEqual({ r: 255, g: 0, b: 0, a: 1 });
        expect(HEX2RGBA("ff0000")).toEqual({ r: 255, g: 0, b: 0, a: 1 });
        expect(HEX2RGBA("f00")).toEqual({ r: 255, g: 0, b: 0, a: 1 });
        expect(HEX2RGBA("#00ff00")).toEqual({ r: 0, g: 255, b: 0, a: 1 });
        expect(HEX2RGBA("#0f0")).toEqual({ r: 0, g: 255, b: 0, a: 1 });
        expect(HEX2RGBA("00ff00")).toEqual({ r: 0, g: 255, b: 0, a: 1 });
        expect(HEX2RGBA("0f0")).toEqual({ r: 0, g: 255, b: 0, a: 1 });
        expect(HEX2RGBA("#0000ff")).toEqual({ r: 0, g: 0, b: 255, a: 1 });
        expect(HEX2RGBA("#00f")).toEqual({ r: 0, g: 0, b: 255, a: 1 });
        expect(HEX2RGBA("0000ff")).toEqual({ r: 0, g: 0, b: 255, a: 1 });
        expect(HEX2RGBA("00f")).toEqual({ r: 0, g: 0, b: 255, a: 1 });
    });

    it("should return null for invalid hexadecimal strings", () => {
        expect(HEX2RGBA("#ff000")).toBeNull();
        expect(HEX2RGBA("ff000")).toBeNull();
        expect(HEX2RGBA("#ff00000")).toBeNull();
        expect(HEX2RGBA("ff00000")).toBeNull();
    });
});

describe("RGBA to Hexadecimal Conversion", () => {
    it("should convert RGBA to hexadecimal correctly", () => {
        expect(RGBA2HEX(255, 0, 0)).toBe("#ff0000");
        expect(RGBA2HEX(0, 255, 0)).toBe("#00ff00");
        expect(RGBA2HEX(0, 0, 255)).toBe("#0000ff");
        expect(RGBA2HEX(255, 255, 255)).toBe("#ffffff");
        expect(RGBA2HEX(0, 0, 0)).toBe("#000000");
        expect(RGBA2HEX(128, 128, 128)).toBe("#808080");
        expect(RGBA2HEX(255, 165, 0)).toBe("#ffa500");
    });

    it("should handle edge cases correctly", () => {
        expect(RGBA2HEX(0, 0, 0, 0)).toBe("#00000000");
        expect(RGBA2HEX(255, 255, 255, 0)).toBe("#ffffff00");
        expect(RGBA2HEX(255, 255, 255, 0.5)).toBe("#ffffff80");
    });

    it("should handle invalid input values gracefully", () => {
        expect(() => RGBA2HEX(-1, 0, 0)).toThrow();
        expect(() => RGBA2HEX(0, -1, 0)).toThrow();
        expect(() => RGBA2HEX(0, 0, -1)).toThrow();
        expect(() => RGBA2HEX(256, 0, 0)).toThrow();
        expect(() => RGBA2HEX(0, 256, 0)).toThrow();
        expect(() => RGBA2HEX(0, 0, 256)).toThrow();
        expect(() => RGBA2HEX(0, 0, 0, -0.1)).toThrow();
        expect(() => RGBA2HEX(0, 0, 0, 1.1)).toThrow();
    });
});

describe("Complex Conversion Tests", () => {
    it("should convert from HEX to RGBA and back to HEX correctly", () => {
        const hexColors = [
            "#ff0000",
            "#00ff00",
            "#0000ff",
            "#ffffff",
            "#000000",
            "#808080",
            "#ffa500",
            "#ff000080", // with alpha
            "#00ff0080", // with alpha
            "#0000ff80"  // with alpha
        ];

        hexColors.forEach(hex => {
            const rgba = HEX2RGBA(hex);
            const convertedHex = RGBA2HEX(rgba.r, rgba.g, rgba.b, rgba.a);
                expect(convertedHex).toBe(hex.toLowerCase());
        });
    });
});
