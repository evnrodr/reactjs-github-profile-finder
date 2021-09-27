import styles from "./styles.module.scss";

interface ProfileInfoProps {
  profile: {
    login: string;
    avatar_url: string;
    html_url: string;
    name: string;
    bio: string;
    public_repos: number;
    followers: number;
    following: number;
  };
}

export function ProfileInfo({ profile }: ProfileInfoProps) {
  return (
    <>
      <header className={styles.header}>
        <img src={profile.avatar_url} alt={`Foto de ${profile.name}`} />

        <div>
          {profile.name ? (
            <a href={profile.html_url} target="_blank" rel="noreferrer">
              <h1>{profile.name}</h1>
            </a>
          ) : (
            <a href={profile.html_url} target="_blank" rel="noreferrer">
              <h1>{profile.login}</h1>
            </a>
          )}
          <p>{profile.bio}</p>
        </div>
      </header>

      <section className={styles.info}>
        <p>
          <strong>{profile.public_repos}</strong> <br /> repositórios
        </p>
        <p>
          <strong>{profile.followers}</strong> <br /> seguidores
        </p>
        <p>
          <strong>{profile.following}</strong> <br /> seguindo
        </p>
      </section>
    </>
  );
}
