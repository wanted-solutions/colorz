import { describe, it, expect } from "vitest";
import { Color } from "./color";

describe("Color", () => {
    it("should parse valid RGB color definitions", () => {
        const color = new Color("rgb(255, 0, 0)");
        expect(color.getRGBA()).toEqual({ r: 255, g: 0, b: 0, a: 1 });
    });

    it("should parse valid RGBA color definitions", () => {
        const color = new Color("rgba(255, 0, 0, 0.5)");
        expect(color.getRGBA()).toEqual({ r: 255, g: 0, b: 0, a: 0.5 });
    });

    it("should parse valid HSL color definitions", () => {
        const color = new Color("hsl(120, 100%, 50%)");
        expect(color.getRGBA()).toEqual({ r: 0, g: 255, b: 0, a: 1 });
    });

    it("should parse valid HSLA color definitions", () => {
        const color = new Color("hsla(120, 100%, 50%, 0.5)");
        expect(color.getRGBA()).toEqual({ r: 0, g: 255, b: 0, a: 0.5 });
    });

    it("should parse valid HEX color definitions", () => {
        const color = new Color("#ff0000");
        expect(color.getRGBA()).toEqual({ r: 255, g: 0, b: 0, a: 1 });
    });

    it("should parse valid short HEX color definitions", () => {
        const color = new Color("#f00");
        expect(color.getRGBA()).toEqual({ r: 255, g: 0, b: 0, a: 1 });
    });

    it("should parse valid CMYK color definitions", () => {
        const color = new Color("cmyk(0%, 100%, 100%, 0%)");
        expect(color.getRGBA()).toEqual({ r: 255, g: 0, b: 0, a: 1 });
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
