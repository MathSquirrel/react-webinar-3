import React from 'react';
import PropTypes from 'prop-types';
import BasketItem from '../basket-item';
import './style.css';

function BasketList({ list, onDeleteItem }) {
  return (
    <div className="List">
      {list.map(item => (
        <div key={item.code} className="List-item">
          <BasketItem item={item} onDelete={onDeleteItem}/>
        </div>
      ))}
      <div className="Summary">
        <div className="ListItem">
          {/* здесь будут располагаться итог и сумма */}
        </div>
      </div>
    </div>
  );
}

BasketList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  onDeleteItem: PropTypes.func,
};

BasketList.defaultProps = {
  onDeleteItem: () => {},
};

export default React.memo(BasketList);
