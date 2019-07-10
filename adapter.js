const userURL = "http://localhost:3000/users"
const gameURL = "http://localhost:3000/games"

// 
// document.addEventListener("DOMContentLoaded", function(){
//   fetch(`http://localhost:3000/games`)
//     .then(response => response.json())
//     .then(gameData)
// })

const gamePanel = () => {
  
    fetch(`http://localhost:3000/games`)
      .then(response => response.json())
      .then(gameData)

}