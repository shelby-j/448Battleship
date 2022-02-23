let numShips = 3; //default ship number
let Player1Ships;
let Player2Ships;

var p1ShipLoc = matrix();// 
var p2ShipLoc = matrix();// 
var p1sFireLoc = matrix();// 
var p2sFireLoc = matrix();// 

//These two contains the location of all ships for each ship
//Each variable contains two arrays
//The first array contains these locations 
//The second contains whether that ship is hit or not, which is either 0 or 1
//0 for not hit
//1 for sunk
var p1ShipLocArr;
var p2ShipLocArr;

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
  p1ShipLoc = JSON.parse(window.localStorage.getItem("p1ShipLoc")); // Retrieving
  p2ShipLoc = JSON.parse(window.localStorage.getItem("p2ShipLoc")); // Retrieving
  numShips = JSON.parse(window.localStorage.getItem("numShips")); // Retrieving
  p1ShipLocArr=JSON.parse(window.localStorage.getItem("p1ShipLocArr")); // Retrieving
  p2ShipLocArr=JSON.parse(window.localStorage.getItem("p2ShipLocArr")); // Retrieving
  
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

//Gets ships for players
function getNoOfShips() {
  //Asks the player for the number of ships
  numShips = prompt("Please enter number of ships", numShips);

  //Next, check if noShips is valid
  //If the input was canceled
  if(numShips == null)
  {
    //Tell the user that the input was canceled
    alert("Input Canceled.");
  }
  //Otherwise, if noShips is an empty prompt
  //Which mean noShips has a length of 0
  else if(numShips.length == 0)
  {
    //Alert the user that the prompt is empty
    alert("Input is empty. Please try again.");
  }
  //Otherwise, if noShips contains whitespace, which includes
  //spaces and 
  //Does this check by uisng indexOf to see if there is an index of noShips
  //that contains a space
  else if(numShips.indexOf(' ') >= 0)
  {
      //Tell the user that the prompy has whitespace
      alert("Input has whitespace. Input must be a number. Please try again.");
  }
  //Otherwise, if noShips is not a number
  //Use isNaN, which returns true if noShips is not a number
  else if(isNaN(numShips) == true)
  {
      //Alert the user that the input is not a number
      alert("Input is not a number. Input must be a number. Please try again.");
  }
  //Otherwise, if the length of noShips does not equal to 1
  //Prevents inputs that are way too big or small for javascript to handle
  //It also prevent negative and decminal
  else if(numShips.length != 1)
  {
      //Alert the user that input have more that 1 digit
      alert("Input is not a 1-digit number. Input must can have only 1 digit. No negative signs, decimal symbols, and extra digits. Please try again.");
  }
  //Otherwise, if noShips is not in range of 1-5
  else if(numShips < 1 || numShips > 5)
  {
      //Alert the user that the input is invalid
      alert("Input is invalid. Input must be between 1 and 5. Please try again.")
  }
  //Otherwise, noShips is valid 
  else
  {
    //Enable the getShipsForP1Btn button for Player 1 to set up their board
    document.getElementById("getShipsForP1Btn").disabled = false;

    //Tell the user the number of ships being used
    //If the number of ships being use is only 1
    if(numShips == 1)
    {
        //Set the inner html of BShips to be "1 ship will be used!"
        document.getElementById("BShips").innerHTML = numShips  + " ship will be used!";
    }
    //Otherwise, if noShips is greater than 1
    else
    {
        //Set the inner html of BShips to be noShip + " ships will be used"
        document.getElementById("BShips").innerHTML = numShips  + " ships will be used!";
    }
    
    //Disable getNoOfShipsBtn to be prevented from being used again
    document.getElementById("getNoOfShipsBtn").disabled = true;

    //Finally, convert noShips to be a number
    numShips = parseInt(numShips);
  }
}

