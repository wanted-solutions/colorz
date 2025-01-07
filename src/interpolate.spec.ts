import { describe, it, expect } from 'vitest';
import { interpolate, interpolateRGBA } from "./interpolate";
import { RGBA } from "./types";

describe('interpolate', () => {
    it('should correctly interpolate between two numbers', () => {
        expect(interpolate(0, 10, 0.5)).toBe(5);
        expect(interpolate(10, 20, 0.25)).toBe(12.5);
        expect(interpolate(-10, 10, 0.75)).toBe(5);
    });
});

describe('interpolateRGBA', () => {
    it('should correctly interpolate between two RGBA colors', () => {
        const startColor: RGBA = { r: 0, g: 0, b: 0, a: 0 };
        const endColor: RGBA = { r: 255, g: 255, b: 255, a: 1 };
        const factor = 0.5;
        const result = interpolateRGBA(startColor, endColor, factor);
        expect(result).toEqual({ r: 128, g: 128, b: 128, a: 0.5 });
    });

    it('should handle edge cases', () => {
        const startColor: RGBA = { r: 255, g: 0, b: 0, a: 1 };
        const endColor: RGBA = { r: 0, g: 0, b: 255, a: 0 };
        expect(interpolateRGBA(startColor, endColor, 0)).toEqual(startColor);
        expect(interpolateRGBA(startColor, endColor, 1)).toEqual(endColor);
    });
});
