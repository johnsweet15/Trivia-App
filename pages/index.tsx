import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Category } from "../interfaces";
import { getCategories, getSessionToken } from "../requests/trivia";
import { Card } from "evergreen-ui";
import Link from "next/link";

const Home: NextPage = () => {
  const [categories, setCategories] = useState<Array<Category>>([]);

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      getToken();
    }
    getTriviaCategories();
  }, []);

  const getToken = async () => {
    const [response] = await getSessionToken();
    const sessionToken = response?.data?.token || null;
    if (sessionToken) {
      sessionStorage.setItem("token", sessionToken);
    }
  };

  const getTriviaCategories = async () => {
    const [response] = await getCategories(sessionStorage.getItem("token"));
    const categories = response?.data?.trivia_categories || [];
    categories.push({ id: "1", name: "All" });
    setCategories(categories);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Trivia App</title>
      </Head>
      <main style={{ display: "flex", flexWrap: "wrap" }}>
        {categories.map((category, index) => (
          <Link
            key={index}
            href={{
              pathname: `/category/${category.id}`,
              query: { name: category.name },
            }}
          >
            <Card elevation={1} padding={30} margin={10}>
              {category.name}
            </Card>
          </Link>
        ))}
      </main>
    </div>
  );
};

export default Home;
