import cn from 'clsx';
import {
  forwardRef,
  type ButtonHTMLAttributes,
  type PropsWithChildren,
} from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Field({
  id,
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div>
      <label
        htmlFor={type}
        className="block text-sm font-medium leading-6 text-gray-300 dark:text-gray-200"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={type}
          placeholder={placeholder || label}
          required
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-200 dark:bg-gray-700 shadow-sm ring-1 ring-inset dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:focus:ring-indigo-400 sm:text-sm sm:leading-6"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
