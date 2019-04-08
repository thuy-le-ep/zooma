
export function loggedIn() {
	const currentUser = getCurrentUser()
	return !!currentUser
}

export function getCurrentUser() {
	try {
		return JSON.parse(localStorage.getItem('__currentUser'))
	} catch (err) {
		return null;
	}

}

export function setUser(user) {
	try {
		localStorage.setItem('__currentUser', JSON.stringify(user))
	} catch (err) {
		console.log(err)
	}

}

export function signOut() {
	try {
		localStorage.removeItem('__currentUser')
	} catch (err) {
		console.log(err);
	}
}
