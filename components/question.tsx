import { Button, Card } from "evergreen-ui";
import { useState, useEffect } from "react";
import { Question } from "../interfaces";
import { shuffle } from "lodash";
import { decode } from "../utils";

interface propTypes {
  question: Question;
}

const Question = (props: propTypes) => {
  const [answers, setAnswers] = useState<Array<string>>([]);
  const [showAnswer, setShowAnswer] = useState(false);

  const { question } = props;

  useEffect(() => {
    const answers = question.incorrect_answers;
    answers.push(question.correct_answer);
    setAnswers(shuffle(answers));
    setShowAnswer(false);
    console.log(answers);
  }, [question]);

  return (
    <div>
      <Card>
        <p>{decode(question.question)}</p>
        {answers.map((answer, index) => {
          return <li key={index}>{decode(answer)}</li>;
        })}
        <Button
          onClick={() => setShowAnswer(!showAnswer)}
          style={{ marginTop: 10 }}
        >
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </Button>
        {showAnswer && <p>{decode(question.correct_answer)}</p>}
      </Card>
    </div>
  );
};

export default Question;
