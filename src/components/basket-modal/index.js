import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function BasketModal({ onClose, children }) {
  const cn = bem('BasketModal');

  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <button className={cn('close')} onClick={() => onClose()}>Закрыть</button>
        <div className={cn('center')}>{children}</div>
      </div>
    </div>
  );
}

BasketModal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.node,
};

export default React.memo(BasketModal);
