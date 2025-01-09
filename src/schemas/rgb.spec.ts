import { describe, it, expect } from "vitest";
import { isRGB, RGB2RGBA } from "./rgb";

describe("RGB Validation", () => {
    it("should validate correct RGB strings", () => {
        expect(isRGB("rgb(255, 0, 0)")).toBe(true);
        expect(isRGB("rgba(255, 0, 0, 0.5)")).toBe(true);
        expect(isRGB("rgb( 255 , 0 , 0 )")).toBe(true);
        expect(isRGB("rgba( 255 , 0 , 0 , 0.5 )")).toBe(true);
    });

    it("should invalidate incorrect RGB strings", () => {
        expect(isRGB("rgb(255, 0, 0, 0.5)")).toBe(false);
        expect(isRGB("rgba(255, 0, 0)")).toBe(false);
        expect(isRGB("rgb(255, 0, 0, 0.5, 1)")).toBe(false);
        expect(isRGB("rgb(256, 0, 0)")).toBe(false);
        expect(isRGB("rgb(255, 256, 0)")).toBe(false);
        expect(isRGB("rgb(255, 0, 256)")).toBe(false);
        expect(isRGB("rgba(255, 0, 0, 1.1)")).toBe(false);
    });
});

describe("RGB to RGBA Conversion", () => {
    it("should convert RGB to RGBA correctly", () => {
        expect(RGB2RGBA("rgb(255, 0, 0)")).toEqual({ r: 255, g: 0, b: 0, a: 1 });
        expect(RGB2RGBA("rgba(255, 0, 0, 0.5)")).toEqual({ r: 255, g: 0, b: 0, a: 0.5 });
        expect(RGB2RGBA("rgb( 255 , 0 , 0 )")).toEqual({ r: 255, g: 0, b: 0, a: 1 });
        expect(RGB2RGBA("rgba( 255 , 0 , 0 , 0.5 )")).toEqual({ r: 255, g: 0, b: 0, a: 0.5 });
        expect(RGB2RGBA("rgb(0, 255, 0)")).toEqual({ r: 0, g: 255, b: 0, a: 1 });
        expect(RGB2RGBA("rgba(0, 255, 0, 0.5)")).toEqual({ r: 0, g: 255, b: 0, a: 0.5 });
        expect(RGB2RGBA("rgb(0, 0, 255)")).toEqual({ r: 0, g: 0, b: 255, a: 1 });
        expect(RGB2RGBA("rgba(0, 0, 255, 0.5)")).toEqual({ r: 0, g: 0, b: 255, a: 0.5 });
    });

    it("should return null for invalid RGB strings", () => {
        expect(() => RGB2RGBA("rgb(255, 0, 0, 0.5)")).toThrow();
        expect(() => RGB2RGBA("rgba(255, 0, 0)")).toThrow();
        expect(() => RGB2RGBA("rgb(255, 0, 0, 0.5, 1)")).toThrow();
        expect(() => RGB2RGBA("rgb(256, 0, 0)")).toThrow();
        expect(() => RGB2RGBA("rgb(255, 256, 0)")).toThrow();
        expect(() => RGB2RGBA("rgb(255, 0, 256)")).toThrow();
        expect(() => RGB2RGBA("rgba(255, 0, 0, 1.1)")).toThrow();
    });

    it("should handle RGBA without the last parameter correctly", () => {
        expect(() => RGB2RGBA("rgba(255, 0, 0)")).toThrow();
    });
});
