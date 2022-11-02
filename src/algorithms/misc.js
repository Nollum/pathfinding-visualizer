function getNeighbours(rows, cols, grid, node) {
    let dr = [0, +1, 0, -1]
    let dc = [-1, 0, +1, 0]

    let neighbours = []
    let neighbourDirections = []
    const directions = ['left', 'down', 'right', 'up'] 
    for (let i = 0; i < 4; i++) {
        let rr = node.id[0] + dr[i]
        let cc = node.id[1] + dc[i]
        if (rr < 0 || cc < 0) continue
        if (rr >= rows || cc >= cols) continue
        if (grid[rr][cc].visited) continue
        if (grid[rr][cc].type === 'wall') continue
        
        neighbours.push(grid[rr][cc])
        neighbourDirections.push(directions[i])
    }
    return neighbours
}

function backtrace(parent, start, end) {
    let path = [end] 
    while (path[path.length - 1][0] != start[0] || path[path.length - 1][1] != start[1]) {
        path.push(parent[path[path.length-1]])
    }
    path = path.slice(1,path.length-1)
    path.reverse()
    return path
}

function getDistance(currentNode, targetNode) {
    let currentPos = currentNode.id
    let targetPos = targetNode.id
    let x1 = parseInt(currentPos[0])
    let y1 = parseInt(currentPos[1])
    let x2 = parseInt(targetPos[0])
    let y2 = parseInt(targetPos[1])
    let distance = Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1 - y2, 2))
    return distance 
}

// function updateNode(node) {

// }

export { getNeighbours, backtrace, getDistance }