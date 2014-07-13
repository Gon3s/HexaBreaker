function GameManager(size, Actuator) 
{
  this.size   = size; 
  this.actuator       = new Actuator;
  this.groupe = [];

  this.canvas = document.getElementById("grid");
  this.ctx    = this.canvas.getContext("2d");

  var that = this;
  this.canvas.addEventListener('click', function() { that.click(event, that); }, false);

  this.setup();
}

GameManager.prototype.actuate = function() 
{
    this.actuator.actuator(this.grid, this.ctx);
}

GameManager.prototype.setup = function() 
{
    this.grid = new Grid(this.size); 

    this.canvas.width = this.size * this.grid.tileSize;
    this.canvas.height = this.size * this.grid.tileSize;
    
    this.actuate();
};

GameManager.prototype.click = function(evt, that) 
{
  var x = evt.layerX || evt.offsetX;
  var y = evt.layerY || evt.offsetY;
  // var tmp = [];

  x = Math.floor(x / 50);
  y = Math.floor(y / 50);

  if(that.grid.cells[x][y] == null) return;

  this.groupe = [];

  that.search(x, y, that.grid.cells[x][y].color);

  console.log(this.groupe);

  if(this.groupe.length > 1)
  {
    for(var i = 0 ; i < this.groupe.length ; i++)
    {
      // tmp = [];
      // // NULL // 0 to i // i + 1 to lenght
      // console.log(this.groupe[i].y - 1);
      // console.log(this.groupe[i].y + 1);
      // console.log(this.grid.cells.length);
      // tmp = tmp.concat(null, this.grid.cells[this.groupe[i].x].slice(0, this.groupe[i].y), this.grid.cells[this.groupe[i].x].slice(this.groupe[i].y + 1, this.grid.cells.length + 1));
      // console.log(tmp);
      // this.grid.cells[this.groupe[i].x] = tmp;
      this.grid.cells[this.groupe[i].x][this.groupe[i].y] = null;
    }
    that.actuate();
  }
  else
  {
    this.grid.cells[this.groupe[0].x][this.groupe[0].y].visited = false;
  }
};

GameManager.prototype.decaleHautBas = function(x, y) 
{
  if(typeof this.grid.cells[x][y - 1] != 'undefined' 
    && this.grid.cells[x][y - 1] != null 
    // && !this.grid.cells[x][y - 1].visited
  )  
  {
    // console.log(this.grid.cells[x][y - 1]);
    if(y > 0)
    {
      for (var i = y ; i > 0; i --) 
      {
        console.log(x + ' ' + i);
        this.grid.cells[x][i] = this.grid.cells[x][i - 1];
        // this.decaleHautBas(x, i);
      };
      this.grid.cells[x][0] = null;
    }    
  }
};

GameManager.prototype.search = function(x, y, color)
{
  // console.log('Search ' + x + ' ' + y + ' ' + color);
  if(this.grid.cells[x][y] != null && !this.grid.cells[x][y].visited)
  {
    if(this.grid.cells[x][y].color == color)
    {
      this.grid.cells[x][y].visited = true;
      this.groupe.push(this.grid.cells[x][y]);
      if(typeof this.grid.cells[x-1] != 'undefined')
      {
        this.search(x-1, y, color);
      }
      if(typeof this.grid.cells[x][y-1] != 'undefined')
      {
        this.search(x, y-1, color);
      }
      if(typeof this.grid.cells[x+1] != 'undefined')
      {
        this.search(x+1, y, color);
      }
      if(typeof this.grid.cells[x][y+1] != 'undefined')
      {
        this.search(x, y+1, color);
      }
    }
  }
}