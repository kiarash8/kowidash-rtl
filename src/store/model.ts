import { IGeneral, GeneralModel } from "./models/general.model";
import { ITheme, ThemeModel } from "./models/theme.model";
import { IUser, UserModel } from "./models/user.model";

export interface IModelBase {
  name: string;
  storage: boolean;
  model: any;
};

export interface IContext {
  state: IModel,
  dispatch: React.Dispatch<React.SetStateAction<IModel>>
}

// append a field here for each of the models with a specific name and interface
interface IModel {
  general: IGeneral;
  theme: ITheme;
  user: IUser;
}

// append a model base to list
export const Models: Array<IModelBase> = [
  GeneralModel,
  ThemeModel,
  UserModel
];
