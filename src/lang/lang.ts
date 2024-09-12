import { LANG_RU } from "./ru/ru";

const LANG_LIBRARY = {
    RU: LANG_RU
}

export type LANG_KEY = keyof typeof LANG_LIBRARY;

export const getLang = (lang: LANG_KEY): typeof LANG_LIBRARY[LANG_KEY] => {
    return LANG_LIBRARY[lang];
};