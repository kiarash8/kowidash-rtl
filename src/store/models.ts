import { PaletteType } from "@material-ui/core";

interface modelBase {
  name: string;
  storage: boolean;
  model: any;
};

// general model
interface iGeneral {
  drawer: boolean;
  profileMenu: boolean;
}
const generalModelDefault:iGeneral = {
  drawer: true,
  profileMenu: false
}

// theme model
interface iTheme {
  paletteType: PaletteType;
}
const themeModelDefault:iTheme = {
  paletteType: 'light',
}

// user model
interface iUser {
  token: string | null;
  name: string;
}
const userModelDefault:iUser = {
  token: null,
  name: ''
}


// models
export const Models: Array<modelBase> = [
  {
    name: 'general',
    storage: false,
    model: generalModelDefault
  },
  {
    name: 'theme',
    storage: true,
    model: themeModelDefault
  },
  {
    name: 'user',
    storage: true,
    model: userModelDefault
  }
];