'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';

interface ExpandableSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  icon?: ReactNode;
  variant?: 'default' | 'card' | 'minimal';
  className?: string;
}

/**
 * ExpandableSection - Tıklanabilir gizle/göster bölümü
 * Kullanıcı başlığa tıkladığında detayları açar/kapatır
 */
export function ExpandableSection({
  title,
  children,
  defaultOpen = false,
  icon,
  variant = 'default',
  className = '',
}: ExpandableSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(defaultOpen ? undefined : 0);

  useEffect(() => {
    if (!contentRef.current) return;
    if (isOpen) {
      setHeight(contentRef.current.scrollHeight);
      const timer = setTimeout(() => setHeight(undefined), 300);
      return () => clearTimeout(timer);
    } else {
      setHeight(contentRef.current.scrollHeight);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setHeight(0));
      });
    }
  }, [isOpen]);

  const baseStyles = {
    default: 'bg-white border border-neutral-200 rounded-xl',
    card: 'bg-white border border-neutral-200 rounded-2xl shadow-sm',
    minimal: 'border-b border-neutral-200',
  };

  const headerStyles = {
    default: 'px-5 py-4',
    card: 'px-6 py-5',
    minimal: 'py-4',
  };

  const contentStyles = {
    default: 'px-5 pb-5',
    card: 'px-6 pb-6',
    minimal: 'pb-4',
  };

  return (
    <div className={`${baseStyles[variant]} ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-3 text-left ${headerStyles[variant]} group cursor-pointer`}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 min-w-0">
          {icon && <span className="text-primary-500 shrink-0">{icon}</span>}
          <span className="font-semibold text-neutral-800 group-hover:text-primary-600 transition-colors truncate">
            {title}
          </span>
        </div>
        <svg
          className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        ref={contentRef}
        style={{ height: height !== undefined ? `${height}px` : 'auto' }}
        className="overflow-hidden transition-[height] duration-300 ease-in-out"
      >
        <div className={contentStyles[variant]}>
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * ExpandableGroup - Birden fazla ExpandableSection'ı gruplar
 */
interface ExpandableGroupProps {
  children: ReactNode;
  className?: string;
}

export function ExpandableGroup({ children, className = '' }: ExpandableGroupProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {children}
    </div>
  );
}

/**
 * DetailRow - Tek satırlık anahtar-değer bilgi satırı
 */
interface DetailRowProps {
  label: string;
  value: string | ReactNode;
}

export function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0">
      <span className="text-sm text-neutral-500">{label}</span>
      <span className="text-sm font-medium text-neutral-800">{value}</span>
    </div>
  );
}
