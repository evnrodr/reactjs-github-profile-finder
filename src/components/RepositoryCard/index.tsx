import Link from "next/link";

import styles from "./styles.module.scss";

type Repository = {
  author: string;
  name: string;
  href: string;
  description: string;
  stars: number;
};

interface RepositoryCardProps {
  repository: Repository;
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  return (
    <Link href={repository.href}>
      <div className={styles.container}>
        <img
          src={`https://github.com/${repository.author}.png`}
          alt="Imagem do autor"
          height={42}
        />
        <div>
          <p>
            <strong>{repository.author}</strong>/{repository.name}
          </p>
          <p>{repository.description}</p>
        </div>
      </div>
    </Link>
  );
}