//Checks if the input for Player's Ships is valid or not
//Return true if the input is valid and false if not
function validPlayerShips(playerShips)
{
  //First, we need to check if playerShips is valid
  if(playerShips == null)
  {
    //Tell the user that input was canceled
    alert("Input Canceled.")

    //Return false
    return false;
  }
  //Otherwise, if the input is empty
   //Which means Player1Shps has a length of 0
   else if(playerShips.length == 0)
   {
     //Alert the user that the prompt is empty
     alert("Input is empty. Please try again.");

     //Return false
     return false;
   }
   //Otherwise, if Player1Ships contains whitespace, which includes
   //spaces and tabs
   //Does this check by uisng indexOf to see if there is an index of Player1Ships
   //that contains a space
   else if(playerShips.indexOf(' ') >= 0)
   {
       //Tell the user that the input has whitespace
       alert("Input has whitespace. Please try again.");

       //Return false
       return false;
   }
   //Otherwise, check if the input is a list
   //If the input is not a list
   else if(playerShips.charAt(0) != '[' || playerShips.charAt(playerShips.length-1) != ']')
   {
      //Tell the user that the input is not a list
      alert("Input is not a list. Must be in the format [], Please try again")

      //Return false
      return false;
   }

   //Otherwise, convert playerShips to be an array
   //Remove the brackets the surround the list
   //Store it in a new array that will store the position of the ships
   let shipPositions = playerShips.substring(1, (playerShips.length-1));

   //Split shipPosition for each comma used to create a new array of strings
   //Each element of the new array should contain a position of the ship
   shipPositions = shipPositions.split(",");

   //Next, check shipPositions if it is valid
   //If the length of shipPositions does not equal to the total number of positions 
   //the total number of postion is noShip(noShips+1)/2
   if(shipPositions.length != (numShips*(numShips+1))/2)
   {
     //Tell the user that the size of the list does not equal to the total number of positions the user can have
     alert("The size of the list does not equal to the total number of ship positions. The size of the list must be " + ((numShips*(numShips+1))/2) +".");

     //Return false
     return false;
   }

   //Next, go through each position in shipPositions to check if it is valid or not
   for(const position of shipPositions)
   {  
      //Firstly, check the size of position
      //If the size of position is not 2 or 3
      if(position.length != 2 && position.length != 3)
      {
        //Tell the user that position is not the correct length
        alert(position + " is not the correct length. Length must be either 2 or 3. Please try again.");

        //Return false
        return false;
      }
      //Otherwise if not
      else
      {
        //Get the column by getting the first character and subtract 65 from it
        let col = position.charCodeAt(0) - 65;
      
        //Next, get the row by converting the substring after index 0 into a number
        let row = Number(position.substring(1, position.length));

        //Next, check that that row and col are valid
        //If col is less 0 or greater than 9
        if(col < 0 || col > 9)
        {
           //Tell the user that column is invalid
           alert("In " + position + ", column is invalid. Must be from A to J. Please try again.");

           //Return false
           return false;
        }
        //Otherwise, if row is not a number
        else if(isNaN(row))
        {
          //Tell the user that row is not a number
          alert("In " + position + ", row is not a number. Row must be a number. Please try again.");

          //Return false
          return false;
        }
        //Otherwise, if row is out of obunds
        else if(row < 1 || row > 10)
        {
          //Tell the user that row is out of bounds
          alert("In " + position + ", row is out of bounds. Row must be between 1 and 10. Please try again.");

          //Return false
          return false;
        }
      }
   }

   //Return true if input is valid
   //Duplicates and Correct Ship Placement will be checked later
   return true;
}


