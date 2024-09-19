import React from 'react';
import './style.css';
import { countMessage } from '../../utils.js';  // это бред какой-то, на что babel
import Item from '../item/index.js';
import PropTypes from 'prop-types';


function List({list, onDeleteItem, onSelectItem}) {
  return (
    <div className="List">
      {list.map(item => (
        <div key={item.code} className="List-item">
          <Item item={item} onDelete={onDeleteItem} onSelect={onSelectItem}/>
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onDeleteItem: PropTypes.func,
  onSelectItem: PropTypes.func
}

List.defaultProps = {
  onDeleteItem: () => {},
  onSelectItem: () => {},
}

export default React.memo(List);