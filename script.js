const quizData = [
    {
      question: "What is the total number of fundamental rights in the Constitution of India?",
      options: ["6", "7", "9", "12"],
      correctAnswer: 0
    },
    {
      question: "Which part of the Constitution deals with Fundamental Duties?",
      options: ["Part I", "Part III", "Part IV", "Part IVA"],
      correctAnswer: 3
    },
    {
      question: "The President of India is elected by which body?",
      options: ["The Lok Sabha", "The Rajya Sabha", "An electoral college", "The people directly"],
      correctAnswer: 2
    },
    {
      question: "True or False: The Constitution of India provides for a single citizenship.",
      options: ["True", "False"],
      correctAnswer: 0
    },
    // Additional Questions:
    {
      question: "Which Article of the Indian Constitution guarantees the right to equality?",
      options: ["Article 12", "Article 14", "Article 16", "Article 19"],
      correctAnswer: 1
    },
    {
      question: "Which of the following is NOT a Fundamental Duty under the Indian Constitution?",
      options: ["Safeguard public property", "Promote harmony", "Protect the sovereignty", "Right to Education"],
      correctAnswer: 3
    },
    {
      question: "What is the minimum age required to be the President of India?",
      options: ["30 years", "35 years", "40 years", "50 years"],
      correctAnswer: 1
    },
    {
      question: "In which year was the Constitution of India adopted?",
      options: ["1947", "1948", "1949", "1950"],
      correctAnswer: 2
    },
    {
      question: "Which body is responsible for interpreting the Constitution of India?",
      options: ["Lok Sabha", "Supreme Court", "Rajya Sabha", "Prime Minister"],
      correctAnswer: 1
    },
    {
      question: "How many schedules are there in the Constitution of India?",
      options: ["10", "8", "12", "9"],
      correctAnswer: 2
    },
    {
      question: "Which Article of the Indian Constitution deals with the right to freedom of religion?",
      options: ["Article 20", "Article 25", "Article 32", "Article 44"],
      correctAnswer: 1
    },
    {
      question: "True or False: The Indian Constitution is the longest written constitution in the world.",
      options: ["True", "False"],
      correctAnswer: 0
    },
    {
      question: "The idea of Directive Principles of State Policy was borrowed from the Constitution of which country?",
      options: ["USA", "UK", "Ireland", "Australia"],
      correctAnswer: 2
    },
    {
      question: "Which amendment is known as the 'Mini Constitution'?",
      options: ["42nd Amendment", "44th Amendment", "52nd Amendment", "73rd Amendment"],
      correctAnswer: 0
    },
    {
      question: "Who is known as the 'Father of the Indian Constitution'?",
      options: ["Jawaharlal Nehru", "B.R. Ambedkar", "Mahatma Gandhi", "Rajendra Prasad"],
      correctAnswer: 1
    }
  ];
  
  
  let currentQuestion = 0;
  let score = 0;
  let timerInterval;
  let lifelinesUsed = { fiftyFifty: false, skip: false };
  
  function loadQuestion() {
    resetTimer();
    startTimer();
  
    const questionElement = document.getElementById('question');
    const optionButtons = document.getElementsByClassName('option-btn');
    const questionData = quizData[currentQuestion];
  
    questionElement.textContent = questionData.question;
    for (let i = 0; i < optionButtons.length; i++) {
      if (questionData.options[i]) {
        optionButtons[i].textContent = questionData.options[i];
        optionButtons[i].style.display = "block";
        optionButtons[i].style.backgroundColor = "#008cba"; // Reset color
        optionButtons[i].disabled = false;
      } else {
        optionButtons[i].style.display = "none";
      }
    }
  
    document.getElementById('next-btn').style.display = "none"; // Hide the Next button after loading a new question
    updateProgressBar();
  }
  
  function selectOption(selectedIndex) {
    clearInterval(timerInterval); // Stop the timer when an option is selected
    const questionData = quizData[currentQuestion];
    const optionButtons = document.getElementsByClassName('option-btn');
  
    if (selectedIndex === questionData.correctAnswer) {
      score++;
      optionButtons[selectedIndex].style.backgroundColor = "green"; // Correct answer
    } else {
      optionButtons[selectedIndex].style.backgroundColor = "red"; // Wrong answer
      optionButtons[questionData.correctAnswer].style.backgroundColor = "green"; // Show correct answer
    }
  
    document.getElementById('next-btn').style.display = "block"; // Show the Next button after answering
  }
  
  function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showScore();
    }
  }
  
  function showScore() {
    document.getElementById('quiz').innerHTML = `
      <h2>Your Score: ${score}/${quizData.length}</h2>
      <button onclick="restartQuiz()">Restart Quiz</button>
    `;
  }
  
  function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    lifelinesUsed = { fiftyFifty: false, skip: false }; // Reset lifelines
    document.getElementById('fiftyFifty').disabled = false; // Enable 50/50 lifeline
    document.getElementById('skipQuestion').disabled = false; // Enable skip lifeline
    document.getElementById('quiz').innerHTML = `
      <div class="timer-section">
        <p>Time Left: <span id="timer">15</span> seconds</p>
      </div>
      <div class="question-section">
        <p id="question"></p>
      </div>
      <div class="options-section">
        <button class="option-btn" id="option1" onclick="selectOption(0)"></button>
        <button class="option-btn" id="option2" onclick="selectOption(1)"></button>
        <button class="option-btn" id="option3" onclick="selectOption(2)"></button>
        <button class="option-btn" id="option4" onclick="selectOption(3)"></button>
      </div>
      <button id="next-btn" onclick="nextQuestion()">Next</button>
      <p id="score"></p>
    `;
    loadQuestion();
  }
  
  function startTimer() {
    timeLeft = 15;
    document.getElementById('timer').textContent = timeLeft;
    timerInterval = setInterval(() => {
      timeLeft--;
      document.getElementById('timer').textContent = timeLeft;
      if (timeLeft === 0) {
        clearInterval(timerInterval);
        nextQuestion(); // Auto move to the next question when time runs out
      }
    }, 1000);
  }
  
  function resetTimer() {
    clearInterval(timerInterval);
    document.getElementById('timer').textContent = 15;
  }
  
  function updateProgressBar() {
    const progressBar = document.getElementById('progress');
    const progressPercentage = ((currentQuestion + 1) / quizData.length) * 100;
    progressBar.style.width = progressPercentage + '%';
  }
  
  function useFiftyFifty() {
    if (!lifelinesUsed.fiftyFifty) {
      const questionData = quizData[currentQuestion];
      const optionButtons = document.getElementsByClassName('option-btn');
      let optionsToRemove = 2;
  
      for (let i = 0; i < optionButtons.length; i++) {
        if (i !== questionData.correctAnswer && optionsToRemove > 0) {
          optionButtons[i].style.display = "none"; // Hide two wrong options
          optionsToRemove--;
        }
      }
  
      lifelinesUsed.fiftyFifty = true;
      document.getElementById('fiftyFifty').disabled = true; // Disable the 50/50 button after use
    }
  }
  
  function skipQuestion() {
    if (!lifelinesUsed.skip) {
      currentQuestion++;
      loadQuestion();
      lifelinesUsed.skip = true;
      document.getElementById('skipQuestion').disabled = true; // Disable the skip button after use
    }
  }
  
  window.onload = function() {
    document.getElementById('quiz').innerHTML = `
      <div class="timer-section">
        <p>Time Left: <span id="timer">15</span> seconds</p>
      </div>
      <div class="question-section">
        <p id="question"></p>
      </div>
      <div class="options-section">
        <button class="option-btn" id="option1" onclick="selectOption(0)"></button>
        <button class="option-btn" id="option2" onclick="selectOption(1)"></button>
        <button class="option-btn" id="option3" onclick="selectOption(2)"></button>
        <button class="option-btn" id="option4" onclick="selectOption(3)"></button>
      </div>
      <button id="next-btn" onclick="nextQuestion()">Next</button>
      <p id="score"></p>
    `;
    loadQuestion(); // Load the first question when the page loads
  };
  