const LOAD_FACTOR = 0.65;
const INITIAL_CAPACITY = 11;
const MAX_CAPACITY = 1000;

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {
  constructor() {
    this.capacity = INITIAL_CAPACITY;
    this.size = 0;
    this.table = new Array(this.capacity);
  }

  stringHash(inputString) {
    const base = 31;
    const modulus = 1e9 + 9;
    let hashValue = 0;
    let basePower = 1;

    for (let i = 0; i < inputString.length; i++) {
      let character = inputString[i];
      hashValue = (hashValue + character.charCodeAt(0) * basePower) % modulus; // Используем просто charCodeAt
      basePower = (basePower * base) % modulus;
    }

    return hashValue;
  }

  insert(key, value) {

    if (typeof key != "string") {
      throw new Error("In operatia Insert, key must be a string");
    }

    // check load factor is normalize or not
    if (this.size / this.capacity > LOAD_FACTOR ) {
        this.resize()
    }

    // find slot 
    let slot = this.stringHash(key) % this.capacity;
    
    // check if this slot in table are empty, creating list

    let newNode = new Node(key, value);
    newNode.next = this.table[slot];
    this.table[slot] = newNode;
    this.size++; 
  }

  search(key) {
    
    let slot = this.stringHash(key) % this.capacity;

    let slotOfTable = this.table[slot];

    if (slotOfTable === undefined) {
        return null;
    }

    while(slotOfTable) {
        if (slotOfTable.key == key) {
            return slotOfTable.value;
        }
        slotOfTable = slotOfTable.next;
    }

    return undefined;
  }

  delete(key) {

    let slot = this.stringHash(key)  % this.capacity;
     let slotOfTable = this.table[slot];
     
     if (slotOfTable === undefined) return false;

     let dummy = new Node('', 0);
     dummy.next = slotOfTable;
     let cuurent = dummy;

     while(cuurent.next) {
        if (cuurent.next.key === key) {
            cuurent.next = cuurent.next.next;
            this.table[slot] = dummy.next;
            --this.size;
            return true;
        }
        cuurent = cuurent.next;
     }
     return false;
  }

  resize() {
    if (this.capacity * 2 > MAX_CAPACITY) {
        console.log("Resize limit reached, stopping.");
        return;
    }

    let newCapacity = this.nextPrimeAfterDouble(this.capacity);
    let oldTable = this.table;
    this.table = new Array(newCapacity);
    this.capacity = newCapacity;
    this.size = 0;

    for (let i = 0; i < oldTable.length; i++) {
      if (oldTable[i] !== undefined) {
        while (oldTable[i]) {
          this.insert(oldTable[i].key, oldTable[i].value);
          oldTable[i] = oldTable[i].next;
        }
      }
    }

    console.log("resize is Done");
  }

  isPrime(n) {
    if (n <= 1) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  }

  nextPrimeAfterDouble(n) {
    let doubled = n * 2;
    let next = doubled + 1;

    while (!this.isPrime(next)) {
      next++;
    }

    return next;
  }
  logTable() {
    console.log(this.table);
  }
}

