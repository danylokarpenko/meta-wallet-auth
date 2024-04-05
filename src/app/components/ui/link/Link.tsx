'use client';
import NextLink from 'next/link';
import type { LinkHTMLAttributes, PropsWithChildren } from 'react';
import { playSound } from '../buttons/Button';
import { Url } from 'next/dist/shared/lib/router/router';

type TypeLink = LinkHTMLAttributes<HTMLAnchorElement> &
  PropsWithChildren<{ href: Url }>;

export function Link({ children, onClick, href }: TypeLink) {
  const handleClick = (e: any) => {
    playSound();
    if (onClick) onClick(e);
  };

  return (
    <NextLink
      className="w-[300px] flex align-middle justify-center bg-gray-800 text-white py-2 px-4 rounded-md transition-colors duration-200 ease-in-out outline-none ring-2 ring-gray-500 ring-opacity-50 hover:bg-gray-700"
      href={href}
      type="button"
      onClick={handleClick}
    >
      {children}
    </NextLink>
  );
}
