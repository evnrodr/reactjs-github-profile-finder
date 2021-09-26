import Head from "next/head";

import { getSession, signIn } from "next-auth/client";
import { FaGithub } from "react-icons/fa";

import styles from "../../styles/home.module.scss";
import { GetServerSideProps } from "next";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Login | GitProFinder</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.mainSection}>
          <span>Olá dev! 👩‍💻👨‍💻</span>
          <h1>
            A melhor ferramenta para achar usuários no <span>GitHub</span>!
          </h1>
        </section>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: `/search`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
