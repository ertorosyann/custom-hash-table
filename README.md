# Hash Table Implementation in JavaScript

## Overview

This project provides a custom implementation of a **Hash Table** (or Hash Map) in JavaScript using **separate chaining** for collision handling. The hash table supports basic operations such as **insertion, searching, deletion, and resizing**.

## Features

- **Efficient Hashing:** Implements a polynomial rolling hash function.
- **Collision Handling:** Uses separate chaining with linked lists.
- **Automatic Resizing:** Dynamically grows the table when the load factor exceeds `0.65`.
- **Prime Number Sizing:** Ensures that the table size remains a prime number for better distribution.

## Constants

```js
const LOAD_FACTOR = 0.65;      // Maximum allowed load factor before resizing
const INITIAL_CAPACITY = 11;   // Initial size of the hash table
const MAX_CAPACITY = 1000;     // Maximum allowed capacity
```

## Class Definitions

### `Node`

A simple linked list node used to store key-value pairs.

```js
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}
```

### `HashTable`

The main class that implements the hash table.

#### **Constructor**

```js
constructor() {
    this.capacity = INITIAL_CAPACITY;
    this.size = 0;
    this.table = new Array(this.capacity);
}
```

- Initializes an empty table with the defined initial capacity.

#### **Hash Function**

```js
stringHash(inputString)
```

- Implements polynomial rolling hashing with base `31` and modulus `10^9 + 9`.

#### **Insertion**

```js
insert(key, value)
```

- Inserts a key-value pair into the hash table.
- If the key already exists, it appends it to the chain.
- If the load factor exceeds `0.65`, the table is resized.

#### **Search**

```js
search(key)
```

- Searches for a key and returns the associated value.
- Returns `undefined` if the key is not found.

#### **Deletion**

```js
delete(key)
```

- Deletes an entry based on the key.
- Returns `true` if deletion is successful, otherwise `false`.

#### **Resizing**

```js
resize()
```

- Doubles the table size while ensuring it remains a prime number.
- Rehashes all elements into the new table.

## Example Usage

```js
const hashTable = new HashTable();

// Insert values
hashTable.insert("name", "Alice");
hashTable.insert("age", 25);

// Search for a value
console.log(hashTable.search("name")); // Output: "Alice"

// Delete a value
hashTable.delete("name");
console.log(hashTable.search("name")); // Output: undefined
```

## Complexity Analysis

| Operation | Average Case | Worst Case (All keys collide) |
| --------- | ------------ | ----------------------------- |
| Insert    | O(1)         | O(n) (Linked List Traversal)  |
| Search    | O(1)         | O(n) (Linked List Traversal)  |
| Delete    | O(1)         | O(n) (Linked List Traversal)  |

## Limitations

- Only supports **string keys**.
- Performance degrades when too many collisions occur.
- Maximum capacity is **1000** due to predefined constraints.

## Future Improvements

- Implement quadratic probing for an alternative collision resolution strategy.
- Allow generic key types using serialization.
- Optimize `resize()` to prevent frequent rehashing.

