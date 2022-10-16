function getNeighbours(rows, cols, grid, node) {
    let dr = [0, +1, 0, -1]
    let dc = [-1, 0, +1, 0]

    let neighbours = []
    for (let i = 0; i < 4; i++) {
        let rr = node.id[0] + dr[i]
        let cc = node.id[1] + dc[i]
        if (rr < 0 || cc < 0) continue
        if (rr >= rows || cc >= cols) continue
        if (grid[rr][cc].visited) continue
        if (grid[rr][cc].type === 'wall') continue
        
        neighbours.push(grid[rr][cc])
    }
    return neighbours
}

function backtrace(parent, start, end) {
    let path = [end] 
    while (path[path.length - 1] != start) {
        path.push(parent[path[path.length-1]])
    }
    path = path.slice(1,path.length-1)
    path.reverse()
    return path
}

export { getNeighbours, backtrace }