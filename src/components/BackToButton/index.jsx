import { HiChevronLeft } from "react-icons/hi";
import Link from "next/link";

const BackToButton = ({ label, href }) => {
  return (
    <div className="text-zinc-700 lg:col-start-2 col-span-full">
      <Link href={href}>
        <a className="flex flex-row gap-2 items-center hover:underline">
          <HiChevronLeft className="w-4 h-4" />
          <span>{label}</span>
        </a>
      </Link>
    </div>
  );
};

export default BackToButton;
