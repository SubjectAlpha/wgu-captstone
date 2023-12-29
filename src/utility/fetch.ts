import axios from "axios";

export async function get(uri: string) {
    const { data } = await axios.get(uri);

    return data;
}

export async function post(uri: string, body?: any) {
    const { data } = await axios.post(uri,
        {
            body: JSON.stringify(body)
        });

    return data;
}
