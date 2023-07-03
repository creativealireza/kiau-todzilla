import axios from "axios";

const COUNTRY_URL = `https://restcountries.com/v3.1/all`;

export async function getAllLanguages() {
    try {
        const response = await axios.get(COUNTRY_URL);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
