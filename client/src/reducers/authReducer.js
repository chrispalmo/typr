import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
    	//in js, ''==false, !''=true
      return action.payload || false;
    default:
      return state;
  }
}
