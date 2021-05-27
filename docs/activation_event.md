# Функция *enableSuggestActivationEvent*
## Назначение функции
Функция включает/выключает генерацию события *EVENT_ON_ACTIVATE_SUGGEST_ROW*, которое возникает при активации пункта в текущем списке подсказок.
При выводе подробного описания (CTRL+Space) пункта подсказки генерируется событие *EVENT_ON_DETAIL_SUGGEST_ROW* с аналогичными параметрами.

## Параметры функции
* **enabled** - *boolean*, активность события

## Пример вызова
```javascript
// Включение генерации события
enableSuggestActivationEvent(true);

// Отключение генерации события
enableSuggestActivationEvent(false);
```

## Пример параметров генерируемого события
```json
{
  "trigger": "focus",
  "current_word": "",
  "last_word": "авансовыйотчет",
  "last_expression": "документы.авансовыйотчет.",
  "focused": "Выбрать",
  "rows": [
    "Выбрать",
    "НайтиПоНомеру",
    "НайтиПоРеквизиту",
    "ПолучитьДанныеВыбора",
    "ПолучитьМакет",
    "ПолучитьСсылку",
    "ПолучитьФорму",
    "ПолучитьФормуВыбора",
    "ПолучитьФормуНовогоДокумента",
    "ПолучитьФормуСписка",
    "ПустаяСсылка",
    "СоздатьДокумент"
  ]
}
```