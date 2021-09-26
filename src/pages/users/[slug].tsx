import Head from "next/head";
import { GetServerSideProps } from "next";
import { useState } from "react";

import { FiArrowLeft } from "react-icons/fi";
import { getSession } from "next-auth/client";
import { toast } from "react-toastify";

import { RepositoriesTable } from "../../components/RepositoriesTable";
import { ProfileInfo } from "../../components/ProfileInfo";

import { useRouter } from "next/router";

import { api } from "../../services/api";

import styles from "../../../styles/user.module.scss";

interface UserInfoProps {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

interface RepositoryInfoProps {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  created_at: string;
}

interface UserProps {
  userInfo: UserInfoProps;
  userRepos: RepositoryInfoProps[];
  userStarred: RepositoryInfoProps[];
}

export default function User({ userInfo, userRepos, userStarred }: UserProps) {
  const router = useRouter();

  const [showStarredRepos, setShowStarredRepos] = useState(false);
  const [repositoriesPage, setRepositoriesPage] = useState(2);
  const [starredPage, setStarredPage] = useState(2);

  const [repositories, setRepositories] = useState(userRepos);
  const [starred, setStarred] = useState(userStarred);

  async function handlePagination() {
    if (showStarredRepos) {
      try {
        const { data } = await api.get(
          `${userInfo.login}/starred?per_page=12&page=${starredPage}`
        );

        if (data.length !== 0) {
          setStarred(starred.concat(data));
          setStarredPage(starredPage + 1);
        } else {
          toast.error("Não há mais repositórios.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } catch (error) {
        console.warn(error);
      }
    } else {
      try {
        const { data } = await api.get(
          `${userInfo.login}/repos?sort=created&per_page=12&page=${repositoriesPage}`
        );

        if (data.length !== 0) {
          setRepositories(repositories.concat(data));
          setRepositoriesPage(repositoriesPage + 1);
        } else {
          toast.error("Não há mais repositórios.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } catch (error) {
        console.warn(error);
      }
    }
  }

  return (
    <>
      <Head>
        <title>Busca | GitProFinder</title>
      </Head>

      <div className={styles.container}>
        <button
          type="button"
          className={styles.return}
          onClick={() => router.back()}
        >
          <FiArrowLeft />
          Voltar
        </button>

        <ProfileInfo profile={userInfo} />

        <main>
          <div className={styles.options}>
            <button
              type="button"
              className={`${styles.button} ${
                !showStarredRepos && styles.active
              }`}
              onClick={() => setShowStarredRepos(false)}
            >
              Repositórios do usuário
            </button>
            <button
              type="button"
              className={`${styles.button} ${
                showStarredRepos && styles.active
              }`}
              onClick={() => setShowStarredRepos(true)}
            >
              Repositórios marcados
            </button>
          </div>

          {showStarredRepos ? (
            <RepositoriesTable repositories={starred} />
          ) : (
            <RepositoriesTable repositories={repositories} />
          )}

          <div className={styles.pagination}>
            <button type="button" onClick={handlePagination}>
              Carregar +
            </button>
          </div>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req });
  const { slug } = params;

  let userInfo;
  let userRepos;
  let userStarred;

  if (!session) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  try {
    const { data } = await api.get(`${slug}`);
    userInfo = data;
  } catch (error) {
    console.warn(error);
  }

  try {
    const { data } = await api.get(`${slug}/repos?sort=created&per_page=12`);
    userRepos = data;
  } catch (error) {
    console.warn(error);
  }

  try {
    const { data } = await api.get(`${slug}/starred?per_page=12`);
    userStarred = data;
  } catch (error) {
    console.warn(error);
  }

  return {
    props: { userInfo, userRepos, userStarred },
  };
};
