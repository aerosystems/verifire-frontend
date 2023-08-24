import axios from "axios";

const instance = axios.create({
    baseURL: "https://verifire.com",
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;