import getNeighbours from "./misc"

function backtrace(parent, start, end) {
    let path = [end] 
    while (path[path.length - 1] != start) {
        path.push(parent[path[path.length-1]])
    }
    path = path.slice(1,path.length-1)
    path.reverse()
    return path
}

function bfs(grid, startNode) {
    let nodes = []
    let queue = [] 
    let parent = {} 
    let endNode
    nodes.push(startNode)
    queue.push(startNode)
    startNode.visited = true 
    while (queue.length > 0) {
        let v = queue.shift()
        nodes.push(v)
        let neighbours = getNeighbours(grid.length, grid[0].length, grid, v)
        for (let i = 0; i < neighbours.length; i++) {
            if (!neighbours[i].visited) queue.push(neighbours[i])
            neighbours[i].visited = true
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