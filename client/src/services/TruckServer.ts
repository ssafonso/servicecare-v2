import axios from "axios";

const VW_REST_API_URL = 'http://localhost:8081/api/v1';


export const getTruckByLicense = async (license: string): Promise<void> => {
    return await axios.get(`${VW_REST_API_URL}/truck/license`, {
        params: {
            license: license
        }
    })
        .then((response) => {
            return response.data;
        }, (error) => {
            console.log(error);
            return Promise.reject(error);
        });
}
