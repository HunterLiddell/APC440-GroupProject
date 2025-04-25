import { auth } from "$lib/services/auth/firebase";
import { getAuth } from "$lib/services/auth/firebase-admin";
import { getUserByIdAsync } from "$lib/services/db/user";
import type { Handle } from "@sveltejs/kit";




export const handle: Handle = async ({ event, resolve }) => {
  const cookie = event.cookies.get('__pawstoken');
  if (cookie) {
    // const t = await auth.(cookie);

    const decodedToken = await getAuth().verifyIdToken(cookie);

    if (!decodedToken) {
      event.locals.user = null;
      return resolve(event);
    }

    const user = await getUserByIdAsync(decodedToken.uid);
    console.log(user);
    if (!user) {
      event.locals.user = null;
      return resolve(event);
    }
    event.locals.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      token: cookie,
    };
    event.locals.user.token = cookie;
  } else {
    event.locals.user = null;
  }
  const response = await resolve(event);
  return response;
};