import type { UserData } from "./db/user";

export async function fetchUserFromCookie(): Promise<UserData> {
    const json = await fetch('/api/get-user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await json.json();
    console.log('data', data);
    return data.user;
}