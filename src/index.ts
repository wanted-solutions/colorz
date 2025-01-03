import chroma from 'chroma-js';
export function generateShadeFromColor(hex: string): { [key: string]: string } {
    return {
        let baseColor = '#4F46E5'; 
        let palette = [];
        let colorName = 'myColor';
    
        // Function for generating pallete of colors with concrete values 50, 100, ..., 950
        function getPalette(color:string) {
            const colors = chroma.scale(['white', color, 'black']);
            const palette = [];
        
            // Creating colors by values 50, 100, 200, ..., 950 with different
            palette.push(colors(0.05).hex());  // 50
            palette.push(colors(0.10).hex());  // 100
            palette.push(colors(0.20).hex());  // 200
            palette.push(colors(0.30).hex());  // 300
            palette.push(colors(0.40).hex());  // 400
            palette.push(colors(0.50).hex());  // 500
            palette.push(colors(0.60).hex());  // 600
            palette.push(colors(0.70).hex());  // 700
            palette.push(colors(0.80).hex());  // 800
            palette.push(colors(0.90).hex());  // 900
            palette.push(colors(0.95).hex());  // 950
        
        // Return the generated palette
        return palette;
        }
    
        // Function for generating Tailwind code
        function getCodeString(color:string, name = 'myColor') {
            const palette = getPalette(color);
            const json = {
                theme: {
                extend: {
                    colors: {
                    [name]: {
                        50: palette[0],
                        100: palette[1],
                        200: palette[2],
                        300: palette[3],
                        400: palette[4],
                        500: palette[5],
                        600: palette[6],
                        700: palette[7],
                        800: palette[8],
                        900: palette[9],
                        950: palette[10],
                    },
                    },
                },
                },
            };
            return `${JSON.stringify(json, null, 2)}`;

        }
     
}



