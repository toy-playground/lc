class Trie {
  public children: Array<Trie | null>;
  public isEnd: boolean;
  constructor() {
    this.children = new Array<Trie | null>(26).fill(null);
    this.isEnd = false;
  }

  insert(word: string): void {
    let node = this as Trie;
    for (let i = 0; i < word.length; i++) {
      const ch = word[i];
      const index = ch.charCodeAt(0) - "a".charCodeAt(0);
      if (node.children[index] === null) {
        node.children[index] = new Trie();
      }
      node = node.children[index] as Trie;
    }
    node.isEnd = true;
  }

  search(word: string): boolean {
    let node = this as Trie;
    for (let i = 0; i < word.length; i++) {
      const ch = word[i];
      const index = ch.charCodeAt(0) - "a".charCodeAt(0);
      if (node.children[index] === null) {
        return false;
      }
      node = node.children[index] as Trie;
    }
    return node.isEnd;
  }

  startsWith(prefix: string): boolean {
    let node = this as Trie;
    for (let i = 0; i < prefix.length; i++) {
      const ch = prefix[i];
      const index = ch.charCodeAt(0) - "a".charCodeAt(0);
      if (node.children[index] === null) {
        return false;
      }
      node = node.children[index] as Trie;
    }
    return true;
  }
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
