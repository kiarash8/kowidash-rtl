import { IModelBase } from "../model";

// model interface
export interface IGeneral {
  drawer: boolean;
  profileMenu: boolean;
}

// model default values
const model: IGeneral = {
  drawer: true,
  profileMenu: false,
}

export const GeneralModel:IModelBase = {
  name: 'general',
  storage: false,
  model: model
};
