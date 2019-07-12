const userURL = "http://localhost:3000/users"
const gameURL = "http://localhost:3000/games"

const gamePanel = () => {
  fetch(`http://localhost:3000/games`)
    .then(response => response.json())
    .then(gameData)
}

const createUser = (event) => {
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
    .then((event) => {loggedIn(event)})
}

const renderStats = () => {
  let currentUserId = parseInt(document.querySelector('#rt-panel-data').dataset.id)
  fetch(`http://localhost:3000/users/${currentUserId}`)
    .then(response => response.json())
    .then(event => renderUserData(event))
}

const deleteUser = (event) => {
  let id = parseInt(event.target.dataset.id)
  fetch(`http://localhost:3000/users/${id}`, {
    method: "DELETE"
  }).then(res => res.json())
    .then(logOut)
}