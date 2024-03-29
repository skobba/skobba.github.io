# Array, Map, Set and Object
Ref.: [https://codeburst.io/array-vs-set-vs-map-vs-object-real-time-use-cases-in-javascript-es6-47ee3295329b](https://codeburst.io/array-vs-set-vs-map-vs-object-real-time-use-cases-in-javascript-es6-47ee3295329b)

## Array
___Index___
Javascript arrays cannot have "string indexes". These are equivalent:
```js
array.a = 'foo';
array['a'] = 'foo';
```

___Search/Find___

```js
// array of objects
array.find(object => object.id === 2); // returns object with id 2

//array of numbers starting from "zero"
array.indexOf("one"); // returns 1 as index
```

___Sort___

Array sorts are often misunderstood by both beginners and intermediate developers. Since array’s default sort sorts an array based on Unicode , we cannot expect to get same sort behaviour for all the datatypes. Hence, we often need to pass a comparator function into the sort.


```js
// array of strings in a uniform case without special characters
const arr = [ "sex", "age", "job"];
arr.sort(); //returns ["age", "job", "sex"]

// array of numbers
const arr = [ 30, 4, 29 , 19];
arr.sort((a, b) => a-b); // returns [4, 19, 29, 30]

// array of number strings
const arr = [ "30", "4", "29" , "19" ];
arr.sort((a, b) => a-b); // returns ["4", "19", "29", "30"]

// array of mixed numerics
const arr = [ 30, "4", 29 , "19" ];
arr.sort((a, b) => a-b); // returns ["4", "19", 29, 30]

// array of non-ASCII strings and also strings
const arr = ['réservé', 'cliché', 'adieu'];
arr.sort((a, b) => a.localeCompare(b)); // returns is ['adieu', 'cliché','réservé']

// array of objects
const arr = [
  { name: 'Sharpe', value: 37 },
  { name: 'And', value: 45 },
  { name: 'The', value: -12 }
];

// sort by name string
arr.sort((a,b) => a['name'].localeCompare(b['name']));

// sort by value number
arr.sort((a,b) => a['value']-b['value']);
```

___Includes or Has___

One of the most important features of the iterable objects is to check the presence of the desired item. Almost, all of the built-in standard and iterable javascript objects have their own implementation to achieve this. Let’s look at them below.

```js
// we are considering a linear array only
const arr = [1, 2, 3];
arr.includes(1); // returns true
arr.includes('1'); // returns false as types do not match
```

___Removing Duplicates___

ES6 let’s look at the easiest ways of removing duplicates from an array.
```js
// considering a linear array Set gives us the answer we need.
const arr = [1, 2, 2, 4, 5, 5];
[...new Set(arr)]; // returns [1, 2, 4, 5]

// however set doesn't remove duplicates from array of objects
const arr = [{a:1},{b:2},{a:1}];
[...new Set(arr)]; // returns [{a:1},{b:2},{a:1}]

// hence we can use ES6 filter and map functions to achieve the same
arr.filter((obj, index) => { 
  return arr.map(obj => obj['a']).indexOf(obj['a']) === index;    
}); // removes duplicate based on the key 'a'
```

___Delete___

Array has no built-in method to delete its items. However we can use couple of methods to do it. Splice, indexOf or filter.
```js
const arr = [ 'a', 'b', 'c' ];
arr.filter(e => e !== 'c'); // returns [ 'a', 'b' ] removing 'c'
```

___Length and Size___
```js
// arrays have a built-in property for length which is different from collection size.
['1', '2', '3'].length // returns 3
```


## Object
___Search/Find___
```js
// array of Objects
// eg: [{id: 1, name: "one"},...] can be converted to {1: {name: "one"}, ... }
object[2] // returns the value of key 2 (i.e {name: "two"} 
```

___Sort___

There is no built-in method for the sorting of the objects, but ES6 offers some interesting built-in key-sorting during the creation of the object. Object keys are sorted only based on numerics/numeric-strings, all the other keys are pushed right after the numeric keys unsorted.

```js
// object with numeric/numeric-string keys are sorted
const obj = { 30: 'dad', '4': 'kid', 19: 'teen', '100': 'grams'};
console.log(obj) // returns {4: "kid", 19: "teen", 30: "dad", 100: "grams"} with sorted keys

// object with key-values as alpha-strings are not sorted
const obj = { "b": "two", "a": "one", "c": "three" };
console.log(obj) // returns {b: "two", a: "one", c: "three"}

// object with numeric, numeric-string and alpha keys are partially sorted. (i.e only numeric keys are sorted)
const obj = { b: "one", 4: "kid", "30": "dad", 9: "son", a: "two" };
console.log(obj) // returns {4: "kid", 9: "son", 30: "dad", b: "one", a: "two"}
```

___Includes or Has___
```js
// we are going to consider only the keys
const obj = { a: 1, b: 2, c: 3, 1: 'one' };
obj.hasOwnProperty('a'); // returns true
obj.hasOwnProperty('1'); // returns true because no type check
obj.hasOwnProperty(1); // returns true
```

___Removing Duplicates___

Objects do not allow duplicate key values, old values are overwritten by the new values.

```js
const obj = { b: "one", a: "two", a: "three" };
console.log(obj); // returns {b: "one", a: "three"}
```

___Delete___

Objects do not have a built-in delete method, but according to the docs we can use the delete keyword to delete a key. However, this is widely discouraged in the javascript community and even libraries like underscore and lodash use a different method.
```js
// The infamous delete method
const obj = { b: "one", a: "two" };
delete obj.a; // deletes a and returns true
```

___Length and Size___
```js
// objects have no built-in property to check length or size, so we need to resort to using keys array to check length.
Object.keys({ b: 'one', a: 'two', c: 'three' }).length // returns 3
```


## Set
___Search/Find___

No built-in function to retrieve or find the index of its items even-though its an iterable, so ideally we would have to convert it to an array before indexOf/find operation.
```js
const mySet = new Set(['1', '2', '3']);
[...mySet].indexOf('2') // returns 1

const mySet = new Set([{1: 'one'}, {2: 'two'}, {3: 'three'}]);
[...mySet].find(object => object[2] === 'two'); // returns {2: 'two'}
```

___Sort___

No built-in sort functionality, however the easiest way to sort a set is to convert it to an array and implementing array’s sort method. Since, set is an iterable object, we can build our own sorting algorithm of our choice.

```js
// set to array and array sort 
const set = new Set(['b', 'a', 'c']);
[...set].sort(); // returns ['a', 'b', 'c'] which is an array

// alternatively we can use entries to sort a set and create a new sorted set. The iterator gives us the ['a', 'a'] when spread over an array.
const set = new Set(['b', 'a', 'c']);
const sortedSet = new Set([...set.entries()].map((entry) => entry[0]).sort());
```

___Includes or Has___

Set has a handy ‘has’ function which can be more efficient in accessing the values compared to an array.
```js
const set = new Set([1, 2, 3, 4, 5]);
set.has(4); // returns true
set.has('4'); // returns false because of mismatch in type
```

___Removing Duplicates___

Sets inherently do not allow duplicate values when they are passed a linear iterable object like an array, but when they are passed an array of object they do allow duplicate objects.
```js
// a linear array iterable
const set = new Set([1, 2, 2, 4, 5, 5]);
console.log(set); // returns Set {1, 2, 4, 5}

// array of objects
const set = new Set([{a:1},{b:2},{a:1}]);
console.log(set); // returns Set 
```

___Delete___

Set offers a built-in delete method making our lives easier
```js
const set = new Set([1, 2, 4, 5]);
set.delete(4); // deletes 4 and returns true
set.delete('5'); // returns false as types do not match
```

___Length and Size___
```js
// set has a size property built-in
new Set([{a:1},{b:2},{a:1}]).size // returns 3
```

## Map
Maps are special objects per se, they are iterables with key value pair constructor that looks like a 2D array but acts like an object. They offer a better flexibility in terms of choosing our key values. A map can have a key value which can be a string, number, object or even NaN.

___Search/Find___
```
var map = new Map([[ 1, 'one' ],[ 2, 'two' ]]);
map.get(1) // returns 'one'
```
Can be usefull in some specific scenarios, like adding and deleting key-pairs frequently.

___Sort___

No built-in method , but we can still spread their entries over an array and build a new sorted map.
```js
// entries spread over an array can be sorted like an array
const map = new Map([["c", 'three'],["a", 'one'], ["b", 'two']]);
const sortedMap = new Map([...map.entries()].sort()) // returns sorted Map(3) {"a" => "one", "b" => "three", "c" => "two"}
```

Note: In the map sorting, it is important to know that the two-dimensional array from the map gets sorted based on the first element in each sub-array. Here the sorting is based on “a”, “b” and “c” strings. If these were numbers, you would have to use a comparator.

___Includes or Has___

```js
const map = new Map([[3, 'three'],["a", 'one'], ["b", 'two']]);
map.has('a'); // returns true
map.has(3); // returns true
map.has('3'); // returns false because types don't match
```

Note: Compared to the array’s includes function, Object’s hasOwnProperty and Set/Map’s has functions seem to perform close to O(1) in different tests, clearly more efficient in terms of larger data sets.


___Removing Duplicates___

Maps also do not allow duplicate keys during the creation.
```js
const map = new Map([[3, 'three'], [2, 'two'], [2, 'four']]);
console.log(map); // returns {3 => "three", 2 => "four"}
```


___Delete___

Map has its own built-in delete method to remove keys from a given map object.
```js
const map = new Map([[3, 'three'], [2, 'two']);
map.delete(3); // deletes [3, 'three'] and returns true.
map.delete('2'); // returns false as types do not match
```

___Length and Size___
```js
// map has a size property built-in
new Map([[3, 'three'],['a', 'one'], ['b', 'two']]).size // returns 3
```
