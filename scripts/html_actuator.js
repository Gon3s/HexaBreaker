function HTMLActuator() {
}

HTMLActuator.prototype.actuator = function(grid, ctx) 
{
  console.log('actuator');
  window.requestAnimationFrame(function () 
  {
    for(var i = 0 ; i < grid.size ; i++)
    {
      for(var j = 0 ; j < grid.size ; j++)
      {  
        if(grid.cells[i][j] != null)
        {
          grid.cells[i][j].visited = false;
          ctx.fillStyle = grid.cells[i][j].color;
          // console.log(ctx.fillStyle = grid.cells[i][j].color);
          ctx.fillRect(i * grid.tileSize, j * grid.tileSize, grid.tileSize, grid.tileSize);
          // ctx.fillStyle = '#f00';
          // ctx.font = "10pt Verdana";
          // ctx.textAlign = "center";
          // ctx.textBaseline = "middle";
          // ctx.fillText('x: ' + i + " y:" + j, i * grid.tileSize + (grid.tileSize / 2), j * grid.tileSize + (grid.tileSize / 2));
          ctx.strokeStyle = '#fff';
          ctx.strokeRect(i * grid.tileSize, j * grid.tileSize, grid.tileSize, grid.tileSize);
        }    
        else
        {
          ctx.clearRect(i * grid.tileSize, j * grid.tileSize, grid.tileSize, grid.tileSize);
        }    
      }
    }
  });
}