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
  //== Récupération de la position du clic de la souris
  var x = evt.offsetX || evt.layerX;
  var y = evt.offsetY || evt.layerY;

  //== A partir de la position de la souris on récupère la position du Tile.
  x = Math.floor(x / 50);
  y = Math.floor(y / 50);

  //== Si on a cliqué sur une Tile vide on sort
  if(that.grid.cells[x][y] == null) return;

  //== On réinitialise le tableau qui contiendra le groupe de Tile sélectionné
  this.groupe = [];

  //== On recherche le groupe de Tile
  this.search(x, y, this.grid.cells[x][y].color);

  //== Si le groupe de Tile est peuplé d'au moins 2 Tile
  if(this.groupe.length > 0)
  {
    console.log(this.groupe);
    //== On parcours le groupe de Tile
    for(var i = 0 ; i < this.groupe.length ; i++)
    {
      //== On marque le tile comme null
      this.grid.cells[this.groupe[i].x][this.groupe[i].y].color = null;
      this.grid.cells[this.groupe[i].x][this.groupe[i].y].visited = false;
    }
    
    //== Il faut remonté les Tile vide vers le haut de la grille
    for(var x = 0 ; x < this.grid.size ; x++)
    {
      for(var y = 0 ; y < this.grid.size ; y++)
      {
        //== Si le tile est vide
        // console.log(this.grid.cells[x][y]);
        if(this.grid.cells[x][y] != null && this.grid.cells[x][y].color == null && !this.grid.cells[x][y].visited)
        {
          // this.grid.cells[x][y].visited = true;
          z = y;
          // console.log('Y > : ' + y);
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

      if(this.grid.cells[x].every(function(elem) { return (elem == null || elem.color == null); }))
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
  var current = this.grid.cells[x][y];
  if(current != null && !current.visited && current != null)
  {
    if(current.color == color)
    {
      console.log('Search ' + x + ' ' + y + ' ' + color);
      console.log(current);
      this.groupe.push(current);
      current.visited = true;
      if(typeof this.grid.cells[x-1] != 'undefined')
      {
        z = x - 1;
        this.search(z, y, color);
      }
      if(typeof this.grid.cells[x][y-1] != 'undefined')
      {
        z = y - 1;
        this.search(x, z, color);
      }
      if(typeof this.grid.cells[x+1] != 'undefined')
      {
        z = x + 1;
        this.search(z, y, color);
      }
      if(typeof this.grid.cells[x][y+1] != 'undefined')
      {
        z = y + 1;
        this.search(x, z, color);
      }
    }
  }
}