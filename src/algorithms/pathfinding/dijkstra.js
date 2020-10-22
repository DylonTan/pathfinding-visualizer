const dijkstra = (grid, start, end) => {
  const visitedNodes = [];
  start.distance = 0;
  let unvisitedNodes = getAllNodes(grid);

  while (unvisitedNodes.length > 0) {
    unvisitedNodes = sortByClosestNode(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();

    if (closestNode.wall) continue;
    if (closestNode.distance === Infinity) return visitedNodes;

    closestNode.visited = true;
    visitedNodes.push(closestNode);

    if (closestNode.x === end.x && closestNode.y === end.y) return visitedNodes;

    updateUnvisitedNeighbours(grid, closestNode);
  }

  return visitedNodes;
};

const getShortestPath = (start, end) => {
  let current = end;
  let shortestPath = [];

  while (current !== start) {
    shortestPath.push(current);
    current = current.parent;
  }

  return shortestPath.reverse();
};

const updateUnvisitedNeighbours = (grid, node) => {
  const unvisitedNeighbours = getUnvisitedNeighbours(grid, node);

  for (let neighbour of unvisitedNeighbours) {
    neighbour.distance = node.distance + 1;
    neighbour.parent = node;
  }
};

const getUnvisitedNeighbours = (grid, node) => {
  const neighbours = [];
  const { x, y } = node;

  // Top node
  if (y < grid.length - 1) neighbours.push(grid[y + 1][x]);

   // Right node
  if (x < grid[0].length - 1) neighbours.push(grid[y][x + 1]);

  // Bottom node
  if (y > 0) neighbours.push(grid[y - 1][x]);

  // Left node
  if (x > 0) neighbours.push(grid[y][x - 1]);

  const unvisitedNeighbours = neighbours.filter((node) => !node.visited);
  return unvisitedNeighbours;
};

const getAllNodes = (grid) => {
  const nodes = [];

  for (let row of grid) {
    for (let node of row) {
      nodes.push(node);
    }
  }

  return nodes;
};

const sortByClosestNode = (nodes) => {
  const sortedNodes = nodes.sort((a, b) => a.distance - b.distance);

  return sortedNodes;
};

exports.dijkstra = dijkstra;
exports.getShortestPath = getShortestPath;
