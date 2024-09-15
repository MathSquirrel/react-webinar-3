const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}


/**
 * Создание и возврат сообщения о количестве кликов
 * @param msg {String} Текст
 * @param cnt {Int} Число кликов
 * @returns {String}
 */
export function countMessage(msg, cnt) {

  let pluralizeCount = () => [2,3,4].includes(cnt % 10) && ! [12,13,14].includes(cnt % 100) ? 'раза' : 'раз';

  return ' | ' + msg + ' ' + cnt + ' ' + pluralizeCount();
}