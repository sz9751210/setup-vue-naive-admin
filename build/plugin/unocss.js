import Unocss from "unocss/vite";
import { presetAttributify, presetUno, presetIcons } from "unocss";

export function unocss(){
    return Unocss({
        presets: [
            presetUno(),
            presetAttributify(),
            presetIcons({
                scale: 1.2,
            }),
        ],
    });
}