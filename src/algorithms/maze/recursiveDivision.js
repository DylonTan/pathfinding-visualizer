const drawnWalls = []

// Main function
const recursiveDivision = (grid, minX, maxX, minY, maxY) => {
    addOuterWalls(grid)
    recurse(grid, minX, maxX, minY, maxY)
    return drawnWalls
}

// Recursive function
const recurse = (grid, minX, maxX, minY, maxY) => {
    // Calculate subgrid width and height
    const width = maxX - minX
    const height = maxY - minY

    // Return if no space is left
    if (width < 2 || height < 2) return

    let orientation

    // Sets orientation to vertical if subgrid is wider and horizontal if subgrid is taller
    if (width > height) orientation = 'VERTICAL'
    else orientation = 'HORIZONTAL'

    if (orientation === 'HORIZONTAL') {
        // Get wall's y coordinates (even)
        const wallY = getEvenInt(getRandomInt(minY, maxY))

        // Get passage's x coordinates (odd)
        const passageX = getOddInt(getRandomInt(minX, maxX))
        
        // Draw horizontal wall and passage 
        for (let i = minX; i <= maxX; i++) {
            if (i !== passageX) {
                const node = grid[wallY][i]
                node.wall = true
                drawnWalls.push(node)
            }
        }

        // Recurse for left subgrid
        recurse(grid, minX, maxX, minY, wallY - 1)

        // Recurse for right subgrid
        recurse(grid, minX, maxX, wallY + 1, maxY)
    } else {
        // Get wall's x coordinates (even)
        const wallX = getEvenInt(getRandomInt(minX, maxX))

        // Get passage's y coordinates (odd)
        const passageY = getOddInt(getRandomInt(minY, maxY))
        
        // Draw vertical wall and passage
        for (let i = minY; i <= maxY; i++) {
            if (i !== passageY) {
                const node = grid[i][wallX]
                node.wall = true
                drawnWalls.push(node)
            }
        }

        // Recurse for bottom subgrid
        recurse(grid, minX, wallX - 1, minY, maxY)

        // Recurse for top subgrid
        recurse(grid, wallX + 1, maxX, minY, maxY)
    }
}

// Returns smaller even integer
const getEvenInt = (num) => {
    return Math.floor(num / 2) * 2
}

// Returns smaller odd integer
const getOddInt = (num) => {
    return Math.floor(num / 2) * 2 + 1
}

// Returns integer between min (inclusive) and max values (inclusive)
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Sets outer walls of grid 
const addOuterWalls = (grid) => {
    // Sets bottom row walls
    for (let i = 0; i < grid[0].length; i++) {
        const node = grid[0][i]
        node.wall = true

        // Push wall node to animation array
        drawnWalls.push(node)
    }

    // Sets top row walls
    for (let i = 0; i < grid[0].length; i++) {
        const node = grid[grid.length - 1][i]
        node.wall = true

        // Push wall node to animation array
        drawnWalls.push(node)
    }

    // Sets left column walls
    for (let i = 0; i < grid.length; i++) {
        const node = grid[i][0]
        node.wall = true

        // Push wall node to animation array
        drawnWalls.push(node)
    }

    // Sets right column walls 
    for (let i = 0; i < grid.length; i++) {
        const node = grid[i][grid[i].length - 1]
        node.wall = true

        // Push wall node to animation array
        drawnWalls.push(node)
    }

    return drawnWalls
}

exports.recursiveDivision = recursiveDivision