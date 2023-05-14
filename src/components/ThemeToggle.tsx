"use client";

const getPreferredTheme = () => {
  const darkMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  return darkMediaQuery.matches ? "dark" : "light";
};

const toggleTheme = () => {
  const activeTheme = localStorage.theme || getPreferredTheme();

  const isLightTheme = activeTheme === "light";

  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  document.documentElement.classList.toggle("dark", isLightTheme);

  // Save user's preference in localStorage
  localStorage.theme = isLightTheme ? "dark" : "light";
};

export function ThemeToggle() {
  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      className="group rounded-md ring-1 ring-gray-300 bg-white/90 px-3 py-2 transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
      onClick={toggleTheme}
    >
      <svg
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden"
      >
        <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
        <path d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"></path>
      </svg>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="hidden h-6 w-6 fill-zinc-500 transition dark:block group-hover:fill-zinc-400"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
        ></path>
        <path d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
        ></path>
      </svg>
    </button>
  );
}
