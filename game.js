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
        choice3: "yi s'ilẹ",
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
    {
        question: "Have they eaten?",
        choice1: "she wọn ti jẹun?",
        choice2: "she o ti jẹun?",
        choice3: "nibo l'o lọ?",
        choice4: 'ebi n pa mi',
        answer: 1,
    },
    {
        question: "Which word means fish?",
        choice1: "ọjà",
        choice2: "ọna",
        choice3: "ẹja",
        choice4: 'adiẹ',
        answer: 3,
    },
    {
        question: "All female birds lay?",
        choice1: "ọbẹ",
        choice2: "ẹyin",
        choice3: "owo $",
        choice4: 'ọwọ',
        answer: 2,
    },
    {
        question: "Translate: Rọra",
        choice1: "Gently",
        choice2: "Quickly",
        choice3: "Nicely",
        choice4: 'Ugly',
        answer: 1,
    },
    {
        question: "Fun mi ata rodo 'kan",
        choice1: "Give me a scotch bonnet",
        choice2: "Give me a piece of paper",
        choice3: "I want to read",
        choice4: 'Give me some sugar',
        answer: 1,
    },
    {
        question: "Ki lo fe?",
        choice1: "Can I help?",
        choice2: "Did you read?",
        choice3: "What do you want?",
        choice4: 'Where are you?',
        answer: 3,
    },
    {
        question: "How do you say yes in Yoruba?",
        choice1: "bẹẹni",
        choice2: "boya",
        choice3: "nigbamii",
        choice4: 'laipẹ',
        answer: 1,
    },
    {
        question: "Which one means spoon?",
        choice1: "eku",
        choice2: "ṣibi",
        choice3: "oruka",
        choice4: 'ète',
        answer: 2,
    },
    {
        question: "The word for clock is?",
        choice1: "aago",
        choice2: "ese",
        choice3: "aago ọwọ",
        choice4: 'iwe',
        answer: 1,
    },
    {
        question: "How do you say aṣọ in English?",
        choice1: "watch",
        choice2: "foot",
        choice3: "book",
        choice4: 'cloth',
        answer: 4,
    },
    {
        question: "Kini itumo abere?",
        choice1: "fire",
        choice2: "needle",
        choice3: "wood",
        choice4: 'ball',
        answer: 2,
    },
    {
        question: "Ṣe o maan jẹ eran?",
        choice1: "Where did you get the meat?",
        choice2: "Where did you eat meat?",
        choice3: "Do you eat meat?",
        choice4: 'Can I cook you some meat?',
        answer: 3,
    },
    {
        question: "Ṣe o tutu wa ni ita?",
        choice1: "Is he coming outside?",
        choice2: "Do you have a cold?",
        choice3: "Can I sit down?",
        choice4: 'Is it cold outside?',
        answer: 4,
    },
    {
        question: "Translate: Ile mi gbona",
        choice1: "My house is hot",
        choice2: "The child is crying",
        choice3: "My food is hot",
        choice4: 'I like fish',
        answer: 1,
    },
    {
        question: "Mo fẹ fọ ọwọ mi",
        choice1: "Leave me alone",
        choice2: "I want to wash my hands",
        choice3: "I want to go home",
        choice4: 'I am doing a quiz',
        answer: 2,
    },
    {
        question: "Which word is used for both legs and feet?",
        choice1: "ododo",
        choice2: "iwe",
        choice3: "oju",
        choice4: 'ẹsẹ',
        answer: 4,
    },
    {
        question: "Translate: mouth",
        choice1: "irun",
        choice2: "eti",
        choice3: "imú",
        choice4: 'oju',
        answer: 3,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 20

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