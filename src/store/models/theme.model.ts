import { PaletteType } from "@material-ui/core";
import { IModelBase } from "../model";

// model interface
export interface ITheme {
    paletteType: PaletteType;
}

// model default values
const model: ITheme = {
    paletteType: 'light',
}

export const ThemeModel:IModelBase = {
    name: 'theme',
    storage: true,
    model: model
};