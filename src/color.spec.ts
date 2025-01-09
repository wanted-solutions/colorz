import { describe, it, expect } from "vitest";
import { Color } from "./color";

describe("Color", () => {
    it("should parse valid RGB color definitions", () => {
        const rgb = "rgb(255, 0, 0)"
        const color = new Color(rgb);
        expect(color.RGBA).toEqual({ r: 255, g: 0, b: 0, a: 1 });
        expect(color.RGB).toEqual(rgb);
        expect(color.CMYK).toBeNull;
        expect(color.HEX).toBeNull;
        expect(color.HSL).toBeNull;
    });

    it("should parse valid RGBA color definitions", () => {
        const color = new Color("rgba(255, 0, 0, 0.5)");
        expect(color.RGBA).toEqual({ r: 255, g: 0, b: 0, a: 0.5 });
        expect(color.CMYK).toBeNull;
        expect(color.HEX).toBeNull;
        expect(color.HSL).toBeNull;
        expect(color.RGB).toBeNull;
    });

    it("should parse valid HSL color definitions", () => {
        const hsl = "hsl(120, 100%, 50%)"
        const color = new Color(hsl);
        expect(color.RGBA).toEqual({ r: 0, g: 255, b: 0, a: 1 });
        expect(color.HSL).toEqual(hsl);
        expect(color.CMYK).toBeNull;
        expect(color.HEX).toBeNull;
        expect(color.RGB).toBeNull;
    });

    it("should parse valid HSLA color definitions", () => {
        const hsla = "hsla(120, 100%, 50%, 0.5)"
        const color = new Color(hsla);
        expect(color.RGBA).toEqual({ r: 0, g: 255, b: 0, a: 0.5 });
        expect(color.HSL).toEqual(hsla);
        expect(color.CMYK).toBeNull;
        expect(color.HEX).toBeNull;
        expect(color.RGB).toBeNull;
    });

    it("should parse valid HEX color definitions", () => {
        const hex = "#ff0000";
        const color = new Color(hex);
        expect(color.RGBA).toEqual({ r: 255, g: 0, b: 0, a: 1 });
        expect(color.HEX).toEqual(hex);
        expect(color.CMYK).toBeNull;
        expect(color.HSL).toBeNull;
        expect(color.RGB).toBeNull;
    });

    it("should parse valid short HEX color definitions", () => {
        const hex = "#f00";
        const color = new Color(hex);
        expect(color.RGBA).toEqual({ r: 255, g: 0, b: 0, a: 1 });
        expect(color.HEX).toEqual(hex);
        expect(color.CMYK).toBeNull;
        expect(color.HSL).toBeNull;
        expect(color.RGB).toBeNull;
    });

    it("should parse valid CMYK color definitions", () => {
        const cmyk = "cmyk(0%, 100%, 100%, 0%)";
        const color = new Color("cmyk(0%, 100%, 100%, 0%)");
        expect(color.RGBA).toEqual({ r: 255, g: 0, b: 0, a: 1 });
        expect(color.CMYK).toEqual(cmyk);
        expect(color.HEX).toBeNull;
        expect(color.HSL).toBeNull;
        expect(color.RGB).toBeNull;
    });

    it("should throw an error for invalid color definitions", () => {
        expect(() => new Color("invalid")).toThrow("Invalid color format");
    });

    it("should throw an error for invalid RGB color definitions", () => {
        expect(() => new Color("rgb(256, 0, 0)")).toThrow("Invalid color format");
        expect(() => new Color("rgb(255, 256, 0)")).toThrow("Invalid color format");
        expect(() => new Color("rgb(255, 0, 256)")).toThrow("Invalid color format");
        expect(() => new Color("rgba(255, 0, 0, 1.1)")).toThrow("Invalid color format");
    });

    it("should throw an error for invalid HSL color definitions", () => {
        expect(() => new Color("hsl(120, 100, 50%)")).toThrow("Invalid color format");
        expect(() => new Color("hsla(120%, 100%, 50%)")).toThrow("Invalid color format");
        expect(() => new Color("hsl(120, 100%, 50%, 0.5)")).toThrow("Invalid color format");
        expect(() => new Color("hsla(120, 100%, 50%)")).toThrow("Invalid color format");
        expect(() => new Color("hsl(120, 100%, 50%, 0.5, 1)")).toThrow("Invalid color format");
    });

    it("should throw an error for invalid HEX color definitions", () => {
        expect(() => new Color("#ff000")).toThrow("Invalid color format");
        expect(() => new Color("ff000")).toThrow("Invalid color format");
        expect(() => new Color("#ff00000")).toThrow("Invalid color format");
        expect(() => new Color("ff00000")).toThrow("Invalid color format");
    });

    it("should throw an error for invalid CMYK color definitions", () => {
        expect(() => new Color("cmyk(0, 100%, 100%, 0%)")).toThrow("Invalid color format");
        expect(() => new Color("cmyk(0%, 100%, 100%, 0)")).toThrow("Invalid color format");
        expect(() => new Color("cmyk(0%, 100%, 100%, 0%, 0%)")).toThrow("Invalid color format");
    });
});
