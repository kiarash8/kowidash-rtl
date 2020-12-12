import {Models} from './models';

export const Set = (model: string, payload: any, dispatch: any) => {
    return dispatch({
        type: `SET_${model.toString().toUpperCase()}`,
        payload: payload
    });
};
export const Reset = (modelName: string, dispatch: any) => {
    const model = Models.find(x=> x.name === modelName);
    dispatch({
        type: `RESET_${modelName.toString().toUpperCase()}`,
        payload: model !== undefined && model.model
    });
    return model;
};