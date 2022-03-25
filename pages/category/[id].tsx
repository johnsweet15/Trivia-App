import { Button } from "evergreen-ui";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { CSSProperties, useEffect, useState } from "react";
import QuestionComp from "../../components/question";
import { Question } from "../../interfaces";
import { getQuestions } from "../../requests/trivia";

const Category: NextPage = () => {
  const router = useRouter();
  const query = router.query as { id: string; name: string };
  const { id, name } = query;

  const [questions, setQuestions] = useState<Array<Question>>([]);
  const [questionNumber, setQuestionNumber] = useState<number>(0);

  const getTriviaQuestions = async () => {
    const [response] = await getQuestions(id);
    const questions = response?.data?.results || [];
    setQuestions(questions);
  };

  const getNextQuestion = () => {
    if (questionNumber < 9) {
      setQuestionNumber(questionNumber + 1);
    } else {
      getTriviaQuestions();
      setQuestionNumber(0);
    }
  };

  useEffect(() => {
    if (id) {
      getTriviaQuestions();
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const containerStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };

  return (
    <div>
      <Head>
        <title>Trivia - {name}</title>
      </Head>
      <main style={containerStyle}>
        <Link href="/" passHref>
          <Button>Home</Button>
        </Link>
        <h1>{name}</h1>
        <div style={{ marginBottom: 20 }}>
          {
            questions.map((question, index) => (
              <QuestionComp key={index} question={question} />
            ))[questionNumber]
          }
        </div>
        <Button onClick={() => getNextQuestion()}>Next Question</Button>
      </main>
    </div>
  );
};

export default Category;
