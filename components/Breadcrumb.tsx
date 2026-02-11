import Link from 'next/link';
import { IoChevronForward } from 'react-icons/io5';

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumb navigation component
 * Converted from React Router to Next.js Link
 */
export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="py-4" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index < items.length - 1 ? (
              <>
                <Link 
                  href={item.path} 
                  className="text-text-light hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
                <IoChevronForward className="text-text-light text-xs" />
              </>
            ) : (
              <span className="text-text font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
