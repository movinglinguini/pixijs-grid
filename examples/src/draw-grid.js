function drawGrid(gridColor=0xffffff, drawEdges=true) {
  const app = new PIXI.Application();
  app.view.height = window.innerHeight * .33;
  app.view.width = window.innerWidth * .33;
  document.querySelector('.container').appendChild(app.view);
  
  const grid = new PixiJSGrid(app.view.height * .75, null, { color: gridColor }, true, drawEdges);
  grid.x = (app.view.width / 2) - (grid.gridWidth / 2);
  grid.y = (app.view.height / 2) - (grid.gridWidth / 2);
  app.stage.addChild(grid.drawGrid());

  return { app, grid };
}

// Draw the default grid
drawGrid();

// Draw the grid with red lines
drawGrid(0xff0000);

// Draw the grid without edges
drawGrid(0xffffff, false);

// Draw the grid and then rotate it about its center
const { app, grid } = drawGrid();
grid.pivot.x  = grid.gridWidth * 0.5;
grid.pivot.y = grid.gridWidth * 0.5;
grid.x += grid.gridWidth / 2;
grid.y += grid.gridWidth / 2;

app.ticker.add((delta) => {
  grid.rotation -= 0.01 * delta;
})

// You can keep playing with the grid below!
// const drawGrid = drawGrid(0xffffff, true);
