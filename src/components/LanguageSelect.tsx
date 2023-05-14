"use client";

import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import Link from "next-intl/link";
import { usePathname } from "next/navigation";

const languages = [
  { name: "🇺🇸 English", value: "en-us", pathname: "/" },
  { name: "🇧🇷 Português", value: "pt-br", pathname: "/pt-br" },
];

export default function LanguageSelect() {
  const pathname = usePathname();
  const selected = languages.find((l) => l.pathname === pathname);

  return (
    <Listbox value={selected}>
      <div className="relative mt-1">
        <Listbox.Button className="ring-1 ring-gray-300 dark:ring-gray-700 relative w-full cursor-default rounded-md bg-white py-3 pl-4 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
          <span className="block truncate text-xs word-space">
            {selected.name}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-3 w-3 text-gray-400"
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
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-gray-300 dark:ring-gray-700 focus:outline-none sm:text-sm">
            {languages.map((language, index) => (
              <Link key={index} href="/" locale={language.value}>
                <Listbox.Option
                  className={({ active }) =>
                    `relative cursor-default select-none p-4 py-3 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
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
}
