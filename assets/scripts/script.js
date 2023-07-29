function consoleLogQandA () {
    let len = questions.length;
    if (len === null) {
        console.log('There were no questions');
    } else {
        for (let i=0;i<len;i++) {
            console.log('\n\nitem ' + i + ':');
            console.log('question = "' + questions[i].question + '"');
            console.log('correct answer = "' + questions[i].answers[0] + '"');
            for (let j=1;j<questions[i].answers.length;j++) {
                console.log('wrong answer = "' + questions[i].answers[j] + '"');
            }
        }
    }
}

consoleLogQandA();