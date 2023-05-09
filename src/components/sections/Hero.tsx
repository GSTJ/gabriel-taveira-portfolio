export const Hero = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="py-20 lg:mx-0 lg:py-32 max-w-2xl text-center items-center flex flex-col">
        <h1 className="text-3xl md:text-5xl flex gap-4 flex-wrap justify-center">
          <p className="text-zinc-700 dark:text-zinc-500">Welcome! I’m </p>
          <p className="font-bold text-7xl flex gap-4 flex-wrap justify-center">
            <p>Gabriel</p>
            <p className="colorful-text">Taveira</p>
          </p>
        </h1>
        <p className="mt-6 leading-8 text-gray-800 dark:text-gray-300">
          I am a seasoned developer seeking a challenging role as a Staff/Lead
          Engineer. With a solid background, I am passionate about driving
          innovation, mentorship, and project success.
        </p>
        <div className="mt-10 flex gap-x-6 lg:justify-start">
          <a
            href="#socials"
            className="animate-fade-up-shine flex flex-1 md:flex-initial rounded-md text-md p-0.5 bg-gradient-to-br from-[#00000010] dark:from-[#ffffff70] group to-transparent font-semibold shadow-sm hover:bg-[#00000010] dark:hover:bg-[#ffffff30] transition-all"
          >
            <div className="h-12 w-36 rounded-[0.31rem] bg-gradient-rotate from-pink-500 via-yellow-500 to-rose-500 blur-lg absolute z-[-1] group-hover:blur-xl transition-all" />
            <p className="h-full w-full flex flex-1 rounded-[0.31rem] py-3.5 px-5 bg-[#fcf7fc] dark:bg-black dark:text-gray-50">
              Get in touch
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};
