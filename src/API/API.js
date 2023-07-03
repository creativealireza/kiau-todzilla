import axios from "axios";

const COUNTRY_URL = `https://restcountries.com/v3.1/all`;
const BACKEND_URL = `https://todzilla-backend.onrender.com`;

export async function getAllLanguages() {
    try {
        const response = await axios.get(COUNTRY_URL);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

// Admins
export async function newAdmin(admin) {
    try {
        const response = await axios.post(`${BACKEND_URL}/admin/newAdmin`, admin);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function newMembers(member) {
    try {
        const response = await axios.put(`${BACKEND_URL}/admin/newMember`, member);
        return response;
    } catch (error) {
        console.error(error);
    }
}