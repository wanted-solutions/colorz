import { RGBA } from "./types";

export function interpolate(start: number, end: number, factor: number): number {
    return start + (end - start) * factor;
}

export function interpolateRGBA(startColor: RGBA, endColor: RGBA, factor: number): RGBA {
    return {
        r: Math.round(interpolate(startColor.r, endColor.r, factor)),
        g: Math.round(interpolate(startColor.g, endColor.g, factor)),
        b: Math.round(interpolate(startColor.b, endColor.b, factor)),
        a: interpolate(startColor.a, endColor.a, factor)
    };
}