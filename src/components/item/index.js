import React, {useState} from 'react';
import './style.css';
import { countMessage, plural } from '../../utils.js';  // это бред какой-то в родственных элементах импортировать одно и то же, на что babel
import PropTypes from 'prop-types';


function Item(props) {

  const [count, setCount] = useState(0);

  // почему все-же не нужно кешировать с useCallback
  // а почему тут нужно кешировать с useCallback
  const callbacks = {
    onClick: () => {
      props.onSelect(props.item.code);
      if (!props.item.selected) {
        // функция onSelect изменила внешнее состояние state
        // однако до рендера еще выполняется этот код
        setCount(count + 1);
      }
    },
    onDelete: e => {  // откуда oDelete знает, что мы ему передаем
      e.stopPropagation();  // какие действия по умолчанию там были?
      props.onDelete(props.item.code);
    }
  }




  return (
    <div
        className={'Item' + (props.item.selected ? ' Item_selected' : '')}
        onClick={callbacks.onClick}
      >
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{
        props.item.title + 
        (props.item.selectCount > 0 ? countMessage('Выделяли', props.item.selectCount, 'раз', '', 'а', '') : '')
      }
      {
        props.item.count && ` | Выделяли ${count} ${plural(count, {one: 'раз', few: 'раза', many: 'раз'})}`
      }
      </div>
      <div className="Item-actions">
        <button onClick={callbacks.onDelete}>Удалить</button>
      </div>
    </div>
  );
}

Item.PropTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool
  }).isRequired,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
}

Item.defaultProps = {
  onDelete: () => {},
  onselect: () => {},
}

export default React.memo(Item);