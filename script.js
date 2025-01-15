const quizData = [
    {
      question: "Qual foi a primeira rede social em que conversamos?",
      options: ["Tumblr", "Facebook", "Linkedin", "Instagram"],
      answer: 3
  },
  {
      question: "Quem foi o primeiro a mandar mensagem?",
      options: ["Eu (Marcos)", "Você (Ana Clara)"],
      answer: 0
  },
  {
      question: "Onde nos conhecemos?",
      options: ["Em uma festa", "Na igreja", "Na escola", "Outro lugar"],
      answer: 1
  },
  {
      question: "Quando foi que eu te mandei a primeira mensagem?",
      options: ["Na Pascoa", "No Natal", "Na Festa Junina", "No Hallowen"],
      answer: 2
  },
  {
      question: "Em que lugar foi a primeira vez que saimos juntos?",
      options: ["Na Escola", "Na Praça", "Na Point Burguer", "Restaurante Japonês"],
      answer: 0
  },
  {
    question: "Onde eu te pedi em namoro?",
    options: ["Pessoalmente", "No WhatsApp", "No Instagram", "Fiz uma cartinha muito bonita e legal"],
    answer: 2
  },
  {
    question: "Que dia eu te pedi em namoro pela primeira vez?",
    options: ["26/06", "29/06", "27/06", "25/06"],
    answer: 2
  },
  {
    question: "Qual foi a primeira coisa que comprei para você",
    options: ["Uma pelucia", "Doce", "Um convite", "Pulseira"],
    answer: 2
  },
  {
    question: "Quando foi que demos o primeiro beijo (Foi um selinho, mas eu conto como primeiro beijo)",
    options: ["17/02", "30/06", "24/09", "01/01"],
    answer: 1
  },
  {
    question: "Para quem foi a primeira pessoa que eu contei sobre você?",
    options: ["Minha mãe", "Minha irmã", "Minha vó", "Meu amigo"],
    answer: 0
  }
];

let currentQuestion = 0;
let score = 0;

const startMenu = document.getElementById('start-menu');
const quizContainer = document.getElementById('quiz-container');
const questionElement = document.querySelector('.question');
const optionsElement = document.querySelector('.options');
const resultElement = document.querySelector('.result');
const submitButton = document.getElementById('submit');
const startButton = document.getElementById('start-button');

function loadQuiz() {
  const currentQuiz = quizData[currentQuestion];
  questionElement.textContent = currentQuiz.question;
  optionsElement.innerHTML = '';

  currentQuiz.options.forEach((option, index) => {
      const li = document.createElement('li');
      li.innerHTML = `<label><input type="radio" name="option" value="${index}"> ${option}</label>`;
      optionsElement.appendChild(li);
  });
}

function getSelectedOption() {
  const options = document.querySelectorAll('input[name="option"]');
  let selectedOption = null;

  options.forEach((option) => {
      if (option.checked) {
          selectedOption = parseInt(option.value);
      }
  });

  return selectedOption;
}

function highlightAnswers(selectedOption) {
  const options = document.querySelectorAll('.options li');
  options.forEach((option, index) => {
      if (index === quizData[currentQuestion].answer) {
          option.classList.add('correct');
      } else if (index === selectedOption) {
          option.classList.add('incorrect');
      }
  });
}

function disableOptions() {
  const options = document.querySelectorAll('input[name="option"]');
  options.forEach(option => {
      option.disabled = true;
  });
}

function resetQuiz() {
  currentQuestion = 0;
  score = 0;
  resultElement.textContent = '';
  submitButton.style.display = 'block';
  loadQuiz();
}

startButton.addEventListener('click', () => {
  startMenu.style.display = 'none';
  quizContainer.style.display = 'block';
  loadQuiz();
});

submitButton.addEventListener('click', () => {
  const selectedOption = getSelectedOption();

  if (selectedOption === null) {
      alert('Por favor, selecione uma resposta!');
      return;
  }

  highlightAnswers(selectedOption);
  disableOptions();

  if (selectedOption === quizData[currentQuestion].answer) {
      score++;
  }

  submitButton.disabled = true;

  setTimeout(() => {
      currentQuestion++;

      if (currentQuestion < quizData.length) {
          loadQuiz();
          submitButton.disabled = false;
      } else {
          questionElement.textContent = 'Quiz concluído! 🎉';
          optionsElement.innerHTML = '';

          let emoji = '';
          if (score < quizData.length / 2) {
              emoji = '😞'; // Emoji triste
          } else {
              emoji = '🎉'; // Emoji de confete
          }

          resultElement.innerHTML = `Você acertou ${score} de ${quizData.length} perguntas. ${emoji}<br><br> <button onclick="resetQuiz()">Tentar novamente</button>`;
          submitButton.style.display = 'none';
      }
  }, 2000);
});
