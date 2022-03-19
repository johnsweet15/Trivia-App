import { Button } from "evergreen-ui";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import QuestionComp from "../../components/question";
import { Question } from "../../interfaces";
import { getQuestions } from "../../requests/trivia";

const Category: NextPage = () => {
  const router = useRouter();
  const query = router.query as { id: string; name: string };
  console.log(query, router.query);
  const { id, name } = query;

  const [questions, setQuestions] = useState<Array<Question>>([]);

  const getTriviaQuestions = async () => {
    const [response] = await getQuestions(id);
    const questions = response?.data?.results || [];
    setQuestions(questions);
  };

  useEffect(() => {
    if (id) {
      getTriviaQuestions();
    }
  }, [id, getTriviaQuestions]);

  return (
    <div>
      <Head>{name}</Head>
      <main>
        <Link href="/">
          <Button>Home</Button>
        </Link>
        <h1>{name}</h1>
        {questions.map((question, index) => (
          <QuestionComp key={index} question={question} />
        ))}
      </main>
    </div>
  );
};

export default Category;
