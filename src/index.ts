import {
	craftSandwich,
	getIngredientsSums,
	presetSandwichExists,
} from "./util";
import EXISTING_SANDWICHES from "../data/sandwiches.json";
import FILLING from "../data/fillings.json";
import CONDIMENT from "../data/condiments.json";
import {
	condiment,
	craftedSandwich,
	filling,
	typeOfPower,
	typesOfPokemon,
} from "./types";
import { JsonDB, Config } from 'node-json-db';


class SearchingForSandwich {
	// Constructor
	constructor(
		// The type of power looking for
		public typeOfPower: typeOfPower,
		// The type of the pokemon applying to. Empty string is due to powers that don't apply such as egg power.
		public type: typesOfPokemon,
		// Level of the power looking for
		public level: "1" | "2" | "3",
		// The max amount of fillings to use
		public maxFillings: number,
		// The max amount of condiments to use
		public maxCondiments: number,
		// The number of recipes to search for
		public numberOfRecipesToSearchFor: number | "ALL",
		// The current list of fillings
		public fillings: filling[],
		// The current list of condiments
		public condiments: condiment[],
		// The list of recipes found
		public recipesFound: any[],
		// a hashmap of already checked combinations of fillings and condiments
		public alreadyChecked: { [key: string]: boolean },
		// public visited max times already
		public alreadyVisitedIngredient: { [key: string]: number },
		public db: JsonDB,
	) {
		this.typeOfPower = typeOfPower;
		this.type = type;
		this.level = level;
		this.maxFillings = maxFillings;
		this.maxCondiments = maxCondiments;
		this.numberOfRecipesToSearchFor = numberOfRecipesToSearchFor;
		this.fillings = fillings;
		this.condiments = condiments;
		this.recipesFound = recipesFound;
		this.alreadyChecked = {};
		this.alreadyVisitedIngredient = {};
		this.db = db

	}

	// Methods
	checkExistingSandwichEffects = () => {
		return EXISTING_SANDWICHES.filter((sandwich) => {
			for (const effect of sandwich.effects) {
				if (
					effect.name === this.typeOfPower &&
					effect.level === this.level &&
					effect.type === this.type
				) {
					return true;
				}
			}
		});
	};

	checkIfSandwichMatches = (sandwich: craftedSandwich) => {
		const effects = sandwich.effects;
		// Check if any of the effects match the type of power, level, and type
		for (const effect of effects) {
			if (
				effect.name === this.typeOfPower &&
				effect.level === this.level &&
				effect.type === this.type
			) {
				return true;
			}
		}

		return false;
	};

	createSubset = async (startingList: any[]) => {
		startingList.sort();
		const res: any[] = [];
		const backtrack = async (idx: number, subset: any[]) => {
			if (idx === startingList.length) {
				res.push([...subset]);
				return;
			}
			// All subsets that include the current element
			subset.push(startingList[idx]);
			backtrack(idx + 1, subset);
			subset.pop();
			// All subsets that do not include the current element
			while (
				idx + 1 < startingList.length &&
				startingList[idx] === startingList[idx + 1]
			) {
				idx++;
			}
			backtrack(idx + 1, subset);
		};
		backtrack(0, []);

		return res;
	};

	searchAlgorithmSubsetImplementation = async () => {
		// const { condimentList, fillingList } =
		// 	this.createCondimentAndFillingDuplicateList();
		// const condimentSubset = this.createSubset(condimentList);
		// this.db.push("/condimentSubset", condimentSubset)
		// console.log(subset);
	};

	createCondimentAndFillingDuplicateList = () => {
		// Create a flat 1D condiment list where every condiment is duplicated by the max amount of condiments
		const condimentList: condiment[] = [];
		for (const condiment of CONDIMENT) {
			for (let i = 0; i < this.maxCondiments; i++) {
				condimentList.push(condiment);
			}
		}
		// Create a flat 1D filling list where every filling is duplicated by the max amount of fillings
		const fillingList: filling[] = [];
		for (const filling of FILLING) {
			for (let i = 0; i < this.maxFillings; i++) {
				fillingList.push(filling);
			}
		}
		return { condimentList, fillingList };
	};
}

export const findSandwichRecipes = (
	typeOfSandwichPower: typeOfPower,
	type: typesOfPokemon,
	level: "1" | "2" | "3",
	maxFillings: number,
	maxCondiments: number,
	numberOfRecipesToSearchFor: number | "ALL"
) => {
	const searchAlgo = new SearchingForSandwich(
		typeOfSandwichPower,
		type,
		level,
		maxFillings,
		maxCondiments,
		numberOfRecipesToSearchFor,
		[],
		[],
		[],
		{},
		{},
		new JsonDB(new Config("PokeSandwiches", true, false, '/'))
	);
	const findExistingSandwiches = searchAlgo.checkExistingSandwichEffects();
	console.log(findExistingSandwiches)
	// searchAlgo.db.push("/existingSandwiches", findExistingSandwiches);
	searchAlgo.searchAlgorithmSubsetImplementation();
	//   searchAlgo.depthFirstSearchForSandwich(0, 0, true);
	console.log("Done searching!!");
};

findSandwichRecipes("Encounter Power", "Fire", "1", 6, 4, "ALL");
