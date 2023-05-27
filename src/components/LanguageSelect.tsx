"use client";

import { Fragment } from "react";

import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { usePathname } from "next/navigation";
import Link from "next-intl/link";

const languages = [
  { name: "🇺🇸 English", value: "en-US", pathname: "/en-US" },
  { name: "🇧🇷 Português", value: "pt-BR", pathname: "/pt-BR" },
];

export default () => {
  const pathname = usePathname();
  const selected = languages.find((l) => l.pathname === pathname);

  return (
    <Listbox value={selected}>
      <div className="relative mt-1">
        <Listbox.Button className="ring-1 ring-black/10 dark:ring-white/10 relative w-full cursor-default rounded-md bg-black/5 font-medium dark:bg-zinc-800 py-3 pl-4 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
          <span className="dark:text-gray-50 block truncate text-xs word-space">
            {selected.name}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-3 w-3 text-gray-900 dark:text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-black/5 dark:bg-zinc-800 py-1 text-base ring-1 ring-black/10 dark:ring-white/10 focus:outline-none sm:text-sm">
            {languages.map((language, index) => (
              <Link key={index} href="/" locale={language.value}>
                <Listbox.Option
                  className={({ active }) =>
                    `dark:text-gray-50 relative cursor-default select-none p-4 py-3 ${
                      active ? "bg-black/10 dark:bg-zinc-700" : ""
                    }`
                  }
                  value={language}
                >
                  {({ selected }) => (
                    <p
                      className={`block text-xs truncate word-space ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {language.name}
                    </p>
                  )}
                </Listbox.Option>
              </Link>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
