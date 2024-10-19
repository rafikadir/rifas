"use client";
import { useState } from "react";
import { User } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { userRoles } from "@/src/interfaces/users";
import { HeaderLogo } from "./Logo";
import LoginButton from "../auth/LoginButton";

type Props = {
	user: User | undefined;
	navigation: {
		url: string;
		text: string;
		blank?: string;
	}[];
};

export default function Navbar({ user, navigation }: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const pathName = usePathname();
	const userIsAdmin =
		user?.role === userRoles.ADMIN || user?.role === userRoles.VENDEDOR;

	return (
		<header className="sticky top-0 z-50">
			<nav className="md:pl-20 bg-gradient-to-r from-sky-600 from-0% via-sky-800 via-86% to-sky-950 to-100% text-dark md:text-white rounded-full h-16 px-8 m-1.5 drop-shadow-md flex justify-between items-center">
				<HeaderLogo />

				{/* Botón de hamburguesa/cerrar para pantallas pequeñas */}
				<button
					className="md:hidden block"
					onClick={() => setIsOpen(!isOpen)}
					aria-label="Toggle Menu"
				>
					<Image
						src={
							isOpen ? "/assets/icons/close.svg" : "/assets/icons/burger.svg"
						}
						alt={isOpen ? "Cerrar menú" : "Abrir menú"}
						width={32}
						height={32}
						className={`${isOpen ? "rotate-90" : "rotate-0"}`}
					/>
				</button>

				{/* Enlaces de navegación en pantallas grandes */}
				<ul className="ml-auto hidden md:flex h-16 items-center text-center font-semibold list-none text-sm justify-between">
					{navigation.map((item, index) => {
						const isActive = pathName.endsWith(item.url);
						return (
							<Link
								key={index}
								aria-current={isActive ? "page" : undefined}
								className={`no-underline w-28 md:w-fit md:mx-4 hover:bg-white-100 hover:text-gray-800 hover:text-base py-2 px-3 rounded-3xl transition-all 
									${isActive && "font-extrabold"}`}
								href={item.url}
								target={userIsAdmin && item.blank ? item.blank : ""}
							>
								<li>{item.text}</li>
							</Link>
						);
					})}
					<li className="w-full md:w-fit md:mx-4">
						<LoginButton user={user} />
					</li>
				</ul>

				{user && (
					<Link href="/perfil">
						<Image
							alt="perfil"
							src={"/assets/icons/user-circle.svg"}
							width={42}
							height={42}
						/>
					</Link>
				)}

				{/* Menú desplegable para pantallas pequeñas */}
				{isOpen && (
					<ul className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg rounded-lg p-4 space-y-1">
						{navigation.map((item, index) => {
							const isActive = pathName.endsWith(item.url);
							return (
								<Link
									key={index}
									aria-current={isActive ? "page" : undefined}
									className={`block w-full text-center no-underline hover:bg-gray-400 hover:text-lg p-2 rounded-lg transition-all ${
										isActive && "font-extrabold"
									}`}
									href={item.url}
									target={userIsAdmin && item.blank ? item.blank : ""}
								>
									<li>{item.text}</li>
								</Link>
							);
						})}
						<li className="text-center block">
							<LoginButton user={user} />
						</li>
					</ul>
				)}
			</nav>
		</header>
	);
}
