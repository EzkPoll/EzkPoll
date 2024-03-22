import { Poll } from "@/core/setting";

export const api_url = 'https://ezkpoll-backend.onrender.com/';
export const fetchJson = async (url: string, options: object) => {
    const response = await fetch(url, options);
    console.log(response);
    const body = await response.json();
    if (!response.ok) {
        const errorInfo = {
            status_code: response.status,
            detail: body.detail,
        }
        throw errorInfo;
    }
    if (body.fail)
        throw body.fail;
    return body;
}

export const getPolls = async () => {
    const response = await fetchJson(
        api_url + "polls",
        {
            method: "GET",
        })
        .then((res) => res);
    return response;
}
export const getPollById = async (id: number) => {
    const response = await fetchJson(
        api_url + "poll/{id}?id=" + id,
        {
            method: "GET",
        })
        .then((res) => res);
    return response;
}

export const createPoll = async (pollData: Poll) => {
    const requestBody = JSON.stringify(pollData);
    const response = await fetchJson(
        api_url + "create-poll",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With X-CSRF-TOKEN",
                "Access-Control-Allow-Credentials": "true",
            },
            body: requestBody,

        })
        .then((res) => res);
    return response;
}


