const items = [
  { id: 1, parent: 'root' },
  { id: 2, parent: 1, type: 'test' },
  { id: 3, parent: 1, type: 'test' },

  { id: 4, parent: 2, type: 'test' },
  { id: 5, parent: 2, type: 'test' },
  { id: 6, parent: 2, type: 'test' },

  { id: 7, parent: 4, type: null },
  { id: 8, parent: 4, type: null },
];

class TreeStore {
  constructor(items) {
    this.items = [...items];
  }

  getAll() {
    return this.items;
  }

  getItem(id) {
    return this.items.find((node) => node.id === id);
  }

  getChildren(id) {
    return this.items.filter((node) => node.parent === id);
  }

  getAllChildren(id) {
    let parentsArray = this.getChildren(id);

    for (const parent of parentsArray) {
      if (this.getChildren(parent.id)) {
        parentsArray = parentsArray.concat(this.getAllChildren(parent.id));
      }
    }

    return parentsArray;
  }

  getAllParents(id) {
    const parents = [];
    let item = this.getItem(id);
    if (item === undefined) return parents;
    while (true) {
      if (item.parent === 'root') return parents;
      item = this.getItem(item.parent);
      parents.push(item);
    }
  }
}

const ts = new TreeStore(items);
console.log('getAll\n', ts.getAll());
console.log('getItem(7)\n', ts.getItem(7));
console.log('getChildren(4)\n', ts.getChildren(4));
console.log('getChildren(2)\n', ts.getChildren(2));
console.log('getAllChildren(2)\n', ts.getAllChildren(2));
console.log('getAllParents(7)\n', ts.getAllParents(7));
