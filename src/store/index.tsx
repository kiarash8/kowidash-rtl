import React from 'react';
import { Models } from './models';
import { Reducer } from './reducer';
import { Set, Reset } from './actions';

const Context = React.createContext<any>(null);
const Initializer = getModels();

function getModels(){
  const state: any = {};
  const modelKeys = Models.map(x=> x.name);
  modelKeys.forEach(item => {
    state[item] = getCurrentData(item);
  });
  return state;
}
function getCurrentData(model: string){
  const item = Models.find(x=> x.name === model);
  if(item !== undefined){
    if(item.storage){
      const storageData = localStorage.getItem(model);
      if(storageData !== null && storageData !==  undefined) {
        return JSON.parse(storageData)
      }
      else{
        return item.model;
      }
    }
    else{
      return item.model;
    }
  }
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
