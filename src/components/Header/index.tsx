import { FaGithub } from "react-icons/fa";

import { SignInButton } from "../SignInButton";

import styles from "./styles.module.scss";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <a href="/">
          <nav>
            <FaGithub size={42} />
            <div>
              <h1>GitProFinder</h1>
              <p>An easy way to find devs</p>
            </div>
          </nav>
        </a>
        <SignInButton />
      </div>
    </header>
  );
}
