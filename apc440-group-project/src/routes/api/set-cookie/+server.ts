import type { RequestHandler } from "@sveltejs/kit";


export const POST: RequestHandler = async ({ request, cookies, url }) => {

  const {token} = await request.json();
  
  const cookie = cookies.get('session_id');
  if (cookie) {
    return new Response('Cookie already exists', { status: 400 });
  }
  const baseUrl = url.origin;
  const domain = baseUrl == 'http://localhost:5173' ? '' : 'main.d9h26mhn1fmw4.amplifyapp.com';

  // Set a new cookie
  cookies.set('__pawstoken', token, {
    path: '/', // Cookie is available on all paths
    domain: domain || undefined,
    expires: new Date(Date.now() + 60 * 60 * 24 * 7), // Expires in 7 days
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: true, // Ensures the cookie is sent over HTTPS only
    sameSite: 'strict', // Prevents CSRF attacks
  });
  return new Response('Cookie set successfully', { status: 200 });
};