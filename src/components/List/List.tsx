import { ChevronRightIcon, ExternalLinkIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import Link from "next/link";
import type { VFC } from "react";

import type { ListProps } from "./type";
import { hasButton, isLink } from "./type";

export const List: VFC<ListProps> = (props) => {
  return (
    <div className="space-y-1">
      {props.title ? <div className="text-sm font-bold text-zinc-400">{props.title}</div> : null}
      <ul>
        {props.items.map((item, i) => {
          const className = clsx(
            "flex justify-between items-center py-3 px-4 -mx-4 text-lg font-bold",
            {
              "hover:bg-zinc-100 focus-visible:bg-zinc-100 dark:hover:bg-zinc-700 dark:focus-visible:bg-zinc-700 focus:outline-none":
                isLink(item),
            }
          );

          if (isLink(item)) {
            const isExternal = item.href.slice(0, 1) !== "/";
            return (
              <li key={i}>
                <Link href={item.href}>
                  <a
                    className={className}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                  >
                    {item.label}
                    {isExternal ? (
                      <ExternalLinkIcon className="h-5 w-5" />
                    ) : (
                      <ChevronRightIcon className="h-5 w-5" />
                    )}
                  </a>
                </Link>
              </li>
            );
          }

          if (hasButton(item)) {
            return (
              <li key={i}>
                <div className={className}>
                  <div className="flex-1">{item.label}</div>
                  <div className="flex-shrink-0">{item.button}</div>
                </div>
              </li>
            );
          }

          const handleClick = item.onClick;
          return (
            <li key={i}>
              <button type="button" onClick={handleClick} className={className}>
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