//gets plalyer one's ships, shows the player 1 grid, adds a disabled button
function getShipsForP1() {
  Player1Ships = prompt("Enter ships location in grid for Player 1", "[A10,B3,C3,D3,D4,D5]");
  let shipArray = Player1Ships.replace(/[\[\]']+/g,'').split(',')
  let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
  
  while (findDuplicates(shipArray).length != 0) {
    Player1Ships = prompt("Wrong input! Enter ships location in grid for Player 1", "[A10,B3,C3,D3,D4,D5]");
    shipArray = Player1Ships.split(',')
  }
  let isValid = true;
  
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
        for (let j = i; j < 2; j++) {
          
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
    }
    
    
    if (!isValid) {
      Player1Ships = prompt("Wrong input! Enter ships location in grid for Player 1", "[A10,B3,C3,D3,D4,D5]");
      shipArray = Player1Ships.split(',')
    }
  }while (!isValid)
  
  if (isValid) {
    fillShipsLoc(p1ShipLoc,Player1Ships);
    p1ShipLocArr= getShipsLocArry(Player1Ships);
    document.getElementById("getShipsForP2Btn").disabled = false;
    document.getElementById("showShipsForP1Btn").disabled = false;
    document.getElementById("P1Ships").innerHTML = Player1Ships  + " ships locations!";
    document.getElementById("getShipsForP1Btn").disabled = true;
  }
}

//same as above, but with added local storage to transfer pages
function getShipsForP2() {
  Player2Ships = prompt("Enter ships location in grid for Player 2", "[J10,E3,E4,F1,F2,F3]");
  let shipArray = Player2Ships.replace(/[\[\]']+/g,'').split(',')
  let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
  
  while (findDuplicates(shipArray).length != 0) {
    Player2Ships = prompt("Wrong input! Enter ships location in grid for Player 2", "[J10,E3,E4,F1,F2,F3]");
    shipArray = Player2Ships.split(',')
  }
  let isValid = true;
  
  while (Player1Ships == null) {
    Player2Ships = prompt("Wrong input! Enter ships location in grid for Player 2", "[J10,E3,E4,F1,F2,F3]");
    shipArray = Player2Ships.split(',')
  }
  do {
    let isRowSame = [true, true, true, true, true]
    let isColSame = [true, true, true, true, true]
    console.log("hello", shipArray.length)
    for (let i = 0; i < shipArray.length; i++) {
      if (i == 1) {
        for (let j = i; j < 2; j++) {
          
          if (shipArray[j].charAt(0) != (shipArray[j+1].charAt(0))) {
            isRowSame[0] = false
          }
          if (shipArray[j].charAt(1) != (shipArray[j+1].charAt(1))) {
            isColSame[0] = false
            console.log(shipArray[j], shipArray[j+1]);
          }
        }
      }
      if (i == 3) {
        for (let j = i; j < 5; j++) {
          
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
      console.log("isrowsame: ", isRowSame[i], " isColSame: ", isColSame[i])
    }
    
    
    if (!isValid) {
      Player2Ships = prompt("Wrong input! Enter ships location in grid for Player 2", "[J10,E3,E4,F1,F2,F3]");
      shipArray = Player2Ships.split(',')
    }
  }while (!isValid)
  
  if (isValid) {
    fillShipsLoc(p2ShipLoc,Player2Ships);
    p2ShipLocArr= getShipsLocArry(Player2Ships);
    document.getElementById("showShipsForP1Btn").disabled = true;
    document.getElementById("showShipsForP2Btn").disabled = false;
    document.getElementById("P2Ships").innerHTML = Player2Ships  + " ships locations!";
    document.getElementById("getShipsForP2Btn").disabled = true;
    document.getElementById("playGameBtn").disabled = false;
    window.localStorage.setItem("p1ShipLoc", JSON.stringify(p1ShipLoc)); // Saving
    window.localStorage.setItem("p2ShipLoc", JSON.stringify(p2ShipLoc)); // Saving
    window.localStorage.setItem("numShips", JSON.stringify(numShips)); // Saving
    //console.log("saveP1="+p1ShipLocArr);
    window.localStorage.setItem("p1ShipLocArr", JSON.stringify(p1ShipLocArr)); // Saving
    //console.log("saveP2="+p2ShipLocArr);
    window.localStorage.setItem("p2ShipLocArr", JSON.stringify(p2ShipLocArr)); // Saving
  }
  
}

//the code and buttons to show the board for each player
function showShips(plyrNo) {
  
  let btnId="showShipsFor"+ plyrNo +"Btn";
  let tblId="tlbShipsFor"+ plyrNo;
  let plyrShipsLocaArry;
  if(plyrNo=="P1")
  {
    plyrShipsLocaArry=p1ShipLoc;
  }
  else
  {
    plyrShipsLocaArry=p2ShipLoc;
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

function attack(shipArr,attackLocation){
  attackLocation = attackLocation.substring(1, (attackLocation.length-1));
  //const strArry = attackLocation.split(",");
  //console.log(strArry);
  console.log(attackLocation.toLowerCase().charCodeAt(0) - 97);
  console.log(attackLocation.toLowerCase().substring(1,attackLocation.length));
  let col,row;
  col=attackLocation.toLowerCase().charCodeAt(0) - 97;
  row=Number(attackLocation.toLowerCase().substring(1,attackLocation.length))-1;
   shipArr[row][col]= 1;
  
   
}

//Shows the player's view of their opponent
//Takes in plyrNo, which is the player's number
function showFireLocations(plyrNo) {
  //Represent the player's view of their opponent's board
  let fireLocationArr;

  //Represent the opponent's board
  let enemyShipLocArr;

  //Represent the location of all ships the opponent's has
  let enemyShipLocString;

  //If the number of the player is P1
  if(plyrNo=="P1")
  {
    //Set fireLocationArr to be p1sFireLoc
    fireLocationArr=p1sFireLoc;

    //Set enemyShipLocArr to be p2ShipLoc
    enemyShipLocArr=p2ShipLoc;

    //Set enemyShipLocString to be p2ShipLocArr
    enemyShipLocString=p2ShipLocArr;

  }
  //Otherwise if plyrNo is P2
  else
  {
    //Set fireLocationArr to be p2sFireLoc
    fireLocationArr=p2sFireLoc;

    //Set enemyShipLocArr to be p1ShipLoc
    enemyShipLocArr=p1ShipLoc;

    //Set enemyShipLocString to be p1ShipLocArr
    enemyShipLocString=p1ShipLocArr;
  }
  
    //Represent an element of the plyrFireAtLocaArry
    let arrElm=0;

    //Represent an element of OpnplyrShipsLocaArry
    let arrElmShip=0;

    //The id of the element td at row i and column j
    let elmId="";

    //Represent the row of the opponent's ship
    let opnShipsLocRow=0;

    //Represent the column of the opponent's ships
    let opnShipsLocCol=0;

    //Represent the location of the  opponent's ship
    let opnShipsLocStr="";

    //Represenst the number of ship positions 
    let noShipsArrLen=0;

    //Loop starting 1 and until numShips
    //The loop is used to set noShipsArrLen
    for(var a=1;a<=numShips;a++)
    {
      //Add a to noShipsArrLen 
      noShipsArrLen=noShipsArrLen+a;
    }

    //Next, go through each row and column of fireLocationArr
    for(var i=0;i<fireLocationArr.length;i++)
    {
      for(var j=0;j<fireLocationArr.length;j++)
      {
        //Set arrElm to the be element of fireLocationArr at row i and column j
        arrElm=fireLocationArr[i][j];

        //Set arrElmShip to be the element of enemyShipLocArr at row i and column j
        arrElmShip=enemyShipLocArr[i][j]; 
  
        //Go through each ship location in =enemyShipLocString
        for(var k=0;k<noShipsArrLen;k++)
        {
          //Set the location of the oponent ships to be the kth index of the ith array of
          //enemyShipLocString
          opnShipsLocStr==enemyShipLocString[0][k];
          
          //Get ASCII code of the first character of opnShpsLocStr
          //Then, subtract it by 97 to get the column of the ship location
          opnShipsLocCol=opnShipsLocStr.charCodeAt(0) - 97;

          //Next, set the row of the ship location to the rest of opnShipsLocCol, except the first character
          //Convert the substring to a number
          opnShipsLocRow=Number(opnShipsLocStr.substring(1,opnShipsLocStr.length))-1;
          
          //Next, check the following conditions are all true
          //1. opnShipsLocRow is equal to i, which is the current row 
          //2. opnShipsLocCol is equal to j, which is the current column
          //3. The ship at that location is not sunk
          //4. There is an opponent's ship at at location
          //5. The player attack at that location
          //If all these conditions are true
          if(opnShipsLocRow==i && opnShipsLocCol==j && enemyShipLocString[1][k]=='0' && arrElmShip>0 && arrElm!=0)
          {
            //The ship is hit
            //So, set enemyShipLocString to be 1 
            enemyShipLocString[1][k]='1';
          }
        }

        //If there is an attack at the location
        if(arrElm!=0) //check if hit or not
        {
          //Set elmId to be FrAt plus plyrNo plus row i plus j
          elmId="FrAt"+ plyrNo.toString()+i.toString()+j.toString();
          
          //If arrElmShip is 0
          if(arrElmShip==0)
          {
            //Set the inner html of id to be Miss
            document.getElementById(elmId).innerHTML = "Miss";
          }
          //Otherwise, if arrElmShip is 1
          else 
          {
            //Set the innter html of id to be Hit S+arrElmShip
            document.getElementById(elmId).innerHTML = "Hit S"+arrElmShip.toString();
          }
        }
      }
        
    }
}

//calculates the number of ships down a player has to detect win
function Gameover(plyrNo) {
  let nShipsDn=0;
  let noShipsArrLen=0;
  let shipNo=1;
  let enemyShipLocString;
    for(var a=1;a<=numShips;a++)
    {
      noShipsArrLen=noShipsArrLen+a;
    }
    if(plyrNo=="P1")
    {
      enemyShipLocString=p2ShipLocArr;
    }
    else
    {
      enemyShipLocString=p1ShipLocArr;
    }
      
  for(var i=0;i<noShipsArrLen;i++)
    {
      if(i==1)shipNo=2;
      if(i==3)shipNo=3;
      if(i==6)shipNo=4;
      if(i==10)shipNo=5;
      if(enemyShipLocString[1][i]==1)
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

  if (p1sFireLoc[row][col] == 0) { // check if sunk
    attack(p1sFireLoc,frCell);

    document.getElementById("P1FrCell").innerHTML = frCell  + " Fire at locations!";
    showFireLocations('P1');
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

  if (p2sFireLoc[row][col] == 0) {
    attack(p2sFireLoc,frCell);
    document.getElementById("P2FrCell").innerHTML = frCell  + " Fire at locations!";
    showFireLocations('P2');
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
  showFireLocations('P1');

}

function frCellTurnOfP2()
{
  document.getElementById("turnByP2Btn").disabled = true;
  document.getElementById("frCellByP2Btn").disabled = false;
  document.getElementById("tlbCellFrAtByP1").style.setProperty("display","none");
  document.getElementById("tlbCellFrAtByP2").style.removeProperty("display");
  showFireLocations('P2');

}

//Create a new board by taking in a node and i
function createBoard(node, id)
{
  //Firstly, create a new table that will store the board
  let table = document.createElement("table");

  //Next, set the table style to be none
  //table.style.display = 'none';

  //Next, set the border of table to be 1
  table.setAttribute("border", "1");

  //Next, set the cellpadding to be 3
  table.setAttribute("cellpadding", "3");

  //Finally, set the id of table to id
  table.setAttribute("id", id);

  //Next, add create a new element that will store the tbody tag
  let tableBody = document.createElement("tbody");

  //Next, create a row that will store all the columns names
  let columnsNames = document.createElement("tr");

  //Set the class of columnsNames to be bold
  columnsNames.setAttribute("class", "bold");

  //Next, create a column that is empty
  let emptyColumn = document.createElement("td");

  //Set the innerhtml of emptyColumn to be space
  emptyColumn.innerHTML = " ";

  //Add it to columnsNames
  columnsNames.appendChild(emptyColumn);

  //Next, loop 10 times
  for(let i = 0; i < 10; i++)
  {
    //Create a new column
    let column = document.createElement("td");

    //Next, set the innerhtml of column to be the ascii character from i+65
    column.innerHTML = String.fromCharCode(i+65);

    //Add column to columnsNames
    columnsNames.appendChild(column);
  }

  //Next, add columnsNames to tableBody
  tableBody.appendChild(columnsNames)

  
  //Next, loop for ten times
  for(let i = 0; i < 10; i++)
  {
    //Create a new row
    let row = document.createElement("tr");

    //Create a new column that contains the number of row
    let columnNumber = document.createElement("td");

    //Next, set the class of columnNumber to be bold
    //columnNumber.setAttribute("class", "bold");

    //Set the innerhtml to be i+1
    columnNumber.innerHTML = (i+1).toString();

    //Add columnNumber to row
    row.appendChild(columnNumber);

    
    //Next loop for ten times
    for(let j = 0; j < 10; j++)
    {
      //Create a new column
      let column = document.createElement("td");

      //Next, create the id for column to id + i + j
      let elementId = id + i.toString() + j.toString();

      //Set the id of column to be elementId
      column.setAttribute("id", elementId);

      //Add column to to row
      row.appendChild(column);
    }

    //Next, add row to to tableBody
    tableBody.appendChild(row);
  }
  
  //Next, add tableBody to table
  table.appendChild(tableBody);

  console.log(table);

  //Finally, append table to  node
  node.appendChild(table);
}
