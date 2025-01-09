import { describe, it, expect } from "vitest";
import { isRGBA } from "./rgba";

describe("RGB Validation", () => {
    it("should validate correct RGB strings", () => {
        expect(isRGBA(255, 0, 0, 1)).toBe(true);
        expect(isRGBA(255, 0, 0, 0.5)).toBe(true);
        expect(isRGBA(255, 0 , 0, 0.1 )).toBe(true);
        expect(isRGBA(255, 0, 0, 0.5)).toBe(true);
    });

    it("should invalidate incorrect RGB strings", () => {
        expect(isRGBA(255, 0, 0, -1)).toBe(false);
        expect(isRGBA(255, 0, 0, 2)).toBe(false);
        expect(isRGBA(256, 0, 0, 0.5)).toBe(false);
        expect(isRGBA(-256, 0, 0, 0)).toBe(false);
        expect(isRGBA(255, 256, 0, 0.3)).toBe(false);
        expect(isRGBA(255, -324, 255, 0.5)).toBe(false);
        expect(isRGBA(255, 0, 1234, 1)).toBe(false);
        expect(isRGBA(255, 0, -1234, 1)).toBe(false);
    });
});