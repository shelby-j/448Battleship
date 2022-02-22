let numShips = 3; //default ship number
let Player1Ships;
let Player2Ships;

var p1ShipsLoc = matrix();// 
var p2ShipsLoc = matrix();// 
var p1sFireAtLoc = matrix();// 
var p2sFireAtLoc = matrix();// 
var p1ShipsLocArry2Row;
var p2ShipsLocArry2Row;

function matrix(){

  var arr = [];

  // Creates all lines:
  for(var i=0; i < 10; i++){

      // Creates an empty line
      arr.push([]);

      // Adds cols to the empty line:
      arr[i].push( new Array(10));

      for(var j=0; j < 10; j++){
        // Initializes:
        arr[i][j] = 0;
      }
  }

return arr;
}

function loadStoredVars() //stores local json variables
{
  p1ShipsLoc = JSON.parse(window.localStorage.getItem("p1ShipsLoc")); // Retrieving
  p2ShipsLoc = JSON.parse(window.localStorage.getItem("p2ShipsLoc")); // Retrieving
  numShips = JSON.parse(window.localStorage.getItem("numShips")); // Retrieving
  p1ShipsLocArry2Row=JSON.parse(window.localStorage.getItem("p1ShipsLocArry2Row")); // Retrieving
  p2ShipsLocArry2Row=JSON.parse(window.localStorage.getItem("p2ShipsLocArry2Row")); // Retrieving
  
}
function getShipsLocArry(shipsLoc){
  shipsLoc = shipsLoc.substring(1, (shipsLoc.length-1));
  var strArry = shipsLoc.split(",");
  var arr1 = [];
  var rows=2;
  var cols=strArry.length;
  console.log("cols="+cols);
  // Creates all lines:
  for(var i=0; i < rows; i++){

    // Creates an empty line
    arr1.push([]);

    // Adds cols to the empty line:
    arr1[i].push( new Array(cols));

    for(var j=0; j < cols; j++){
      // Initializes:
      if(i==0){
        arr1[i][j] = strArry[j].toLowerCase();  
      }
      else
      {
        arr1[i][j] = "0".toString();
      }
      
    }
}
console.log("arr1="+arr1);
console.log("arr1.length="+arr1.length);
console.log(typeof arr1);
  return arr1;
}
function fillShipsLoc(arr,shipsLoc){
  shipsLoc = shipsLoc.substring(1, (shipsLoc.length-1));
  const strArry = shipsLoc.split(",");
  //console.log(strArry);
  //console.log(strArry[0].toLowerCase().charCodeAt(0) - 97);
  //console.log(strArry[0].toLowerCase()[1]);
  let col,row;
  let shipNo=1;
  for(var i=0;i<strArry.length;i++)
    {
      col=strArry[i].toLowerCase().charCodeAt(0) - 97;
      //row=Number(strArry[i].toLowerCase()[1])-1;
      row=Number(strArry[i].toLowerCase().substring(1,strArry[i].length))-1;
      

      console.log(row,col);
      if(i==1)shipNo=2;
      if(i==3)shipNo=3;
      if(i==6)shipNo=4;
      if(i==10)shipNo=5;
      arr[row][col]= shipNo;
      //console.log(shipNo);
      //console.log(arr[row][col]);
      
    }
    //console.log(arr);
   
}

//gets ships for players
function getNoOfShips() {
  numShips = prompt("Please enter number of ships", numShips);
  if (numShips != null) {
    document.getElementById("getShipsForP1Btn").disabled = false;
    document.getElementById("BShips").innerHTML = numShips  + " ships will be used!";
    document.getElementById("getNoOfShipsBtn").disabled = true;
  }
}

