import { combineReducers } from 'redux';
import { actionTypes } from './actions';

const initialState = {
  searchResult: {},
  totalItems: null,
  activePage: null,
};

const appState = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GIT_REPO:
      return { ...state, searchResult: { status: 'loading', payload: null } };
    case actionTypes.FETCH_GIT_REPO_SUCCSESS:
      return { ...state, searchResult: { ...state.searchResult, status: 'success', payload: action.payload } };
    case actionTypes.FETCH_GIT_REPO_FAIL:
      return { ...state, searchResult: { status: 'error', payload: null } };
    case actionTypes.FETCH_FORK_COUNT_SUCCESS:
      return {
        ...state,
        searchResult: { ...state.searchResult, totalItems: action.payload.forks_count },
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  appState,
});

export default reducer;
