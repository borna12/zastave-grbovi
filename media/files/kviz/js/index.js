// VARIABLE DECLARATIONS ------

// pages
var initPage,
    questionsPage,
    resultsPage,
    podrucje,
    // buttons
    startBtn,
    submitBtn,
    continueBtn,
    retakeBtn,
    spanishBtn,
    // question and answers
    question,
    answerList,
    answerSpan,
    answerA,
    answerB,
    answerC,
    answerD,
    // event listeners
    answerDiv,
    answerDivA,
    answerDivB,
    answerDivC,
    answerDivD,
    feedbackDiv,
    selectionDiv,
    toBeHighlighted,
    toBeMarked,
    userScore,
    // quiz
    quiz,
    questionCounter,
    correctAnswer,
    correctAnswersCounter,
    userSelectedAnswer,
    // function names
    newQuiz,
    generateQuestionAndAnswers,
    getCorrectAnswer,
    getUserAnswer,
    selectAnswer,
    deselectAnswer,
    selectCorrectAnswer,
    deselectCorrectAnswer,
    getSelectedAnswerDivs,
    highlightCorrectAnswerGreen,
    highlightIncorrectAnswerRed,
    slikica,
    clearHighlightsAndFeedback,
    prekidac, countdownTimer, bodovi = 0,
    vrijeme = 0,iskljuci_v = 1,
    zastave, grbovi, zemlje2;
zemlje = []


function ProgressCountdown(timeleft, bar, text) {
    return new Promise((resolve, reject) => {
        countdownTimer = setInterval(() => {
            timeleft--;
            document.getElementById(bar).value = timeleft;
            document.getElementById(text).textContent = timeleft;
            if (timeleft <= 0) {
                clearInterval(countdownTimer);
                resolve(true);
            } else if (timeleft <= 1) {
                $("#sekunde").html("sekunda")
                $("#ostalo").html("ostala")
            } else if (timeleft <= 4) {
                $("#sekunde").html("sekunde")
            }

        }, 1000);
    });

}

