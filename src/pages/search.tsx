import Head from "next/head";
import { useState } from "react";
import { GetServerSideProps } from "next";

import trendingGitHub from "trending-github";
import { getSession } from "next-auth/client";
import { FiTrendingUp } from "react-icons/fi";
import { toast } from "react-toastify";

import { RepositoryCard } from "../components/RepositoryCard";

import { useRouter } from "next/router";

import { api } from "../services/api";

import styles from "../../styles/search.module.scss";

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
  const router = useRouter();
  const [user, setUser] = useState("");

  async function handleSearchUser() {
    if (!user) {
      toast.warn("A busca não pode vazia.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }

    try {
      await api.get(`${user}`);
    } catch (error) {
      toast.error(
        "Este usuário não existe no GitHub. Digite um usuário válido!",
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      return;
    }

    router.push(`/users/${user}`);
  }

  return (
    <>
      <Head>
        <title>Busca | GitProFinder</title>
      </Head>

      <main className={styles.container}>
        <h1>
          Faça sua busca <br /> por usuários no GitHub!
        </h1>

        <div>
          <input
            type="text"
            placeholder="Busque por um usuário"
            value={user}
            onChange={(event) => setUser(event.target.value)}
            onKeyDown={(event) => {
              event.key === "Enter" && handleSearchUser();
            }}
          />
          <button type="button" onClick={handleSearchUser}>
            Pesquisar
          </button>
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
