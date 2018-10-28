
export const actionTypes = {
  FETCH_GIT_REPO: 'FETCH_GIT_REPO',
  FETCH_GIT_REPO_SUCCSESS: 'FETCH_GIT_REPO_SUCCSESS',
  FETCH_GIT_REPO_FAIL: 'FETCH_GIT_REPO_FAIL',
  FETCH_FORK_COUNT_SUCCESS: 'FETCH_FORK_COUNT_SUCCESS',
  FETCH_FORK_COUNT_FAIL: 'FETCH_FORK_COUNT_SUCCESS',
};

const BASE_URL = 'https://api.github.com/repos';

export const initSearch = searchParam => (dispatch) => {
  const url = `${BASE_URL}/${searchParam.name}/forks?page=${searchParam.page}`;
  const forkUrls = `${BASE_URL}/${searchParam.name}`;
  dispatch({ type: actionTypes.FETCH_GIT_REPO, payload: null });
  fetch(forkUrls)
    .then(response => response.json())
    .then((data) => {
      fetch(url)
        .then(response => response.json())
        .then(datum => dispatch({ type: actionTypes.FETCH_GIT_REPO_SUCCSESS, payload: datum }))
        .catch(e => dispatch({ type: actionTypes.FETCH_GIT_REPO_FAIL, payload: e }));
      dispatch({ type: actionTypes.FETCH_FORK_COUNT_SUCCESS, payload: data });
    })
    .catch(e => dispatch({ type: actionTypes.FETCH_FORK_COUNT_FAIL, payload: e }));
};
