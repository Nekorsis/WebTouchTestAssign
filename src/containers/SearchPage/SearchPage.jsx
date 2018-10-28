import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Jumbotron, Grid } from 'react-bootstrap';
import { initSearch } from '../../redux/actions';
import SearchComponent from '../../components/Search/Search';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInputText: '',
    };
  }

  inputHandler = (e) => {
    this.setState({ searchInputText: e.target.value });
  }

  redirectToResult = (p) => {
    const { history } = this.props;
    history.push(`/result?page=1repository=${p}`);
  }

  render() {
    const { searchRepo } = this.props;
    const { searchInputText } = this.state;
    return (
      <Grid>
        <div>
          <Jumbotron>
            <h1>WebTouch test assign</h1>
            <p>
            This is a simple service for searching repositories forks on GitHub
            </p>
            <div>
              <SearchComponent
                redirect={this.redirectToResult}
                searchRepo={searchRepo.initSearch}
                inputHandler={this.inputHandler}
                inputValue={searchInputText}
              />
            </div>
          </Jumbotron>
        </div>
      </Grid>
    );
  }
}

SearchPage.propTypes = {
  history: PropTypes.object,
  searchRepo: PropTypes.object,
};

const bindActions = dispatch => ({
  dispatch,
  searchRepo: bindActionCreators({ initSearch }, dispatch),
});

const mapStateToProps = state => ({
  searchResult: state.appState.searchResult,
});

export default connect(mapStateToProps, bindActions)(SearchPage);
