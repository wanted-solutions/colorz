    export function isRGBA (r: number, g: number, b: number, a: number): boolean {
        const validate = (value: number, max: number): boolean => {
            return !(value < 0 || value > max);
        };
        
        return validate(r, 255) &&  validate(g, 255) && validate(b, 255) && validate(a, 1);
    }
    
