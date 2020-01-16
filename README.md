# Приложение для создания списка друзей в ВК
### Доступный функционал
+ Можно создавать список друзей, перемещая элементы списка с помощью drag and drop или по клике на кнопку добавления.
+ Удалять из списка друзей можно с помощью drag and drop или по клике на кнопку удаления.
+ Друзей в списках можно фильтровать по имени.
+ Состояние приложения можно сохранить в LocalStorage.


###  Чтобы развернуть проект необходимо:
```sh
$ git clone https://github.com/OlBol/friend-filter.git
$ cd friend-filter
$ npm i 
```

### Скрипты package.json:

| Скрипт | Назначение |
| ------ | ------ |
| start | Запустить development-режим сбокри. |
| eslint | Запустить проверку стиля js-кода. |
| stylelint | Запустить проверку стиля scss-кода. |

##### Запустить скрипт:
```sh
$ npm run имя_скрипта
```

##### Либо:
```sh
$ yarn имя_скрипта
```

### Stack
+ VK API 
+ Vanila JavaScript
+ Handlebars
+ SCSS
+ Webpack 4
