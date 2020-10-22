const bestFirst = (grid, start, end) => {
    const visitedNodes = [];
    let unvisitedNodes = [];
  
    start.h = getDistance(start, end)
    unvisitedNodes.push(start);
  
    while (unvisitedNodes.length > 0) {
      unvisitedNodes = sortByFCostNode(unvisitedNodes);
      const current = unvisitedNodes.shift()
      current.visited = true
      visitedNodes.push(current)
      console.log(current)
  
      if (current.x === end.x && current.y === end.y) return visitedNodes;
  
      const unvisitedNeighbours = getUnvisitedNeighbours(grid, current);
  
      for (let neighbour of unvisitedNeighbours) {
        if (neighbour.wall) continue;
    
        neighbour.h = getDistance(neighbour, end)
        neighbour.parent = current
    
        if (!unvisitedNodes.includes(neighbour)) unvisitedNodes.push(neighbour)
      }
    }
  };
  
  // const updateUnvisitedNeighbours = (grid, node, end) => {
    
  // };
  
  const getUnvisitedNeighbours = (grid, node) => {
    const neighbours = [];
    const { x, y } = node;
  
    // Top node
    if (y < grid.length - 1) neighbours.push(grid[y + 1][x]);
  
    // Top right node
    if (y < grid.length - 1 && x < grid[0].length - 1) neighbours.push(grid[y + 1][x + 1])
  
    // Right node
    if (x < grid[0].length - 1) neighbours.push(grid[y][x + 1]);
  
    // Bottom right node
    if (y > 0 && x < grid[0].length - 1) neighbours.push(grid[y - 1][x + 1])
  
    // Bottom node
    if (y > 0) neighbours.push(grid[y - 1][x]);
  
    // Bottom left node
    if (y > 0 && x > 0) neighbours.push(grid[y - 1][x - 1]);
  
    // Left node
    if (x > 0) neighbours.push(grid[y][x - 1]);
  
    // Top left node
    if (y < grid.length - 1 && x > 0) neighbours.push(grid[y + 1][x - 1]);
  
    const unvisitedNeighbours = neighbours.filter((node) => !node.visited);
    return unvisitedNeighbours;
  };
  
  const getDistance = (nodeA, nodeB) => {
    const horizontalDistance = Math.abs(nodeA.x - nodeB.x);
    const verticalDistance = Math.abs(nodeA.y - nodeB.y);
  
    if (horizontalDistance > verticalDistance) return 14 * verticalDistance + 10 * (horizontalDistance - verticalDistance)
    else return 14 * horizontalDistance + 10 * (verticalDistance - horizontalDistance)
  };
  
  const sortByFCostNode = (nodes) => {
    const sortedNodes = nodes.sort((a, b) => a.h - b.h);
  
    return sortedNodes
  };
  
  exports.bestFirst = bestFirst;
  