export function getGreetingTime() {
	const currentHour = new Date().getHours();
	const splitAfternnon = 12;
	const splitEvening = 18;
	if (currentHour < splitAfternnon) return 'sáng';
	if (currentHour < splitEvening) return 'chiều';

	return 'tối';
}

export function hihi() {
	return 1;
}