// components/Breadcrumb.tsx
import Link from "next/link";

type BreadcrumbProps = {
    category?: string;
    title: string;
};

export default function Breadcrumb({ category, title }: BreadcrumbProps) {
    return (
        <nav className="mb-4 text-xs sm:text-sm text-gray-400">
            <ol className="flex flex-wrap items-center gap-1 sm:gap-2">
                <li>
                    <Link href="/" className="hover:text-blue-400">
                        Accueil
                    </Link>
                </li>
                <li>/</li>
                <li>
                    <Link href="/blog" className="hover:text-blue-400">
                        Blog
                    </Link>
                </li>
                {category && (
                    <>
                        <li>/</li>
                        <li>
                            <Link
                                href={`/blog?category=${encodeURIComponent(category)}`}
                                className="hover:text-blue-400"
                            >
                                {category}
                            </Link>
                        </li>
                    </>
                )}
                <li>/</li>
                <li className="text-gray-300 truncate max-w-[180px] sm:max-w-xs">
                    {title}
                </li>
            </ol>
        </nav>
    );
}
