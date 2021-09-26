import Head from "next/head";
import { useState } from "react";
import { GetServerSideProps } from "next";

import { getSession } from "next-auth/client";
import { FiArrowLeft } from "react-icons/fi";

import { api } from "../../services/api";

import { RepositoriesTable } from "../../components/RepositoriesTable";

import styles from "../../../styles/user.module.scss";
import { ProfileInfo } from "../../components/ProfileInfo";
import { useRouter } from "next/router";

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
            <RepositoriesTable repositories={userStarred} />
          ) : (
            <RepositoriesTable repositories={userRepos} />
          )}
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
    const { data } = await api.get(`${slug}/repos?sort=created&per_page=10`);
    userRepos = data;
  } catch (error) {
    console.warn(error);
  }

  try {
    const { data } = await api.get(`${slug}/starred?per_page=10`);
    userStarred = data;
  } catch (error) {
    console.warn(error);
  }

  return {
    props: { userInfo, userRepos, userStarred },
  };
};
