"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
	link: {
		url: string;
		text: string;
	};
};

export default function AdminSecondaryNavbarRoute({ link }: Props) {
	const pathName = usePathname();
	const isActive = pathName.endsWith(link.url);

	return (
		<Link
			href={link.url}
			className={`${
				isActive ? "bg-sky-600 text-light font-bold" : ""
			} py-2 px-3 rounded-lg text-gray-700 hover:text-gray-200 hover:bg-sky-700 hover:bg-opacity-60 transition-colors`}
		>
			{link.text}
		</Link>
	);
}
