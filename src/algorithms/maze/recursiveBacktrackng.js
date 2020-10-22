const recursiveBacktracking = (grid, minX, maxX, minY, maxY) => {
    const animations = []

    fillGridWithWalls(grid)

    const randomX = getRandomInt(minX, maxX)
    const randomY = getRandomInt(minY, maxY)

    const current = grid[randomY][randomX]
   
    recurse(grid, current, animations)

    setAllUnvisited(grid)
    return animations
}

const recurse = (grid, node, animations) => {
    const adjacentNeighbours = getAdjacentNeighbours(grid, node)

    if (adjacentNeighbours.length < 1) return

    const randomNeighbours = shuffle(adjacentNeighbours)

    for (let pairs of randomNeighbours) {
        if (!pairs[1].visited) {
            for (let node of pairs) {
                node.wall = false
                node.visited = true
                animations.push(node)
            }

            let current = pairs[1]

            recurse(grid, current, animations)
        }
    }
}

const getAdjacentNeighbours = (grid, node) => {
    const neighbours = []
    const { x, y } = node;

    // Top node
    if (y < grid.length - 2) {
        let node = grid[y + 2][x]
        let unvisitedCornerNeighbours = getUnvisitedCornerNeighbours(grid, node)

        if (unvisitedCornerNeighbours.length === 4) {
            let twoAdjacents = []
            twoAdjacents.push(grid[y + 1][x]);
            twoAdjacents.push(node);
            neighbours.push(twoAdjacents)
        }
    }

    // Right node
    if (x < grid[0].length - 2) {
        let node = grid[y][x + 2]
        let unvisitedCornerNeighbours = getUnvisitedCornerNeighbours(grid, node)

        if (unvisitedCornerNeighbours.length === 4) {
            let twoAdjacents = []
            twoAdjacents.push(grid[y][x + 1]);
            twoAdjacents.push(node);
            neighbours.push(twoAdjacents)
        }
    }

    // Bottom node
    if (y > 1) {
        let node = grid[y - 2][x]
        let unvisitedCornerNeighbours = getUnvisitedCornerNeighbours(grid, node)

        if (unvisitedCornerNeighbours.length === 4) {
            let twoAdjacents = []
            twoAdjacents.push(grid[y - 1][x]);
            twoAdjacents.push(node);
            neighbours.push(twoAdjacents)
        }
    }

    // Left node
    if (x > 1) {
        let node = grid[y][x - 2]
        let unvisitedCornerNeighbours = getUnvisitedCornerNeighbours(grid, node)

        if (unvisitedCornerNeighbours.length === 4) {
            let twoAdjacents = []
            twoAdjacents.push(grid[y][x - 1]);
            twoAdjacents.push(node);
            neighbours.push(twoAdjacents)
        }
    }

    return neighbours
}

const getUnvisitedCornerNeighbours = (grid, node) => {
    const neighbours = [];
    const { x, y } = node;

    // Top right node
    if (y < grid.length - 1 && x < grid[0].length - 1) neighbours.push(grid[y + 1][x + 1])

    // Bottom right node
    if (y > 0 && x < grid[0].length - 1) neighbours.push(grid[y - 1][x + 1])

    // Bottom left node
    if (y > 0 && x > 0) neighbours.push(grid[y - 1][x - 1]);

    // Top left node
    if (y < grid.length - 1 && x > 0) neighbours.push(grid[y + 1][x - 1]);

    return neighbours.filter((node) => !node.visited)
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const fillGridWithWalls = (grid) => {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const node = grid[i][j]
            node.wall = true
            
        }
    }
}

const setAllUnvisited = (grid) => {
    for (let row of grid) {
        for (let node of row) {
            node.visited = false
        }
    }
}

exports.recursiveBacktracking = recursiveBacktracking