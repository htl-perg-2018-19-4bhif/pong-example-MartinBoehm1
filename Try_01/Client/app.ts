window.onload = () => {
  let field="100;500;500;100" //left pos, ball hori, ball vert, right pos 
  var express = require('express')
  var app = express()
  const playerlength=100;
  const playerwidth=20;
  const boardSize = 800;
  const ballwidth=20;
  let up=false;
  let down=false;
  // Get reference to canvas
  const canvas = <HTMLCanvasElement>document.getElementById('canvas');
  canvas.width = canvas.height = boardSize;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';


  // Call 'draw' function whenever browser renders a frame on the screen
  
  window.requestAnimationFrame(draw);
  async function draw() {
    await getPositions().then(value => field=value);
    ctx.clearRect(0, 0, boardSize, boardSize);
    ctx.fillRect(20, parseInt(field.split(";")[0]), playerwidth, playerlength);
    ctx.fillRect(boardSize-20-playerwidth, parseInt(field.split(";")[3]), playerwidth, playerlength);
    ctx.fillRect(parseInt(field.split(";")[1]), parseInt(field.split(";")[2]), ballwidth, ballwidth);
      sendInput();
    window.requestAnimationFrame(draw);
  }
  async function getPositions(){
    return fetch(`localhost:8080/getPositions`).then(response => {return response.json().then();});
  }
  function sendInput(){

    fetch(`localhost:8080/sendInput`).then(response => {
            response.json().then(toSend => {
                let input = up + ';'+down;
            });
        });
  }
  document.addEventListener('keydown', (event) => {
    const keyName = event.key;

    if (keyName === 'ArrowUp') {
      up=true;
      return;
    }
    if (keyName === 'ArrowDown') {
      down=true;
      return;
    }
  }, false);
  
  document.addEventListener('keyup', (event) => {
    const keyName = event.key;

    if (keyName === 'ArrowUp') {
      up=false;
      return;
    }
    if (keyName === 'ArrowDown') {
      down=false;
      return;
    }
  }, false);

};