$(document).ready(function () {
    // DOM SELECTION ------

    // App pages
    // Page 1 - Initial
    initPage = $('.init-page');
    // Page 2 - Questions/answers
    questionsPage = $('.questions-page');
    // Page 3 - Results
    resultsPage = $('.results-page');
    slikica = $('.slikica');

    // Buttons
    startBtn = $('.init-page__btn, .results-page__retake-btn');
    submitBtn = $('.mrzim');
    continueBtn = $('.questions-page__continue-btn');
    retakeBtn = $('.results-page__retake-btn');
    spanishBtn = $('.results-page__spanish-btn');

    // Answer block divs
    answerDiv = $('.questions-page__answer-div');
    answerDivA = $('.questions-page__answer-div-a');
    answerDivB = $('.questions-page__answer-div-b');
    answerDivC = $('.questions-page__answer-div-c');
    answerDivD = $('.questions-page__answer-div-d');

    // Selection div (for the pointer, on the left)
    selectionDiv = $('.questions-page__selection-div');

    // Feedback div (for the checkmark or X, on the right)
    feedbackDiv = $('.questions-page__feedback-div');

    // Questions and answers
    question = $('.questions-page__question');
    answerList = $('.questions-page__answer-list');
    answerSpan = $('.questions-page__answer-span');
    answerA = $('.questions-page__answer-A');
    answerB = $('.questions-page__answer-B');
    answerC = $('.questions-page__answer-C');
    answerD = $('.questions-page__answer-D');


    // User final score
    userScore = $('.results-page__score');
    prikazBodova = $('.results-page__bodovi');

    // QUIZ CONTENT ------
    var podatci = (function () {
        var json = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': "../karta/js/podatci.json",
            'dataType': "json",
            'success': function (data) {
                json = data;
            }
        });
        return json;
    })();

    //micanje praznih
    mici = ["GI", "GG", "JE", "SJ", "IO", "BV", "JU", "YT", "GO", "RE", "SH", "FK", "GF", "GS", "VI", "AI", "AW", "BM", "BQ", "VG", "CW", "GP", "KY", "MQ", "MS", "PR", "BL", "MF", "SX", "PM", "TC", "AS", "UM-JQ", "CX", "PF", "TF", "GU", "UM-DQ", "CC", "CK", "UM-MQ", "NU", "NF", "UM-FQ", "HM", "UM-HQ", "UM-WQ", "PN", "MP", "TK", "WF"]

    var arrayLength = mici.length;
    for (var i = 0; i < arrayLength; i++) {
        var podatci = podatci.filter(item => item.id != mici[i]);
    }

    $("#Europa").click(function () {
        podatci = podatci.filter(a => a.color == "#F29B28");
        shuffle(podatci)
        for (var i in podatci) {
            zemlje.push(podatci[i].title)
        };
        zemlje2 = zemlje
    })

    $("#Afrika").click(function () {
        podatci = podatci.filter(a => a.color == "#469025");
        shuffle(podatci)
        for (var i in podatci) {
            zemlje.push(podatci[i].title)
        };
        zemlje2 = zemlje
    })    
    $("#Azija").click(function () {
        podatci = podatci.filter(a => a.color == "#FFCB00");
        shuffle(podatci)
        for (var i in podatci) {
            zemlje.push(podatci[i].title)
        };
        zemlje2 = zemlje
    })    
    $("#Australija").click(function () {
        podatci = podatci.filter(a => a.color == "#4F9CA9");
        shuffle(podatci)
        for (var i in podatci) {
            zemlje.push(podatci[i].title)
        };
        zemlje2 = zemlje
    })    
    $("#JAmerika").click(function () {
        podatci = podatci.filter(a => a.color == "#F172AC");
        shuffle(podatci)
        for (var i in podatci) {
            zemlje.push(podatci[i].title)
        };
        zemlje2 = zemlje
    })    
    $("#SAmerika").click(function () {
        podatci = podatci.filter(a => a.color == "#E74354");
        shuffle(podatci)
        for (var i in podatci) {
            zemlje.push(podatci[i].title)
        };
        zemlje2 = zemlje
    })    
    $("#Nesamostalna").click(function () {
        podatci = podatci.filter(a => a.color.indexOf(' #') !== -1);
        shuffle(podatci)
        for (var i in podatci) {
            zemlje.push(podatci[i].title)
        };
        zemlje2 = zemlje
    })    


    function stvori(tekst, tekst2, tekst3) {
        do {
            predmet = zemlje[Math.floor(Math.random() * zemlje.length)];
        }
        while (predmet == tekst || predmet == tekst2 || predmet == tekst3);
        return predmet
    }

    // FUNCTION DECLARATIONS ------
    $.fn.declasse = function (re) {
        return this.each(function () {
            var c = this.classList
            for (var i = c.length - 1; i >= 0; i--) {
                var classe = "" + c[i]
                if (classe.match(re)) c.remove(classe)
            }
        })
    }

    function shuffle(array) { //izmješaj pitanja
        var i = 0,
            j = 0,
            temp = null

        for (i = array.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1))
            temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
    }
    // Start the quiz
    newQuiz = function () {
        prekidac = 1;
        bodovi = 0;
        // Set the question counter to 0
        questionCounter = 0;
        // Set the total correct answers counter to 0
        correctAnswersCounter = 0;
        // Hide other pages of the app
        questionsPage.hide();
        resultsPage.hide();
        if (zastave == 1) {

        } else {

        }
        shuffle(podatci)

    };

    // Load the next question and set of answers
    generateQuestionAndAnswers = function () {
        $(".questions-page__answer-list").show()
        question.html("<span style='font-size: 1.3rem;'>" + (questionCounter + 1) + "/" + zemlje.length + "</span> <br>");
        odg = [podatci[questionCounter].title, strava = stvori(podatci[questionCounter].title), strava2 = stvori(podatci[questionCounter].title, strava), stvori(podatci[questionCounter].title, strava, strava2)]
        shuffle(odg)
        answerA.text(odg[0]);
        if (answerA.html() == "" || null) {
            answerDivA.hide()
        } else {
            answerDivA.show()
        };
        answerB.text(odg[1]);
        if (answerB.html() == "" || null) {
            answerDivB.hide()
        } else {
            answerDivB.show()
        };
        answerC.text(odg[2]);
        if (answerC.html() == "" || null) {
            answerDivC.hide()
        } else {
            answerDivC.show()
        };
        answerD.text(odg[3]);
        if (answerD.html() == "" || null) {
            answerDivD.hide()
        } else {
            answerDivD.show()
        };
        if (zastave==1){slikica.attr("src", "../karta/zastave/" + podatci[questionCounter].customData.zastava_url);
        $("#opis").html("<p>" + podatci[questionCounter].customData.zastava_opis + "</p>")
    }
        else{slikica.attr("src", "../karta/grbovi/" + podatci[questionCounter].customData.grb_url)
        $("#opis").html("<p>" + podatci[questionCounter].customData.grb_opis + "</p>")
    }
        //slikica.attr("data-zoom-image", podatci[questionCounter].customData.zastava_url)
        
        $(".vrijeme").html('<progress value="'+tajming+'" max="'+tajming+'" id="pageBeginCountdown"></progress><p><span id="ostalo">ostalo</span> je još <span id="pageBeginCountdownText">'+tajming+'</span> <span id="sekunde">sekunda</span> za odgovor</p>')

        if (prekidac == 1 && iskljuci_v==0) {
            ProgressCountdown(tajming, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
        }
    };

    // Store the correct answer of a given question
    getCorrectAnswer = function () {
        correctAnswer = podatci[questionCounter].title;
    };

    // Store the user's selected (clicked) answer
    getUserAnswer = function (target) {
        userSelectedAnswer = $(target).find(answerSpan).text();
    };

    // Add the pointer to the clicked answer
    selectAnswer = function (target) {
        $(target).find(selectionDiv).addClass('ion-chevron-right');
        $(target).addClass("odabir")

    };

    // Remove the pointer from any answer that has it
    deselectAnswer = function () {
        if (selectionDiv.hasClass('ion-chevron-right')) {
            selectionDiv.removeClass('ion-chevron-right');
            selectionDiv.parent().removeClass("odabir")
        }
    };

    // Get the selected answer's div for highlighting purposes
    getSelectedAnswerDivs = function (target) {
        toBeHighlighted = $(target);
        toBeMarked = $(target).find(feedbackDiv);
    };

    // Make the correct answer green and add checkmark
    highlightCorrectAnswerGreen = function (target) {
        if (correctAnswer === answerA.text()) {
            answerDivA.addClass('questions-page--correct');
            answerDivA.find(feedbackDiv).addClass('ion-checkmark-round');
        }
        if (correctAnswer === answerB.text()) {
            answerDivB.addClass('questions-page--correct');
            answerDivB.find(feedbackDiv).addClass('ion-checkmark-round');
        }
        if (correctAnswer === answerC.text()) {
            answerDivC.addClass('questions-page--correct');
            answerDivC.find(feedbackDiv).addClass('ion-checkmark-round');
        }
        if (correctAnswer === answerD.text()) {
            answerDivD.addClass('questions-page--correct');
            answerDivD.find(feedbackDiv).addClass('ion-checkmark-round');
        }
    };

    // Make the incorrect answer red and add X
    highlightIncorrectAnswerRed = function () {
        toBeHighlighted.addClass('questions-page--incorrect');
        toBeMarked.addClass('ion-close-round');
    };

    // Clear all highlighting and feedback
    clearHighlightsAndFeedback = function () {
        answerDiv.removeClass('questions-page--correct');
        answerDiv.removeClass('questions-page--incorrect');
        feedbackDiv.removeClass('ion-checkmark-round');
        feedbackDiv.removeClass('ion-close-round');
    };

    // APP FUNCTIONALITY ------

    /* --- PAGE 1/3 --- */

    // Start the quiz:

    resultsPage.hide();

    submitBtn.hide();
    continueBtn.hide();

    $(".tip").on('click', function () {
        $(".podrucje").show()
        $(".tip").hide()
        if(grbovi==1){
            $("#Nesamostalna").hide()
        }
    })

    $(".podrucje").on('click', function () {
        $(".init-page__btn").show()
        $(".podrucje").hide()
    })
    // Clicking on start button:
    startBtn.on('click', function () {

        if ($(this).attr('id') == "bez") {
            iskljuci_v = 1;
            $(".vrijeme").hide()
        } else if ($(this).attr('id') == "10") {
            tajming = 10;
            iskljuci_v=0
        }
        else if ($(this).attr('id') == "20") {
            tajming = 20;
            iskljuci_v=0
        }
        newQuiz();
        // Advance to questions page
        initPage.hide();
        questionsPage.show(300);
        // Load question and answers
        generateQuestionAndAnswers();
        // Store the correct answer in a variable
        getCorrectAnswer();
        // Hide the submit and continue buttons
        submitBtn.hide();
        continueBtn.hide();
    });

    /* --- PAGE 2/3 --- */

    // Clicking on an answer:
    answerDiv.on('click', function () {
        // Make the submit button visible
        // Remove pointer from any answer that already has it
        deselectAnswer();
        // Put pointer on clicked answer
        selectAnswer(this);
        // Store current selection as user answer
        getUserAnswer(this);
        // Store current answer div for highlighting purposes
        getSelectedAnswerDivs(this);
        odgovor();
    });


    function odgovor() {
        vrijeme = parseInt($("#pageBeginCountdownText").text())
        bodovi += vrijeme
        prekidac = 0;
        var ide = 0
        // Disable ability to select an answer
        answerDiv.off('click');
        if (questionCounter != zemlje.length - 1) {
            ide = 1
        } else {
            ide = 0
            resultsPage.show();
        }

        // Make correct answer green and add a checkmark
        highlightCorrectAnswerGreen();
        clearInterval(countdownTimer);

        if (document.getElementById("pageBeginCountdown").value == "0" && iskljuci_v==0) {
            $("#krivo")[0].play();
            bodovi -= 10;
            if (zastave==1){
            swal({
                title: "Isteklo je vrijeme.",
                html: "<p style='text-align:center'><strong>Točan odgovor je <span style='color:#bb422a; font-size:20px' >" + podatci[questionCounter].title + "</span></strong>.</p><br><p>" + podatci[questionCounter].customData.zastava_opis + "</p><br><img src='../karta/zastave/" + podatci[questionCounter].customData.zastava_url + "'class='slikica2'/>",
                showCloseButton: true,
                confirmButtonText: ' dalje',
                backdrop: false,
                allowOutsideClick: false, allowEscapeKey: false,allowEnterKey:false
            });}
            else{
                swal({
                    title: "Isteklo je vrijeme.",
                    html: "<p style='text-align:center'><strong>Točan odgovor je <span style='color:#bb422a; font-size:20px' >" + podatci[questionCounter].title + "</span></strong>.</p><br><p>" + podatci[questionCounter].customData.grb_opis + "</p><br><img src='../karta/grbovi/" + podatci[questionCounter].customData.grb_url + "'class='slikica2'/>",
                    showCloseButton: true,
                    confirmButtonText: ' dalje',
                    backdrop: false,
                    allowOutsideClick: false, allowEscapeKey: false,allowEnterKey:false
                });
            }
            $(".swal2-confirm").unbind("click").click(function () {
                clearInterval(countdownTimer)
                nastavi()
                if (ide == 1 && iskljuci_v == 0) {
                    ProgressCountdown(tajming, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                }
            })
            $(".swal2-close").unbind("click").click(function () {
                clearInterval(countdownTimer)
                nastavi()
                if (ide == 1 && iskljuci_v == 0) {
                    ProgressCountdown(tajming, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                }
            })

        } else {
            // Evaluate if the user got the answer right or wrong
            if (userSelectedAnswer === correctAnswer) {

                // Increment the total correct answers counter
                correctAnswersCounter++;

                if (iskljuci_v == 1) {
                    vrijeme = 0
                }
                bodovi += 10;
                $("#tocno")[0].play();
                broj = vrijeme + 10;
                if (zastave==1){
                swal({
                    title: "<span style='color:green'>Točno</span>",
                    html: "<p style='text-align:center'>+" + broj + "</p><br><p>" + podatci[questionCounter].customData.zastava_opis + "</p><br><img src='../karta/zastave/" + podatci[questionCounter].customData.zastava_url + "'class='slikica2'/>",
                    showCloseButton: true,
                    confirmButtonText: ' dalje',
                    backdrop: false,
                    allowOutsideClick: false, allowEscapeKey: false

                });}
                else{
                    swal({
                        title: "<span style='color:green'>Točno</span>",
                        html: "<p style='text-align:center'>+" + broj + "</p><br><p>" + podatci[questionCounter].customData.grb_opis + "</p><br><img src='../karta/grbovi/" + podatci[questionCounter].customData.grb_url + "'class='slikica2'/>",
                        showCloseButton: true,
                        confirmButtonText: ' dalje',
                        backdrop: false,
                        allowOutsideClick: false, allowEscapeKey: false
    
                    });
                }

                $(".swal2-confirm").unbind("click").click(function () {
                    clearInterval(countdownTimer)
                    nastavi()
                    if (ide == 1 && iskljuci_v == 0) {
                        ProgressCountdown(tajming, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                    }
                })
                $(".swal2-close").unbind("click").click(function () {
                    clearInterval(countdownTimer)
                    nastavi()
                    if (ide == 1 && iskljuci_v == 0) {
                        ProgressCountdown(tajming, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                    }
                })


            } else {
                highlightIncorrectAnswerRed();
                bodovi -= 10;
                $("#krivo")[0].play();
                if (zastave==1){

                swal({
                    title: " <span style='color:#bb422a' >Netočno</span>",
                    html: "<p style='text-align:center'><strong>Točan odgovor je <span style='color:#bb422a; font-size:20px' >" + podatci[questionCounter].title + "</span></strong>.</p><br><p>" + podatci[questionCounter].customData.zastava_opis + "</p><br><img src='../karta/zastave/" + podatci[questionCounter].customData.zastava_url + " 'class='slikica2'/>",
                    showCloseButton: true,
                    confirmButtonText: ' dalje',
                    backdrop: false,
                    allowOutsideClick: false, allowEscapeKey: false
                });}
                else{
                    swal({
                        title: " <span style='color:#bb422a' >Netočno</span>",
                        html: "<p style='text-align:center'><strong>Točan odgovor je <span style='color:#bb422a; font-size:20px' >" + podatci[questionCounter].title + "</span></strong>.</p><br><p>" + podatci[questionCounter].customData.grb_opis + "</p><br><img src='../karta/grbovi/" + podatci[questionCounter].customData.grb_url + " 'class='slikica2'/>",
                        showCloseButton: true,
                        confirmButtonText: ' dalje',
                        backdrop: false,
                        allowOutsideClick: false, allowEscapeKey: false
                    });
                }

                $(".swal2-confirm").unbind("click").click(function () {
                    clearInterval(countdownTimer)
                    nastavi()
                    if (ide == 1 && iskljuci_v == 0) {
                        ProgressCountdown(tajming, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                    }
                })
                $(".swal2-close").unbind("click").click(function () {
                    clearInterval(countdownTimer)
                    nastavi()
                    if (ide == 1 && iskljuci_v == 0) {
                        ProgressCountdown(tajming, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => odgovor());
                    }
                })
            }
        }

        // Substitute the submit button for the continue button:
        submitBtn.hide(300);
      
    }
    // Clicking on the submit button:





    function nastavi() {
        // Increment question number until there are no more questions, then advance to the next page
        if (questionCounter < zemlje.length - 1) {
            questionCounter++;
        } else {
            document.getElementsByClassName('questions-page')[0].style.display = "none"

            document.getElementsByClassName('sakri')[0].style.display = "block"
            // Display user score as a percentage
            userScore.text(Math.floor((correctAnswersCounter / zemlje.length) * 100) + " %");
            prikazBodova.text(bodovi);

            $("#input-q2").attr("value", bodovi)

        }

        // Load the next question and set of answers
        generateQuestionAndAnswers();

        // Store the correct answer in a variable
        getCorrectAnswer();

        // Remove all selections, highlighting, and feedback
        deselectAnswer();
        clearHighlightsAndFeedback();
        // Hide the continue button
        continueBtn.hide(300);
        // Enable ability to select an answer
        answerDiv.on('click', function () {
            // Make the submit button visible
            // Remove pointer from any answer that already has it
            deselectAnswer();
            // Put pointer on clicked answer
            selectAnswer(this);
            // Store current answer div for highlighting purposes
            getSelectedAnswerDivs(this);
            // Store current selection as user answer
            getUserAnswer(this);
            odgovor()
        });

    }

    // Clicking on the continue button:
    continueBtn.on('click', function () {
    });

    $(".questions-page__answer-div").dblclick(function () {
        odgovor()
    })
    /* --- PAGE 3/3 --- */

    // Clicking on the retake button:
    retakeBtn.on('click', function () {
        // Go to the first page
        // Start the quiz over
        newQuiz();
        resultsPage.hide();
        questionsPage.show(300);
        // Load question and answers
        generateQuestionAndAnswers();
        // Store the correct answer in a variable
        getCorrectAnswer();
        // Hide the submit and continue buttons
        submitBtn.hide();
        continueBtn.hide();
    });

    // Clicking on the spanish button:
    // Link takes user to Duolingo

});

function touchHandler(event) {
    var touches = event.changedTouches,
        first = touches[0],
        type = "";
    switch (event.type) {
        case "touchstart":
            type = "mousedown";
            break;
        case "touchmove":
            type = "mousemove";
            break;
        case "touchend":
            type = "mouseup";
            break;
        default:
            return;
    }


    // initMouseEvent(type, canBubble, cancelable, view, clickCount, 
    //                screenX, screenY, clientX, clientY, ctrlKey, 
    //                altKey, shiftKey, metaKey, button, relatedTarget);

    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
        first.screenX, first.screenY,
        first.clientX, first.clientY, false,
        false, false, false, 0 /*left*/, null);

    first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}