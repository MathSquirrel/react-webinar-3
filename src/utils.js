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
 * @param cnt {Integer} Число кликов
 * @param wrd {String} Словоформа для склонения без окончания или мягкого знака
 * @param ends {Array} Массив с окончаниями для соответствующих цифр ['1', '2-4', 'все остальные']
 * @returns {String}
 */
export function countMessage(msg, cnt, wrd, ...ends) {

  let pluralize = determineLanguage();
  function determineLanguage() {
    if (/[а-я]/.test(wrd)) return russianPlural;
    else return englishPlural;
  }
  function englishPlural() {
    if (cnt != 1) return 's';
    return '';
  }
  function russianPlural() {
    if (cnt % 10 == 1) return ends[0];
      else if ([2,3,4].includes(cnt % 10) && ![12,13,14].includes(cnt % 100)) return ends[1]; 
      return ends[2];
  }

  let finalWord = wrd + pluralize();
  return ' | ' + msg + ' ' + cnt + ' ' + finalWord;
}

export function plural(value, variants = {}, locale = "ru-RU") {
  // 3 формы в русском языке на целые числа
  const key = new Intl.PluralRules(locale).select(value);
  // это api браузера
  // в нем кодовые строки для каждого числа

  return variants[key] || '';
}




// вариант с настоящим генератором
export const generateCode = (function(start = 0) {
  // ФУНКЦИЯ не является ЧИСТОЙ, у нее будет состояние
  function* realGenerator(start) {
    while (true) {
      yield ++start;
    }
  }

  const gen = realGenerator(start);
  return () => gen.next().value;
}());

export function generateCode2() {
  return generateCode2.value ? ++generateCode2.value : generateCode2.value = 1;
}

// не забыть применить их в начальном списке и методе создания записи

/* ------------------------------- */

function makeGenerateCode(start = 0) {
  return () => {
    return ++start;  // замыкание
  }
}

export const generateCode3 = makeGenerateCode(); // а можно ли вернуть просто тело функции и без =>?

