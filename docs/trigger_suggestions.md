# Функция *triggerSuggestions*
## Назначение функции
Функция принудительно вызывает показ подсказок в текущей позиции курсора. Используется, например, при динамическом обновлении метаданных, когда сначала в 1С генерируется событие *EVENT_GET_METADATA*, потом частично обновляются метаданные, а затем нужно снова показать подсказки, но уже с учетом обновленных метаданных.

## Параметры функции
* Отсутствуют

## Пример вызова
```javascript
// Вызов подсказок
triggerSuggestions();
```