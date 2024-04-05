import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import metamaskSvg from '../../../assets/metamask.svg';
import Image from 'next/image';
import { playSound } from './Button';

type TypeButton = ButtonHTMLAttributes<HTMLButtonElement>;

export function MetamaskButton({
  children,
  className,
  onClick,
  ...rest
}: PropsWithChildren<TypeButton>) {
  const handleClick = (e: any) => {
    playSound();
    if (onClick) onClick(e); // If there's an additional onClick prop passed, call it
  };
  return (
    <button
      type="button"
      className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
      onClick={handleClick}
      {...rest}
    >
      <Image src={metamaskSvg} alt="MetaMask" className="w-6 h-6 mr-3" />
      Connect with MetaMask
    </button>
  );
}
