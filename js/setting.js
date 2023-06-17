import { Quiz } from "./quiz.js";
export class Setting {
    constructor(){
        this.categoryElement = document.getElementById('category');
        this.difficultyElement = document.getElementsByName('difficulty');
        this.numberOfQuestions = document.getElementById('number');
        this.startBtn = document.getElementById('startBtn');
        this.startBtn.addEventListener('click',this.startQuiz);

    }
     startQuiz = async ()=>{
        let amount = this.numberOfQuestions.value;
        let category = this.categoryElement.value;
        let difficulty =[...this.difficultyElement].filter(ele => ele.checked);
        let url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty[0].value}`;
        let result = await this.fetchUrl(url);
         if(result.length>0){
            $("#setting").fadeOut(500,()=>{
                $("#quiz").fadeIn(500)
            })
            new Quiz(result,amount);
        }
    }

     fetchUrl = async(url)=>{
        let response = await fetch(url);
        let data = await response.json();
         return data.results;
    }
}