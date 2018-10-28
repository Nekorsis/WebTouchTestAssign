import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { initSearch } from '../../redux/actions';
import SearchComponent from '../../components/Search/Search';
import PaginationComponent from '../../components/Pagination/Pagination';
import TableComponent from '../../components/Table/Table';
import parseUrl from '../../utils';
import Preloader from '../../components/Preloader/Preloader';

class SearchResultPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInputText: '',
    };
  }

  componentWillMount() {
    const { location, searchRepo, searchResult } = this.props;
    if (Object.keys(searchResult).length === 0 && searchResult.constructor === Object && searchResult.status !== 'loading') {
      const data = parseUrl(location.search);
      searchRepo.initSearch({ name: data.name, page: data.page });
    }
  }

  inputHandler = (e) => {
    this.setState({ searchInputText: e.target.value });
  }

  redirectToResult = (p) => {
    const { history } = this.props;
    history.push(`/result?page=1repository=${p}`);
  }

  redirectToPage = (p) => {
    const { history, searchRepo, location } = this.props;
    const { searchInputText } = this.state;
    const repoName = searchInputText || parseUrl(location.search).name;
    searchRepo.initSearch({ name: repoName, page: p });
    history.push(`/result?page=${p}repository=${repoName}`);
  }

  addToFavorites = (i) => {
    const favorites = window.localStorage.getItem('favorites');

    if (!favorites) {
      const arr = [];
      arr.push(i);
      window.localStorage.setItem('favorites', JSON.stringify(arr));
    }
    const arr = JSON.parse(window.localStorage.getItem('favorites'));
    const isExists = arr.find(item => (item.id === i.id));
    if (!isExists) {
      arr.push(i);
      window.localStorage.setItem('favorites', JSON.stringify(arr));
    }
  }

  render() {
    const { searchResult, searchRepo, location } = this.props;
    const { searchInputText } = this.state;
    const activePage = parseUrl(location.search).page;
    const favorites = JSON.parse(window.localStorage.getItem('favorites'));
    return (
      <Grid>
        <SearchComponent
          redirect={this.redirectToResult}
          searchRepo={searchRepo.initSearch}
          inputHandler={this.inputHandler}
          inputValue={searchInputText}
        />
        {searchResult.payload
          ? (
            <div>
              <TableComponent
                searchResult={searchResult}
                addToFavorites={this.addToFavorites}
                favorites={favorites}
              />
              <PaginationComponent
                redirectToPage={this.redirectToPage}
                totalItems={searchResult.totalItems}
                activePage={activePage}
              />
            </div>
          )
          : <Preloader />}
      </Grid>
    );
  }
}

SearchResultPage.propTypes = {
  location: PropTypes.object.isRequired,
  searchRepo: PropTypes.object.isRequired,
  searchResult: PropTypes.object.isRequired,
  history: PropTypes.object,
};

const bindActions = dispatch => ({
  dispatch,
  searchRepo: bindActionCreators({ initSearch }, dispatch),
});

const mapStateToProps = state => ({
  searchResult: state.appState.searchResult,
});

export default connect(mapStateToProps, bindActions)(SearchResultPage);
