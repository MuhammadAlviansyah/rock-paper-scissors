const selectionButtons = document.querySelectorAll('[data-selection')
const finalColumn = document.querySelector('[data-final-column]')
const computerScore = document.querySelector('[data-computer-score]')
const yourScore = document.querySelector('[data-your-score]')
const SELECTIONS = [
    {
        name : 'rock',
        img : '<img src="./assets/rock.png" alt="">',
        beat : 'scissor'
    },
    {
        name : 'paper',
        img : '<img src="./assets/paper.png" alt="">',
        beat : 'rock'
    },
    {
        name : 'scissor',
        img : '<img src="./assets/scissors.png" alt="">',
        beat : 'paper'
    }
]

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection
        const selection = SELECTIONS.find(selection => selection.name === selectionName)
        makeSelection(selection)
    })
})

function makeSelection(selection) {
    const computerSelection = randomSelection()
    const yourWinner = isWinner(selection, computerSelection)
    const computerWinner = isWinner (computerSelection, selection)
    
    addSelectionResult(computerSelection, computerWinner)
    addSelectionResult(selection, yourWinner)

    if(yourWinner) incrementScore(yourScore)
    if(computerWinner) incrementScore(computerScore)
}

function addSelectionResult(selection, winner){
    const div = document.createElement('div')
    div.innerHTML = selection.img
    div.classList.add('result')
    if (winner) div.classList.add('winner')
    else div.classList.add('loser')
    finalColumn.after(div)
}

function incrementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}

function isWinner(selection, opponentSelection) {
    return selection.beat === opponentSelection.name
}

function randomSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
    return SELECTIONS[randomIndex]
}