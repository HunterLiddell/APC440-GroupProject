import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
    // locals.user is set in hooks.server.ts
    const user = locals.user;
    return {
        user,
    };
    }