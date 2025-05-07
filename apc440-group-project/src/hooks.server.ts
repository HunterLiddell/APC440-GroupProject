
// import { getFirebaseAdminAuth } from "$lib/services/auth/firebase-admin";
// import { type UserData } from "$lib/services/db/user";
// import type { Handle } from "@sveltejs/kit";
// import { getFirestore } from "firebase-admin/firestore";




// export const handle: Handle = async ({ event, resolve }) => {
  
//   const cookie = event.cookies.get('__pawstoken');
//   if (cookie) {
//     // const t = await auth.(cookie);

//     const decodedToken = await getFirebaseAdminAuth().verifyIdToken(cookie);

//     if (!decodedToken) {
//       event.locals.user = null;
//       return resolve(event);
//     }
//     const user = await getUserByIdAsync(decodedToken.uid);
//     if (!user) {
//       event.locals.user = null;
//       return resolve(event);
//     }
//     event.locals.user = {
//       id: user.id,
//       email: user.email,
//       name: user.name,
//       token: cookie,
//     };
//     event.locals.user.token = cookie;
//   } else {
//     event.locals.user = null;
//   }
//   const response = await resolve(event);
//   return response;
// };


// async function getUserByIdAsync(id: string): Promise<UserData | null> {
//     const db = getFirestore();
//     const userDoc = await db.doc(`users/${id}`).get();
//     if (userDoc.exists) {
//         return {
//             id: userDoc.id,
//             ...userDoc.data(),
//         } as UserData;
//     }
//     return null;
// }