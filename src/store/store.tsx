import { useReducer } from 'react';
import { createContainer } from 'react-tracked';

export type foodTypes = {
  quantity: number,
  category: string,
  databaseId: string,
  description: string,
  name: string,
  opinions: any[],
  photos: string[];
  price: number,
  restaurant: {
    id: string,
    name: string
  }
};

type State = {
  basket: foodTypes[];
  category: string
};

type Action =
  | { type: 'ADD_TO_BASKET', item: foodTypes }
  | { type: 'REMOVE_FROM_BASKET', id: string }
  | { type: 'RESET_BASKET' }
  | { type: 'SET_CATEGORY', name: string }

const initialState: State = {
  basket: [],
  category: "all"
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TO_BASKET':
      return {
        ...state,
        basket: [...state.basket, { ...action.item }]
      };
    case 'REMOVE_FROM_BASKET':
      return {
        ...state,
        basket: state.basket.filter((item) => item.databaseId !== action.id)
      }
    case 'RESET_BASKET':
      return {
        ...state,
        basket: []
      }
    case 'SET_CATEGORY':
      return {
        ...state,
        category: action.name
      }
    default:
      return state;
  }
};

const useValue = () => useReducer(reducer, initialState);

export const {
  Provider,
  useTrackedState,
  useUpdate: useDispatch,
} = createContainer(useValue);