import { backtrace, getNeighbours } from "./misc"

function bfs(grid, startNode) {
    let nodes = []
    let queue = [] 
    let parent = {} 
    let endNode
    nodes.push(startNode)
    queue.push(startNode)
    startNode.visited = true 
    while (queue.length) {
        let v = queue.shift()
        let neighbours = getNeighbours(grid.length, grid[0].length, grid, v)
        for (let i = 0; i < neighbours.length; i++) {
            if (!neighbours[i].visited) {
                queue.push(neighbours[i])
                nodes.push(neighbours[i])
                neighbours[i].visited = true
            }
            parent[neighbours[i].id] = v.id
            if (neighbours[i].type === 'end') { 
                endNode = neighbours[i]
                return [nodes, backtrace(parent, startNode.id, endNode.id)] 
            }
        }
    }

    return [nodes, null]

}

export default bfs 