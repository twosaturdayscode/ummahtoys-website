import Link from "next/link";

export default function MobileNavLink({ children, href }) {
  return (
    <Link href={href}>
      <a className="h-full grid place-content-center place-items-center p-2 text-center text-xs text-gray-700 relative">
        {children}
      </a>
    </Link>
  );
}
