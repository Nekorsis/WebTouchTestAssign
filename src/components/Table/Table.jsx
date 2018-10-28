import React from 'react';
import { Table, Glyphicon, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const TableComponent = (props) => {
  const { searchResult, favorites, addToFavorites } = props;
  return (
    Array.isArray(searchResult.payload)
      ? (
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Owner</th>
              <th>Starts</th>
              <th>Fork link</th>
              <th>Favorites</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(searchResult.payload) && searchResult.payload.map(item => (
              <tr key={item.id}>
                <td>
                  {item.name}
                </td>
                <td>
                  {item.owner.login}
                </td>
                <td>
                  {item.stargazers_count}
                </td>
                <td>
                  <a href={item.html_url}>{item.html_url}</a>
                  <Button
                    onClick={() => { addToFavorites(item); }}
                    className="table-add-to-favorites"
                    bsStyle="primary"
                    bsSize="xsmall"
                  >
              add to favorites
                  </Button>
                </td>
                <td>
                  {favorites.find(k => k.id === item.id) ? <Glyphicon glyph="star" /> : ''}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )
      : <p>Nothing found, try to search something else</p>
  );
};

TableComponent.propTypes = {
  searchResult: PropTypes.object.isRequired,
  favorites: PropTypes.array.isRequired,
  addToFavorites: PropTypes.func.isRequired,
};

export default TableComponent;
