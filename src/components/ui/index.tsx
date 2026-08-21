'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { forwardRef } from 'react';

// === BUTTON ===
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-heading font-medium tracking-wide transition-all duration-300 ease-out rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary: 'bg-ember text-white hover:bg-ember-deep active:scale-[0.97] shadow-sm hover:shadow-md',
      secondary: 'bg-ink text-white hover:bg-ink-light active:scale-[0.97]',
      outline: 'border-2 border-ink text-ink hover:bg-ink hover:text-white active:scale-[0.97]',
      ghost: 'text-stone hover:text-ink hover:bg-stone-lighter/50',
      danger: 'bg-error text-white hover:bg-red-700 active:scale-[0.97]',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 gap-1.5',
      md: 'text-sm px-5 py-2.5 gap-2',
      lg: 'text-base px-7 py-3.5 gap-2.5',
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

// === LINK BUTTON ===
interface LinkButtonProps {
  href: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
  external?: boolean;
}

export function LinkButton({ href, variant = 'primary', size = 'md', className, children, external }: LinkButtonProps) {
  const base = 'inline-flex items-center justify-center font-heading font-medium tracking-wide transition-all duration-300 ease-out rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember';

  const variants = {
    primary: 'bg-ember text-white hover:bg-ember-deep active:scale-[0.97] shadow-sm hover:shadow-md',
    secondary: 'bg-ink text-white hover:bg-ink-light active:scale-[0.97]',
    outline: 'border-2 border-ink text-ink hover:bg-ink hover:text-white active:scale-[0.97]',
    ghost: 'text-stone hover:text-ink hover:bg-stone-lighter/50',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5',
  };

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, variants[variant], sizes[size], className)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)}>
      {children}
    </Link>
  );
}

// === SECTION HEADING ===
interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
}

export function SectionHeading({ label, title, description, align = 'left', dark, className }: SectionHeadingProps) {
  return (
    <div className={cn(
      'max-w-3xl',
      align === 'center' && 'mx-auto text-center',
      className,
    )}>
      {label && (
        <span className={cn(
          'label mb-4 block',
          dark ? 'text-ember-glow' : 'text-ember',
        )}>
          {label}
        </span>
      )}
      <h2 className={cn(
        'heading-xl',
        dark ? 'text-white' : 'text-ink',
      )}>
        {title}
      </h2>
      {description && (
        <p className={cn(
          'body-lg mt-4',
          dark ? 'text-stone-light' : 'text-stone',
        )}>
          {description}
        </p>
      )}
    </div>
  );
}

// === BADGE ===
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'ember' | 'teal' | 'warning' | 'success' | 'error';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  const variants = {
    default: 'bg-stone-lighter/60 text-stone',
    ember: 'bg-ember-light text-ember-deep',
    teal: 'bg-teal-light text-teal-deep',
    warning: 'bg-amber-50 text-amber-700',
    success: 'bg-emerald-50 text-emerald-700',
    error: 'bg-red-50 text-red-700',
  };

  const sizes = {
    sm: 'text-[0.65rem] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span className={cn(
      'inline-flex items-center font-heading font-medium tracking-wider uppercase rounded-full',
      variants[variant],
      sizes[size],
      className,
    )}>
      {children}
    </span>
  );
}

// === CARD ===
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  dark?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export function Card({ children, className, hover, dark, padding = 'md' }: CardProps) {
  const paddings = { sm: 'p-4', md: 'p-6', lg: 'p-8' };
  return (
    <div className={cn(
      'rounded-xl border transition-all duration-300',
      dark
        ? 'bg-ink-light border-ink-muted'
        : 'bg-white border-stone-lighter/80',
      hover && !dark && 'hover:shadow-lg hover:border-stone-lighter hover:-translate-y-0.5',
      hover && dark && 'hover:border-stone/30 hover:-translate-y-0.5',
      paddings[padding],
      className,
    )}>
      {children}
    </div>
  );
}

// === INPUT ===
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-ink">
            {label}
            {props.required && <span className="text-ember ml-0.5">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'w-full px-4 py-2.5 rounded-lg border text-sm transition-colors duration-200',
            'bg-white border-stone-lighter text-ink placeholder:text-stone-light',
            'focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember',
            error && 'border-error focus:ring-error/20 focus:border-error',
            className,
          )}
          {...props}
        />
        {error && <p className="text-xs text-error">{error}</p>}
        {helperText && !error && <p className="text-xs text-stone">{helperText}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

// === TEXTAREA ===
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-ink">
            {label}
            {props.required && <span className="text-ember ml-0.5">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          rows={4}
          className={cn(
            'w-full px-4 py-2.5 rounded-lg border text-sm transition-colors duration-200 resize-y',
            'bg-white border-stone-lighter text-ink placeholder:text-stone-light',
            'focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember',
            error && 'border-error focus:ring-error/20 focus:border-error',
            className,
          )}
          {...props}
        />
        {error && <p className="text-xs text-error">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

// === SELECT ===
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, id, options, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-ink">
            {label}
            {props.required && <span className="text-ember ml-0.5">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={id}
          className={cn(
            'w-full px-4 py-2.5 rounded-lg border text-sm transition-colors duration-200',
            'bg-white border-stone-lighter text-ink',
            'focus:outline-none focus:ring-2 focus:ring-ember/20 focus:border-ember',
            error && 'border-error',
            className,
          )}
          {...props}
        >
          <option value="">Select...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {error && <p className="text-xs text-error">{error}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';

// === ACCORDION ===
interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function AccordionItem({ question, answer, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border-b border-stone-lighter/80">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className="heading-md text-ink group-hover:text-ember transition-colors pr-4">
          {question}
        </span>
        <span className={cn(
          'shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-stone-lighter transition-all duration-300',
          isOpen && 'bg-ember border-ember text-white rotate-45',
        )}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div className={cn(
        'overflow-hidden transition-all duration-300 ease-out',
        isOpen ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0',
      )}>
        <p className="body-lg leading-relaxed pr-12">{answer}</p>
      </div>
    </div>
  );
}

// === EMPTY STATE ===
interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {icon && <div className="mb-4 text-stone-light">{icon}</div>}
      <h3 className="heading-md text-stone mb-2">{title}</h3>
      <p className="body-sm text-stone-light max-w-md">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
