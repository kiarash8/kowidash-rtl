import { IModelBase } from "../model";

// model interface
export interface IUser {
  token: string | null;
  name: string;
}

// model default values
const model: IUser = {
  token: null,
  name: ''
}

export const UserModel:IModelBase = {
  name: 'user',
  storage: true,
  model: model
};
