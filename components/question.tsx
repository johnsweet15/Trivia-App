import { Card } from "evergreen-ui";
import { useState, useEffect } from "react";
import { Question } from "../interfaces";
import { shuffle } from "lodash";
import { decode } from "../utils";

interface PropTypes {
  question: Question;
}

interface SelectedAnswer {
  text: string;
  index: number;
  isCorrect: boolean;
}

const questionContainer: React.CSSProperties = {
  padding: "20px 40px",
};

const answerContainer: React.CSSProperties = {
  border: "1px gray solid",
  borderRadius: 5,
  margin: "15px 0",
  padding: 10,
  cursor: "pointer",
};

const Question = (props: PropTypes) => {
  const [answers, setAnswers] = useState<Array<string>>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<SelectedAnswer | null>(
    null
  );

  const { question } = props;

  useEffect(() => {
    const answers = question.incorrect_answers;
    answers.push(question.correct_answer);
    setAnswers(shuffle(answers));
  }, [question]);

  const handleAnswerClick = (answer: string, index: number) => {
    setSelectedAnswer({
      text: answer,
      index,
      isCorrect: answer === question.correct_answer,
    });
  };

  const getBorderColor = (answer: string) => {
    if (selectedAnswer?.text === answer) {
      return selectedAnswer?.isCorrect ? "green" : "red";
    } else {
      return "gray";
    }
  };

  return (
    <div>
      <Card elevation={1} style={questionContainer} backgroundColor="#161616">
        <p>{decode(question.question)}</p>
        {answers.map((answer: string, index: number) => {
          return (
            <div
              key={index}
              style={{
                ...answerContainer,
                borderColor: getBorderColor(answer),
              }}
              onClick={() => handleAnswerClick(answer, index)}
            >
              {decode(answer)}
            </div>
          );
        })}
      </Card>
    </div>
  );
};

export default Question;
