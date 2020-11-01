![](https://res.cloudinary.com/digjdosfu/image/upload/v1604200196/Articles/shortest_path_app_txwttr.png)

Dijkstra's algorithm (or Dijkstra's Shortest Path First algorithm) is an algorithm for finding the shortest paths between nodes in a graph.

### Step 1 : Prepare the Data Structure

To implement a table like structure, I created a 2-D array. I can access each cell using row,column coordinates:

```
| 0,0 | 0,1 | 0,2 | 0,3 | 0,4 |
| 1,0 | 1,1 | 1,2 | 1,3 | 1,4 |
| 2,0 | 2,1 | 2,2 | 2,3 | 2,4 |
| 3,0 | 3,1 | 3,2 | 3,3 | 3,4 |
```

### Step 2 : Track Neighbors and Costs

We need to keep track of each cell along with its neighbors and the cost to reach them. I created an object for each cell, and a child object for its neighbors. For example, 0,0 can access 0,1 and 1,0 each with a cost of '1':

```javascript
const graph = {
	0,0: { "0,1": 1, "1,0": 1 },
	0,1: { "0,0": 1, "0,2": 1, "1,1": 1 },
	0,2: { "0,3": 1, "0,1": 1, "1,2": 1 },
	0,3: { "0,4": 1, "0,2": 1, "1,3": 1 },
	0,4: { "0,5": 1, "0,3": 1, "1,4": 1 },
	.
	.
};
```

### Step 3 : Update Graph for User Placements

Once Start and Finish positions have been defined, update the graph. We will need to do the same for Walls and Weights. Walls will have a cost of infinity, and Weights will have a cost of 20.

```javascript
const graph = {
	start: { "0,1": 1, "1,0": 1 },
	0,1: {"0,0": 1, "0,2": 1, "1,1": 1 },
	0,2: {"0,3": 1, "0,1": 1, "1,2": 1 },
	0,3: {"0,4": 1, "0,2": 1, "1,3": 1 },
	0,4: {"0,5": 1, "0,3": 1, "1,4": 1 },
	.
	.
	finish: { "1,2": 1, "3,2": 1, "2,1": 1, "2,3": 1 }
};
```

### Step 4 : Algorithm

The basic steps to finding the shortest path to the finish are the following.

1.  Move to a node that we haven’t visited, choosing the fastest node to get to first.
2.  At that node, check how long it will take us to get to each of its neighboring nodes. Add the neighbor’s weight to the time it took to get to the node we’re currently on.
3.  Check whether that calculated time is faster than the previously known shortest time to get to that node. If it _is_ faster, update our records to reflect the new shortest time. We’ll also add this node to our line of nodes to visit next. That line will be arranged in order of shortest calculated time to reach.

So we’re basically calculating the time it takes to reach one node to the next and picking the shortest path to the wanted node.

###### reference: [https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)
