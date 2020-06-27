const expect = chai.expect;

const gridContainer = document.querySelector('.grid-container');
const gridBB = gridContainer.getBoundingClientRect();

const app = new PIXI.Application();
gridContainer.appendChild(app.view);

describe('PIXI Grid', function() {
  const testObjs = {
    gridWidth: gridBB.width * .33,
    correctedWidth: Math.ceil(Math.sqrt(gridBB.width * .33)) ** 2,
  };
  beforeEach(() => {
    if (testObjs.grid) {
      testObjs.grid.destroy();
    }
    
    testObjs.grid = new PixiJSGrid(testObjs.gridWidth);
    testObjs.grid.x += 10;
    testObjs.grid.y += 10;
    testObjs.grid.drawGrid();
    app.stage.addChild(testObjs.grid);
  });

  it('should extend PIXI Graphics', () => {
    expect(PixiJSGrid.prototype instanceof PIXI.Graphics).to.equal(true);
  });

  describeGridProperties(testObjs);
  describeGridMethods(testObjs);

  // afterEach(() => {
  //   testObjs.grid.cellSize = null;
  //   testObjs.grid.clearGrid(false);
  //   testObjs.grid.lineStyle(1, 0xffffff, 1, 0.5, true);
  //   testObjs.grid.drawGrid();
  // });
});

function describeGridProperties(testObjs) {
  describe('PIXI Grid Properties', () => {
    it('should have a "width" property', () => {
       expect(testObjs.grid).to.have.property('width');
    });

    it('should have a "lineStyle" property', () => {
      expect(testObjs.grid).to.have.property('lineStyle');
    });

    it('should have a "cellSize" property', () => {
      expect(testObjs.grid).to.have.property('cellSize');
    });

    it(`should default to a value close to ${Math.sqrt(testObjs.correctedWidth)} for "_cellSize"`, () => {
      expect(testObjs.grid.cellSize).to.equal(Math.sqrt(testObjs.correctedWidth));
    });

    it(`should default have the amount of lines default to be ${Math.ceil(Math.sqrt(testObjs.correctedWidth))}`, () => {
      expect(testObjs.grid.amtLines).to.equal(Math.ceil(Math.sqrt(testObjs.correctedWidth)));
    });

    it(`should have a grid width of ${testObjs.gridWidth} when the cell size is manually changed`, () => {
      testObjs.grid.cellSize = testObjs.gridWidth * .5;
      testObjs.grid.drawGrid();
      expect(testObjs.grid.gridWidth).to.equal(testObjs.gridWidth);
    });

    it(`should have the corrected width (${testObjs.correctedWidth}) when the cell size is at default`, () => {
      testObjs.grid.cellSize = null;
      expect(testObjs.grid.gridWidth).to.equal(testObjs.correctedWidth);
    });

    it(`should recalculate the line count after the cell division value has been changed`, () => {
      testObjs.grid.cellSize = 10;
      expect(testObjs.grid.amtLines).to.equal(Math.floor(testObjs.gridWidth / 10));
    });
  });
}

function describeGridMethods(testObjs) {
  describe('PIXI Grid Methods', () => {
    it('should have a function called "drawGrid"', () => {
      expect(testObjs.grid).to.respondTo('drawGrid');
    });

    it('should have a function called "clearGrid"', () => {
      expect(testObjs.grid).to.respondTo('clearGrid');
    });

    it('should have a function called "on" for event listening', () => {
      expect(testObjs.grid).to.respondTo('on');
    });

    it('should have a function called "getCellCoordinates"', () => {
      expect(testObjs.grid).to.respondTo('getCellCoordinates');
    });

    it('should retain the same line width after "clearGrid"', () => {
      testObjs.grid.lineStyle(10);
      testObjs.grid.drawGrid();
      testObjs.grid.clearGrid();

      expect(testObjs.grid.line.width).to.equal(10);
    });

    it('should retain the same line color after "clear grid"', () => {
      const lineColor = 0xff0000;
      testObjs.grid.lineStyle(1, lineColor);
      testObjs.grid.drawGrid();
      testObjs.grid.clearGrid();
      expect(testObjs.grid.line.color).to.equal(lineColor);
    });
    
    it('should return cell (0, 0)', () => {
      expect(testObjs.grid.getCellCoordinates(11, 11).x).to.equal(0);
      expect(testObjs.grid.getCellCoordinates(11, 11).y).to.equal(0);
    });

    it(`should return cell (${Math.floor(testObjs.correctedWidth / Math.sqrt(testObjs.correctedWidth))}, ${0})`, () => {
      const x = testObjs.grid.gridWidth - 1;
      const y = 11;
      expect(testObjs.grid.getCellCoordinates(x, y).x).to.equal(testObjs.grid.amtLines - 1);
      expect(testObjs.grid.getCellCoordinates(x, y).y).to.equal(0);
    });
  });
}
