document.addEventListener("DOMContentLoaded", function(){
  fetch(`http://localhost:3000/games`)
    .then(response => response.json())
    .then(userData)
})


const userData = (gameJson) => {
  // let array = gameJson.forEach (game => console.log(`${game.click_total} - ${game.user.username}`))
  // let gameArray = gameJson.forEach (game => { return`${game.click_total} - ${game.user.username}`})
  const dataDiv = document.querySelector('#rt-panel-data')
  // debugger
  const lbUl = document.createElement('ul')

  const scoreTitle = document.createElement("h2")
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

// cardArray
const cardsArray = [
  {
    name: 'avi',
    img: 'GP-images/avi.png',
  },
  {
    name: 'tess',
    img: 'GP-images/tess.png',
  },
  {
    name: 'rachel',
    img: 'GP-images/rachel.png',
  },
  {
    name: 'tom',
    img: 'GP-images/tom.png',
  },
  {
    name: 'daniela',
    img: 'GP-images/daniela.png',
  },
  {
    name: 'josh',
    img: 'GP-images/josh.png',
  },
  {
    name: 'otha',
    img: 'GP-images/otha.png',
  },
  {
    name: 'kevin',
    img: 'GP-images/kevin.png',
  },
]

const game = document.querySelector('#game-grid')

// duplicating cards
let gameGrid = cardsArray.concat(cardsArray)
gameGrid.sort(() => 0.5 - Math.random())

let firstGuess = ''
let secondGuess = ''
let count = 0
let previousTarget = null;

gameGrid.forEach (student => {
  const card = document.createElement('div')
  card.classList.add('card')
  card.dataset.name = student.name

  const front = document.createElement('div')
  front.classList.add('front')

  const back = document.createElement('div')
    back.classList.add('back')
    back.style.backgroundImage = `url(${student.img})`
    // card.style.backgroundImage = `url(${student.img})`
    game.appendChild(card)
    card.appendChild(front)
    card.appendChild(back)
})


// add eventListener to cards
game.addEventListener('click', function(event) {
  let clicked = event.target
  if (clicked.className === 'card' ||
      clicked === previousTarget ||
      clicked.parentNode.classList.contains('selected')
      ) {
        return
      }
    if (count < 2){
      count++
      if (count === 1) {
          firstGuess = clicked.parentNode.dataset.name
          clicked.parentNode.classList.add('selected')
      } else {
          secondGuess = clicked.parentNode.dataset.name
          clicked.parentNode.classList.add('selected')
      }
      if (firstGuess !== '' && secondGuess !== ''){
          if (firstGuess === secondGuess) {
            setTimeout(match, delay)
            setTimeout(resetGuesses, delay)
            match();
            resetGuesses();
          } else {
             setTimeout(resetGuesses, delay)
          }
       }
       previousTarget = clicked;
     }
  });

let delay = 1200;

const match = () => {
  let selected = document.querySelectorAll('.selected')
  selected.forEach(card => {
    card.classList.add('match')
  })
}

// skipped let previous null

const resetGuesses = () => {
  firstGuess = ''
  secondGuess = ''
  count = 0

  let selected = document.querySelectorAll('.selected')
  selected.forEach(card => {
    card.classList.remove('selected')
  })
}
