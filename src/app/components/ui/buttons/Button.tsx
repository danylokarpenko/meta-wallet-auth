import cn from 'clsx';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
const clickSoundUrl = '/sounds/click.mp3';

type TypeButton = ButtonHTMLAttributes<HTMLButtonElement> &
  Partial<{
    active: boolean;
    isTab: boolean;
  }>;

export const playSound = () => {
  if (typeof window !== 'undefined') {
    // Ensures code is run in browser where window is available
    const audio = new Audio(clickSoundUrl);
    audio.play().catch((e) => console.log('Failed to play sound:', e)); // Catch and log any errors
  }
};

export function Button({
  children,
  className,
  isTab = false,
  active,
  onClick,
  ...rest
}: PropsWithChildren<TypeButton>) {
  const handleClick = (e: any) => {
    playSound();
    if (onClick) onClick(e); // If there's an additional onClick prop passed, call it
  };

  return (
    <button
      className={cn(
        ` bg-gray-800 text-white py-2 px-4 rounded-md
				transition-colors duration-200 ease-in-out
				${isTab ? 'w-full ' : 'outline-none ring-2 ring-gray-500 ring-opacity-50'}
				
				${active ? 'border-b-2 border-gray-300' : ''}
				${!active ? 'bg-gray-500' : ''}
				hover:bg-gray-700`,
        className,
      )}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
}
