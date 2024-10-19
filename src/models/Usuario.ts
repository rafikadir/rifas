import mongoose, { Schema } from "mongoose";
import { userRoles, IUserModel, userAuthMethods } from "../interfaces/users";

export const UserSchema = new Schema<IUserModel>(
	{
		displayedName: String,
		name: {
			required: [true, "El nombre es requerido."],
			type: String,
			minlength: [3, "El nombre debe contener al menos 3 carácteres."],
			maxlength: [50, "El nombre debe contener máximo 50 carácteres."],
		},
		first_name: {
			type: String,
			maxlength: [50, "El nombre debe contener máximo 50 carácteres."],
		},
		last_name: {
			type: String,
			maxlength: [50, "El apellido debe contener máximo 50 carácteres."],
		},
		email: {
			required: [true, "El email es requerido."],
			unique: true,
			type: String,
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				"El email es inválido.",
			],
		},
		phone_number: {
			type: String,
			unique: true,
			sparse: true,
			minlength: [10, "El teléfono debe contener al menos 10 carácteres."],
			maxlength: [15, "El teléfono debe contener máximo 15 carácteres."],
			default: null,
		},
		role: {
			type: String,
			enum: Object.values(userRoles),
			default: userRoles.CLIENTE,
		},
		image: {
			type: String,
			default: null,
		},
		auth: {
			providerId: {
				type: String,
				required: [true, "auth.providerId es obligatorio."]
			},
			method: {
				type: String,
				required: [true, "auth.method es obligatorio."],
				enum: Object.values(userAuthMethods),
			}
		}
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

// UserSchema.virtual("fullName").get(function () {
// 	return this.name + " " + this.last_name;
// });

const User =
	mongoose.models?.Usuario || mongoose.model<IUserModel>("Usuario", UserSchema);
export default User;
