import { Models } from "./model";

export function Reducer(state: any, action: any) {
    const [operations, model] = action.type.toString().split('_');
    switch (operations) {
        case 'SET':
          return getNewState('set', model.toLowerCase(), action, state);
        case 'RESET':
          return getNewState('reset', model.toLowerCase(), action, state);
        default:
          return state;
      }
}
function getNewState(operations: any, modelName: any, action: any, state: any){
    const item = Models.find(x=> x.name === modelName);
    const body: any = {};
    if(operations === 'set'){
        const fields = Object.keys(item!.model);
        fields.forEach(field => {
        body[field] = (action.payload[field] === undefined ? state[modelName][field] : action.payload[field]);
        });
    }
    const model = {
        ...state,
        [modelName]: operations === 'set' ? body : item!.model
    };
    if(item!.storage){
        localStorage.setItem(modelName, JSON.stringify(model[modelName]));
    }
    return model;
}
