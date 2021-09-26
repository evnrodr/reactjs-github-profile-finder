import styles from "./styles.module.scss";

interface Repository {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  created_at: string;
}

interface RepositoriesTableProps {
  repositories: Repository[];
}

export function RepositoriesTable({ repositories }: RepositoriesTableProps) {
  return (
    <div className={styles.container}>
      <div className={styles.scroll}>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Qntd. Estrelas</th>
              <th>Data de Criação</th>
            </tr>
          </thead>

          <tbody>
            {repositories.map((repository, index) => {
              return (
                <tr key={index}>
                  <td>
                    <a
                      href={repository.html_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {repository.name}
                    </a>
                  </td>
                  <td>{repository.stargazers_count}</td>
                  <td>
                    {new Intl.DateTimeFormat("pt-BR").format(
                      new Date(repository.created_at)
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
