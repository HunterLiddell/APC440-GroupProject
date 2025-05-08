import { getFirebaseAdminAuth } from '$lib/services/auth/firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { json } from '@sveltejs/kit';

export async function GET({ cookies }) {
	const token = cookies.get('__pawstoken');
	if (!token) return json({ user: null });

	try {
		const decoded = await getFirebaseAdminAuth().verifyIdToken(token);
		const doc = await getFirestore().doc(`users/${decoded.uid}`).get();
		if (!doc.exists) return json({ user: null });

		return json({ user: { id: doc.id, ...(doc.data() ?? {}) } });
	} catch {
		return json({ user: null });
	}
}