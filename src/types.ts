export type filling = {
	name: string;
	tastes: {
		flavor: string;
		amount: number;
	}[];
	powers: {
		type: string;
		amount: number;
	}[];
	types: {
		type: string;
		amount: number;
	}[];
	imageUrl: string;
	pieces: number;
};

export type condiment = {
	name: string;
	tastes: {
		flavor: string;
		amount: number;
	}[];
	powers: {
		type: string;
		amount: number;
	}[];
	types: {
		type: string;
		amount: number;
	}[];
	imageUrl: string;
};

export type power = {
	type: string;
	amount: number;
	modded?: boolean;
	boosted?: boolean;
};

export type taste = {
	flavor: string;
	amount: number;
};

export type type = {
	type: string;
	amount: number;
};

export type summation = {
	tastes: taste[];
	powers: power[];
	types: type[];
	dropped: number;
	overflow: boolean;
};

export type presetSandwich = {
	number: string; // It is a # but it is formatted as a string
	name: string;
	description: string;
	fillings: string[];
	condiments: string[];
	effects: { name: string; type: string; level: string }[];
	imageUrl: string;
	location: string;
};

export type craftedSandwich = {
	number: string;
	name: string;
	description: string;
	fillings: filling[];
	condiments: condiment[];
	effects: {
		name: any;
		fullType: type;
		fullPower: power;
		type: string;
		level: string;
	}[];
	imageUrl: string;
	piecesDropped: number;
	totalPieces: number;
	stars: number;
};

export type typeOfPower =
	| "Egg Power"
	| "Catching Power"
	| "Exp. Point Power"
	| "Item Drop Power"
	| "Raid Power"
	| "Sparkling Power"
	| "Title Power"
	| "Humungo Power"
	| "Teensy Power"
	| "Encounter Power";

export type typesOfPokemon =
	| "Normal"
	| "Fighting"
	| "Flying"
	| "Poison"
	| "Ground"
	| "Rock"
	| "Bug"
	| "Ghost"
	| "Steel"
	| "Fire"
	| "Water"
	| "Grass"
	| "Electric"
	| "Psychic"
	| "Ice"
	| "Dragon"
	| "Dark"
	| "Fairy"
	| "";

export type typesOfFlavors = "Sweet" | "Salty" | "Sour" | "Bitter" | "Hot";
