import PocketBase from 'pocketbase';

// PocketBase client pointing at local dev server
export const pb = new PocketBase('http://127.0.0.1:8090');

// Helper: return current user model (may be null)
export const getCurrentUser = () => pb.authStore.model;

// Helper: authenticate a user with email + password
export async function authWithPassword(email: string, password: string) {
	// returns the auth result or throws an error
	const authData = await pb.collection('users').authWithPassword(email, password);
	return authData; // contains token and record
}

// Helper: logout
export function logout() {
	pb.authStore.clear();
}

// Export whether there's a valid session
export const isAuthenticated = () => pb.authStore.isValid;
