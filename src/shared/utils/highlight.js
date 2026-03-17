const escapeHTML = (unsafeString) => {
  // будет экранировать опасные символы, чтобы текст не превращался в html
  return unsafeString
    .replaceAll(/&/g, '&amp;')
    .replaceAll(/</g, '&lt;')
    .replaceAll(/>/g, '&gt;')
    .replaceAll(/"/g, '&quot;')
    .replaceAll(/'/g, '&#39;');
};


const escapeRegExp = (unsafeString) => {
  return unsafeString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const highlightCaseInsensitive = (text, query) => {
  const safeText = escapeHTML(text);
  const queryFormatted = query.trim();

  if (queryFormatted.length === 0) {
    return safeText;
  }

  const pattern = new RegExp(escapeRegExp(queryFormatted), 'ig');

  return safeText.replace(pattern, `<mark>$&</mark>`);
};

/*
  Здесь мы создаём регулярное выражение для поиска текста в строке:
  const pattern = new RegExp(escapeRegExp(queryFormatted), 'ig');

  Разберём по частям.
    queryFormatted — это строка поиска после trim().
    Например:
        queryFormatted = 'я'

    Тогда:
        escapeRegExp(queryFormatted)
        нужно, чтобы обезвредить спецсимволы регулярки.
        Например, если пользователь ввёл . , то без escapeRegExp точка значила бы “любой символ”, а не обычную точку.
    После этого создаётся:
        new RegExp(...)
        То есть из строки делается объект регулярного выражения.
    new RegExp('я', 'ig')
    это примерно то же самое, что:
        /я/ig    
    То есть эта строка:
        const pattern = new RegExp(escapeRegExp(queryFormatted), 'ig');
        означает:
        “создай безопасный шаблон поиска по строке queryFormatted, ищи без учёта регистра и найди все вхождения.”  
        
    Пример:
        const queryFormatted = 'пе';
        const pattern = new RegExp(escapeRegExp(queryFormatted), 'ig');
            получится:
                /пе/ig
            и потом:
                'Первая'.replace(pattern, '<mark>$&</mark>')
                    даст:
                    <mark>Пе</mark>рвая
            То есть pattern — это просто подготовленный шаблон поиска для подсветки.
*/
