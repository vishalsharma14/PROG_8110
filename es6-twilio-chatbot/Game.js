const GameState = {
    WELCOMING: "welcome",
    RIDDLE1: "riddle1",
    RIDDLE2: "riddle2",
    RIDDLE3: "riddle3",
    RIDDLE4: "riddle4",
    RIDDLE5: "riddle5",
    RIDDLE6: "riddle6",
    RIDDLE7: "riddle7",
    RIDDLE8: "riddle8",
    RIDDLE9: "riddle9",
    RIDDLE10: "riddle10",
    FINAL: "final",
    QUIZ1: "quiz1",
    QUIZ2: "quiz2",
    QUIZ3: "quiz3",
    QUIZ4: "quiz4",
    QUIZ5: "quiz5",
    QUIZ6: "quiz6",
    QUIZ7: "quiz7",
    QUIZ8: "quiz8",
    QUIZ9: "quiz9",
    QUIZ10: "quiz10"
};

const RIDDLES = {
    [GameState.RIDDLE1]: {
        riddle: " RIDDLE 1: I always come down and never ever go up? Think, think and think! We all just love it.",
        answer: "rain"
    },
    [GameState.RIDDLE2]: {
        riddle: " RIDDLE 2: Poor people have it. Rich people need it. If you eat it you die. What is it?",
        answer: "nothing"
    },
    [GameState.RIDDLE3]: {
        riddle: " RIDDLE 3: What's the word which reads the same when written forward, backward or upside down?",
        answer: "noon"
    },
    [GameState.RIDDLE4]: {
        riddle: " RIDDLE 4: The person who built it sold it. The person who bought it never used it. The person who used it never saw it. What is it?",
        answer: "coffin"
    },
    [GameState.RIDDLE5]: {
        riddle: " RIDDLE 5: What has hands but can’t clap?",
        answer: "clock"
    },
    [GameState.RIDDLE6]: {
        riddle: " RIDDLE 6: Which letter of the alphabet has the most water?",
        answer: "c"
    },
    [GameState.RIDDLE7]: {
        riddle: " RIDDLE 7: What goes up but never goes down?",
        answer: "age"
    },
    [GameState.RIDDLE8]: {
        riddle: " RIDDLE 8: WWhat gets wetter and wetter the more it dries?",
        answer: "towel"
    },
    [GameState.RIDDLE9]: {
        riddle: " RIDDLE 9: How many months have 28 days?",
        answer: "12"
    },
    [GameState.RIDDLE10]: {
        riddle: " RIDDLE 10: I have keys but no doors. I have space but no rooms, I allow you to enter but you are never able to leave. What am I?",
        answer: "keyboard"
    },
    [GameState.FINAL]: {
        riddle: "Game Over!!!"
    }
};

const QUIZZES = {
    [GameState.QUIZ1]: {
        quiz: " QUIZ 1: The Hound of the Baskervilles is the first novel featuring Sherlock Holmes?",
        answer: "false"
    },
    [GameState.QUIZ2]: {
        quiz: " QUIZ 2: Sherlock Holmes nicknamed Professor Moriarty, “the Napoleon of Crime.”?",
        answer: "true"
    },
    [GameState.QUIZ3]: {
        quiz: " QUIZ 3: Sherlock Holmes lived at 212B Baker Street?",
        answer: "false"
    },
    [GameState.QUIZ4]: {
        quiz: " QUIZ 4: Sir Arthur Conan Doyle was a trained physician, like the character of Watson?",
        answer: "true"
    },
    [GameState.QUIZ5]: {
        quiz: " QUIZ 5: In Arthur Conan Doyle’s novels, Sherlock Holmes did not wear a deerstalker hat?",
        answer: "true"
    },
    [GameState.QUIZ6]: {
        quiz: " QUIZ 6: The author Arthur Conan Doyle invented Baker Street, which did not exist in London at the time?",
        answer: "false"
    },
    [GameState.QUIZ7]: {
        quiz: " QUIZ 7: The waterfalls into which Sherlock Holmes and his enemy Moriarty disappear are found in Switzerland?",
        answer: "true"
    },
    [GameState.QUIZ8]: {
        quiz: " QUIZ 8: The group of street youths who help Sherlock Holmes is called “The Tramps”?",
        answer: "false"
    },
    [GameState.QUIZ9]: {
        quiz: " QUIZ 9: Arthur Conan Doyle, the creator of the Sherlock Holmes, obtained the release of two unjustly sentenced prisoners?",
        answer: "true"
    },
    [GameState.QUIZ10]: {
        quiz: " QUIZ 10: Dr. Watson is named John G?",
        answer: "false"
    },
    [GameState.FINAL]: {
        quiz: "Game Over!!!"
    }
};

const gameOverMessage = (state, correctCount) => {
    if (state == GameState.FINAL) {
        if (correctCount < 5) {
            return " " + correctCount + "/10 YOU DIE!!!!";
        }
        else {
            return " " + correctCount + "/10 YOU LIVE!!!!";
        }
    }
    return null;
}

export default class Game {
    constructor() {
        this.currentState = GameState.WELCOMING;
        this.correctCount = 0;
    }

    makeAMove(inputString) {
        let sReply = "";
        inputString = inputString.toLowerCase();

        // console.log(this.stateCur, GAME[this.stateCur]['default'], this.stateCur, sInput);
        switch (this.currentState) {
            case GameState.FINAL:
                sReply = RIDDLES[GameState.FINAL]['riddle'];
                break;
            case GameState.WELCOMING:
                if (inputString.match("riddle")) {
                    sReply = RIDDLES[GameState.RIDDLE1]['riddle'];
                    this.currentState = GameState.RIDDLE1;
                } else if (inputString.match("quiz")) {
                    sReply = QUIZZES[GameState.QUIZ1]['quiz'] + " (True/False)";
                    this.currentState = GameState.QUIZ1;
                }
                else {
                    sReply = "Hi, Welcome to the haunted house! Lets play a game. If you answer 5/10 questions correctly you live, otherwise you die!!! Would you like to play riddle or quiz?"
                }
                break;
            default:
                // For riddles
                if (this.currentState.includes('riddle')) {
                    const currentIndex = Object.keys(RIDDLES).indexOf(this.currentState);
                    const nextRiddle = Object.keys(RIDDLES)[currentIndex + 1];
                    if (inputString == RIDDLES[this.currentState]['answer']) {
                        sReply = "Correct Answer!!! ";
                        this.correctCount++;
                    }
                    else {
                        sReply = "Incorrect answer!!! Correct answer is " + RIDDLES[this.currentState]['answer'] + ". ";
                    }

                    this.currentState = nextRiddle;
                    const gameOverMsg = gameOverMessage(this.currentState, this.correctCount)
                    const message = gameOverMsg == null ? RIDDLES[nextRiddle]['riddle'] : gameOverMsg;
                    sReply = sReply + message;
                }
                else if (this.currentState.includes('quiz')) {
                    const currentIndex = Object.keys(QUIZZES).indexOf(this.currentState);
                    const nextQuiz = Object.keys(QUIZZES)[currentIndex + 1];
                    if (inputString == QUIZZES[this.currentState]['answer']) {
                        sReply = "Correct Answer!!! ";
                        this.correctCount++;
                    }
                    else {
                        sReply = "Incorrect answer!!! ";
                    }
                    this.currentState = nextQuiz;
                    const gameOverMsg = gameOverMessage(this.currentState, this.correctCount);
                    const message = gameOverMsg == null ? QUIZZES[nextQuiz]['quiz'] + " (True/False)" : gameOverMsg;
                    sReply = sReply + message;
                }
        }
        return (sReply);
    }
}
