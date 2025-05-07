export async function fetchUserFromCookie() {
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