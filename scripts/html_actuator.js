function HTMLActuator() {
}

HTMLActuator.prototype.actuator = function(grid, ctx) 
{
  window.requestAnimationFrame(function () 
  {
    var debug = '';
    for(var i = 0 ; i < grid.size ; i++)
    {
      for(var j = 0 ; j < grid.size ; j++)
      {  
        if(grid.cells[i][j] != null)
        {
          if(grid.cells[i][j].color != null)
          {
            debug += ' ' + grid.cells[i][j].color + ' //'; 
            grid.cells[i][j].visited = false;
            ctx.fillStyle = grid.cells[i][j].color;
            ctx.fillRect(i * grid.tileSize, j * grid.tileSize, grid.tileSize, grid.tileSize);
            ctx.strokeStyle = '#fff';
            // ctx.fillStyle = '#f00';
            // ctx.font = "10pt Verdana";
            // ctx.textAlign = "center";
            // ctx.textBaseline = "middle";
            // ctx.fillText('x: ' + i + " y:" + j, i * grid.tileSize + (grid.tileSize / 2), j * grid.tileSize + (grid.tileSize / 2));
            ctx.strokeRect(i * grid.tileSize, j * grid.tileSize, grid.tileSize, grid.tileSize);
          }
          else
          {
            debug += ' TRAITE //';       
            ctx.clearRect(i * grid.tileSize, j * grid.tileSize, grid.tileSize, grid.tileSize);
            grid.cells[i][j] = null;
          }
        }    
        else
        { 
            debug += ' VIDE //';
        }    
      }
      debug += "\n";
    }
    console.log(debug);
  });
}