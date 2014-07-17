function HTMLActuator() {
}

HTMLActuator.prototype.actuator = function(grid, ctx) 
{
  window.requestAnimationFrame(function () 
  {
    for(var i = 0 ; i < grid.size ; i++)
    {
      for(var j = 0 ; j < grid.size ; j++)
      {  
        ctx.clearRect(i * grid.tileSize, j * grid.tileSize, grid.tileSize, grid.tileSize);
        if(grid.cells[i][j] != null)
        {
          if(grid.cells[i][j].color != null)
          {
            grid.cells[i][j].visited = false;
            ctx.fillStyle = grid.cells[i][j].color;
            ctx.fillRect(i * grid.tileSize, j * grid.tileSize, grid.tileSize, grid.tileSize);
            ctx.strokeStyle = '#fff';
            ctx.strokeRect(i * grid.tileSize, j * grid.tileSize, grid.tileSize, grid.tileSize);
          }
          else
          {    
            grid.cells[i][j] = null;
          }
        }    
        else
        { 
            grid.cells[i][j] = null;
        }    
      }
    }

    //== Partie gagné
    if(grid.state == 1)
    {
      ctx.fillStyle = '#f00';
      ctx.font = "30pt Verdana";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText('GAGNE', (grid.size * grid.tileSize) / 2, (grid.size * grid.tileSize) / 2);
    }
    //== Partie perdu
    else if(grid.state == 2)
    {
      ctx.fillStyle = '#f00';
      ctx.font = "30pt Verdana";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText('PERDU', (grid.size * grid.tileSize) / 2, (grid.size * grid.tileSize) / 2);
    }
  });
}