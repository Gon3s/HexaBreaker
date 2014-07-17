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

GameManager.prototype.click = function(evt) 
{
  console.log(this.grid.state);
  if(this.grid.state != 0)
  {
    this.setup(); 
    return false;
  }

  //== Récupération de la position du clic de la souris
  var x = evt.offsetX || evt.layerX;
  var y = evt.offsetY || evt.layerY;

  //== A partir de la position de la souris on récupère la position du Tile.
  x = Math.floor(x / 50);
  y = Math.floor(y / 50);

  //== Si on a cliqué sur une Tile vide on sort
  if(this.grid.cells[x][y] == null) return;

  //== On réinitialise le tableau qui contiendra le groupe de Tile sélectionné
  this.groupe = [];

  //== On recherche le groupe de Tile
  this.search(x, y, this.grid.cells[x][y].color);

  //== Si le groupe de Tile est peuplé d'au moins 2 Tile
  if(this.groupe.length > 1)
  {
    // console.log(this.groupe);
    //== On parcours le groupe de Tile
    for(var i = 0 ; i < this.groupe.length ; i++)
    {
      //== On marque le tile comme null
      this.grid.cells[this.groupe[i].x][this.groupe[i].y].color = null;
      this.grid.cells[this.groupe[i].x][this.groupe[i].y].visited = false;
    }

    this.decalage();
  }
  else
  {
    this.grid.cells[this.groupe[0].x][this.groupe[0].y].visited = false;
  }

  //== On teste la fin du jeu
  this.stateGame();

  //== On actualise la vue.
  this.actuate();
};

GameManager.prototype.decalage = function() {
  //== Il faut remonté les Tile vide vers le haut de la grille
  for(var x = 0 ; x < this.grid.size ; x++)
  {
    this.decalageColonne(x);
    for(var y = 0 ; y < this.grid.size ; y++)
    {
      this.decalageLigne(x, y);
    }
  }
};

GameManager.prototype.decalageLigne = function(x, y) {
  if(this.grid.cells[x][y] != null && this.grid.cells[x][y].color == null && !this.grid.cells[x][y].visited)
  {
    this.grid.cells[x][y].visited = true;
    z = y;
    //== On que l'on est pas en haut de la grille
    while(this.grid.cells[x][z - 1] != null)
    {
      // console.log('Z > : ' + z);
      //== On sauvegarde le Tile
      tmp = this.grid.cells[x][z];
      //== On interverti les Tile
      this.grid.cells[x][z] = this.grid.cells[x][z - 1];
      this.grid.cells[x][z - 1] = tmp;
      this.grid.cells[x][z].updatePosition({'x': x, 'y': z});
      this.grid.cells[x][z - 1].updatePosition({'x': x, 'y': z - 1});
      z --;
    }
    this.decalage();
  }
};

GameManager.prototype.decalageColonne = function(x) {
  if(this.grid.cells[x].every(function(elem) {
    return (elem == null || elem.color == null); 
  }) && x < this.grid.lastColumn)
  {
    z = x;
    console.log(':: X - ' + x);
    console.log(':: Z - ' + z);
    console.log(':: lastColumn - ' + this.grid.lastColumn);
    //== On que l'on est pas a droite de la grille
    while(z < (this.grid.lastColumn - 1))
    {
      //== On sauvegarde la ligne
      tmp = this.grid.cells[z];
      //== On interverti les Tile
      this.grid.cells[z] = this.grid.cells[z + 1];
      this.grid.cells[z + 1] = tmp;
      this.grid.cells[z].forEach(function(elem) { if(elem != null) elem.updatePosition({'x': z, 'y': elem.y}); });
      this.grid.cells[z + 1].forEach(function(elem) { if(elem != null) elem.updatePosition({'x': z + 1, 'y': elem.y}); });
      z ++;
    } 
    this.grid.lastColumn --;    
    this.decalage();    
  }
};

GameManager.prototype.search = function(x, y, color)
{
  // console.log('Search ' + x + ' ' + y + ' ' + color);
  var current = this.grid.cells[x][y], i, j;
  if(current != null && !current.visited && current != null)
  {
    if(current.color == color)
    {
      // console.log('Search ' + x + ' ' + y + ' ' + color);
      // console.log(current);
      this.groupe.push(current);
      current.visited = true;
      if(typeof this.grid.cells[x-1] != 'undefined')
      {
        i = x - 1;
        j = y;
        this.search(i, j, color);
      }
      if(typeof this.grid.cells[x][y-1] != 'undefined')
      {
        i = x;
        j = y - 1;
        this.search(i, j, color);
      }
      if(typeof this.grid.cells[x+1] != 'undefined')
      {
        i= x + 1;
        j = y;
        this.search(i, j, color);
      }
      if(typeof this.grid.cells[x][y+1] != 'undefined')
      {
        i = x;
        j = y + 1;
        this.search(i, j, color);
      }
    }
  }
}

GameManager.prototype.stateGame = function() 
{
  if(this.grid.cells.every(function(X) { 
    return X.every(function(Y) {
      return (Y == null || Y.color == null); 
    })    
  }))
  {
    this.grid.state = 1; return false;
  }

  for(var x = 0 ; x < this.grid.size ; x++)
  {
    for(var y = 0 ; y < this.grid.size ; y++)
    {
      var current = this.grid.cells[x][y];
      if(current != null && current.color != null)
      {
        if(
          (typeof this.grid.cells[x-1] != 'undefined' && this.grid.cells[x - 1][y] != null && this.grid.cells[x - 1][y].color == current.color)
          || (typeof this.grid.cells[x][y-1] != 'undefined' && this.grid.cells[x][y - 1] != null && this.grid.cells[x][y - 1].color == current.color)
          || (typeof this.grid.cells[x+1] != 'undefined' && this.grid.cells[x + 1][y] != null && this.grid.cells[x + 1][y].color == current.color)
          || (typeof this.grid.cells[x][y+1] != 'undefined' && this.grid.cells[x][y + 1] != null && this.grid.cells[x][y + 1].color == current.color)
        )
        {
         this.grid.state = 0; return false;
        }
      }
    }
  }

  this.grid.state = 2; return false;
};