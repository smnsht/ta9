const DUMMY_USERS = [
	'Ori Lugasy',
	'Ran Shim',
	'Chen Meir',
	'Or Bar',
	'Idi Amin',
	'Mobutu Sese Seco',
	'Robert Mugabe',
	'Pol Pot',
	'Kim Jong Un',
	'Omar Al-bashir'
];

export function getRandomUserName(): string {
	const rnd = Math.floor(Math.random() * 1000000);
	
	return DUMMY_USERS[rnd % DUMMY_USERS.length]
}