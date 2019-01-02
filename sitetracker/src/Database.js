import idb from 'idb';

class Database {
  constructor() {
    this.dbPromise = idb.open('database', 1, upgradeDB =>{
      upgradeDB.createObjectStore('store')
    });

    this.get = this.get.bind(this);
    this.set = this.set.bind(this);
    this.delete = this.delete.bind(this);
    this.clear = this.clear.bind(this);
  }

  get(key) {
    return this.dbPromise.then(db => {
      //console.log(key);
      return db.transaction('store')
        .objectStore('store').get(key);
    }).catch(err=>{
      console.log('db error, clearing db...');
      this.clear();
    })
  }

  set(key, val) {
    return this.dbPromise.then(db => {
      const tx = db.transaction('store', 'readwrite');
      tx.objectStore('store').put(val, key);
      //console.log(key, val);
      return tx.complete;
    })
  }

  delete(key) {
    return this.dbPromise.then(db => {
      const tx = db.transaction('store', 'readwrite');
      tx.objectStore('store').delete(key);
      return tx.complete;
    })
  }

  clear() {
    return this.dbPromise.then(db => {
      const tx = db.transaction('store', 'readwrite');
      tx.objectStore('store').clear();
      return tx.complete;
    })
  }

}

export default Database;
