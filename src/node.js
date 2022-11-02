function Node(id, seqNum, type, visited) {
    this.id = id
    this.seqNum = seqNum
    this.type = type
    this.weight = 1 
    this.distance = Infinity 
    this.visited = visited
}

export default Node