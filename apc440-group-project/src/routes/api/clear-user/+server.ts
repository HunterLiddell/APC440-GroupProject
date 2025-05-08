import type { RequestHandler } from "@sveltejs/kit";


export const POST: RequestHandler = async ({cookies})  => {
    cookies.delete("__pawstoken", {path: "/"});

    return new Response("Success", {status: 200});
}