import type { RequestHandler } from "@sveltejs/kit";


export const POST: RequestHandler = async ({ request, cookies, url }) => {

  const token = await request.text();
  const cookie = cookies.get('session_id');
  if (cookie) {
    return new Response('Cookie already exists', { status: 400 });
  }
  const baseUrl = url.origin;
  const domain = baseUrl == 'http://localhost:5173' ? 'localhost' : 'main.d9h26mhn1fmw4.amplifyapp.com';

  // Set a new cookie
  cookies.set('__pawstoken', token, {
    path: '/', // Cookie is available on all paths
    domain: domain,
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: true, // Ensures the cookie is sent over HTTPS only
    sameSite: 'strict', // Prevents CSRF attacks
  });
  return new Response('Cookie set successfully', { status: 200 });
};
// This code sets a cookie named 'session_id' with the value 'your_session_id_value'.
// The cookie is marked as HttpOnly, Secure, and SameSite=Strict to enhance security.
// The POST function checks if the cookie already exists and sets it if it doesn't.
// The response indicates whether the cookie was set successfully or if it already exists.
// This is a server-side code snippet for setting cookies in a SvelteKit application.
// It uses the request object to access cookies and set a new cookie with security attributes.