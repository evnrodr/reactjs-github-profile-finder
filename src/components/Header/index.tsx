import { useSession } from "next-auth/client";
import { FaGithub } from "react-icons/fa";
import { SignInButton } from "../SignInButton";

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
        <SignInButton />
      </div>
    </header>
  );
}
