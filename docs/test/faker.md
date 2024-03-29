# faker-js
Ref.: [faker-not-creating-different-data-when-called](https://stackoverflow.com/questions/57779144/npm-module-faker-not-creating-different-data-when-called)

<iframe src="https://stackblitz.com/edit/node-j4toze?embed=1&file=package.json&hideDevTools=1&hideExplorer=1&hideNavigation=1&theme=light&view=preview"
     style="width:100%; height:410px; border:0; border-radius: 4px; overflow:hidden;"></iframe>

## Generate Different Data with getter
Ref.: [getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get)

```js
const { faker } = require('@faker-js/faker');

let counter = 0;

const user = {
  get name() {
    console.log('counter: ' + counter);
    counter++;
    return faker.name.findName();
  },
  get email() {
    return faker.internet.email();
  },
  get counter() {
    return counter % 3;
  },
};

function differentData() {
  return { messages: [user] };
}

module.exports = differentData;
```

## Generate Data
```js
const { faker } = require('@faker-js/faker');

function generateData() {
    const messages = [];
    for (let id = 0; id < 10; id++) {
        let priority = faker.datatype.number({min: 1, max: 2});
        let date = faker.date.between("2018-01-01", "2018-07-31").toISOString().split("T")[0];
        let fromId = faker.datatype.number({min: 1000, max: 9999})
        let message = faker.hacker.phrase();
        let status = faker.datatype.number(1);
        messages.push({
            "id": id,
            "from_userId": fromId,
            "date_sent": date,
            "priority": priority,
            "message": message,
            "status": status
        });
    }

    return {messages};
}

module.exports = generateData;
```
