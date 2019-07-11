//MENU-BAR DELEGATION //Changing what's on the right panel
document.addEventListener('DOMContentLoaded', function(){
  // document.addEventListener('dbclick', function(event){
  //   debugger
  //   alert("Double Clicked disabled")
  //   event.preventDefault();
  //   event.stopPropagation();
  //   }, true
  // );
  let deleteButton = document.createElement("button")
  const menuBar = document.querySelector('#menu-bar')
  const menuItem = document.querySelector('.menu-item')

  menuBar.addEventListener('click', clickHandler)
  // menuItem.addEventListener('mouseover', mouseHandler)

// renderForm();
})

const renderForm = () => {
  let panelData = document.querySelector('#rt-panel-data')
    panelData.innerHTML = ' '
  let formDiv = document.createElement('div')
    formDiv.innerHTML =
    `
      <h1>LOG IN</h1>
      <form id=“form”>
        <input id="form_input" type="text" name="" value="" placeholder="username">
        <br><br>
        <input type="submit" value="Log In">
        <br><br>
      </form>
    `
    panelData.append(formDiv)
    formDiv.addEventListener('submit', userMethod)
}

const clickHandler = (event) => {
  if (event.target.id === 'user-button'){
      userButtonMethod(event);
  } else if (event.target.id === 'leaderboard'){
    gamePanel(event);
  } else if (event.target.id === 'rules'){
    rules(event)
  } else if (event.target.outerText === 'Delete User'){
    deleteUser(event)
  }
}

const userButtonMethod = (event) => {
  if (event.target.innerText === 'Log In'){
    renderForm()
  } else {
    event.target.innerText = 'Log Out'
  }
}
// const mouseHandler = (event) => {
//   debugger
// }


const userMethod = (event) => {
  event.preventDefault();
  let username = event.target[0].value
  fetch('http://localhost:3000/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        username: username
      })
    }).then(response => response.json())
      .then(event => {loggedIn(event)})
}

const loggedIn = (event) => {
  let userButton = document.querySelector("#user-button")
      userButton.addEventListener('click', logOut)
      userButton.innerText = "Log Out"
  let welcomePanel = document.querySelector('#rt-panel-data')
  welcomePanel.innerHTML = ' '
  let h1 = document.createElement("h1")
  h1.innerText = `Welcome ${event.username}`
  welcomePanel.append(h1)
  welcomePanel.dataset.id = event.id
  renderStats()
}

const logOut = (event) => {
  let userButton = document.querySelector("#user-button")
  userButton.innerText = "Log In"
  renderForm()
  // debugger
}

const renderStats = () => {
  // debugger
  let currentUserId = parseInt(document.querySelector('#rt-panel-data').dataset.id)
    fetch(`http://localhost:3000/users/${currentUserId}`)
    .then(response => response.json())
    .then(event => renderUserData(event))
}

const renderUserData = (event) => {
  let panelData = document.querySelector('#rt-panel-middle')
      panelData.innerHTML = ' '
  let statDiv = document.createElement("div")
  // let h1 = document.createElement("h1")
  // statDiv.append(h1)
  // h1.innerText = event.username
  let ul = document.createElement("ul")
  let deleteButton = document.createElement("button")
  deleteButton.innerText = "Delete User"
  statDiv.append(ul)
  // panelData.dataset.id = event.id
  counter = 1
  event.games.map(game => {
    let li = document.createElement("li")
    li.innerText = `Game ${counter++}: ${game.click_total} clicks`
    ul.append(li)
  })
  statDiv.append(deleteButton)
  panelData.append(statDiv)
  statDiv.addEventListener('click', clickHandler)
}
const deleteUser = (event) => {
  // deleteButton.addEventListener('click', console.log)
  // debugger
  let id = parseInt(event.target.parentElement.parentElement.dataset.id)

  fetch(`http://localhost:3000/users/${id}`, {
    method: "DELETE"
  })
  .then(res => res.json())
  .then(renderForm)
}
//     // .then(response => response.json())
//     // .then(console.log)
//   // debugger
// }

const gameData = (gameJson) => {
  const dataDiv = document.querySelector('#rt-panel-bottom')
  dataDiv.innerHTML = ''
  const lbUl = document.createElement('ul')

  const scoreTitle = document.createElement("h1")
  scoreTitle.innerText = "Top Scores"
  dataDiv.append(scoreTitle)
  let gameArray = gameJson.sort(function(game1,game2) {
    if (game1.click_total > game2.click_total) return -1;
    if (game1.click_total < game2.click_total) return 1;
  });

  gameArray.forEach (game => {
    let li = document.createElement('li')
    li.className = "user-li"
    li.dataset = "user-li-" + "${user.id}"
    li.innerText =
    `${game.user.username} - Points: ${game.click_total}`
    lbUl.append(li)
  })
  dataDiv.append(lbUl)
}

const rules = (event) => {
  const dataDiv = document.querySelector('#rt-panel-bottom')
  dataDiv.innerHTML = ''
  dataDiv.innerText = "ADD RULES."
}

// const userMethod = (event) => {
//   // debugger
//   event.preventDefault();
//   let username = event.target[0].value
//   if (username === if it exists.find
//
//     fetch(`http://localhost:3000/users/${id}`,
//
//     } else {
//   fetch(`http://localhost:3000/users`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     },
//     body: JSON.stringify({
//       name: username
//     })
//   }).then(response => response.json())
//     .then()}
// }
