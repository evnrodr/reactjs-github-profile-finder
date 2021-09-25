import Head from "next/head";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import trendingGitHub from "trending-github";
import { FiTrendingUp } from "react-icons/fi";

import { Header } from "../components/Header";

import styles from "../../styles/search.module.scss";
import { RepositoryCard } from "../components/RepositoryCard";

type Repository = {
  author: string;
  name: string;
  href: string;
  description: string;
  stars: number;
};

interface SearchPageProps {
  repositories: Repository[];
}

export default function SearchPage({ repositories }: SearchPageProps) {
  return (
    <>
      <Head>
        <title>Busca | GitProFinder</title>
      </Head>

      <Header />

      <main className={styles.container}>
        <h1>
          Faça sua busca <br /> por usuários no GitHub!
        </h1>

        <div>
          <input type="text" placeholder="Busque por um usuário" />
          <button>Pesquisar</button>
        </div>

        <section>
          <strong>
            Trending <FiTrendingUp />
          </strong>
          {repositories.map((repository, index) => (
            <RepositoryCard key={index} repository={repository} />
          ))}
        </section>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  let repositories;

  if (!session) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  try {
    repositories = await trendingGitHub();
  } catch (err) {
    console.log(err);
  }

  return {
    props: { repositories },
  };
};
