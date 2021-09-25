import { useSession } from "next-auth/client";
import { FaGithub } from "react-icons/fa";

import styles from "./styles.module.scss";

export function Header() {
  const [session] = useSession();

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <nav>
          <FaGithub size={42} />
          <div>
            <h1>GitProFinder</h1>
            <p>An easy way to find devs</p>
          </div>
        </nav>
        <div className={styles.profile}>
          <img
            src={session?.user?.image ?? "/public/images/empty_pp.png"}
            alt="Foto de perfil"
          />
          <div>
            <strong>{session?.user?.name}</strong>
            <p>{session?.user?.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
