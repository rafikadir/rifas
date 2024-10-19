import { fetchAllUsers } from "@/actions/users";
import { IUserModel } from "@/src/interfaces/users";
import { JSONDataParser } from "@/src/utils/parsers";
import { RegistrarVendedorForm } from "@/components/admin/forms/RegistrarVendedorForm";
import DeleteUserButton from "@/components/admin/DeleteUserButton";
import { CopyIDToClipboard } from "@/components/usuarios/CopyIDToClipboard";

export default async function UsuariosPage() {
	const response = await fetchAllUsers();
	let users: IUserModel[] = [];

	const { data } = response;
	if (data) {
		users = JSONDataParser(data) as IUserModel[];
	}

	if (users?.length === 0)
		return (
			<div className="text-gray-500">
				Aquí aparecerán los usuarios registrados
			</div>
		);

	return (
		<div className="w-full md:w-11/12 mx-auto">
			<div className="w-full flex justify-start mb-2">
				<RegistrarVendedorForm />
			</div>
			<table className="w-full overflow-scroll rounded-2xl bg-slate-600">
				<thead>
					<tr className="text-xs text-gray-200 *:px-2 *:py-1 border-b-2 border-gray-200">
						<th>ID</th>
						<th>Nombre</th>
						<th>Apellidos</th>
						<th>Correo</th>
						<th>Teléfono</th>
						<th>Rol</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{users?.map((user) => (
						<tr
							key={String(user._id)}
							className="text-xs text-center text-gray-200 bg-gray-400 bg-opacity-30 rounded-lg"
						>
							<CopyIDToClipboard userId={String(user._id)} />
							<td className="p-2">{user.first_name}</td>
							<td className="p-2">{user.last_name}</td>
							<td className="p-2">{user.email}</td>
							<td className="p-2">{user.phone_number}</td>
							<td className="p-2">{user.role}</td>
							<td className="p-2">
								<DeleteUserButton userId={String(user._id)} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
