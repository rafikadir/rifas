"use server"

export const getAdminPhone = async () => {
    const phoneNumber = process.env.ADMIN_PHONE_NUMBER || "";
    return phoneNumber
}