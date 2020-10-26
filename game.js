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
        question: 'How do you say come?',
        choice1: 'wá',
        choice2: 'Oti',
        choice3: 'ṣibi',
        choice4: 'ijoko',
        answer: 1,
    },
    {
        question: 'How do you say good morning?',
        choice1: 'e kaasan',
        choice2: 'ororo',
        choice3: 'e kaaro',
        choice4: "mo fe m'omi",
        answer: 3,
    },
    {
        question: 'Which word means land?',
        choice1: 'kiniun',
        choice2: 'maalu',
        choice3: 'ilẹ',
        choice4: "mo fe lo 'le",
        answer: 3,
    },
    {
        question: 'Kini itumo omi?',
        choice1: 'Phone',
        choice2: 'Water',
        choice3: 'Knife',
        choice4: 'Cup',
        answer: 2,
    },
    {
        question: 'How do you say help me get?',
        choice1: 'bami lo',
        choice2: 'bami je',
        choice3: 'bami le',
        choice4: 'bami mu',
        answer: 4,
    },
    {
        question: 'How do you say where is?',
        choice1: 'yi sile',
        choice2: 'ni bo ni',
        choice3: 'e kaaro',
        choice4: 'bami mu',
        answer: 2,
    },
    {
        question: 'How do you say turn it up?',
        choice1: 'padà sí ilé',
        choice2: "yi s'oke",
        choice3: "yi s'ile",
        choice4: "mo fe m'omi",
        answer: 2,
    },
    {
        question: 'What would you use to fry? (usually a liquid)',
        choice1: 'eye',
        choice2: "ororo",
        choice3: "ilekun",
        choice4: 'bata',
        answer: 2,
    },
    {
        question: 'How do you say turn it down?',
        choice1: 'fi mi le',
        choice2: "yi s'oke",
        choice3: "yi s'ile",
        choice4: "mo fe m'oti",
        answer: 3,
    },
    {
        question: 'Translate: Mo fe jẹun',
        choice1: 'I want to go shopping',
        choice2: "I want to sleep",
        choice3: "I want to read",
        choice4: 'I want to eat',
        answer: 4,
    },
    {
        question: 'When leaving a room you should turn off the?',
        choice1: 'ina',
        choice2: "ọna",
        choice3: "ọmọ",
        choice4: 'awo',
        answer: 1,
    },
    {
        question: 'An elder has done you a favour, you respond by saying?',
        choice1: 'è ṣe',
        choice2: "o ṣe",
        choice3: "mo ṣe",
        choice4: 'ọṣẹ',
        answer: 1,
    },
    {
        question: "Translate: Ki 'ni oruko re?",
        choice1: 'How old are you?',
        choice2: "Where are you from?",
        choice3: "What is your name?",
        choice4: 'What did you do?',
        answer: 3,
    },
    {
        question: "Translate: she o ti jẹun?",
        choice1: 'What did you eat?',
        choice2: "Have you bathed?",
        choice3: "Have you eaten?",
        choice4: 'What do you want?',
        answer: 3,
    },
    {
        question: "ki l'on ṣẹlẹ?",
        choice1: "I'm hungry",
        choice2: "Whats going on?",
        choice3: "I'm tired",
        choice4: 'Where are you?',
        answer: 2,
    },
    {
        question: "The word for red/bright is?",
        choice1: "ẹsẹ",
        choice2: "abo",
        choice3: "eyin",
        choice4: 'pupa',
        answer: 4,
    },
    {
        question: "The word for white is?",
        choice1: "funfun",
        choice2: "ologbo",
        choice3: "eniyan",
        choice4: 'okurin',
        answer: 1,
    },
    {
        question: "The word for black is?",
        choice1: "tutu",
        choice2: "dudu",
        choice3: "igi",
        choice4: 'iwe',
        answer: 2,
    },
    {
        question: "Translate: eran",
        choice1: "flower",
        choice2: "child",
        choice3: "meat",
        choice4: 'tooth',
        answer: 3,
    },
    {
        question: "Kini itumo irun?",
        choice1: "speak",
        choice2: "shirt",
        choice3: "hand",
        choice4: 'hair',
        answer: 4,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 15

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