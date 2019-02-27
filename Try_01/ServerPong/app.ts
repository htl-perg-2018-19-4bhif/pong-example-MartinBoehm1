import express = require('express');
import { CREATED, OK, BAD_REQUEST } from 'http-status-codes';
import { Request, Response } from 'express';
const app = express();
app.use(express.json());
let leftPos; 
let ballHori=400; 
let ballVert=400;
let ballDegree=100;
let speed=10;
let rightPos;
let upLeft;
let downLeft;
let upRight;
let downRight;
app.get('/getPositions', sendPositions);
app.post('/sendInput', getInput);
let toFind = 10;
let nrGuesses = 10;
function getInput(req: Request, res: Response): void {
    upLeft=req.body.input.split(';')[0];
    downLeft=req.body.input.split(';')[1];
    res.status(OK).send("ok");
}

function sendPositions(req: Request, res: Response): void {
    res.status(OK).send(leftPos+';'+ballHori+';'+ballVert+';'+rightPos);
}
setInterval(sth => function renewPositions(){
    if(upRight&&!downRight){
        rightPos++;
    }else if(downRight&&!upRight){
        rightPos--;
    }
    if(upLeft&&!downLeft){
        leftPos++;
    }else if(downLeft&&!upLeft){
        leftPos--;
    }
    ballHori+=speed*Math.sin(ballDegree/180*Math.PI);
    ballVert+=speed*Math.cos(ballDegree/180*Math.PI);
},2);
app.listen(8080, () => console.log('API is listening on port 8080'));
