/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.maxCode = initState.list.reduce((prev, curr) => prev.code > curr.code ? prev : curr).code; // Максимальный code элементов
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) {
      listener();
      console.log(listener);  // me
    }
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: ++(this.maxCode), title: 'Новая запись', selectCount: 0 }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if(item.code === code) {
          /* return {
            ...item,
            selected: !item.selected. // -- возвращаем новый объект. Теперь иммутабельно
            count: item.selected ? item.count : item.count + 1 || 1,  // если свойства нет, приравниваем 1. Если не был выделен до этого момента, то добавляем счетчик
        }
          */
          item.selected = !item.selected;
          if(item.selected) ++item.selectCount;
        } else {
          item.selected = false;
        }
        // return item.selected ? {...item, selected: false} : item;
        return item;
      }),
    });
  }
}

export default Store;
