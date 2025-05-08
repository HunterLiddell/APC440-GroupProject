import { writable, type Writable } from "svelte/store";
import type { UserData } from "./db/user";

export async function fetchUserFromCookie(): Promise<UserData> {
    const json = await fetch('/api/get-user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await json.json();
    userStore.set(data.user);
    return data.user;
}

export let userStore: Writable<UserData> = writable();