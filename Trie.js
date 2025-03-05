/**
 * Created by aarnavjindal on 07/05/20.
 */

export { Trie };

class TrieNode {
  constructor() {
    this.children = Array(10).fill(null);
    this.parent = null;
  }
}

class ContactNode {
  constructor(name, number, parent) {
    this.name = name;
    this.number = number;
    this.parent = parent;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
    // Initialize with some contacts.
    let init = [
      ["Aarnav", "123456"],
      ["Akul", "123546"],
      ["Shriya", "123654"],
      ["Prateek", "123465"]
    ];
    // Build the trie for each contact.
    for (let i = 0; i < init.length; i++) {
      this.add(init[i][1], init[i][0], 0, this.root);
    }
  }

  // Adds a contact using its phone number as the key.
  add(number, name, pos = 0, node = this.root) {
    if (pos === number.length - 1) {
      node.children[Number(number[pos])] = new ContactNode(name, number, node);
      return;
    }
    const digit = Number(number[pos]);
    if (node.children[digit] === null) {
      let newnode = new TrieNode();
      node.children[digit] = newnode;
      newnode.parent = node;
    }
    this.add(number, name, pos + 1, node.children[digit]);
  }

  // Recursively collects all contacts (leaf nodes) under a given node.
  findAll(node) {
    if (node === null) return;
    if (node instanceof ContactNode) {
      this.res.push(node);
      return;
    }
    for (let i = 0; i < 10; i++) {
      this.findAll(node.children[i]);
    }
  }

  // Searches the trie by phone number prefix.
  searchPrefix(prefix) {
    let node = this.root;
    for (let ch of prefix) {
      const digit = Number(ch);
      if (node.children[digit] === null) {
        return []; // No match for this prefix.
      }
      node = node.children[digit];
    }
    this.res = [];
    this.findAll(node);
    return this.res;
  }

  // Returns all contacts stored in the trie.
  getAllContacts() {
    this.res = [];
    this.findAll(this.root);
    return this.res;
  }

  // Deletes a contact by its phone number.
  del(number, pos = 0, node = this.root) {
    if (node === null) return;
    if (pos === number.length - 1) {
      node.children[Number(number[pos])] = null;
      return;
    }
    const digit = Number(number[pos]);
    if (node.children[digit] === null) return;
    this.del(number, pos + 1, node.children[digit]);
  }
}

