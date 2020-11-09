const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {        
    question: "Kini itumo irun?",
    choice1: "Speak",
    choice2: "Shirt",
    choice3: "Hand",
    choice4: 'Hair',
    answer: 4,
},
{
    question: "Translate: mouth",
    choice1: "Irun",
    choice2: "Eti",
    choice3: "Ẹnu",
    choice4: 'Oju',
    answer: 3,
},
{        
    question: "Kini itumo eyín?",
    choice1: "Teeth",
    choice2: "Toe",
    choice3: "Knee",
    choice4: 'Chest',
    answer: 1,
},
{        
    question: "Kini itumo ikùn?",
    choice1: "Speak",
    choice2: "Stomach",
    choice3: "Hand",
    choice4: 'Hair',
    answer: 2,
},
{        
    question: "How do you say chest?",
    choice1: "Orí",
    choice2: "Èjiká",
    choice3: "Àyà",
    choice4: 'Ojú',
    answer: 3,
},
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        
        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    /*calculating value of question index */
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex] /* keeps track of what question im on */
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()