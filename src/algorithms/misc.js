function getNeighbours(rows, cols, grid, node) {
    let dr = [-1, +1, 0, 0]
    let dc = [0, 0, +1, -1]

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

export default getNeighbours 