function Grid(size)
{
  this.size = size;
  this.tileSize = 50;  
  this.lastColumn = size;
  this.lastLigne = [];
  this.state = 0;

  this.cells = this.empty(); 

  // console.log(this.cells);
}

Grid.prototype.empty = function () 
{
  var cells = [];

  for(var x = 0 ; x < this.size ; x++)
  {
    cells[x] = [];
    this.lastLigne[x] = this.size;

    for(var y = 0 ; y < this.size ; y++)
    {
      cells[x][y] =  new Tile(x, y);
    }
  }

  // console.log(cells);

  return cells;
};