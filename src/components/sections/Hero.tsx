import Link from "next/link";

export const Hero = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="py-20 lg:mx-0 lg:py-32 max-w-2xl text-center items-center flex flex-col">
        <h1 className="text-3xl md:text-5xl flex gap-4 flex-wrap justify-center">
          <p className="text-zinc-700 dark:text-zinc-500">Welcome! I’m </p>
          <p className="font-bold text-7xl">Gabriel Taveira</p>
        </h1>
        <p className="mt-6 leading-8 text-gray-800 dark:text-gray-300">
          I am a seasoned developer seeking a challenging role as a Staff/Lead
          Engineer. With a solid background, I am passionate about driving
          innovation, mentorship, and project success.
        </p>
        <div className="mt-10 flex gap-x-6 lg:justify-start">
          <a
            href="#socials"
            className="flex flex-1 justify-center md:flex-initial bg-gray-950 text-lg dark:bg-white px-3.5 py-2.5 font-semibold text-gray-50 dark:text-gray-900 shadow-sm hover:bg-gray-800 dark:hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
};
