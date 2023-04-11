import Link from "next/link";

export const Publications = () => {
  return (
    <div className="text-zinc-500 break-all whitespace-pre-line gap-2 flex flex-col">
      <div className="lg:flex gap-1">
        <p>Host at the Space Cast Podcast:</p>
        <Link
          target="_blank"
          className="text-blue-300"
          href="https://www.youtube.com/@spacesquad-rocketseat"
        >
          https://www.youtube.com/@spacesquad-rocketseat
        </Link>
      </div>
      <div className="lg:flex gap-1">
        <p>Medium articles on programming:</p>
        <Link
          target="_blank"
          className="text-blue-300"
          href="https://medium.com/@gabrieltaveira"
        >
          https://medium.com/@gabrieltaveira
        </Link>
      </div>
      <div className="lg:flex gap-1">
        <p>Awari Career Development Mentor:</p>
        <Link
          target="_blank"
          className="text-blue-300"
          href="https://app.awari.com.br/mentores/gabriel-taveira"
        >
          https://app.awari.com.br/mentores/gabriel-taveira
        </Link>
      </div>
      <div className="lg:flex gap-1">
        <p>Space Squad Ambassador:</p>
        <Link
          target="_blank"
          className="text-blue-300"
          href="https://www.rocketseat.com.br/space-squad"
        >
          https://www.rocketseat.com.br/space-squad
        </Link>
      </div>
      <p className="break-normal">
        I’ve also given talks at large events about Technology and Leadership
        such as Assemble (3 day immersion focusing on forming Tech Leads) and
        The Developer Conference on Design Systems.
      </p>
    </div>
  );
};
