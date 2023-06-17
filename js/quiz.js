 export class Quiz{
    constructor(questions,amount){
        this.questions = questions;
        this.amount = amount;
        this.correctAnswer= document.getElementById('correct');
        this.wrongAnswer = document.getElementById('inCorrect');
        this.currentQuestionElement = document.getElementById('current');
        this.totalAmountElement = document.getElementById('totalAmount');
        this.questionElement = document.getElementById('question');
        this.checkedElement = document.getElementsByName('answer');
        this.rowAnswerElement = document.getElementById('rowAnswer');
        this.nextBtn = document.getElementById('next');
        this.currentQuestion = 0;
        this.scoreElement = document.getElementById('score');
        this.tryAgain = document.getElementById('again');
        this.score =0;
        this.isCorrect =false;
        this.nextBtn.addEventListener('click',this.nextQuestion);
        this.tryAgain.addEventListener('click',this.tryAgainQuiz);
        this.showQuestions();
    }
    nextQuestion =()=>{
        let checkedAnswer = [...this.checkedElement].filter(ele => ele.checked);
        if(checkedAnswer.length == 0){
            $(".alert").fadeIn(500);
        }else{
            $(".alert").fadeOut(0);
            this.isCorrect = this.checkAnswers(checkedAnswer[0].value);
            (this.isCorrect ? $('#correct').fadeIn(500,()=>{this.show()}):$('#inCorrect').fadeIn(500,()=>{this.show()}));
            
        }
        
    }
    show(){
        $('#correct').fadeOut(0);
        $('#inCorrect').fadeOut(0);
        
        this.currentQuestion++;
        (this.currentQuestion<this.amount?this.showQuestions():this.finish())
    }
    showQuestions=()=>{
        this.questionElement.innerHTML = this.questions[this.currentQuestion].question;
        this.currentQuestionElement.innerHTML = this.currentQuestion+1;
        this.totalAmountElement.innerHTML = this.amount;
        let answers = this.getAnswer(this.questions[this.currentQuestion]);
        this.showAnswer(answers)
    }
    getAnswer = (currentQuestion)=>{
        let answers = [currentQuestion.correct_answer].concat(currentQuestion.incorrect_answers);
       let ranNums = [],
        i = answers.length,
        j = 0;
    
    while (i--) {
        j = Math.floor(Math.random() * (i+1));
         ranNums.push(answers[j]);
        answers.splice(j,1);
    }
     return ranNums;
    }

    showAnswer =(answersArray)=>{
        let temp = ``;
        for(let i =0;i<answersArray.length;i++){
            temp+=`
            <div class="form-check">
            <label class="form-check-label">
                <input type="radio" name="answer" class="form-check-input" id="q${i+1}" value="${answersArray[i]}">${answersArray[i]}
            </label>
        </div>
            `
        }
        this.rowAnswerElement.innerHTML=temp;
    }
    checkAnswers=(value)=>{
        let correct =false;
         if(this.questions[this.currentQuestion].correct_answer === value){
            correct =true;
            this.score++;
        }else{
            correct =false;
        }
        return correct;
    }
    finish=()=>{
        this.scoreElement.innerHTML = this.score;
        $('#quiz').fadeOut(500,()=>{
            $("#finish").fadeIn(500)
        })
        
    }
    tryAgainQuiz=()=>{
        $('#finish').fadeOut(500,()=>{
            $("#setting").fadeIn(500)
        })
       
    }
}