const randomMaze = (grid) => {
    const animations = []

    for (let row of grid) {
        for (let node of row) {
            const random = getRandomInt(1, 10)
            if (random > 8) {
                node.wall = true
                animations.push(node)
            }
        }
    }

    return animations
}

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

exports.randomMaze = randomMaze