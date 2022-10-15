<script>
  import { onMount } from "svelte"
  import bfs from "./algorithms/bfs";
  import Node from './node'

  const COLS = 30 
  const ROWS = 23 

  const HVR_CLR = '#000000'

  let cell_size
  let grid = []
  let container 
  let container_width
  let disabled = false

  let startNode
  let endNode

  let unHoverable = ['start', 'end', 'wall']

  let algos = ['Breadth-First Search', 'Depth-First Search']
  let selected

  let multiCellMode = false
  
  const initializeGrid = () => {
    for (let i = 0; i < ROWS; i++) {
      grid[i] = []
      for (let j = 0; j < COLS; j++) {
       
        grid[i][j] = new Node([i,j], i * COLS + j, 'empty', false)
      }
    }
    startNode = grid[Math.round(ROWS/2)-1][2]
    endNode = grid[Math.round(ROWS/2)-1][COLS-3]
    startNode.type = 'start'
    endNode.type = 'end'
  }

  let cellStyles = {'start': '#FFFFFF', 'empty': 'inherit', 'end': '#FFFFFF', 'wall': '#000000', 'path': '#222222'}
  let cellImages = {'start': 'start.svg', 'end': 'finish.svg'}

  const handleMouseOver = (event) => {
    event.target.style.setProperty('background-color', HVR_CLR)
  }

  const handleMouseOut = (event) => {
    event.target.style.setProperty('background-color', 'inherit') 
  }

  const handleMouseMove = (event) => {
    if (multiCellMode) {
      let [y, x] = event.target.id.split('-')
      grid[y][x].type = 'wall' 
    }
  }

  const handleMouseDown = (event) => {
    event.preventDefault()
    multiCellMode = true
  }

  const handleMouseUp = (event) => {
    if (multiCellMode === true) {
      multiCellMode = false
    } else {
      let [y, x] = event.target.id.split('-')
      grid[y][x].type = 'wall'  
    }
  }

  const handleReset = () => {
    grid = grid.map((row) => row.map((node) => { node.visited = false; return node }))
  }

  const handleClear = (event) => {
    disabled = false
    handleReset()
    multiCellMode = false
    grid = grid.map((row) => row.map((cell) => { 
      if (cell.type !== 'start' && cell.type !== 'end') {
        cell.type = 'empty'
      } 
      return cell
    }))
  }

  const visualize = async (nodes, path, interval) => {
    for (let i = 0; i < nodes.length; i++) {
      grid[nodes[i].id[0]][nodes[i].id[1]].visited = true
      await new Promise(resolve => setTimeout(resolve, interval));
      grid = grid
    }

    if (path) {
      for (let i = 0; i < path.length; i++) {
        let [y,x] = path[i]
        grid[y][x].type = 'path'
        await new Promise(resolve => setTimeout(resolve, interval*10));
        grid = grid
      }
    }
  }

  const handleStart = (event) => {
    disabled = true
    let deepCopy = structuredClone(grid)
    let nodes, path 
    if (selected === algos[0]) {
      [nodes, path] = bfs(deepCopy, startNode)
    }
    visualize(nodes, path, 1)
  }

  onMount(() => {
    initializeGrid()
    cell_size = container_width / COLS
    container.style.setProperty('--grid-rows', ROWS)
    container.style.setProperty('--grid-cols', COLS) 
  })
</script>

<main>
    <nav>
      <select bind:value={selected}>
        {#each algos as algo}
          <option value={algo}>
            {algo}
          </option>
        {/each}
      </select>
      <button id="clearBtn" on:click={handleClear}>
        clear
      </button>
      <button id="startBtn" on:click={handleStart}>
        start 
      </button>
    </nav>
    <div class="container" 
      bind:clientWidth={container_width} 
      bind:this={container}
      on:mousedown={disabled ? () => {} : handleMouseDown}
      on:mouseup={disabled ? () => {} : handleMouseUp}
      >
      {#each grid as row, i}
        {#each row as col, j} 
          {#if unHoverable.includes(grid[i][j].type)}
            <div 
            class="cell" id="{i}-{j}"
            style="width: {cell_size}px; 
                  height: {cell_size}px; 
                  background-color: {cellStyles[grid[i][j].type]}; 
                  background-image: url({cellImages[grid[i][j].type]}); 
                  background-size: contain;"
            />
          {:else} 
            <div 
            class="cell" id="{i}-{j}"
            style="width: {cell_size}px; height: {cell_size}px; background-color: {grid[i][j].type === 'path' ? '#23CF3A' : grid[i][j].visited ? 'yellow' : cellStyles[grid[i][j].type]}"
            on:mouseover={disabled ? () => {} : handleMouseOver}
            on:mouseout={disabled ? () => {} : handleMouseOut}
            on:mousemove={disabled ? () => {} : handleMouseMove}
            on:mouseup={disabled ? () => {} : handleMouseUp}
            on:focus={() => {}} 
            on:blur={() => {}}
            >
            </div>
          {/if}
        {/each}
      {/each}
    </div> 
</main>

<style>

  main {
    display: flex;
    height: 100%;
    width: 100%;
    padding: 0;
    justify-content: center;
    align-items: center;
    background-color: rgb(32, 32, 32);
  }

  nav {
    position: absolute;
    top: 0;
    left: 0;
    height: 10vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eeeeee;
  }

  nav > * {
    margin: 0 20px 0 20px;
  }

  select {
    outline: none;
    border: none;
  }

  button {
    width: 100px;
    max-width: 100%; 
    line-height: 30px;
    background-color: #FFFFFF;
    border: 0;
    border-radius: .5rem;
    box-sizing: border-box;
    color: #111827;
    font-family: "Inter var",ui-sans-serif,system-ui,-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: .875rem;
    font-weight: 600;
    line-height: 1.25rem;
    padding: .75rem 1rem;
    text-align: center;
    text-decoration: none #D1D5DB solid;
    text-decoration-thickness: auto;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  }

  button:hover {
    background-color: rgb(249,250,251);
  }

  button:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }

  button:focus-visible {
    box-shadow: none;
  }
  
  .container {
    height: auto;
    width: 800px;
    display: grid; 
    grid-template-rows: repeat(var(--grid-rows), 1fr);
    grid-template-columns: repeat(var(--grid-cols), 1fr);
    background: linear-gradient(to right, red, purple);
    opacity: 0.8;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10vh;
    padding: 0;
    border: 4px solid #FFFFFF;
  } 

  .cell {
    margin:0;
    padding:0;
    outline: 1px solid #000;
    border: 1px solid #000;
    transition: background-color 0.2s ease-out;
  }
  
</style>



