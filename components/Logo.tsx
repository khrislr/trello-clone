import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";
const headFont = localFont({
  src: "../public/fonts/font.woff2",
});

export default function Logo() {
  return (
    <Link href={"/"}>
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image src={"/logo.svg"} alt="Logo" height={30} width={30} />
        <p className={cn("text-lg text-neutral-700", headFont.className)}>
          Taskify
        </p>
      </div>
    </Link>
  );
}
