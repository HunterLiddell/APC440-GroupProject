

export async function setSessionCookie(token: string) {
    await fetch('/api/set-cookie', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
}