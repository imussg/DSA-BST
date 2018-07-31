/*		3,1,4,6,9,2,5,7
                3
			   / \
			  1   4
			   \   \
			    2   6
			       / \
			      5   9
			         /
			        7
THE TREE WITH ROOT REMOVED
                2
			   / \
			  1   4
			  	   \
			        6
			       / \
			      5   9
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

	height() {
		let bottomNodes = this._findBottomNodes();
		let currentMaxHeight = 0;
		let count = 0;
		for(let i=0; i<bottomNodes.length; i++) {
			let iter = bottomNodes[i];
			while(iter) {
				count++;
				iter = iter.parent;
			}
			currentMaxHeight = count > currentMaxHeight ? count : currentMaxHeight;
			count = 0;
		}
		return currentMaxHeight;
	}

	isBalanced() {
		let bottomNodes = this._findBottomNodes();
		let heights = [];
		let count = 0;
		for(let i=0; i<bottomNodes.length; i++) {
			let iter = bottomNodes[i];
			while(iter) {
				count++;
				iter = iter.parent;
			}
			heights.push(count);
			count = 0;
		}
		let uniformHeight = 0;
		return heights;
		while(count < heights.length) {
			if(count === 0) {
				uniformHeight = heights[0];
			} else {
				if(uniformHeight !== heights[count]) {
					return false;
				}
			}
			count++;
		}
		return true;
	}

	printKeys() {
		if(this.left && this.right) {
			return `${this.key}--> (${this.left.printKeys()}) <|> (${this.right.printKeys()})`;
		} else if(this.left) {
			return `${this.key}--> (${this.left.printKeys()}) <|`;
		} else if(this.right) {
			return `${this.key}--> |> (${this.right.printKeys()})`;
		} else {
			return `${this.key}`;
		}
	}

	_findBottomNodes() {
		if(!this.left && !this.right) {
			return [this];
		} else if(this.left && this.right) {
			return [...this.left._findBottomNodes(), ...this.right._findBottomNodes()];
		} else if(this.left) {
			return [...this.left._findBottomNodes()];
		} else {
			return [...this.right._findBottomNodes()];
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

	bst.insert(3, "value");
	bst.insert(1, "value1");
	bst.insert(4, "value2");
	bst.insert(6, "value3");
	bst.insert(9, "value4");
	bst.insert(2, "value5");
	bst.insert(5, "value6");
	bst.insert(7, "value7");

	bst.remove(7);
	// console.log(bst.find(7));
	bst.insert(7, "value7");
	/*
	        3
		   / \
		  1   4
		   \   \
		    2   6
		       / \
		      5   9
		         /
		        7
	height = 5
	*/
	console.log(bst.printKeys());
	console.log(bst.height());
	
	console.log(isBst(bst));
	console.log(thirdLargest(bst));

	console.log(bst.isBalanced());
	let temp = new BinarySearchTree();
	/*
	        4
		   / \
		  2   5
		 / \   \
		1   3   6
	*/
	temp.insert(3, "value");
	temp.insert(2, "value1");
	temp.insert(4, "value2");
	temp.insert(6, "value3");
	temp.insert(1, "value4");
	temp.insert(3, "value5");
	// should be true
	console.log(temp.isBalanced());
}

function isBst(list) {
	if(list.left && list.right) {
		if(list.left.key < list.key && list.right.key > list.key) {
			return isBst(list.left) && isBst(list.right);
		} else {
			return false;
		}
	} else if(list.left) {
		if(list.left.key < list.key) {
			return isBst(list.left);
		} else {
			return false;
		}
	} else if(list.right) {
		if(list.right.key > list.key) {
			return isBst(list.right.key);
		} else {
			return false;
		}
	}
	return (list !== null);
}

function thirdLargest(list, max=[]) {
	if(max.length < 3) {
		max.push(list.key);
	} else {
		if(max[2] < list.key) {
			if(max[1] < list.key) {
				if(max[0] < list.key) {
					max[2] = max[1];
					max[1] = max[0];
					max[0] = list.key;
				} else {
					max[2] = max[1];
					max[1] = list.key;
				}
			} else {
				max[2] = list.key;
			}
		}
	}
	if(list.left && list.right) {
		thirdLargest(list.left, max);
		thirdLargest(list.right, max);
	} else if(list.left) {
		thirdLargest(list.left, max);
	} else if(list.right) {
		thirdLargest(list.right, max);
	}
	if(max.length === 3) {
		return max[2];
	}
	return null;
}

main();