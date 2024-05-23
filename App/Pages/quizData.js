import React from 'react'


const quesListingScreen = () =>{};
export default function quizData() {    
    const getQues = () =>{
        const URL = "https://mywebsite.com/endpoint/";
        fetch(URL).then(res =>{
            res.json();
        }).then((data) => {
            console.log(data);
        });
    };
    
    return (  <div>
      
    </div>
  )
}
