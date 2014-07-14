function Tile(x, y) {
  this.x                = x;
  this.y                = y;
  this.visited          = false;
  this.colors           = ['#297ea9', '#0f9d58'];
  // this.colors           = ['#297ea9', '#0f9d58', '#cf423a', '#7b5294', '#f4b400', '#da2e75'];
  // this.colors           = ['#297ea9'];
  var rand = Math.floor(Math.random() * this.colors.length);
  // console.log(rand);
  this.color            = this.colors[rand];
}
