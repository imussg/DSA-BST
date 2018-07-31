/*		3,1,4,6,9,2,5,7
				3
			   /  \
			  1    4
			   \    \
			    2    6
			         /\
			        5  9
			           /
			          7
THE TREE WITH ROOT REMOVED
				2
			   / \
			  1   4
			  	   \
			        6
			        /\
			       5  9
			          /
			         7
*/
class BinarySearchTree {
	
	constructor(key=null, value=null, parent=null) {
		this.key = key;
		this.value = value;
		this.parent = parent;
		this.left = null;
		this.right = null;
	}

	insert(key, value) {

		if(this.key === null) {
			this.key = key;
			this.value = value;
		} else if(key < this.key) {
			if(this.left === null) {
				this.left = new BinarySearchTree(key, value, this);
			} else {
				this.left.insert(key, value);
			}
		} else {
			if(this.right === null) {
				this.right = new BinarySearchTree(key, value, this);
			} else {
				this.right.insert(key, value);
			}
		}
	}

	find(key) {
		if(this.key === key) {
			return this.value;
		} else if(key < this.key && this.left) {
			return this.left.find(key);
		} else if(key > this.key && this.right) {
			return this.right.find(key);
		} else {
			return null;
		}
	}

	remove(key) {
		if(this.key === key) {
			if(this.right && this.left) {
				let min = this.right.findMin();
				this.value = min.value;
				this.key = min.key;
				min.remove(min.key);
			} else if(this.left) {
				this._replaceWith(this.left);
			} else if(this.right) {
				this._replaceWith(this.right);
			} else {
				this._replaceWith(null);
			}
		} else if(key < this.key && this.left) {
			this.left.remove(key);
		} else if(key > this.key && this.right) {
			this.right.remove(key);
		} else {
			return new Error("key not found");
		}
	}

	_replaceWith(node) {
		if(this.parent) {
			// connect passed in node to the parent of this
			if(this === this.parent.left) {
				this.parent.left = node;
			} else if(this === this.parent.right) {
				this.parent.right = node;
			}
			// set up passed in node to have the correct parent
			if(node) {
				node.parent = this.parent;
			}
		} else {
			if(bst) {
				this.value = bst.value;
				this.key = bst.key;
				this.left = bst.left;
				this.right = bst.right;
			} else {
				this.value = null;
				this.key = null;
				this.left = null;
				this.right = null;
			}
		}
	}

	_findMin() {
		if(!this.left) {
			return this;
		}
		this.left._findMin();
	}
}

function main() {
	let bst = new BinarySearchTree();
	// 3,1,4,6,9,2,5,7
	bst.insert(3, "value");
	bst.insert(1, "value1");
	bst.insert(4, "value2");
	bst.insert(6, "value3");
	bst.insert(9, "value4");
	bst.insert(2, "value5");
	bst.insert(5, "value6");
	bst.insert(7, "value7");

	// console.log(["Value at key 7: ", bst.find(7)]);
	bst.remove(7);
	console.log(bst.find(7));
}

main();