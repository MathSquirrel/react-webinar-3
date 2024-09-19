import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

function BasketItem(props) {

  const callbacks = {
    onDelete: e => {
      e.stopPropagation();
      props.onDelete(props.item.code);
    },
  };

  return (
    <div
      className={'Item'}
    >
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">
        {props.item.title}
      </div>
      <div className="Item-price">
        {props.item.price}{' $'}
      </div>
      <div className="Item-count">
        {count}{' шт'}
      </div>
      <div className="Item-actions">
        <button onClick={callbacks.onDelete}>Удалить</button>
      </div>
    </div>
  );
}

BasketItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func,
};

BasketItem.defaultProps = {
  onDelete: () => {},
};

export default React.memo(BasketItem);
