import { useColorPaletteContext } from "../context/ColorContextProvider";

export function getColor(colorName: string) : string {
    const { colorPalette } = useColorPaletteContext();
    const color = colorPalette[colorName]?.color;
    if (!color) {
        console.error(`Color "${colorName}" not found in the color palette.`);
        return "";
    }
    return color;

}