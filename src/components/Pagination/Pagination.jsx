import React from 'react';
import { Pagination } from 'react-bootstrap';
import PropTypes from 'prop-types';

const PaginationComponent = (props) => {
  const getPages = () => {
    const { totalItems, redirectToPage, activePage } = props;
    const paginationPages = totalItems > 30 ? (totalItems / 30).toFixed() : null;
    const paginationItems = [];
    if (paginationPages) {
      for (let i = 1; i <= paginationPages; i++) {
        paginationItems.push(
          <Pagination.Item
            key={i}
            active={activePage === i}
            onClick={() => { redirectToPage(i); }}
          >
            {i}
          </Pagination.Item>,
        );
      }
    }
    return paginationItems;
  };
  return (
    <div>
      <Pagination bsSize="medium">{getPages()}</Pagination>
    </div>
  );
};

PaginationComponent.propTypes = {
  totalItems: PropTypes.number.isRequired,
  redirectToPage: PropTypes.func.isRequired,
  activePage: PropTypes.number.isRequired,
};

export default PaginationComponent;
