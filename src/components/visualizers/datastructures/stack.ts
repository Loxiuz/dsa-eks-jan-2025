class Stack {
  tail: Node | null;
  length: number;

  constructor() {
    this.tail = null;
    this.length = 0;
  }

  push(data: number): this {
    const node: Node = { prev: null, data };
    if (!this.tail) {
      this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail = node;
    }
    this.length++;
    return this;
  }

  pop(): number | undefined {
    if (this.length > 0) {
      const node = this.tail;
      this.tail = this.tail ? this.tail.prev : null;
      this.length--;
      return node?.data;
    }
  }

  peek(): number | undefined {
    if (this.length > 0) {
      return this.tail?.data;
    }
  }

  size(): number {
    return this.length;
  }

  get(index: number): number | undefined {
    if (this.length === 0) {
      console.log("List empty!");
      return;
    }

    if (index < 0 || index >= this.length) {
      console.log("Invalid index");
      return;
    }

    let i = 0;
    let node = this.tail;
    while (i !== index) {
      if (node) {
        node = node.prev;
      }
      i++;
    }
    return node?.data;
  }
}

interface Node {
  prev: Node | null;
  data: number;
}

export default Stack;
