import React, { Component } from "react";
import "./assets/style.css";
import quizService from "./quizService";
import QuestionBox from "./components/QuestionBox";
import Result from "./components/Result";

class App extends Component {
  state = {
    questionBank: [],
    score: 0,
    response: 0
  };
  getQuestions = () => {
    quizService().then(question => {
      this.setState({
        questionBank: question
      });
    });
  };
  componentDidMount() {
    this.getQuestions();
  }
  computeAnswer = (answers, correct) => {
    const { score, response } = this.state;
    if (answers === correct) {
      this.setState({
        score: score + 1
      });
    }
    this.setState({
      response: response < 5 ? response + 1 : 5
    });
  };
  playAgain = () => {
    this.getQuestions();
    this.setState({
      score: 0,
      response: 0
    });
  };
  render() {
    const { questionBank, response, score } = this.state;
    return (
      <div className="container">
        <div className="title">QuizBee</div>
        {questionBank.length > 0 &&
          response < 5 &&
          questionBank.map(({ question, answers, correct, questionId }) => (
            <QuestionBox
              question={question}
              options={answers}
              key={questionId}
              selected={answers => this.computeAnswer(answers, correct)}
            />
          ))}
        {response === 5 ? (
          <Result score={score} playAgain={this.playAgain} />
        ) : null}
      </div>
    );
  }
}

export default App;
