$(document).ready(function () {

// Game Variables
var currentQuestion = 0;
var correctAnswers = 0;
var wrongAnswers = 0;
var quizOver = false;
var secs = 10;

// Array of objects with questions data
var questions = [{
    question: "1. What is the largest country in the world?",
    choices: ["China", "Russia", "United States", "Canada"],
    giphy: "<img class='gif-img' src='https://media.giphy.com/media/yqj1Nq2LDeWPu/giphy.gif' width=290 height=200>",
    text: "Russia is the world's largest country, with a total area of 17.1 million square kilometers",
    correctAnswer: 1
}, {
    question: "2. What is the approximate population of India?",
    choices: ["750 million", "900 million", "1 billion", "1.2 billion"],
    giphy: "<img class='gif-img' src='https://media.giphy.com/media/qj9LH3O2Td1Kg/giphy.gif' width=290 height=200>",
    text: "India's current population is approximately 1.2 billion people",
    correctAnswer: 3
}, {
    question: "3. What is the capital city of Australia?",
    choices: ["Melbourne", "Sydney", "Canberra", "Adelaide"],
    giphy: "<img class='gif-img' src='https://media.giphy.com/media/luFnd5dLvB4pW/giphy.gif' width=290 height=200>",
    text: "Canberra is the capital of Australia",
    correctAnswer: 2
}, {
    question: "4. In what continent is Chile located?",
    choices: ["Central America", "Asia", "South America", "Europe"],
    giphy: "<img class='gif-img' src='https://media.giphy.com/media/VHuvKNvDvIszC/giphy.gif' width=290 height=200>",
    text: "Chile is located on the western coast of South America",
    correctAnswer: 2
}, {
    question: "5. What is the currency of Brazil?",
    choices: ["Brazilian Real", "Brazilian Dollar", "Brazilian Peso", "Brazilian Crown"],
    giphy: "<img class='gif-img' src='https://media.giphy.com/media/GR7S6M8eUQwKY/giphy.gif' width=290 height=200>",
    text: "Brazil's official currency is called Real",
    correctAnswer: 0
}, {
    question: "6. Between what years did World War I take place?",
    choices: ["1904 - 1908", "1914 - 1918", "1929 - 1935", "1939 - 1945"],
    giphy: "<img class='gif-img' src='https://media.giphy.com/media/hsTBcU33SmtmE/giphy.gif' width=290 height=200>",
    text: "World War I happened from 1914 to 1918",
    correctAnswer: 1
}, {
    question: "7. What is the world's most popular sport?",
    choices: ["Basketball", "Football", "Baseball", "Soccer"],
    giphy: "<img class='gif-img' src='https://media.giphy.com/media/l2JhGDtOnOyeqDM4w/giphy.gif' width=290 height=200>",
    text: "Soccer is the most popular sport in the world",
    correctAnswer: 3
}, {
    question: "8. What is Earth's approximate age?",
    choices: ["2.3 billion years", "3.6 billion years", "4.5 billion years", "5.2 billion years"],
    giphy: "<img class='gif-img' src='https://media.giphy.com/media/UOdoMz3baCENO/giphy.gif' width=290 height=200>",
    text: "Our planet Earth is approximately 4.5 billion years old",
    correctAnswer: 2
}];

    // Hide other buttons on Start screen
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
    $('.timer-zone').text("Time Remaining: 10 seconds");

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


//========================================================//

    // Function to check if user answer is right or wrong
    function checkAnswer() {

        // Get input choice from user
        value = $("input[type='radio']:checked").val();

        $(".answer-container").show();

        secs = 0;
                
                // if the user answer is correct     
                if (value == questions[currentQuestion].correctAnswer) {

                    // Add to the score
                    correctAnswers++;

                    // Hide and show appropriate elements to display answer screen
                    $(".timer-zone").hide();
                    $(".question").hide();
                    $(".choiceList").hide();
                    $(".quizMessage").hide();

                    $(".answer-msg").html("<font color='#00b300'>CORRECT ANSWER!</font>");
                    $(".answer-msg2").html(questions[currentQuestion].text);
                    $(".answer-gif").html(questions[currentQuestion].giphy);

                    $(".checkButton").hide();
                    $(".nextButton").show();

                } else { // if the user answer is wrong

                    // Add to the score
                    wrongAnswers++;

                    // Hide and show appropriate elements to display answer screen
                    $(".timer-zone").hide();
                    $(".question").hide();
                    $(".choiceList").hide();
                    $(".quizMessage").hide();

                    $(".answer-msg").html("<font color='#ff0000'>WRONG ANSWER!</font>");
                    $(".answer-msg2").html(questions[currentQuestion].text);
                    $(".answer-gif").html(questions[currentQuestion].giphy);

                    $(".checkButton").hide();
                    $(".nextButton").show();
                } 

                // Increase currentQuestion so the game moves on to the next question
                currentQuestion++;  

                // If the game is at the last question, show the Result button
                if (currentQuestion == 8) {
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
            $('.timer-zone').text("Time Remaining: 10 seconds");

            // Set up seconds to restart timer
            secs = 11;

            // Set up game environment - hide and show appropriate elements
            $(".timer-zone").show();
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

        // Display results texts on page
        $(".answer-msg").text("RESULTS");
        $(".answer-msg2").html("<p>Correct Answers: " + correctAnswers + "</p><p>Wrong Answers: " + wrongAnswers + "</p>");

        // Display results final advice, depending on user score
        if (correctAnswers <= 2 ) {

            $(".answer-gif").text("You need to improve your world knowledge, think outside the box!");

        } else if (correctAnswers > 2 && correctAnswers <= 4) {

            $(".answer-gif").text("Good job, but the world believes you can do better next time!");

        } else if (correctAnswers > 4 && correctAnswers <= 6) {

            $(".answer-gif").text("Awesome job, stay curious and you will conquer the world!");

        } else if (correctAnswers > 6) {

            $(".answer-gif").text("You are a world master! Have you thought about running for president?!");
            
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


        // Hide and show appropriate elements on screen
        $(".timer-zone").show();
        $(".question").show();
        $(".choiceList").show();

        $(".answer-container").hide();
        $(".playAgainButton").hide();

        // Call the function to show first question
        nextQuestion();
}

});