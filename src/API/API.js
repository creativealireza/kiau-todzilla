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

// Tasks
export async function newTask(task) {
    try {
        const response = await axios.post(`${BACKEND_URL}/tasks/newTask`, task);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function getTasks({ adminId }) {
    try {
        const response = await axios.post(`${BACKEND_URL}/tasks/getTasks`, { adminId });
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function editTasks(task) {
    try {
        const response = await axios.put(`${BACKEND_URL}/tasks/editTask`, task);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function deleteTasks({ adminId, deleteTaskId: taskId, userId }) {
    try {
        const response = await axios.put(`${BACKEND_URL}/tasks/deleteTask`, { adminId, taskId, userId });
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function completeTasks({ adminId, taskId, userId }) {
    try {
        const response = await axios.put(`${BACKEND_URL}/tasks/completeTask`, { adminId, taskId, userId });
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function revertTasks({ adminId, taskId, userId }) {
    try {
        const response = await axios.put(`${BACKEND_URL}/tasks/revertTask`, { adminId, taskId, userId });
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function deleteAllTasks({ adminId, userId }) {
    try {
        const response = await axios.put(`${BACKEND_URL}/tasks/deleteAllTasks`, { adminId, userId });
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function deleteCompletedTasks({ adminId, userId }) {
    try {
        const response = await axios.put(`${BACKEND_URL}/tasks/deleteCompletedTasks`, { adminId, userId });
        return response;
    } catch (error) {
        console.error(error);
    }
}
// Login
export async function getAdmin({ email, password }) {
    try {
        const response = await axios.post(`${BACKEND_URL}/login/getAdmin`, { email, password });
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function getVisitor({ username }) {
    try {
        const response = await axios.post(`${BACKEND_URL}/login/getVisitor`, { username });
        return response;
    } catch (error) {
        console.error(error);
    }
}

// History
export async function getHistory({adminId}) {
    try {
        const response = await axios.post(`${BACKEND_URL}/history/getHistory`, {adminId});
        return response;
    } catch (error) {
        console.error(error);
    }
}