//gets plalyer one's ships, shows the player 1 grid, adds a disabled button
function getShipsForP1() {
  Player1Ships = prompt("Enter ships location in grid for Player 1", "[A10,B3,C3,D3,D4,D5]");
  let shipArray = Player1Ships.replace(/[\[\]']+/g,'').split(',')
  let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
  console.log(findDuplicates(shipArray))
  console.log(shipArray)
  while (findDuplicates(shipArray).length != 0) {
    Player1Ships = prompt("Wrong input! Enter ships location in grid for Player 1", "[A10,B3,C3,D3,D4,D5]");
    shipArray = Player1Ships.split(',')
  }
  let isValid = true;
  let isRowValid = true;
  let isColValid = true;
  while (Player1Ships == null) {
    Player1Ships = prompt("Wrong input! Enter ships location in grid for Player 1", "[A10,B3,C3,D3,D4,D5]");
    shipArray = Player1Ships.split(',')
  }
  do {
    let isRowSame = [true, true, true, true, true]
    let isColSame = [true, true, true, true, true]
    console.log("hello", shipArray.length)
    for (let i = 0; i < shipArray.length; i++) {
      if (i == 1) {
        for (let j = i; j < 3; j++) {
          
          if (shipArray[j].charAt(0) != (shipArray[j+1].charAt(0))) {
            isRowSame[0] = false
          }
          if (shipArray[j].charAt(1) != (shipArray[j+1].charAt(1))) {
            isColSame[0] = false
          }
        }
      }
      if (i == 3) {
        for (let j = i; j < 5; j++) {
          console.log(j);
          if (shipArray[j].charAt(0) != (shipArray[j+1].charAt(0))) isRowSame[1] = false
          if (shipArray[j].charAt(1) != (shipArray[j+1].charAt(1))) isColSame[1] = false
        }
      }
      if (i == 6) {
        for (let j = i; j < 9; j++) {
          if (shipArray[j].charAt(0) != (shipArray[j+1].charAt(0))) isRowSame[2] = false
          if (shipArray[j].charAt(1) != (shipArray[j+1].charAt(1))) isColSame[2] = false
        }
      }
      if (i == 10) {
        for (let j = i; j < 14; j++) {
          if (shipArray[j].charAt(0) != (shipArray[j+1].charAt(0))) isRowSame[3] = false
          if (shipArray[j].charAt(1) != (shipArray[j+1].charAt(1))) isColSame[3] = false
        }
      }
    } 
    
    for (let i = 0; i < isRowSame.length; i++) {
      if (isRowSame[i] == false && isColSame[i] == false) isValid = false;
      console.log(isRowSame[i], isColSame[i], isValid)
    }
    
    
    if (!isValid) {
      Player1Ships = prompt("Wrong input! Enter ships location in grid for Player 1", "[A10,B3,C3,D3,D4,D5]");
      shipArray = Player1Ships.split(',')
    }
  }while (!isValid)
  
  if (isValid) {
    fillShipsLoc(p1ShipsLoc,Player1Ships);
    p1ShipsLocArry2Row= getShipsLocArry(Player1Ships);
    document.getElementById("getShipsForP2Btn").disabled = false;
    document.getElementById("showShipsForP1Btn").disabled = false;
    document.getElementById("P1Ships").innerHTML = Player1Ships  + " ships locations!";
    document.getElementById("getShipsForP1Btn").disabled = true;
  }
}

//same as above, but with added local storage to transfer pages
function getShipsForP2() {
  Player2Ships = prompt("Enter ships location in grid for Player 2", "[J10,E3,E4,F1,F2,F3]");
  if (Player2Ships != null) {
    fillShipsLoc(p2ShipsLoc,Player2Ships);
    p2ShipsLocArry2Row= getShipsLocArry(Player2Ships);
    document.getElementById("showShipsForP1Btn").disabled = true;
    document.getElementById("showShipsForP2Btn").disabled = false;
    document.getElementById("P2Ships").innerHTML = Player2Ships  + " ships locations!";
    document.getElementById("getShipsForP2Btn").disabled = true;
    document.getElementById("playGameBtn").disabled = false;
    window.localStorage.setItem("p1ShipsLoc", JSON.stringify(p1ShipsLoc)); // Saving
    window.localStorage.setItem("p2ShipsLoc", JSON.stringify(p2ShipsLoc)); // Saving
    window.localStorage.setItem("numShips", JSON.stringify(numShips)); // Saving
    //console.log("saveP1="+p1ShipsLocArry2Row);
    window.localStorage.setItem("p1ShipsLocArry2Row", JSON.stringify(p1ShipsLocArry2Row)); // Saving
    //console.log("saveP2="+p2ShipsLocArry2Row);
    window.localStorage.setItem("p2ShipsLocArry2Row", JSON.stringify(p2ShipsLocArry2Row)); // Saving
       
     
  }
}

//the code and buttons to show the board for each player
function showShipsForPlayer(plyrNo) {
  
  let btnId="showShipsFor"+ plyrNo +"Btn";
  let tblId="tlbShipsFor"+ plyrNo;
  let plyrShipsLocaArry;
  if(plyrNo=="P1")
  {
    plyrShipsLocaArry=p1ShipsLoc;
  }
  else
  {
    plyrShipsLocaArry=p2ShipsLoc;
  }
  if(document.getElementById(btnId).innerHTML =="Show Ships of " + plyrNo)
  {
    //console.log(plyrShipsLocaArry.length);
    let arrElm=0;
    let elmId="";
    for(var i=0;i<10;i++)
    {
      for(var j=0;j<10;j++)
      {
        arrElm=plyrShipsLocaArry[i][j];
        if(arrElm!=0)
        {
          elmId=plyrNo.toString()+i.toString()+j.toString();
          console.log(elmId);
          document.getElementById(elmId).innerHTML = "S"+arrElm.toString();
        }
      }
        
    }
    document.getElementById(btnId).innerHTML = "Hide Ships of " + plyrNo;
    document.getElementById(tblId).style.removeProperty("display");
  }
  else
  {
    document.getElementById(btnId).innerHTML = "Show Ships of " + plyrNo;
    document.getElementById(btnId).disabled = true;
    document.getElementById(tblId).style.setProperty("display","none");
  }
    
}

function fillFireAtLoc(frAtarr,frAtCell){
  frAtCell = frAtCell.substring(1, (frAtCell.length-1));
  //const strArry = frAtCell.split(",");
  //console.log(strArry);
  console.log(frAtCell.toLowerCase().charCodeAt(0) - 97);
  console.log(frAtCell.toLowerCase().substring(1,frAtCell.length));
  let col,row;
  col=frAtCell.toLowerCase().charCodeAt(0) - 97;
  row=Number(frAtCell.toLowerCase().substring(1,frAtCell.length))-1;
   frAtarr[row][col]= 1;
   
}

function showFireAtLocCellsForPlayer(plyrNo) {
  
  //let btnId="fireAtBy"+ plyrNo +"Btn";
  //let tblId="tlbCellFrAtBy"+ plyrNo;
  //let frCellbtn="frCellBy"+plyrNo+"Btn";
  let plyrFireAtLocaArry;
  let OpnplyrShipsLocaArry;
  let opnShipsLocArry2Row;

  if(plyrNo=="P1")
  {
    plyrFireAtLocaArry=p1sFireAtLoc;
    OpnplyrShipsLocaArry=p2ShipsLoc;
    opnShipsLocArry2Row=p2ShipsLocArry2Row;

  }
  else
  {
    plyrFireAtLocaArry=p2sFireAtLoc;
    OpnplyrShipsLocaArry=p1ShipsLoc;
    opnShipsLocArry2Row=p1ShipsLocArry2Row;
  }
  
    //console.log(plyrFireAtLocaArry.length);
    let arrElm=0;
    let arrElmShip=0;
    let elmId="";
    let opnShipsLocRow=0;
    let opnShipsLocCol=0;
    let opnShipsLocStr="";
    let noShipsArrLen=0;
    for(var a=1;a<=numShips;a++)
    {
      noShipsArrLen=noShipsArrLen+a;
    }
    console.log("opnShipsLocArry2Row before for loop:"+opnShipsLocArry2Row);
    for(var i=0;i<plyrFireAtLocaArry.length;i++)
    {
      for(var j=0;j<plyrFireAtLocaArry.length;j++)
      {
        arrElm=plyrFireAtLocaArry[i][j];
        //console.log(typeof plyrFireAtLocaArry);
        //console.log("plyrFireAtLocaArry="+plyrFireAtLocaArry);
        arrElmShip=OpnplyrShipsLocaArry[i][j]; 
        //console.log("noShipsArrLen="+noShipsArrLen);
        //console.log("opnShipsLocArry2Row.length="+opnShipsLocArry2Row.length);
        //console.log("opnShipsLocArry="+opnShipsLocArry2Row);
        //console.log("opnShipsLocArry2Row[0]="+opnShipsLocArry2Row[0]);
        //console.log("opnShipsLocArry2Row[1]="+opnShipsLocArry2Row[1]);
        for(var k=0;k<noShipsArrLen;k++)
        {
          opnShipsLocStr=opnShipsLocArry2Row[0][k];
         // console.log(typeof opnShipsLocArry2Row);
          //console.log("opnShipsLocStr="+opnShipsLocStr+" opnShipsLocArry2Row[1][k]="+opnShipsLocArry2Row[1][k]);
          //console.log(typeof opnShipsLocStr);
          //console.log(opnShipsLocArry2Row[1][k]);
          
          opnShipsLocCol=opnShipsLocStr.charCodeAt(0) - 97;
          opnShipsLocRow=Number(opnShipsLocStr.substring(1,opnShipsLocStr.length))-1;
          //console.log("opnShipsLocRow="+opnShipsLocRow+" i="+i+ " opnShipsLocCol="+opnShipsLocCol+" j="+j);
          //console.log("opnShipsLocArry2Row[1][k]="+opnShipsLocArry2Row[1][k]+" arrElmShip="+arrElmShip);
          //console.log("opnShipsLocRow="+opnShipsLocRow);
          if(opnShipsLocRow==i && opnShipsLocCol==j && opnShipsLocArry2Row[1][k]=='0' && arrElmShip>0 && arrElm!=0)
          {
            opnShipsLocArry2Row[1][k]='1';
            //console.log("opnShipsLocArry2Row[0][k]="+opnShipsLocArry2Row[0][k]);
            //console.log("opnShipsLocArry2Row[1][k]="+opnShipsLocArry2Row[1][k]);
          }
        }
        if(arrElm!=0) //check if hit or not
        {
          elmId="FrAt"+ plyrNo.toString()+i.toString()+j.toString();
          console.log(elmId);
          if(arrElmShip==0)
          {
            document.getElementById(elmId).innerHTML = "Miss";
          }
          else 
          {
            document.getElementById(elmId).innerHTML = "Hit S"+arrElmShip.toString();
          }
        }
      }
        
    }
    console.log("opnShipsLocArry2Row after for loop:"+opnShipsLocArry2Row);
    //document.getElementById(btnId).disabled = true;
    //document.getElementById(frCellbtn).disabled = true;
    //document.getElementById(btnId).innerHTML = "Hide Ships of " + plyrNo;
    //document.getElementById(tblId).style.removeProperty("display");
  
  
    
}

//calculates the number of ships down a player has to detect win
function Gameover(plyrNo) {
  let nShipsDn=0;
  let noShipsArrLen=0;
  let shipNo=1;
  let opnShipsLocArry2Row;
    for(var a=1;a<=numShips;a++)
    {
      noShipsArrLen=noShipsArrLen+a;
    }
    if(plyrNo=="P1")
    {
      opnShipsLocArry2Row=p2ShipsLocArry2Row;
    }
    else
    {
      opnShipsLocArry2Row=p1ShipsLocArry2Row;
    }
      
  for(var i=0;i<noShipsArrLen;i++)
    {
      if(i==1)shipNo=2;
      if(i==3)shipNo=3;
      if(i==6)shipNo=4;
      if(i==10)shipNo=5;
      if(opnShipsLocArry2Row[1][i]==1)
      {
        shipNo=shipNo-1;
        if(shipNo==0)
        {
          nShipsDn=nShipsDn+1;
        }
      }
      
    }
  return nShipsDn;
}
function frCellByP1() {
  let nShipsDn=0;
  let frCell = prompt("Pick a space on the opponent's board to 'fire' at.", "[J10]");
  console.log('hello')
  
  let row, col;
  col = frCell.toUpperCase().charCodeAt(1)-65;
  
 
  if(frCell.length == 4)
  { row = frCell.substring(2,3)-1;}
  else if(frCell.length == 5)
  { row = frCell.substring(2,4)-1;}

  if(row < 0 || row > 9 || col < 0 || col > 9)
  {
    window.alert("Attack coordinate out of bounds. Try again.");
  }

  if (p1sFireAtLoc[row][col] == 0) { // check if sunk
    fillFireAtLoc(p1sFireAtLoc,frCell);
    
    document.getElementById("P1FrCell").innerHTML = frCell  + " Fire at locations!";
    showFireAtLocCellsForPlayer('P1');
    nShipsDn=Gameover('P1');
    document.getElementById("P1FrHitStatus").innerHTML = nShipsDn  + " ship down! "+(numShips-nShipsDn) + " to go";
    if((numShips-nShipsDn)==0)
    {
      document.getElementById("gameStatus").innerHTML = " Congratulations! game won by player 1.";
      document.getElementById("turnByP2Btn").disabled = true;
      document.getElementById("frCellByP1Btn").disabled = true;
    } else
    {
      document.getElementById("turnByP2Btn").disabled = false;
      document.getElementById("frCellByP1Btn").disabled = true;
    }
  }
  else{
    window.alert("Invalid attack coordinate. Try again.");
  }
}

function frCellByP2() {
  let nShipsDn=0;
  frCell = prompt("Pick a space on the opponent's board to 'fire' at.", "[A10]");

  let row, col;
  col = frCell.toUpperCase().charCodeAt(1)-65;
 
  if(frCell.length == 4)
  { row = frCell.substring(2,3)-1;}
  else if(frCell.length == 5)
  { row = frCell.substring(2,4)-1;}

  if(row < 0 || row > 9 || col < 0 || col > 9)
  {
    window.alert("Attack coordinate out of bounds. Try again.");
  }

  if (p2sFireAtLoc[row][col] == 0) {
    fillFireAtLoc(p2sFireAtLoc,frCell);
    document.getElementById("P2FrCell").innerHTML = frCell  + " Fire at locations!";
    showFireAtLocCellsForPlayer('P2');
    nShipsDn=Gameover('P2');
    document.getElementById("P2FrHitStatus").innerHTML = nShipsDn  + " ship down! "+(numShips-nShipsDn) + " to go";
    if((numShips-nShipsDn)==0)
    {
      document.getElementById("gameStatus").innerHTML = " Congratulations! game won by player 2.";
      document.getElementById("turnByP2Btn").disabled = true;
      document.getElementById("frCellByP2Btn").disabled = true;
    } else
    {
      document.getElementById("turnByP1Btn").disabled = false;
      document.getElementById("frCellByP2Btn").disabled = true;
    }
  }
  else{
    window.alert("Invalid attack coordinate. Try again.");
  }
}

function frCellTurnOfP1()
{
  document.getElementById("turnByP1Btn").disabled = true;
  document.getElementById("frCellByP1Btn").disabled = false;
  document.getElementById("tlbCellFrAtByP2").style.setProperty("display","none");
  document.getElementById("tlbCellFrAtByP1").style.removeProperty("display");
  showFireAtLocCellsForPlayer('P1');

}

function frCellTurnOfP2()
{
  document.getElementById("turnByP2Btn").disabled = true;
  document.getElementById("frCellByP2Btn").disabled = false;
  document.getElementById("tlbCellFrAtByP1").style.setProperty("display","none");
  document.getElementById("tlbCellFrAtByP2").style.removeProperty("display");
  showFireAtLocCellsForPlayer('P2');

}

