import React from 'react';
import { IContext, Models } from './model';
import { Reducer } from './reducer';
import { Set, Reset } from './actions';


const Context = React.createContext<IContext>({} as IContext);


const Initializer = getModels();

function getModels(){
  const result: any = {};
  const modelKeys = Models.map(x=> x.name);
  modelKeys.forEach(key => {
    result[key] = getCurrentData(key);
  });

  return result;
}
function getCurrentData(model: string){
  const item = Models.find(x=> x.name === model);
  if(item !== undefined)
    if(item.storage){
      const storageData = localStorage.getItem(model);
      if (storageData !== null && storageData !==  undefined) { return JSON.parse(storageData) }
      else { return item.model }
    }
    else { return item.model }
  return null;
}

const Provider = ({
  children
}: any) => {
  const [state, dispatch] = React.useReducer(Reducer, Initializer);
  const value = { state, dispatch };
  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};

export const Store = { Context, Provider, Set, Reset};
