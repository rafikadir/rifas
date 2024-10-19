import { User } from "next-auth";
import { logoutAction, signInWithGoogleAction } from "@/actions/auth/authMethods";

export default function LoginButton({ user }: { user: User | undefined }) {
	return (
		<form action={user ? logoutAction : signInWithGoogleAction} className="w-full">
			{user ? (
				<button type="submit" className="outline-none bg-red-700 text-white w-full px-3 py-2 focus-within:outline focus-within:outline-2 focus-within:outline-blue-150 hover:bg-red-800 hover:text-lg md:hover:text-base transition-all rounded-lg md:rounded-3xl">
					Cerrar sesión
				</button>
			) : (
				<button className="outline-none bg-sky-700 text-white w-full px-3 py-2 focus-within:outline focus-within:outline-2 focus-within:outline-blue-150 hover:bg-sky-800 hover:text-lg md:hover:text-base transition-all rounded-lg md:rounded-3xl">
					Iniciar sesión
				</button>
			)}
		</form>
	);
}
