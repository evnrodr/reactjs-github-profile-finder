import Head from "next/head";
import { GetServerSideProps } from "next";

import { getSession } from "next-auth/client";

import styles from "../../styles/home.module.scss";

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
            A melhor ferramenta para <br /> achar usuários no{" "}
            <span>GitHub</span>!
          </h1>
        </section>
        <img src="/images/research.svg" alt="Trabalho em Equipe" />
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
