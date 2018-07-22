$(document).ready(function () {

// Game Variables
var currentQuestion = 0;
var correctAnswers = 0;
var wrongAnswers = 0;
var totalScore = 0;
var quizOver = false;
var secs = 15;

// Array of objects with questions data
var questions = [{
    question: "1. In what year did the first FIFA World Cup take place?",
    choices: ["1910", "1920", "1930", "1940"],
    giphy: "<img class='gif-img' src='https://media.giphy.com/media/tooiHX1mFOv28/giphy.gif' width=290 height=200>",
    text: "The first FIFA World Cup was hosted by Uruguay in 1930",
    correctAnswer: 2
}, {
    question: "2. How often is the FIFA World Cup played?",
    choices: ["Every year", "Every 2 years", "Every 3 years", "Every 4 years"],
    giphy: "<img class='gif-img' src='https://media.giphy.com/media/k9ht5KqdKk3wk/giphy.gif' width=290 height=200>",
    text: "The FIFA World Cup is played every four years",
    correctAnswer: 3
}, {
    question: "3. How many nations will play in the 2018 World Cup in Russia?",
    choices: ["30", "32", "36", "38"],
    giphy: "<img class='gif-img' src='https://media.giphy.com/media/iTnQ737jr4mtO/giphy.gif' width=290 height=200>",
    text: "The 2018 FIFA World Cup will be played by 32 nations",
    correctAnswer: 1
}, {
    question: "4. What two countries will be making their first World Cup appearance in Russia?",
    choices: ["Iceland and Panama", "Panama and Costa Rica", "Serbia and Iceland", "Iceland and Costa Rica"],
    giphy: "<img class='gif-img' src='https://media.giphy.com/media/l46C72ug3KlBd55Qc/giphy.gif' width=290 height=200>",
    text: "Iceland and Panama will play the FIFA World Cup for the first time",
    correctAnswer: 0
}, {
    question: "5. How many Russian cities will host the 2018 FIFA World Cup?",
    choices: ["10", "11", "12", "13"],
    giphy: "<img class='gif-img' src='https://media.giphy.com/media/l4EoWNm0kYs43OzCw/giphy.gif' width=290 height=200>",
    text: "The 2018 FIFA World Cup will be hosted by 11 cities",
    correctAnswer: 1
}, {
    question: "6. What country has won the FIFA World Cup most times?",
    choices: ["Germany", "Argentina", "Italy", "Brazil"],
    giphy: "<img class='gif-img' src='https://media.giphy.com/media/tWCLvU1GAAIpy/giphy.gif' width=290 height=200>",
    text: "Brazil has won the FIFA World Cup five times",
    correctAnswer: 3
}, {
    question: "7. What player is the World Cup top goalscorer of all time?",
    choices: ["Pele", "Klose", "Ronaldo", "Maradona"],
    giphy: "<img class='gif-img' src='https://media.giphy.com/media/l7IRjqleM7eXS/giphy.gif' width=290 height=200>",
    text: "Miroslav Klose (Germany) has scored a total of 16 goals in four World Cups",
    correctAnswer: 1
}, {
    question: "8. What two athletes have won the World Cup both as a player and later as a coach?",
    choices: ["Pele and Maradona", "Cruyff and Zidane", "Zagallo and Beckenbauer", "Klinsmann and Platini"],
    giphy: "<img class='gif-img' src='https://media.giphy.com/media/fI5pB1CQqVMJ2/giphy.gif' width=290 height=200>",
    text: "Zagallo (Brazil) and Beckenbauer (Germany) have won the World Cup as a player and coach",
    correctAnswer: 2
}, {
    question: "9. What is the only country to have played in every World Cup in history?",
    choices: ["Uruguay", "England", "Brazil", "Germany"],
    giphy: "<img class='gif-img' src='https://media.giphy.com/media/L1RCuTvmJILT2/giphy.gif' width=290 height=200>",
    text: "Only Brazil has qualified to every World Cup since it began in 1930",
    correctAnswer: 2
}, {
    question: "10. Which country has never won a World Cup?",
    choices: ["Netherlands", "France", "Argentina", "Spain"],
    giphy: "<img class='gif-img' src='https://media.giphy.com/media/VQm6QbezyBqNy/giphy.gif' width=290 height=200>",
    text: "The Netherlands has reached the final 3 times, but never won the World Cup",
    correctAnswer: 0
}];

// Hide other buttons on Start screen
$(".facebook-button").hide();
$(".checkButton").hide();
$(".nextButton").hide();
$(".resultButton").hide();
$(".playAgainButton").hide();

    // On the click of the Start Button - start the game
    $(".start-button").click(function(){

        // Set up game environment
        $(".start-button").hide();
        $(".quizMessage").hide();
        $(".checkButton").show();
        $(".answer-container").hide();

        // Start the 10s timer
        timer();

        // Call the function to display first question
        displayCurrentQuestion();
    });

    // On the click of the Check button
    $(".checkButton").click(function(){

        // Get input answer from user
        value = $("input[type='radio']:checked").val();

            // if the user did not select any options, tell him to do so
           if (value == undefined) {

                $(".quizMessage").html("<font color='#2f6ce0'>Please select an answer above</font>");
                $(".quizMessage").show();

            } else { //If an answer was selected, call the function to check the answer

                checkAnswer();
            }
    });

//====================== Game Functions ================//  

    // Timer Function
    function timer() {

         setInterval(function() {

            // Countdown seconds
            secs--;

            // Display timer on screen
            $('.timer-zone').text("Time Remaining: " +secs+" seconds");

            // If the seconds reach zero, check the answer
            if (secs == 0) {

            checkAnswer();
                
            } 
        }, 1000);

    }


//========================================================//

// Function to display current question and choices
function displayCurrentQuestion() {

    // Timer text
    $('.timer-zone').text("Time Remaining: 15 seconds");

     // Display score on screen
    $('.score-zone').text("Current score: " +totalScore+ " points");

    // Variables to access the object data to create questions and choices
    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("ul").remove();

    // Loop through the numChoices array to create answer options
    var choice;

    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<ul><input type="radio" value=' + i + ' name="dynradio" /> ' + choice + '</ul>').appendTo(choiceList);
    }
}

//=========================================================//

function computeScore() {

    if (secs == 15) {
        totalScore += 150 
    } else if (secs == 14) {
        totalScore += 140
    } else if (secs == 13) {
        totalScore += 130
    } else if (secs == 12) {
        totalScore += 120
    } else if (secs == 11) {
        totalScore += 110
    } else if (secs == 10) {
        totalScore += 100
    } else if (secs == 9) {
        totalScore += 90
    } else if (secs == 8) {
        totalScore += 80
    } else if (secs == 7) {
        totalScore += 70
    } else if (secs == 6) {
        totalScore += 60
    } else if (secs == 5) {
        totalScore += 50
    } else if (secs == 4) {
        totalScore += 40
    } else if (secs == 3) {
        totalScore += 30
    } else if (secs == 2) {
        totalScore += 20
    } else if (secs == 1) {
        totalScore += 10
    } else if (secs == 0) {
        totalScore += 0
    }
                    
     // Display score on screen
    $('.score-zone').text("Current score: " +totalScore+ " points");

}

//========================================================//

    // Function to check if user answer is right or wrong
    function checkAnswer() {

        // Get input choice from user
        value = $("input[type='radio']:checked").val();

        $(".answer-container").show();
                
                // if the user answer is correct     
                if (value == questions[currentQuestion].correctAnswer) {

                    computeScore();

                    // Add to the score
                    correctAnswers++;

                    // Hide and show appropriate elements to display answer screen
                    $(".timer-zone").hide();
                    $(".score-zone").hide();
                    $(".question").hide();
                    $(".choiceList").hide();
                    $(".quizMessage").hide();

                    $(".answer-msg").html("<font color='#00b300'>CORRECT ANSWER!</font>");
                    $(".answer-msg2").html(questions[currentQuestion].text);
                    $(".answer-gif").html(questions[currentQuestion].giphy);

                    $(".checkButton").hide();
                    $(".nextButton").show();

                    // reset timer
                    secs = 0;

                } else { // if the user answer is wrong

                    // Add to the score
                    wrongAnswers++;

                    // Hide and show appropriate elements to display answer screen
                    $(".timer-zone").hide();
                    $(".score-zone").hide();
                    $(".question").hide();
                    $(".choiceList").hide();
                    $(".quizMessage").hide();

                    $(".answer-msg").html("<font color='#ff0000'>WRONG ANSWER!</font>");
                    $(".answer-msg2").html(questions[currentQuestion].text);
                    $(".answer-gif").html(questions[currentQuestion].giphy);

                    $(".checkButton").hide();
                    $(".nextButton").show();

                    // reset timer
                    secs = 0;
                } 

                // Increase currentQuestion so the game moves on to the next question
                currentQuestion++;  

                // If the game is at the last question, show the Result button
                if (currentQuestion == 10) {
                    $(".nextButton").hide();
                    $(".resultButton").show();
                }

                // When the Next button is clicked, go on to next question
                $(".nextButton").click(function(){
                    nextQuestion();                                     
                });

                // When the Result button is clicked, show the results
                $(".resultButton").click(function(){
                    finalResult();                                     
                });   

    }

//========================================================//

    // Function to move the game on to the next question
    function nextQuestion() {

            // Timer text
            $('.timer-zone').text("Time Remaining: 15 seconds");

            // Set up seconds to restart timer
            secs = 16;

            // Set up game environment - hide and show appropriate elements
            $(".timer-zone").show();
            $(".score-zone").show();
            $(".question").show();
            $(".choiceList").show();
            $(".checkButton").show();

            $(".start-button").hide();
            $(".quizMessage").hide();
            $(".answer-container").hide();
            $(".nextButton").hide();

            // Call the function to display first question
            displayCurrentQuestion();

    }

//========================================================//

    // Function to display results at the end of game
    function finalResult() {

        // Set secs to zero to shut down timer
        secs = 0;

        // Hide and show appropriate elements on page
        $(".timer-zone").hide();
        $(".start-button").hide();
        $(".quizMessage").hide();
        $(".question").hide();
        $(".choiceList").hide();
        $(".checkButton").hide();
        $(".nextButton").hide();
        $(".resultButton").hide();

        $(".playAgainButton").show();
        $(".answer-container").show();
        $(".facebook-button").show();

        // Display results texts on page
        $(".answer-msg").text("RESULTS");
        $(".answer-msg2").html("<p>Final Score: <font color='#104eb2'>" + totalScore + "</font> points</p><p>You've got <font color='#104eb2'>" + correctAnswers + "</font> right answers</p><p>and <font color='#104eb2'>" + wrongAnswers + "</font> wrong answers</p>");

        // Display results final advice, depending on user score
        if (correctAnswers <= 2 ) {

            $(".answer-gif").text("Well, it is obvious that soccer is not your favorite sport!");

        } else if (correctAnswers > 2 && correctAnswers <= 4) {

            $(".answer-gif").text("You need to watch more World Cup games, don't miss out!");

        } else if (correctAnswers > 4 && correctAnswers <= 6) {

            $(".answer-gif").text("Keep improving your soccer knowledge and you'll get to the top!");

        } else if (correctAnswers > 6 && correctAnswers <= 8) {

            $(".answer-gif").text("Nice job, you are surely a soccer fan!");

        } else if (correctAnswers > 8) {

            $(".answer-gif").text("You are a true World Cup encyclopedia, well done!");
            
        }

        // On the click of the Play Again button, restart game
        $(".playAgainButton").click(function(){
                restartGame();                                     
        });  

}


//========================================================//

    // Function to restart game
    function restartGame() {

        // Reset game variables
        currentQuestion = 0;
        correctAnswers = 0;
        wrongAnswers = 0;
        totalScore = 0;


        // Hide and show appropriate elements on screen
        $(".timer-zone").show();
        $(".question").show();
        $(".choiceList").show();

        $(".answer-container").hide();
        $(".playAgainButton").hide();
        $(".facebook-button").hide();

        // Call the function to show first question
        nextQuestion();
}

});