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
                <td>{repository.name}</td>
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
  );
}
