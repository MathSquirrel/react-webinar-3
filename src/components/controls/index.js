import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

function Controls({onAdd}) {

  return (
    <div className='Controls'>
      <button onClick={() => onAdd()}>Добавить</button>
    </div>
  );
}

Controls.PropTypes = {
  onAdd: PropTypes.func.isRequired
}

Controls.defaultProps = {
  onAdd: () => {}
}

export default React.memo(Controls);