// gameboard with 3x3
// 2 player with 0 and X as identifier
// Each turn player place down their indenfier
// win condition: 3 in a row/collum  or diagnolly
//
const start = document.querySelector("#start")
const dialog = document.querySelector("dialog")
const title = document.querySelector(".title")

start.addEventListener("click", ()=>{
    receiveInput()
})



function receiveInput(){
    const p1 = document.querySelector("#p1")
    const p2 = document.querySelector("#p2")
    const game = startGame(p1.value, p2.value)
    dialog.close()

}





function startGame(player1Name, player2Name){
    const gameboard = [["", "", ""],["", "", ""],["", "", ""]]
    let isInteractable = true

    //give visual feedback on the webpage
    const displayGame = () => {
        const display = document.querySelector(".display");
        if(display.hasChildNodes()){
            while(display.lastElementChild){
                display.removeChild(display.lastElementChild)
            }
        }
        const game = document.createElement("div")
        game.classList.add("game")

        const restart = document.createElement("button")
        restart.textContent = "RESTART"
        restart.classList.add("restart")
        display.appendChild(restart)

        gameboard.forEach((line, lineIndex)=>{

            const row = document.createElement("div");
            row.classList.add("row")

            line.forEach((element, elementIndex)=>{

                const box = document.createElement("div");
                box.classList.add("box" + elementIndex)
                box.textContent = element.toString()
                box.addEventListener("click",()=>{
                    turnFinished(lineIndex, elementIndex)
                })
                row.appendChild(box)
            })
            game.appendChild(row)
        })
        display.appendChild(game)

        
        restart.addEventListener("click", ()=>{
            gameboard.forEach((row, rowIndex)=>{
                row.forEach((element, elementIndex)=>{
                    gameboard[rowIndex][elementIndex] = ""
                })
            })
            displayGame()
            isInteractable = true
            title.textContent = "TIC TAC TOE"
        })
        
    }

    displayGame()





    //create object to store player in
    function createPlayer(playerName, playerIdentifier){
        const name = playerName;
        const identifier = playerIdentifier
        let score = 0
        const updateScore = () =>score++
        const statusScore = () =>score
        return {name, identifier, updateScore, statusScore}
    }

    //store player into player list to be used later
    const playerList = [createPlayer(player1Name, "X"), createPlayer(player2Name, "O")]
    console.table(playerList)

    //player can place down their identifier
    const playGame = (playerName, rowID, collumID) => {
        var index = playerList.findIndex(p => p.name === playerName)
        console.log(index)
        let identifier = playerList[index].identifier

        if (gameboard[rowID][collumID] === ""){
            
            gameboard[rowID][collumID] = identifier
            console.table(gameboard)
            displayGame()
        }
        
        //win condition
        for (i = 0; i < 3; i++){
            console.log(i)
            switch (true){
                case (gameboard[i][0] === gameboard[i][1] && gameboard[i][1] === gameboard[i][2] && gameboard[i][1] !== ""):
                    return winCondition (playerList.findIndex(p => p.identifier === gameboard[i][0]))
                
                case (gameboard[0][i] === gameboard[1][i] && gameboard[1][i] === gameboard[2][i] && gameboard[1][i] !== ""):
                    return winCondition (playerList.findIndex(p => p.identifier === gameboard[0][i]))
    
                case (gameboard[1][1] === gameboard[2][2] && gameboard[2][2] === gameboard[0][0] && gameboard[2][2] !== ""):
                    return winCondition (playerList.findIndex(p => p.identifier === gameboard[0][0]))
    
                case (gameboard[0][2] === gameboard[1][1] && gameboard[1][1] === gameboard[2][0] && gameboard[1][1] !== ""):
                    return winCondition (playerList.findIndex(p => p.identifier === gameboard[0][2]))
                case (!gameboard.some(eachrow => eachrow.includes(""))):
                    isInteractable = false
                    return window.alert("DRAW!")
            }
        }

        function winCondition(a){
        isInteractable = false
        console.log("Player " + playerList[a].name + " wins!")
        window.alert(playerList[a].name + " wins!")
        title.textContent = playerList[a].name + " wins!"
        playerList[a].updateScore()
        }

    }


    function turnFinished(rowIndex, collumnIndex){
        if(isInteractable === true){
            if(gameboard[rowIndex][collumnIndex] !== ""){
                return window.alert("space is occupied")
            }
            else{
                const currentPlayer = playerList[0].name
                playGame(currentPlayer, rowIndex, collumnIndex)
                playerList.push(playerList.shift())
                
            }
        }
        else{
            window.alert("Game has ended")
        }
           
            
    }


    return {player1Name, player2Name, playGame}


}

// game.playGame("John", 1, 1)
// game.playGame("John", 2, 0)
// game.playGame("John", 0, 2)
