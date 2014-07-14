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
  //== R�cup�ration de la position du clic de la souris
  var x = evt.offsetX || evt.layerX;
  var y = evt.offsetY || evt.layerY;

  //== A partir de la position de la souris on r�cup�re la position du Tile.
  x = Math.floor(x / 50);
  y = Math.floor(y / 50);

  //== Si on a cliqu� sur une Tile vide on sort
  if(that.grid.cells[x][y] == null) return;

  //== On r�initialise le tableau qui contiendra le groupe de Tile s�lectionn�
  this.groupe = [];

  //== On recherche le groupe de Tile
  this.search(x, y, this.grid.cells[x][y].color);

  //== Si le groupe de Tile est peupl� d'au moins 2 Tile
  if(this.groupe.length > 1)
  {
    // console.log(this.groupe);
    //== On parcours le groupe de Tile
    for(var i = 0 ; i < this.groupe.length ; i++)
    {
      // console.log(this.groupe[i].x + ' ' + this.groupe[i].y);
      //== On supprime le Tile
      this.grid.cells[this.groupe[i].x][this.groupe[i].y] = null;
      // console.log(this.grid.cells[this.groupe[i].x][this.groupe[i].y]);
    }
    // console.log(this.grid.cells);

    //== Il faut remont� les Tile vide vers le haut de la grille
    for(var x = 0 ; x < this.grid.size ; x++)
    {
      // console.log(this.grid.cells[x]);
      if(this.grid.cells[x].every(function(elem) { return (elem == null); }))
      {
        z = x;
        //== On que l'on est pas a droite de la grille
        while(z < (this.grid.lastColumn - 1))
        {
          //== On sauvegarde la ligne
          tmp = this.grid.cells[z];
          //== On interverti les Tile
          this.grid.cells[z] = this.grid.cells[z + 1];
          this.grid.cells[z + 1] = tmp;
          z ++;
        } 
        this.grid.lastColumn --;
      }

      for(var y = 0 ; y < this.grid.size ; y++)
      {
        //== Si le tile est vide
        if(this.grid.cells[x][y] == null)
        {
          z = y;
          console.log(z);
          //== On que l'on est pas en haut de la grille
          while(z > 0)
          {
            //== On sauvegarde le Tile
            tmp = this.grid.cells[x][z];
            //== On interverti les Tile
            this.grid.cells[x][z] = this.grid.cells[x][z - 1];
            this.grid.cells[x][z - 1] = tmp;
            z --;
          }
          // this.grid.lastLigne[x] --;
        }
      }
    }
  }
  else
  {
    this.grid.cells[this.groupe[0].x][this.groupe[0].y].visited = false;
  }

  //== On actualise la vue.
  that.actuate();
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