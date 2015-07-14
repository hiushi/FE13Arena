

// misc helper functions
function isIn(element, arr) {
	var result = false;
	for (var i=0; i<arr.length; i++) {
		if (arr[i] == element)
			result = true;
	}
	return result;
};
function space(num) {
	var output = "";
	for (var i=0; i<num; i++)
		output += ' ';
	return output;
}

// misc globals
var columnWidth = 20;
var messageWidth = 32;

// game-related helper functions
var avatarMods = {
	"asset": {
		"HP": {"Str": 1, "Mag": 1, "Skl": 0, "Spd": 0, "Lck": 2, "Def": 2, "Res": 2},
		"Str": {"Str": 4, "Mag": 0, "Skl": 2, "Spd": 0, "Lck": 0, "Def": 2, "Res": 0},
		"Mag": {"Str": 0, "Mag": 4, "Skl": 0, "Spd": 2, "Lck": 0, "Def": 0, "Res": 2},
		"Skl": {"Str": 2, "Mag": 0, "Skl": 4, "Spd": 0, "Lck": 0, "Def": 2, "Res": 0},
		"Spd": {"Str": 0, "Mag": 0, "Skl": 2, "Spd": 4, "Lck": 2, "Def": 0, "Res": 0},
		"Lck": {"Str": 2, "Mag": 2, "Skl": 0, "Spd": 0, "Lck": 4, "Def": 0, "Res": 0},
		"Def": {"Str": 0, "Mag": 0, "Skl": 0, "Spd": 0, "Lck": 2, "Def": 4, "Res": 2},
		"Res": {"Str": 0, "Mag": 2, "Skl": 0, "Spd": 2, "Lck": 0, "Def": 0, "Res": 4}
	},
	"flaw": {
		"HP": {"Str": -1, "Mag": -1, "Skl": 0, "Spd": 0, "Lck":-1, "Def": -1, "Res": -1},
		"Str": {"Str": -3, "Mag": 0, "Skl": -1, "Spd": 0, "Lck": 0, "Def": -1, "Res": 0},
		"Mag": {"Str": 0, "Mag": -3, "Skl": 0, "Spd": -1, "Lck": 0, "Def": 0, "Res": -1},
		"Skl": {"Str": -1, "Mag": 0, "Skl": -3, "Spd": 0, "Lck": 0, "Def": -1, "Res": 0},
		"Spd": {"Str": 0, "Mag": 0, "Skl": -1, "Spd": -3, "Lck": -1, "Def": 0, "Res": 0},
		"Lck": {"Str": -1, "Mag": -1, "Skl": 0, "Spd": 0, "Lck": -3, "Def": 0, "Res": 0},
		"Def": {"Str": 0, "Mag": 0, "Skl": 0, "Spd": 0, "Lck": -1, "Def": -3, "Res": -1},
		"Res": {"Str": 0, "Mag": -1, "Skl": 0, "Spd": -1, "Lck": 0, "Def": 0, "Res": -3}
	}
};
function calculateAvatarMods(a, f) {
	var mods = {"HP": 0, "Str": 0, "Mag": 0, "Skl": 0, "Spd": 0, "Lck": 0, "Def": 0, "Res": 0};
	for (var stat in avatarMods.asset.HP) {
		mods[stat] = avatarMods.asset[a][stat] + avatarMods.flaw[f][stat];
	}
	return mods;
};
function calculateChildMods(m, d) {
	var childMods = {"HP": 0, "Str": 1, "Mag": 1, "Skl": 1, "Spd": 1, "Lck": 1, "Def": 1, "Res": 1};
	var mom = characters[m];
	var dad = characters[d];
	for (var stat in mom.mods)
		childMods[stat] += (mom.mods[stat] + dad.mods[stat]);
	return childMods;
};
function calculateAvatarChildMods(p, a, f) {
	var childMods = {"HP": 0, "Str": 1, "Mag": 1, "Skl": 1, "Spd": 1, "Lck": 1, "Def": 1, "Res": 1};
	var parent = characters[p];
	var avatarMods = calculateAvatarMods(a, f);
	for (var stat in parent.mods)
		childMods[stat] += (parent.mods[stat] + avatarMods[stat]);
	return childMods;
};

// misc game-related globals
var turnCount = 1;


// databases
var characters = {
	"avatar_m": {
		"name": "Avatar (M)",
		"gender": 'M',
		"mods": {},
		"class": "grandmaster"
	},
	"avatar_f": {
		"name": "Avatar (F)",
		"gender": 'F',
		"mods": {},
		"class": "grandmaster"
	},
	"chrom": {
		"name": "Chrom",
		"gender": 'M',
		"mods": {"HP": 0, "Str": 1, "Mag": 0, "Skl": 1, "Spd": 1, "Lck": 1, "Def": -1, "Res": -1},
		"class": "great_lord_m"
	},
	"lissa": {
		"name": "Lissa",
		"gender": 'F',
		"mods": {"HP": 0, "Str": -2, "Mag": 2, "Skl": -1, "Spd": 0, "Lck": 2, "Def": -1, "Res": 1},
		"class": "sage"
	},
	"frederick": {
		"name": "Frederick",
		"gender": 'M',
		"mods": {"HP": 0, "Str": 2, "Mag": -2, "Skl": 2, "Spd": -2, "Lck": 0, "Def": 2, "Res": 0},
		"class": "great_knight"
	},
	"sully": {
		"name": "Sully",
		"gender": 'F',
		"mods": {"HP": 0, "Str": -1, "Mag": -1, "Skl": 2, "Spd": 2, "Lck": 0, "Def": -1, "Res": 0},
		"class": "paladin"
	},
	"virion": {
		"name": "Virion",
		"gender": 'M',
		"mods": {"HP": 0, "Str": 0, "Mag": 0, "Skl": 2, "Spd": 2, "Lck": -1, "Def": -2, "Res": 0},
		"class": "sniper"
	},
	"stahl": {
		"name": "Stahl",
		"gender": 'M',
		"mods": {"HP": 0, "Str": 2, "Mag": -1, "Skl": 1, "Spd": 0, "Lck": -2, "Def": 2, "Res": -1},
		"class": "paladin"
	},
	"sumia": {
		"name": "Sumia",
		"gender": 'F',
		"mods": {"HP": 0, "Str": -2, "Mag": 0, "Skl": 2, "Spd": 3, "Lck": 0, "Def": -2, "Res": 1},
		"class": "dark_flier"
	},
	"kellam": {
		"name": "Kellam",
		"gender": 'M',
		"mods": {"HP": 0, "Str": 1, "Mag": 0, "Skl": 1, "Spd": -2, "Lck": -2, "Def": 3, "Res": 0},
		"class": "general"
	},
	"donnel": {
		"name": "Donnel",
		"gender": 'M',
		"mods": {"HP": 0, "Str": 1, "Mag": -1, "Skl": -1, "Spd": -1, "Lck": 3, "Def": 1, "Res": -1},
		"class": "villager"
	},
	"lon'qu": {
		"name": "Lon'qu",
		"gender": 'M',
		"mods": {"HP": 0, "Str": 0, "Mag": 0, "Skl": 3, "Spd": 3, "Lck": 0, "Def": -2, "Res": -2},
		"class": "swordmaster"
	},
	"panne": {
		"name": "Panne",
		"gender": 'F',
		"mods": {"HP": 0, "Str": 2, "Mag": -1, "Skl": 2, "Spd": 3, "Lck": -1, "Def": 1, "Res": -1},
		"class": "taguel"
	},
	"cordelia": {
		"name": "Cordelia",
		"gender": 'F',
		"mods": {"HP": 0, "Str": 1, "Mag": -1, "Skl": 2, "Spd": 2, "Lck": -1, "Def": 0, "Res": -1},
		"class": "falcon_knight"
	},
	"gregor": {
		"name": "Gregor",
		"gender": 'M',
		"mods": {"HP": 0, "Str": 2, "Mag": -1, "Skl": 2, "Spd": 0, "Lck": -1, "Def": 1, "Res": -2},
		"class": "hero"
	},
	"nowi": {
		"name": "Nowi",
		"gender": 'F',
		"mods": {"HP": 0, "Str": 1, "Mag": 1, "Skl": -1, "Spd": -2, "Lck": 1, "Def": 3, "Res": 2},
		"class": "manakete"
	},
	"libra": {
		"name": "Libra",
		"gender": 'M',
		"mods": {"HP": 0, "Str": 0, "Mag": 1, "Skl": 1, "Spd": 0, "Lck": -1, "Def": 0, "Res": 1},
		"class": "war_monk"
	},
	"olivia": {
		"name": "Olivia",
		"gender": 'F',
		"mods": {"HP": 0, "Str": 0, "Mag": 0, "Skl": 1, "Spd": 1, "Lck": 0, "Def": -1, "Res": -1},
		"class": "dancer"
	},
	"cherche": {
		"name": "Cherche",
		"gender": 'F',
		"mods": {"HP": 0, "Str": 3, "Mag": 0, "Skl": -1, "Spd": -1, "Lck": 0, "Def": 2, "Res": -2},
		"class": "wyvern_lord"
	},
	"lucina": {
		"name": "Lucina",
		"gender": 'F',
		"mods": {},
		"class": "great_lord_f",
		"child": true,
		"mother": undefined,
		"father": "chrom"
	},
	"owain": {
		"name": "Owain",
		"gender": 'M',
		"mods": {},
		"class": "swordmaster",
		"child": true,
		"mother": "lissa",
		"father": undefined
	},
	"inigo": {
		"name": "Inigo",
		"gender": 'M',
		"mods": {},
		"class": "hero",
		"child": true,
		"mother": "olivia",
		"father": undefined
	},
	"kjelle": {
		"name": "Kjelle",
		"gender": 'F',
		"mods": {},
		"class": "general",
		"child": true,
		"mother": "sully",
		"father": undefined
	},
	"cynthia": {
		"name": "Cynthia",
		"gender": 'F',
		"mods": {},
		"class": "falcon_knight",
		"child": true,
		"mother": "sumia",
		"father": undefined
	},
	"severa": {
		"name": "Severa",
		"gender": 'F',
		"mods": {},
		"class": "hero",
		"child": true,
		"mother": "cordelia",
		"father": undefined
	},
	"gerome": {
		"name": "Gerome",
		"gender": 'M',
		"mods": {},
		"class": "wyvern_lord",
		"child": true,
		"mother": "cherche",
		"father": undefined
	},
	"morgan_m": {
		"name": "Morgan (M)",
		"gender": 'M',
		"mods": {},
		"class": "grandmaster",
		"child": true,
		"mother": "avatar_f",
		"father": undefined
	},
	"morgan_f": {
		"name": "Morgan (F)",
		"gender": 'F',
		"mods": {},
		"class": "grandmaster",
		"child": true,
		"mother": undefined,
		"father": "avatar_m"
	},
	"yarne": {
		"name": "Yarne",
		"gender": 'M',
		"mods": {},
		"class": "taguel",
		"child": true,
		"mother": "panne",
		"father": undefined
	},
	"nah": {
		"name": "Nah",
		"gender": 'F',
		"mods": {},
		"class": "manakete",
		"child": true,
		"mother": "nowi",
		"father": undefined
	},
	"grima": {
		"name": "Grima",
		"gender": 'M',
		"mods": {"HP": 0, "Str": 0, "Mag": 0, "Skl": 0, "Spd": 0, "Lck": 0, "Def": 0, "Res": 0},
		"class": "grima"
	},
	"apotheosis_anna": {
		"name": "Anna",
		"gender": 'F',
		"mods": {"HP": 0, "Str": 0, "Mag": 0, "Skl": 0, "Spd": 0, "Lck": 0, "Def": 0, "Res": 0},
		"class": "apotheosis_merchant"
	},
	"generic": {
		"name": "Generic Enemy",
		"gender": 'M',
		"mods": {"HP": 0, "Str": 0, "Mag": 0, "Skl": 0, "Spd": 0, "Lck": 0, "Def": 0, "Res": 0},
		"class": "grandmaster"
	},
};

var classes = {
	"great_lord_m": {
		"name": "Great Lord (M)",
		"maxStats": {"HP": 80, "Str": 43, "Mag": 30, "Skl": 40, "Spd": 41, "Lck": 45, "Def": 42, "Res": 40},
		"weapons": ["sword", "lance"],
		"move": 6,
		"support": {"HP": 0, "Str": 0, "Mag": 0, "Skl": 0, "Spd": 4, "Lck": 4, "Def": 0, "Res": 0},
		"gender": 'M'
	},
	"great_lord_f": {
		"name": "Great Lord (F)",
		"maxStats": {"HP": 80, "Str": 40, "Mag": 30, "Skl": 42, "Spd": 44, "Lck": 45, "Def": 40, "Res": 40},
		"weapons": ["sword", "lance"],
		"move": 6,
		"support": {"HP": 0, "Str": 0, "Mag": 0, "Skl": 0, "Spd": 4, "Lck": 4, "Def": 0, "Res": 0},
		"gender": 'F'
	},
	"grandmaster": {
		"name": "Grandmaster",
		"maxStats": {"HP": 80, "Str": 40, "Mag": 40, "Skl": 40, "Spd": 40, "Lck": 45, "Def": 40, "Res": 40},
		"weapons": ["sword", "tome"],
		"move": 6,
		"support": {"HP": 0, "Str": 2, "Mag": 2, "Skl": 2, "Spd": 2, "Lck": 0, "Def": 0, "Res": 0},
	},
	"paladin": {
		"name": "Paladin",
		"maxStats": {"HP": 80, "Str": 42, "Mag": 30, "Skl": 40, "Spd": 40, "Lck": 45, "Def": 42, "Res": 42},
		"weapons": ["sword", "lance"],
		"move": 8,
		"support": {"HP": 0, "Str": 2, "Mag": 0, "Skl": 2, "Spd": 2, "Lck": 0, "Def": 2, "Res": 0},
		"effective": ["beast"]
	},
	"great_knight": {
		"name": "Great Knight",
		"maxStats": {"HP": 80, "Str": 48, "Mag": 20, "Skl": 34, "Spd": 37, "Lck": 45, "Def": 48, "Res": 30},
		"weapons": ["sword", "lance", "axe"],
		"move": 7,
		"support": {"HP": 0, "Str": 3, "Mag": 0, "Skl": 0, "Spd": 0, "Lck": 0, "Def": 3, "Res": 0},
		"effective": ["beast", "armor"]
	},
	"general": {
		"name": "General",
		"maxStats": {"HP": 80, "Str": 50, "Mag": 30, "Skl": 41, "Spd": 35, "Lck": 45, "Def": 50, "Res": 35},
		"weapons": ["lance", "axe"],
		"move": 5,
		"support": {"HP": 0, "Str": 3, "Mag": 0, "Skl": 0, "Spd": 0, "Lck": 0, "Def": 5, "Res": 0},
		"effective": ["armor"]
	},
	"swordmaster": {
		"name": "Swordmaster",
		"maxStats": {"HP": 80, "Str": 38, "Mag": 34, "Skl": 44, "Spd": 46, "Lck": 45, "Def": 33, "Res": 38},
		"weapons": ["sword"],
		"move": 6,
		"support": {"HP": 0, "Str": 0, "Mag": 0, "Skl": 0, "Spd": 5, "Lck": 3, "Def": 0, "Res": 0},
	},
	"hero": {
		"name": "Hero",
		"maxStats": {"HP": 80, "Str": 42, "Mag": 30, "Skl": 46, "Spd": 42, "Lck": 45, "Def": 40, "Res": 36},
		"weapons": ["sword", "axe"],
		"move": 6,
		"support": {"HP": 0, "Str": 0, "Mag": 0, "Skl": 3, "Spd": 3, "Lck": 0, "Def": 2, "Res": 0},
	},
	"warrior": {
		"name": "Warrior",
		"maxStats": {"HP": 80, "Str": 48, "Mag": 30, "Skl": 42, "Spd": 40, "Lck": 45, "Def": 40, "Res": 35},
		"weapons": ["axe", "bow"],
		"move": 6,
		"support": {"HP": 0, "Str": 5, "Mag": 0, "Skl": 0, "Spd": 0, "Lck": 0, "Def": 3, "Res": 0},
		"gender": 'M'
	},
	"berserker": {
		"name": "Berserker",
		"maxStats": {"HP": 80, "Str": 50, "Mag": 30, "Skl": 35, "Spd": 44, "Lck": 45, "Def": 34, "Res": 30},
		"weapons": ["axe"],
		"move": 6,
		"support": {"HP": 0, "Str": 5, "Mag": 0, "Skl": 0, "Spd": 3, "Lck": 0, "Def": 0, "Res": 0},
		"gender": 'M'
	},
	"sniper": {
		"name": "Sniper",
		"maxStats": {"HP": 80, "Str": 41, "Mag": 30, "Skl": 48, "Spd": 40, "Lck": 45, "Def": 40, "Res": 31},
		"weapons": ["bow"],
		"move": 6,
		"support": {"HP": 0, "Str": 3, "Mag": 0, "Skl": 3, "Spd": 0, "Lck": 0, "Def": 2, "Res": 0},
	},
	"bow_knight": {
		"name": "Bow Knight",
		"maxStats": {"HP": 80, "Str": 40, "Mag": 30, "Skl": 43, "Spd": 41, "Lck": 45, "Def": 35, "Res": 30},
		"weapons": ["sword", "bow"],
		"move": 8,
		"support": {"HP": 0, "Str": 0, "Mag": 0, "Skl": 3, "Spd": 3, "Lck": 0, "Def": 0, "Res": 0},
		"effective": ["beast"]
	},
	"assassin": {
		"name": "Assassin",
		"maxStats": {"HP": 80, "Str": 40, "Mag": 30, "Skl": 48, "Spd": 46, "Lck": 45, "Def": 31, "Res": 30},
		"weapons": ["sword", "bow"],
		"move": 6,
		"support": {"HP": 0, "Str": 2, "Mag": 0, "Skl": 2, "Spd": 4, "Lck": 0, "Def": 0, "Res": 0},
	},
	"trickster": {
		"name": "Trickster",
		"maxStats": {"HP": 80, "Str": 35, "Mag": 38, "Skl": 45, "Spd": 43, "Lck": 45, "Def": 30, "Res": 40},
		"weapons": ["sword", "staff"],
		"move": 6,
		"support": {"HP": 0, "Str": 0, "Mag": 2, "Skl": 1, "Spd": 3, "Lck": 0, "Def": 0, "Res": 0},
	},
	"falcon_knight": {
		"name": "Falcon Knight",
		"maxStats": {"HP": 80, "Str": 38, "Mag": 35, "Skl": 45, "Spd": 44, "Lck": 45, "Def": 33, "Res": 40},
		"weapons": ["lance", "staff"],
		"move": 8,
		"support": {"HP": 0, "Str": 0, "Mag": 0, "Skl": 0, "Spd": 4, "Lck": 0, "Def": 0, "Res": 4},
		"gender": 'F',
		"effective": ["beast", "flying"]
	},
	"dark_flier": {
		"name": "Dark Flier",
		"maxStats": {"HP": 80, "Str": 36, "Mag": 42, "Skl": 41, "Spd": 42, "Lck": 45, "Def": 32, "Res": 41},
		"weapons": ["lance", "tome"],
		"move": 8,
		"support": {"HP": 0, "Str": 0, "Mag": 3, "Skl": 0, "Spd": 3, "Lck": 0, "Def": 0, "Res": 2},
		"gender": 'F',
		"effective": ["beast", "flying"]
	},
	"wyvern_lord": {
		"name": "Wyvern Lord",
		"maxStats": {"HP": 80, "Str": 46, "Mag": 30, "Skl": 38, "Spd": 38, "Lck": 45, "Def": 46, "Res": 30},
		"weapons": ["lance", "axe"],
		"move": 8,
		"support": {"HP": 0, "Str": 4, "Mag": 0, "Skl": 0, "Spd": 0, "Lck": 0, "Def": 4, "Res": 0},
		"effective": ["dragon", "flying"]
	},
	"griffon_rider": {
		"name": "Griffon Rider",
		"maxStats": {"HP": 80, "Str": 40, "Mag": 30, "Skl": 43, "Spd": 41, "Lck": 45, "Def": 40, "Res": 30},
		"weapons": ["axe"],
		"move": 8,
		"support": {"HP": 0, "Str": 3, "Mag": 0, "Skl": 0, "Spd": 0, "Lck": 1, "Def": 2, "Res": 0},
		"effective": ["beast", "flying"]
	},
	"sage": {
		"name": "Sage",
		"maxStats": {"HP": 80, "Str": 30, "Mag": 46, "Skl": 43, "Spd": 42, "Lck": 45, "Def": 31, "Res": 40},
		"weapons": ["tome", "staff"],
		"move": 6,
		"support": {"HP": 0, "Str": 0, "Mag": 4, "Skl": 2, "Spd": 0, "Lck": 0, "Def": 0, "Res": 2},
	},
	"sorcerer": {
		"name": "Sorcerer",
		"maxStats": {"HP": 80, "Str": 30, "Mag": 44, "Skl": 38, "Spd": 40, "Lck": 45, "Def": 41, "Res": 44},
		"weapons": ["tome", "dark"],
		"move": 6,
		"support": {"HP": 0, "Str": 0, "Mag": 3, "Skl": 0, "Spd": 0, "Lck": 0, "Def": 2, "Res": 3},
	},
	"dark_knight": {
		"name": "Dark Knight",
		"maxStats": {"HP": 80, "Str": 38, "Mag": 41, "Skl": 40, "Spd": 40, "Lck": 45, "Def": 42, "Res": 38},
		"weapons": ["sword", "tome"],
		"move": 8,
		"support": {"HP": 0, "Str": 0, "Mag": 2, "Skl": 0, "Spd": 0, "Lck": 0, "Def": 3, "Res": 1},
		"effective": ["beast"]
	},
	"war_monk": {
		"name": "War Monk/Cleric",
		"maxStats": {"HP": 80, "Str": 40, "Mag": 40, "Skl": 38, "Spd": 41, "Lck": 45, "Def": 38, "Res": 43},
		"weapons": ["axe", "staff"],
		"move": 6,
		"support": {"HP": 0, "Str": 2, "Mag": 2, "Skl": 0, "Spd": 0, "Lck": 2, "Def": 0, "Res": 2},
	},
	"valkyrie": {
		"name": "Valkyrie",
		"maxStats": {"HP": 80, "Str": 30, "Mag": 42, "Skl": 38, "Spd": 43, "Lck": 45, "Def": 30, "Res": 45},
		"weapons": ["tome", "staff"],
		"move": 8,
		"support": {"HP": 0, "Str": 0, "Mag": 3, "Skl": 0, "Spd": 2, "Lck": 0, "Def": 0, "Res": 3},
		"gender": 'F',
		"effective": ["beast"]
	},
	"taguel": {
		"name": "Taguel",
		"maxStats": {"HP": 80, "Str": 35, "Mag": 30, "Skl": 40, "Spd": 40, "Lck": 45, "Def": 35, "Res": 30},
		"weapons": ["stone"],
		"move": 6,
		"support": {"HP": 0, "Str": 3, "Mag": 0, "Skl": 2, "Spd": 3, "Lck": 0, "Def": 0, "Res": 0},
		"effective": ["beast"]
	},
	"manakete": {
		"name": "Manakete",
		"maxStats": {"HP": 80, "Str": 40, "Mag": 35, "Skl": 35, "Spd": 35, "Lck": 45, "Def": 40, "Res": 40},
		"weapons": ["stone"],
		"move": 6,
		"support": {"HP": 0, "Str": 2, "Mag": 2, "Skl": 0, "Spd": 0, "Lck": 0, "Def": 2, "Res": 2},
		"effective": ["dragon"]
	},
	"dread_fighter": {
		"name": "Dread Fighter",
		"maxStats": {"HP": 80, "Str": 42, "Mag": 38, "Skl": 40, "Spd": 41, "Lck": 45, "Def": 39, "Res": 43},
		"weapons": ["sword", "axe", "tome"],
		"move": 6,
		"support": {"HP": 0, "Str": 3, "Mag": 1, "Skl": 0, "Spd": 1, "Lck": 0, "Def": 0, "Res": 3},
		"gender": 'M'
	},
	"bride": {
		"name": "Bride",
		"maxStats": {"HP": 80, "Str": 40, "Mag": 39, "Skl": 42, "Spd": 42, "Lck": 45, "Def": 41, "Res": 40},
		"weapons": ["lance", "bow", "staff"],
		"move": 6,
		"support": {"HP": 0, "Str": 0, "Mag": 2, "Skl": 0, "Spd": 2, "Lck": 2, "Def": 0, "Res": 2},
		"gender": 'F'
	},
	"grima": {
		"name": "Grima",
		"maxStats": {"HP": 99, "Str": 50, "Mag": 40, "Skl": 50, "Spd": 45, "Lck": 45, "Def": 50, "Res": 50},
		"weapons": ["stone"],
		"move": 0,
	},
	"apotheosis_merchant": {
		"name": "Merchant",
		"maxStats": {"HP": 99, "Str": 60, "Mag": 50, "Skl": 70, "Spd": 70, "Lck": 65, "Def": 55, "Res": 55},
		"weapons": ["lance"],
		"move": 5,
		"gender": 'F'
	},
};

var weapons = {
	"silver_sword": {
		"name": "Silver Sword",
		"type": "sword",
		"mt": 11, "hit": 85, "crit": 0,
		"range": [1],
		"damage": "physical",
	},
	"brave_sword": {
		"name": "Brave Sword",
		"type": "sword",
		"mt": 9, "hit": 80, "crit": 0,
		"range": [1],
		"damage": "physical",
		"brave": true
	},
	"armorslayer": {
		"name": "Armorslayer",
		"type": "sword",
		"mt": 8, "hit": 80, "crit": 0,
		"range": [1],
		"damage": "physical",
		"effective": ["armor"]
	},
	"wyrmslayer": {
		"name": "Wyrmslayer",
		"type": "sword",
		"mt": 8, "hit": 80, "crit": 0,
		"range": [1],
		"damage": "physical",
		"effective": ["dragon"]
	},
	"killing_edge": {
		"name": "Killing Edge",
		"type": "sword",
		"mt": 9, "hit": 90, "crit": 30,
		"range": [1],
		"damage": "physical",
	},
	"levin_sword": {
		"name": "Levin Sword",
		"type": "sword",
		"mt": 10, "hit": 80, "crit": 0,
		"range": [1,2],
		"damage": "magical"
	},
	"noble_rapier": {
		"name": "Noble Rapier",
		"type": "sword",
		"mt": 8, "hit": 85, "crit": 10,
		"range": [1],
		"damage": "physical",
		"effective": ["beast", "armor"]
	},
	"exalted_falchion": {
		"name": "Exalted Falchion",
		"type": "sword",
		"mt": 15, "hit": 80, "crit": 10,
		"range": [1],
		"damage": "physical",
		"effective": ["dragon", "grima"],
		"unforgeable": true
	},
	"parallel_falchion": {
		"name": "Parallel Falchion",
		"type": "sword",
		"mt": 12, "hit": 80, "crit": 5,
		"range": [1],
		"damage": "physical",
		"effective": ["dragon", "grima"],
		"unforgeable": true
	},
	"sol_katti": {
		"name": "Sol Katti",
		"type": "sword",
		"mt": 8, "hit": 100, "crit": 50,
		"range": [1],
		"damage": "physical",
		"unforgeable": true,
		"stateffect": {"Res": 5}
	},
	"balmung": {
		"name": "Balmung",
		"type": "sword",
		"mt": 13, "hit": 90, "crit": 10,
		"range": [1],
		"damage": "physical",
		"unforgeable": true,
		"stateffect": {"Spd": 5}
	},
	"ragnell": {
		"name": "Ragnell",
		"type": "sword",
		"mt": 15, "hit": 70, "crit": 0,
		"range": [1,2],
		"damage": "physical",
		"unforgeable": true,
		"stateffect": {"Def": 5}
	},
	"superior_edge": {
		"name": "Superior Edge",
		"type": "sword",
		"mt": 11, "hit": 80, "crit": 0,
		"range": [1],
		"damage": "physical",
		"skill": "swordbreaker"
	},
	"alms_blade": {
		"name": "Alm's Blade",
		"type": "sword",
		"mt": 15, "hit": 75, "crit": 10,
		"range": [1],
		"damage": "physical",
	},
	"silver_lance": {
		"name": "Silver Lance",
		"type": "lance",
		"mt": 13, "hit": 75, "crit": 0,
		"range": [1],
		"damage": "physical",
	},
	"brave_lance": {
		"name": "Brave Lance",
		"type": "lance",
		"mt": 10, "hit": 70, "crit": 0,
		"range": [1],
		"damage": "physical",
		"brave": true
	},
	"spear": {
		"name": "Spear",
		"type": "lance",
		"mt": 8, "hit": 70, "crit": 0,
		"range": [1,2],
		"damage": "physical",
	},
	"beast_killer": {
		"name": "Beast Killer",
		"type": "lance",
		"mt": 9, "hit": 70, "crit": 0,
		"range": [1],
		"damage": "physical",
		"effective": ["beast"]
	},
	"killer_lance": {
		"name": "Killer Lance",
		"type": "lance",
		"mt": 10, "hit": 80, "crit": 30,
		"range": [1],
		"damage": "physical",
	},
	"gradivus": {
		"name": "Gradivus",
		"type": "lance",
		"mt": 19, "hit": 85, "crit": 5,
		"range": [1,2],
		"damage": "physical",
		"unforgeable": true
	},
	"gae_bolg": {
		"name": "Gae Bolg",
		"type": "lance",
		"mt": 15, "hit": 75, "crit": 10,
		"range": [1],
		"damage": "physical",
		"unforgeable": true,
		"stateffect": {"Def": 5}
	},
	"gungnir": {
		"name": "Gungnir",
		"type": "lance",
		"mt": 16, "hit": 70, "crit": 10,
		"range": [1],
		"damage": "physical",
		"unforgeable": true,
		"stateffect": {"Str": 5}
	},
	"shockstick": {
		"name": "Shockstick",
		"type": "lance",
		"mt": 11, "hit": 85, "crit": 10,
		"range": [1],
		"damage": "magical"
	},
	"superior_lance": {
		"name": "Superior Lance",
		"type": "lance",
		"mt": 13, "hit": 70, "crit": 0,
		"range": [1],
		"damage": "physical",
		"skill": "lancebreaker"
	},
	"finns_lance": {
		"name": "Finn's Lance",
		"type": "lance",
		"mt": 8, "hit": 85, "crit": 10,
		"range": [1],
		"damage": "physical",
		"stateffect": {"Def": 2, "Lck": 2}
	},
	"silver_axe": {
		"name": "Silver Axe",
		"type": "axe",
		"mt": 15, "hit": 65, "crit": 0,
		"range": [1],
		"damage": "physical"
	},
	"brave_axe": {
		"name": "Brave Axe",
		"type": "axe",
		"mt": 12, "hit": 60, "crit": 0,
		"range": [1],
		"damage": "physical",
		"brave": true
	},
	"hammer": {
		"name": "Hammer",
		"type": "axe",
		"mt": 10, "hit": 60, "crit": 0,
		"range": [1],
		"damage": "physical",
		"effective": ["armor"]
	},
	"bolt_axe": {
		"name": "Bolt Axe",
		"type": "axe",
		"mt": 14, "hit": 70, "crit": 5,
		"range": [1,2],
		"damage": "magical"
	},
	"killer_axe": {
		"name": "Killer Axe",
		"type": "axe",
		"mt": 12, "hit": 70, "crit": 30,
		"range": [1],
		"damage": "physical",
	},
	"helswath": {
		"name": "Helswath",
		"type": "axe",
		"mt": 18, "hit": 60, "crit": 10,
		"range": [1,2],
		"damage": "physical",
		"unforgeable": true,
		"stateffect": {"Def": 5}
	},
	"volant_axe": {
		"name": "Volant Axe",
		"type": "axe",
		"mt": 8, "hit": 55, "crit": 0,
		"range": [1,2],
		"damage": "physical",
		"effective": ["flying"]
	},
	"superior_axe": {
		"name": "Superior Axe",
		"type": "axe",
		"mt": 15, "hit": 60, "crit": 0,
		"range": [1],
		"damage": "physical",
		"skill": "axebreaker"
	},
	"hectors_axe": {
		"name": "Hector's Axe",
		"type": "axe",
		"mt": 15, "hit": 75, "crit": 15,
		"range": [1],
		"damage": "physical",
		"unforgeable": true,
		"stateffect": {"Str": 2, "Def": 2}
	},
	"silver_bow": {
		"name": "Silver Bow",
		"type": "bow",
		"mt": 13, "hit": 75, "crit": 0,
		"range": [2],
		"damage": "physical",
		"effective": ["flying"],
	},
	"brave_bow": {
		"name": "Brave Bow",
		"type": "bow",
		"mt": 10, "hit": 70, "crit": 0,
		"range": [2],
		"damage": "physical",
		"effective": ["flying"],
		"brave": true
	},
	"killer_bow": {
		"name": "Killer Bow",
		"type": "bow",
		"mt": 10, "hit": 80, "crit": 30,
		"range": [2],
		"damage": "physical",
		"effective": ["flying"]
	},
	"longbow": {
		"name": "Longbow",
		"type": "bow",
		"mt": 9, "hit": 70, "crit": 0,
		"range": [2,3],
		"damage": "physical",
		"effective": ["flying"]
	},
	"parthia": {
		"name": "Parthia",
		"type": "bow",
		"mt": 19, "hit": 95, "crit": 5,
		"range": [2],
		"damage": "physical",
		"effective": ["flying"],
		"unforgeable": true,
	},
	"yewfelle": {
		"name": "Yewfelle",
		"type": "bow",
		"mt": 15, "hit": 85, "crit": 10,
		"range": [2],
		"damage": "physical",
		"effective": ["flying"],
		"unforgeable": true,
		"stateffect": {"Spd": 5}
	},	
	"nidhogg": {
		"name": "Nidhogg",
		"type": "bow",
		"mt": 16, "hit": 75, "crit": 10,
		"range": [2],
		"damage": "physical",
		"effective": ["flying"],
		"unforgeable": true,
		"stateffect": {"Lck": 10}
	},	
	"double_bow": {
		"name": "Double Bow",
		"type": "bow",
		"mt": 13, "hit": 70, "crit": 10,
		"range": [2,3],
		"damage": "physical",
		"effective": ["flying"],
		"unforgeable": true,
		"stateffect": {"Str": 5}
	},	
	"superior_bow": {
		"name": "Superior Bow",
		"type": "bow",
		"mt": 13, "hit": 70, "crit": 0,
		"range": [2],
		"damage": "physical",
		"effective": ["flying"],
		"skill": "bowbreaker"
	},	
	"bolganone": {
		"name": "Bolganone",
		"type": "tome",
		"mt": 12, "hit": 75, "crit": 0,
		"range": [1,2],
		"damage": "magical"
	},	
	"valflame": {
		"name": "Valflame",
		"type": "tome",
		"mt": 16, "hit": 80, "crit": 10,
		"range": [1,2],
		"damage": "magical",
		"unforgeable": true,
		"stateffect": {"Mag": 5}
	},
	"thoron": {
		"name": "Thoron",
		"type": "tome",
		"mt": 14, "hit": 65, "crit": 10,
		"range": [1,2],
		"damage": "magical"
	},
	"mjolnir": {
		"name": "Mjolnir",
		"type": "tome",
		"mt": 18, "hit": 70, "crit": 20,
		"range": [1,2],
		"damage": "magical",
		"unforgeable": true,
		"stateffect": {"Skl": 5}
	},
	"rexcalibur": {
		"name": "Rexcalibur",
		"type": "tome",
		"mt": 10, "hit": 85, "crit": 0,
		"range": [1,2],
		"damage": "magical",
		"effective": ["flying"]
	},
	"excalibur": {
		"name": "Excalibur",
		"type": "tome",
		"mt": 13, "hit": 100, "crit": 30,
		"range": [1,2],
		"damage": "magical",
		"effective": ["flying"],
		"unforgeable": true,
	},
	"forseti": {
		"name": "Forseti",
		"type": "tome",
		"mt": 14, "hit": 90, "crit": 10,
		"range": [1,2],
		"damage": "magical",
		"effective": ["flying"],
		"unforgeable": true,
		"stateffect": {"Spd": 5}
	},
	"ruin": {
		"name": "Ruin",
		"type": "tome",
		"mt": 4, "hit": 60, "crit": 50,
		"range": [1,2],
		"damage": "magical"
	},
	"waste": {
		"name": "Waste",
		"type": "tome",
		"mt": 10, "hit": 45, "crit": 0,
		"range": [1,2],
		"damage": "magical",
		"brave": true
	},
	"goetia": {
		"name": "Goetia",
		"type": "tome",
		"mt": 19, "hit": 75, "crit": 10,
		"range": [1,2],
		"damage": "magical",
	},
	"book_of_naga": {
		"name": "Book of Naga",
		"type": "tome",
		"mt": 15, "hit": 80, "crit": 15,
		"range": [1,2],
		"damage": "magical",
		"effective": ["dragon"],
		"unforgeable": true,
		"stateffect": {"Def": 5, "Res": 5}
	},
	"superior_jolt": {
		"name": "Superior Jolt",
		"type": "tome",
		"mt": 14, "hit": 60, "crit": 15,
		"range": [1,2],
		"damage": "magical",
		"skill": "tomebreaker"
	},
	"katarinas_bolt": {
		"name": "Katarina's Bolt",
		"type": "tome",
		"mt": 11, "hit": 75, "crit": 30,
		"range": [1,2],
		"damage": "magical",
	},
	"wilderwind": {
		"name": "Wilderwind",
		"type": "tome",
		"mt": 2, "hit": 70, "crit": 35,
		"range": [1,2],
		"damage": "magical",
		"effective": ["flying"]
	},
	"celicas_gale": {
		"name": "Celica's Gale",
		"type": "tome",
		"mt": 4, "hit": 80, "crit": 5,
		"range": [1,2],
		"damage": "magical",
		"effective": ["flying"],
		"brave": true
	},
	"aversas_night": {
		"name": "Aversa's Night",
		"type": "tome",
		"mt": 15, "hit": 75, "crit": 0,
		"range": [1,2],
		"damage": "magical",
		"heal": true
	},
	"beaststone+": {
		"name": "Beaststone+",
		"type": "stone",
		"mt": 10, "hit": 70, "crit": 0,
		"range": [1],
		"damage": "physical",
		"unforgeable": true,
		"stateffect": {"Str": 5, "Skl": 8, "Spd": 8, "Lck": 6, "Def": 4, "Res": 2}
	},
	"dragonstone+": {
		"name": "Dragonstone+",
		"type": "stone",
		"mt": 12, "hit": 70, "crit": 0,
		"range": [1,2],
		"damage": "physical",
		"unforgeable": true,
		"stateffect": {"Str": 11, "Mag": 6, "Skl": 5, "Spd": 4, "Def": 13, "Res": 9}
	},
	"expiration": {
		"name": "Expiration",
		"type": "stone",
		"mt": 20, "hit": 80, "crit": 0,
		"range": [1,2,3,4,5],
		"damage": "physical",
		"unforgeable": true,
	},
};

var skills = {
	"hp+5": {"name": "HP +5", "affects": ["HP"], "stateffect": function() {return {"HP": 5}}},
	"str+2": {"name": "Strength +2", "affects": ["Str"], "stateffect": function() {return {"Str": 2}}},
	"mag+2": {"name": "Magic +2", "affects": ["Mag"], "stateffect": function() {return {"Mag": 2}}},
	"skill+2": {"name": "Skill +2", "affects": ["Skl"], "stateffect": function() {return {"Skl": 2}}},
	"speed+2": {"name": "Speed +2", "affects": ["Spd"], "stateffect": function() {return {"Spd": 2}}},
	"luck+4": {"name": "Luck +4", "affects": ["Lck"], "stateffect": function() {return {"Lck": 4}}},
	"def+2": {"name": "Defense +2", "affects": ["Def"], "stateffect": function() {return {"Def": 2}}},
	"res+2": {"name": "Resistance +2", "affects": ["Res"], "stateffect": function() {return {"Res": 2}}},
	"res+10": {"name": "Resistance +10", "affects": ["Res"], "stateffect": function() {return {"Res": 10}}},
	"avoid+10": {"name": "Avoid +10", "affects": ["Avo"], "stateffect": function() {return {"Avo": 10}}},
	"hit+10": {"name": "Hit +10", "affects": ["Hit"], "stateffect": function() {return {"Hit": 10}}},
	"hit+20": {"name": "Hit +20", "affects": ["Hit"], "stateffect": function() {return {"Hit": 20}}},

	"tantivy": {"name": "Tantivy", "affects": ["Hit","Avo"], "stateffect": function() {return {"Hit": 10, "Avo": 10}}},
	"focus": {"name": "Focus", "affects": ["Crit"], "stateffect": function() {return {"Crit": 10}}},
	"zeal": {"name": "Zeal", "affects": ["Crit"], "stateffect": function() {return {"Crit": 5}}},
	"gamble": {"name": "Gamble", "affects": ["Hit","Crit"], "stateffect": function() {return {"Hit": -5, "Crit": 10}}},
	"anathema": {"name": "Anathema", "affects": ["Avo","Ddg"], "enemydebuff": function() {return {"Avo": -10, "Ddg": -10}}},
	"all_stats+2": {"name": "All Stats +2", "affects": ["Str","Mag","Skl","Spd","Lck","Def","Res"], 
		"stateffect": function() {return {"Str": 2, "Mag": 2, "Skl": 2, "Spd": 2, "Lck": 2, "Def": 2, "Res": 2}}},
	"limit_breaker": {"name": "Limit Breaker"},

	"solidarity": {"name": "Solidarity", "affects": ["Crit","Ddg"], "supporteffect": function() {return {"Crit": 10, "Ddg": 10}}},
	"dual_support+": {"name": "Dual Support+"},

	"aggressor": {"name": "Aggressor", "affects": ["Damage"], "userinitiate": function() {return {"Damage": 10}}},
	"prescience": {"name": "Prescience", "affects": ["Hit", "Avo"], "userinitiate": function() {return {"Hit": 15, "Avo": 15}}},
	"patience": {"name": "Patience", "affects": ["Hit", "Avo"], "enemyinitiate": function() {return {"Hit": 10, "Avo": 10}}},

	// turn-based
	"lucky_seven": {"name": "Lucky Seven", "affects": ["Hit","Avo"], 
		"condition": function() {turnCount <= 7},
		"stateffect": function() {
			if (this.condition) return {"Hit": 20, "Avo": 20};
			else return null;
		}
	},
	"even_rhythm": {"name": "Even Rhythm", "affects": ["Hit","Avo"], 
		"condition": function() {turnCount%2 == 0},
		"stateffect": function() {
			if (this.condition) return {"Hit": 10, "Avo": 10};
			else return null;
		}
	},
	"odd_rhythm": {"name": "Odd Rhythm", "affects": ["Hit","Avo"], 
		"condition": function() {turnCount%2 == 1},
		"stateffect": function() {
			if (this.condition) return {"Hit": 10, "Avo": 10};
			else return null;
		}
	},
	"quick_burn": {"name": "Quick Burn", "affects": ["Hit","Avo"], 
		"stateffect": function() {
			return {"Hit": (16-turnCount), "Avo": (16-turnCount)};
		}
	},
	"slow_burn": {"name": "Slow Burn", "affects": ["Hit","Avo"], 
		"stateffect": function() {
			return {"Hit": turnCount, "Avo": turnCount};
		}
	},

	// triggers in specific situations
	"renewal": {
		"name": "Renewal", "affects": ["Heal"], 
		"startofturn": function(unit) {
			if (unit.getCurrentHP() < unit.getCurrentStat("HP")) {
				var healAmt = Math.floor(unit.getCurrentStat("HP")*0.3);
				var diff = unit.getCurrentStat("HP") - unit.getCurrentHP();
				if (healAmt > diff) healAmt = diff;
				unit.setCurrentHP(unit.getCurrentHP() + healAmt);
				console.log(unit.getNickname() + " recovered " + healAmt + " HP!"); 
			}
		}
	},
	"wrath": {
		"name": "Wrath", "affects": ["Crit"], 
		"condition": function(unit) {
			return (unit.getCurrentHP() <= (unit.getCurrentStat("HP")/2));
		},
		"stateffect": function(unit) {
			if (this.condition(unit)) return {"Crit": 20};
			else return null;
		}
	},

	"swordfaire": {
		"name": "Swordfaire",
		"affects": ["Str","Mag"], 
		"condition": function(unit) {
			return unit.getWeapon()["type"] == "sword";
		},
		"stateffect": function(unit) {
			if (this.condition(unit)) {
				if (unit.getWeapon()["name"] == "Levin Sword")
					return {"Mag": 5};
				else return {"Str": 5};
			}
			return null;
		}
	},
	"lancefaire": {
		"name": "Lancefaire",
		"affects": ["Str","Mag"], 
		"condition": function(unit) {
			return unit.getWeapon()["type"] == "lance";
		},
		"stateffect": function(unit) {
			if (this.condition(unit)) {
				if (unit.getWeapon()["name"] == "Shockstick")
					return {"Mag": 5};
				else return {"Str": 5};
			}
			return null;
		}
	},
	"axefaire": {
		"name": "Axefaire",
		"affects": ["Str","Mag"], 
		"condition": function(unit) {
			return unit.getWeapon()["type"] == "axe";
		},
		"stateffect": function(unit) {
			if (this.condition(unit)) {
				if (unit.getWeapon()["name"] == "Bolt Axe")
					return {"Mag": 5};
				else return {"Str": 5};
			}
			return null;
		}
	},
	"bowfaire": {
		"name": "Bowfaire",
		"affects": ["Str"], 
		"condition": function(unit) {
			return unit.getWeapon()["type"] == "bow";
		},
		"stateffect": function(unit) {
			if (this.condition(unit))
				return {"Str": 5};
			return null;
		}
	},
	"tomefaire": {
		"name": "Tomefaire",
		"affects": ["Mag"], 
		"condition": function(unit) {
			return unit.getWeapon()["type"] == "tome";
		},
		"stateffect": function(unit) {
			if (this.condition(unit))
				return {"Mag": 5};
			return null;
		}
	},
	"swordbreaker": {
		"name": "Swordbreaker",
		"affects": ["Hit","Avo"], 
		"condition": function(target) {
			return target.getWeapon()["type"] == "sword";
		},
		"stateffect": function(unit, target) {
			if (target && this.condition(target))
				return {"Hit": 50, "Avo": 50};
			return null;
		}
	},
	"lancebreaker": {
		"name": "Lancebreaker",
		"affects": ["Hit","Avo"], 
		"condition": function(target) {
			return target.getWeapon()["type"] == "lance";
		},
		"stateffect": function(unit, target) {
			if (target && this.condition(target))
				return {"Hit": 50, "Avo": 50};
			return null;
		}
	},
	"axebreaker": {
		"name": "Axebreaker",
		"affects": ["Hit","Avo"], 
		"condition": function(target) {
			return target.getWeapon()["type"] == "axe";
		},
		"stateffect": function(unit, target) {
			if (target && this.condition(target))
				return {"Hit": 50, "Avo": 50};
			return null;
		}
	},
	"bowbreaker": {
		"name": "Bowbreaker",
		"affects": ["Hit","Avo"], 
		"condition": function(target) {
			return target.getWeapon()["type"] == "bow";
		},
		"stateffect": function(unit, target) {
			if (target && this.condition(target))
				return {"Hit": 50, "Avo": 50};
			return null;
		}
	},
	"tomebreaker": {
		"name": "Tomebreaker",
		"affects": ["Hit","Avo"], 
		"condition": function(target) {
			return target.getWeapon()["type"] == "tome";
		},
		"stateffect": function(unit, target) {
			if (target && this.condition(target))
				return {"Hit": 50, "Avo": 50};
			return null;
		}
	},

	// offensive proc skills
	"luna": {"name": "Luna"},
	"astra": {"name": "Astra"},
	"sol": {"name": "Sol"},
	"lethality": {"name": "Lethality"},
	"vengeance": {"name": "Vengeance"},
	"ignis": {"name": "Ignis"},
	"aether": {"name": "Aether"},

	// defensive proc skills
	"pavise": {"name": "Pavise"},
	"aegis": {"name": "Aegis"},
	"miracle": {"name": "Miracle"},


	"counter": {"name": "Counter"},
	"vantage": {"name": "Vantage"},

	"rightful_king": {"name": "Rightful King"},

	"iotes_shield": {"name": "Iote's Shield"},

	"dragonskin": {
		"name": "Dragonskin",
		"damagemultiplier": function(unit) {
			return 0.5;
		},
	},
	"vantage+": {"name": "Vantage+"},
	"luna+": {"name": "Luna+"},
	"pavise+": {"name": "Pavise+"},
	"aegis+": {"name": "Aegis+"},
	"hawkeye": {"name": "Hawkeye"},
	"rightful_god": {"name": "Rightful God"},
};

// unit setup
function Unit(name, feclass) {
	this.name = characters[name]["name"];
	this.id = name;
	this.nickname = characters[name]["name"];
	this["class"] = feclass;
	this.stats = {};
	this.skills = [];

	for (var stat in this.getClass().maxStats) {
		this.stats[stat] = this.getClass().maxStats[stat] + this.getCharacter().mods[stat];
	}

	this.terrainBonus = {};
	this.partner = {};
	this.adjacentUnits = [];

	this.miscBoosts = {"HP": 0, "Str": 0, "Mag": 0, "Skl": 0, "Spd": 0, "Lck": 0, "Def": 0, "Res": 0};

	this.currentHP = this.getCurrentStat("HP");
}

Unit.prototype.getName = function() {return this.name};
Unit.prototype.getCharacter = function() {return characters[this.id]};
Unit.prototype.getClass = function() {return classes[this["class"]]};
Unit.prototype.getWeapon = function() {return this.weapon};
Unit.prototype.getSkills = function() {
	var allSkills = [];
	var extraSkill;
	var extraSkillExists = false;
	// account for weapons that may grant an extra skill, provided unit does not already have it
	if (this.getWeapon() && this.getWeapon().hasOwnProperty("skill")) {
		extraSkill = skills[this.getWeapon()["skill"]].name;
	}
	for (var i=0; i<this.skills.length; i++) {
		allSkills.push(this.skills[i]);
		if (this.skills[i].name == extraSkill) extraSkillExists = true;
	}
	if (extraSkill && !extraSkillExists) allSkills.push(skills[this.getWeapon()["skill"]]);
	return allSkills;
};
Unit.prototype.getTerrainBonus = function() {return this.terrainBonus};
Unit.prototype.getStat = function(stat) {
	var value = this.stats[stat];
	for (var i=0; i<this.skills.length; i++) {
		if (this.skills[i].name == "Limit Breaker" && stat!="HP")
			value += 10;
	}
	return value;
};
Unit.prototype.getCurrentStat = function(stat) {
	var current = this.getStat(stat);

	// account for stat modifiers on equipped weapons
	if (this.getWeapon()) {
		var weaponEffects = this.getWeapon().stateffect || undefined;
		if (weaponEffects && weaponEffects.hasOwnProperty(stat))
			current += weaponEffects[stat];	
	}

	// account for stat modifiers on equipped skills
	var skls = this.getSkills();
	for (var skl in skls) {
		if (skls[skl].hasOwnProperty("stateffect") && skls[skl].affects && isIn(stat, skls[skl].affects)) {
			var skillEffects = skls[skl]["stateffect"](this);
			if (skillEffects && skillEffects.hasOwnProperty(stat))
				current += skillEffects[stat];
		}
	}

	// account for pairup bonuses
	if (this.partner["unit"]!=undefined) {
		var partnerClass = this.partner["unit"].getClass();
		var partnerStat = this.partner["unit"].getStat(stat);
		var bonus = partnerClass.support[stat];
		if (bonus > 0) {
			if (this.partner["supportLevel"]=='C' || this.partner["supportLevel"]=='B') bonus += 1;
			else if (this.partner["supportLevel"]=='A' || this.partner["supportLevel"]=='S') bonus += 2;
		}
		if (partnerStat>=10 && partnerStat<20) bonus += 1;
		else if (partnerStat>=20 && partnerStat<30) bonus += 2;
		else if (partnerStat>=30) bonus += 3;
		if (stat=="HP") bonus = 0;
		current += bonus;
	}

	// account for other miscellaneous boosts (e.g. tonics, rallies)
	if (this.miscBoosts[stat]!=undefined) {
		current += this.miscBoosts[stat];
	}

	return current;
};
Unit.prototype.getCurrentStats = function() {
	var current = {};
	for (var stat in this.stats) {
		current[stat] = this.getCurrentStat(stat);
	}
	return current;
};
Unit.prototype.getCurrentHP = function() {return this.currentHP};
Unit.prototype.setCurrentHP = function(value) {this.currentHP = value};
Unit.prototype.getAttack = function() {
	// Str/Mag + Mt + weapon rank bonus
	var weapon = this.getWeapon();
	var attack = weapon.damage == "magical" ? this.getCurrentStat("Mag") : this.getCurrentStat("Str");
	attack += weapon.mt + wrbonus[weapon["type"]]["Atk"];
	return attack;
};
Unit.prototype.getHit = function() {
	// Weapon hit rate + [(Skill*3)+Luck]/2 + weapon rank bonus
	var weapon = this.getWeapon();
	var hit = weapon.hit + (this.getCurrentStat("Skl")*3 + this.getCurrentStat("Lck"))/2 + wrbonus[weapon["type"]]["Hit"];
	return Math.floor(hit);
};
Unit.prototype.getCrit = function() {
	// Weapon crit rate + (Skill/2)
	var weapon = this.getWeapon();
	var crit = weapon.crit + this.getCurrentStat("Skl")/2;
	return Math.floor(crit);
};
Unit.prototype.getAvo = function() {
	// [(Speed*3+Luck)]/2
	var avo = (this.getCurrentStat("Spd")*3 + this.getCurrentStat("Lck"))/2;
	return Math.floor(avo);
};
Unit.prototype.getNickname = function() {return this.nickname};
Unit.prototype.setNickname = function(nick) {this.nickname = nick};
Unit.prototype.setWeapon = function(base, forgeParams) {
	// forge parameters take order [mt, hit, crit]
	var toEquip = {};
	for (var prop in weapons[base])
		toEquip[prop] = weapons[base][prop];
	if (!toEquip.hasOwnProperty("unforgeable") && forgeParams) {
		toEquip.mt += forgeParams[0];
		toEquip.hit += forgeParams[1];
		toEquip.crit += forgeParams[2];
	}
	this.weapon = toEquip;
};
Unit.prototype.hasSkill = function(skill) {
	var result = false;
	var skls = this.getSkills();
	for (var i=0; i<skls.length; i++) {
		if (skills[skill] && skls[i].name == skills[skill].name)
			result = true;
	}
	return result;
};
Unit.prototype.setSkills = function() {
	for (var i=0; i<arguments.length; i++)
		this.skills.push(skills[arguments[i]]);
};
Unit.prototype.setTerrainBonus = function(terrainParams) {
	this.terrainBonus["Def"] = terrainParams[0];
	this.terrainBonus["Avo"] = terrainParams[1];
	this.terrainBonus["Heal"] = terrainParams[2];
};
Unit.prototype.getPartner = function() {return this.partner};
// for Avatar only
Unit.prototype.setAssetFlaw = function(asset, flaw) {
	if (this.getName()!="Avatar (M)" && this.getName()!="Avatar (F)")
		return;
	var mods = calculateAvatarMods(asset, flaw);
	for (var stat in this.getClass().maxStats) {
		this.stats[stat] = this.getClass().maxStats[stat] + mods[stat];
	}
	this.setCurrentHP(this.getClass().maxStats["HP"]);
}
// for children only
Unit.prototype.setParent = function(parent, avatarAsset, avatarFlaw) {
	if (!this.getCharacter().hasOwnProperty("child"))
		return;
	if (this.getName()=="Lucina" || this.getName()=="Morgan (F)") {
		this.father = this.getCharacter()["father"];
		this.mother = parent;
	}
	else {
		this.mother = this.getCharacter()["mother"];
		this.father = parent;
	}
	var mods = {};
	if (this.mother == "avatar_f")
		mods = calculateAvatarChildMods(this.father, avatarAsset, avatarFlaw);
	else if (this.father == "avatar_m")
		mods = calculateAvatarChildMods(this.mother, avatarAsset, avatarFlaw);
	else
		mods = calculateChildMods(this.father, this.mother);
	for (var stat in this.getClass().maxStats) {
		this.stats[stat] = this.getClass().maxStats[stat] + mods[stat];
	}
	this.setCurrentHP(this.getClass().maxStats["HP"]);	
}
// pair up with another Unit object to receive bonuses
Unit.prototype.pairUpWith = function(partner, level) {
	this.partner = {"unit": partner, "supportLevel": level};
}

Unit.prototype.addTonics = function() {
	if (arguments[0]=="tikis_tear") {
		this.miscBoosts["HP"] += 5;
		this.miscBoosts["Str"] += 2;
		this.miscBoosts["Mag"] += 2;
		this.miscBoosts["Skl"] += 2;
		this.miscBoosts["Spd"] += 2;
		this.miscBoosts["Lck"] += 2;
		this.miscBoosts["Def"] += 2;
		this.miscBoosts["Res"] += 2;
	}
	else {
		for (var i=0; i<arguments.length; i++) {
			if (arguments[i]=="HP")
				this.miscBoosts["HP"] += 5;
			else this.miscBoosts[arguments[i]] += 2;
		}
	}
}

Unit.prototype.addRallies = function() {
	for (var i=0; i<arguments.length; i++) {
		if (arguments[i]=="Spectrum") {
			this.miscBoosts["Str"] += 4;
			this.miscBoosts["Mag"] += 4;
			this.miscBoosts["Skl"] += 4;
			this.miscBoosts["Spd"] += 4;
			this.miscBoosts["Lck"] += 4;
			this.miscBoosts["Def"] += 4;
			this.miscBoosts["Res"] += 4;
		}
		else if (arguments[i]=="Heart") {
			this.miscBoosts["Str"] += 2;
			this.miscBoosts["Mag"] += 2;
			this.miscBoosts["Skl"] += 2;
			this.miscBoosts["Spd"] += 2;
			this.miscBoosts["Lck"] += 2;
			this.miscBoosts["Def"] += 2;
			this.miscBoosts["Res"] += 2;
		}
		else if (arguments[i]=="Lck")
			this.miscBoosts["Lck"] += 8;
		else this.miscBoosts[arguments[i]] += 4;
	}
}

// battle calculations

var wrbonus = {
	"sword": {"Atk": 3, "Hit": 0},
	"lance": {"Atk": 2, "Hit": 5},
	"bow": {"Atk": 2, "Hit": 5},
	"tome": {"Atk": 2, "Hit": 5},
	"axe": {"Atk": 1, "Hit": 10},
	"stone": {"Atk": 0, "Hit": 0}
};
var weapontriangle = {
	"sword": {"WTA": "axe", "WTD": "lance"},
	"lance": {"WTA": "sword", "WTD": "axe"},
	"axe": {"WTA": "lance", "WTD": "sword"}
};

var hackforge_p = [4,10,0];
var hackforge_pp = [8,20,0];
var pillar = [1,10,0];
var woods = [1,10,0];
var throne = [3,20,20];

function wtBonus(attackWeapon, targetWeapon) {
	var amounts = {"Atk": 0, "Hit": 0};
	var attack = attackWeapon["type"];
	var target = targetWeapon["type"];
	if (weapontriangle.hasOwnProperty(attack)) {
		if (weapontriangle[attack]["WTA"] === target) {
			amounts["Atk"] = 1;
			amounts["Hit"] = 15;
		}
		else if (weapontriangle[attack]["WTD"] === target) {
			amounts["Atk"] = -1 - wrbonus[attack]["Atk"];
			amounts["Hit"] = -15 - wrbonus[attack]["Hit"];
		}
	}
	return amounts;
}

function singleRNG() {
	return Math.floor(Math.random()*100);
}
function doubleRNG() {
	var firstRN = Math.floor(Math.random()*100);
	var secondRN = Math.floor(Math.random()*100);
	return (firstRN + secondRN)/2;
}

function calcDamage(attacker, target, initiator) {
	// Attack + weapon triangle bonus - enemy's Def/Res - enemy's terrain bonus
	var damage = attacker.getAttack();
	var targetSkls = target.getSkills();

	// Effective damage triples weapon Mt
	if (target.getClass()["effective"] && attacker.getWeapon()["effective"]) {
		var tripleMt = 0;
		for (var i=0; i<attacker.getWeapon()["effective"].length; i++) {
			if (isIn(attacker.getWeapon()["effective"][i], target.getClass()["effective"])) {
				tripleMt = attacker.getWeapon()["mt"]*2;
				// check for Iote's shield blocking flying effective damage
				if (attacker.getWeapon()["effective"][i] == "flying") {
					for (var i=0; i<targetSkls.length; i++) {
						if (targetSkls[i].name == "Iote's Shield")
							tripleMt = 0;
					}
				}
			}
		}
		damage += tripleMt;
	}
	damage += wtBonus(attacker.getWeapon(), target.getWeapon())["Atk"];

	// account for damage modifiers on attacker's equipped skills
	var attackerSkls = attacker.getSkills();
	for (var i=0; i<attackerSkls.length; i++) {
		var skl = attackerSkls[i];
		if (skl.affects && isIn("Damage", skl.affects)) {

			// user-initiate skills
			if (attacker==initiator && skl.hasOwnProperty("userinitiate")) {
				var attackerSklEffects = skl["userinitiate"]();
				if (attackerSklEffects && attackerSklEffects.hasOwnProperty("Damage")) {
					damage += attackerSklEffects["Damage"];
				}
			}
		}
	}

	if (attacker.getWeapon()["damage"] == "physical")
		damage -= target.getCurrentStat("Def");
	else if (attacker.getWeapon()["damage"] == "magical")
		damage  -= target.getCurrentStat("Res");
	damage -= target.getTerrainBonus()["Def"] || 0;

	// final damage multipliers (e.g. dragonskin)

	for (var i=0; i<targetSkls.length; i++) {
		var skl = targetSkls[i];
		if (skl.hasOwnProperty("damagemultiplier")) {
			var mult = skl["damagemultiplier"](target);
			damage = Math.floor(damage*mult);
		}
	}

	if (damage < 0) damage = 0;
	return damage;
}
function calcHit(attacker, target) {
	// Hit rate + weapon triangle bonus (+ support bonus) - enemy's avoid - enemy's terrain bonus (- enemy's support bonus)
	var hit = attacker.getHit();
	hit += wtBonus(attacker.getWeapon(), target.getWeapon())["Hit"];
	hit -= target.getAvo();
	hit -= target.getTerrainBonus()["Avo"] || 0;

	var unstackable = [];
	var attackerSupportRank = 0;
	var targetSupportRank = 0;

	// account for hit modifiers on attacker's equipped skills
	var attackerSkls = attacker.getSkills();
	for (var i=0; i<attackerSkls.length; i++) {
		var skl = attackerSkls[i];
		if (attackerSkls[i].hasOwnProperty("stateffect") && attackerSkls[i].affects && isIn("Hit", attackerSkls[i].affects)) {
			var attackerSklEffects = attackerSkls[i]["stateffect"](attacker, target);
			if (attackerSklEffects && attackerSklEffects.hasOwnProperty("Hit"))
				hit += attackerSklEffects["Hit"];
		}
		if (attackerSkls[i].hasOwnProperty("enemydebuff") && attackerSkls[i].affects && isIn("Avo", attackerSkls[i].affects)
			&& !isIn(skl.name, unstackable)) {
			unstackable.push(skl.name);
			var attackerSklDebuffs = attackerSkls[i]["enemydebuff"]();
			if (attackerSklDebuffs && attackerSklDebuffs.hasOwnProperty("Avo"))
				hit -= attackerSklDebuffs["Avo"];
		}
	}

	// account for skills on attacker's support units
	if (attacker.getPartner()["unit"]!=undefined) {
		var attackerPartner = attacker.getPartner();
		var attackerPartnerSkls = attackerPartner["unit"].getSkills();
		for (var i=0; i<attackerPartnerSkls.length; i++) {
			var skl = attackerPartnerSkls[i];
			if (attackerPartnerSkls[i].hasOwnProperty("supporteffect") && attackerPartnerSkls[i].affects && isIn("Hit", attackerPartnerSkls[i].affects)
				&& !isIn(skl.name, unstackable)) {
				unstackable.push(skl.name);
				var attackerPartnerSklEffects = attackerPartnerSkls[i]["supporteffect"](attacker);
				if (attackerPartnerSklEffects && attackerPartnerSklEffects.hasOwnProperty("Hit")) {
					hit += attackerPartnerSklEffects["Hit"];
				}
			}
			if (attackerPartnerSkls[i].hasOwnProperty("enemydebuff") && attackerPartnerSkls[i].affects && isIn("Avo", attackerPartnerSkls[i].affects)
				&& !isIn(skl.name, unstackable)) {
				unstackable.push(skl.name);
				var attackerPartnerSklDebuffs = attackerPartnerSkls[i]["enemydebuff"]();
				if (attackerPartnerSklDebuffs && attackerPartnerSklDebuffs.hasOwnProperty("Avo")) {
					hit -= attackerPartnerSklDebuffs["Avo"];
				}
			}
			if (skl.name == "Dual Support+" && !isIn(skl.name, unstackable)) {
				attackerSupportRank += 4;
			}
		}
	}

	var targetunstackable = [];

	// account for avo modifers on target's equipped skills
	var targetSkls = target.getSkills();
	for (var i=0; i<targetSkls.length; i++) {
		if (targetSkls[i].hasOwnProperty("stateffect") && targetSkls[i].affects && isIn("Avo", targetSkls[i].affects)) {
			var targetSklEffects = targetSkls[i]["stateffect"](target, attacker);
			if (targetSklEffects && targetSklEffects.hasOwnProperty("Avo"))
				hit -= targetSklEffects["Avo"];
		}
		if (targetSkls[i].hasOwnProperty("enemydebuff") && targetSkls[i].affects && isIn("Hit", targetSkls[i].affects)
			&& !isIn(skl.name, targetunstackable)) {
			targetunstackable.push(skl.name);
			var targetSklDebuffs = targetSkls[i]["enemydebuff"]();
			if (targetSklDebuffs && targetSklDebuffs.hasOwnProperty("Hit"))
				hit += attackerSklDebuffs["Hit"];
		}
	}

	// account for skills on target's support units
	if (target.getPartner()["unit"]!=undefined) {
		var targetPartner = target.getPartner();
		var targetPartnerSkls = targetPartner["unit"].getSkills();
		for (var i=0; i<targetPartnerSkls.length; i++) {
			var skl = targetPartnerSkls[i];
			if (targetPartnerSkls[i].hasOwnProperty("supporteffect") && targetPartnerSkls[i].affects && isIn("Avo", targetPartnerSkls[i].affects)
				&& !isIn(skl.name, targetunstackable)) {
				targetunstackable.push(skl.name);
				var targetPartnerSklEffects = targetPartnerSkls[i]["supporteffect"](attacker);
				if (targetPartnerSklEffects && targetPartnerSklEffects.hasOwnProperty("Avo")) {
					hit -= targetPartnerSklEffects["Avo"];
				}
			}
			if (targetPartnerSkls[i].hasOwnProperty("enemydebuff") && targetPartnerSkls[i].affects && isIn("Hit", targetPartnerSkls[i].affects)
				&& !isIn(skl.name, targetunstackable)) {
				targetunstackable.push(skl.name);
				var targetPartnerSklDebuffs = targetPartnerSkls[i]["enemydebuff"]();
				if (targetPartnerSklDebuffs && targetPartnerSklDebuffs.hasOwnProperty("Hit")) {
					hit += targetPartnerSklDebuffs["Hit"];
				}
			}
			if (skl.name == "Dual Support+" && !isIn(skl.name, targetunstackable)) {
				targetSupportRank += 4;
			}
		}
	}


	// account for attacker's hit support bonuses

	if (attacker.getPartner()["unit"]!=undefined) {
		var attackerPartner = attacker.getPartner();
		if (attackerPartner.supportLevel == "none") attackerSupportRank += 1;
		else if (attackerPartner.supportLevel == 'C') attackerSupportRank += 2;
		else if (attackerPartner.supportLevel == 'B') attackerSupportRank += 3;
		else if (attackerPartner.supportLevel == 'A') attackerSupportRank += 4;
		else if (attackerPartner.supportLevel == 'S') attackerSupportRank += 5;
	}

	if (attackerSupportRank>=1 && attackerSupportRank<5) hit += 10;
	else if (attackerSupportRank>=5 && attackerSupportRank<9) hit += 15;
	else if (attackerSupportRank>=9) hit += 20;

	// account for target's avo support bonuses

	if (target.getPartner()["unit"]!=undefined) {
		var targetPartner = target.getPartner();
		if (targetPartner.supportLevel == "none") targetSupportRank += 1;
		else if (targetPartner.supportLevel == 'C') targetSupportRank += 2;
		else if (targetPartner.supportLevel == 'B') targetSupportRank += 3;
		else if (targetPartner.supportLevel == 'A') targetSupportRank += 4;
		else if (targetPartner.supportLevel == 'S') targetSupportRank += 5;
	}

	if (targetSupportRank>=2 && targetSupportRank<6) hit -= 10;
	else if (targetSupportRank>=6 && targetSupportRank<10) hit -= 15;
	else if (targetSupportRank>=10) hit -= 20;	

	if (attacker.hasSkill("hawkeye")) hit = 100;

	if (hit < 0) hit = 0;
	else if (hit > 100) hit = 100;
	return hit;
}
function calcCrit(attacker, target) {
	// Critical rate (+ support bonus) - enemy's critical evade (- enemy's support bonus)
	var crit = attacker.getCrit();
	crit -= target.getCurrentStat("Lck");

	var unstackable = [];
	var attackerSupportRank = 0;
	var targetSupportRank = 0;

	// account for crit modifiers on attacker's equipped skills
	var attackerSkls = attacker.getSkills();
	for (var i=0; i<attackerSkls.length; i++) {
		var skl = attackerSkls[i];
		if (attackerSkls[i].hasOwnProperty("stateffect") && attackerSkls[i].affects && isIn("Crit", attackerSkls[i].affects)) {
			var attackerSklEffects = attackerSkls[i]["stateffect"](attacker, target);
			if (attackerSklEffects && attackerSklEffects.hasOwnProperty("Crit"))
				crit += attackerSklEffects["Crit"];
		}
		if (attackerSkls[i].hasOwnProperty("enemydebuff") && attackerSkls[i].affects && isIn("Ddg", attackerSkls[i].affects)
			&& !isIn(skl.name, unstackable)) {
			unstackable.push(skl.name);
			var attackerSklDebuffs = attackerSkls[i]["enemydebuff"]();
			if (attackerSklDebuffs && attackerSklDebuffs.hasOwnProperty("Ddg"))
				crit -= attackerSklDebuffs["Ddg"];
		}
	}	

	// account for skills on attacker's support units
	if (attacker.getPartner()["unit"]!=undefined) {
		var attackerPartner = attacker.getPartner();
		var attackerPartnerSkls = attackerPartner["unit"].getSkills();
		for (var i=0; i<attackerPartnerSkls.length; i++) {
			var skl = attackerPartnerSkls[i];
			if (attackerPartnerSkls[i].hasOwnProperty("supporteffect") && attackerPartnerSkls[i].affects && isIn("Crit", attackerPartnerSkls[i].affects)
				&& !isIn(skl.name, unstackable)) {
				unstackable.push(skl.name);
				var attackerPartnerSklEffects = attackerPartnerSkls[i]["supporteffect"](attacker);
				if (attackerPartnerSklEffects && attackerPartnerSklEffects.hasOwnProperty("Crit")) {
					crit += attackerPartnerSklEffects["Crit"];
				}
			}
			if (attackerPartnerSkls[i].hasOwnProperty("enemydebuff") && attackerPartnerSkls[i].affects && isIn("Ddg", attackerPartnerSkls[i].affects)
				&& !isIn(skl.name, unstackable)) {
				unstackable.push(skl.name);
				var attackerPartnerSklDebuffs = attackerPartnerSkls[i]["enemydebuff"]();
				if (attackerPartnerSklDebuffs && attackerPartnerSklDebuffs.hasOwnProperty("Ddg")) {
					crit -= attackerPartnerSklDebuffs["Ddg"];
				}
			}
			if (skl.name == "Dual Support+" && !isIn(skl.name, unstackable)) {
				attackerSupportRank += 4;
			}
		}
	}

	var targetunstackable = [];

	// account for crit evade modifiers on target's equipped skills
	var targetSkls = target.getSkills();
	for (var i=0; i<targetSkls.length; i++) {
		var skl = targetSkls[i];
		if (targetSkls[i].hasOwnProperty("stateffect") && targetSkls[i].affects && isIn("Ddg", targetSkls[i].affects)) {
			var targetSklEffects = targetSkls[i]["stateffect"](target, attacker);
			if (targetSklEffects && targetSklEffects.hasOwnProperty("Ddg"))
				crit -= attackerSklEffects["Ddg"];
		}
		if (targetSkls[i].hasOwnProperty("enemydebuff") && targetSkls[i].affects && isIn("Crit", targetSkls[i].affects)
			&& !isIn(skl.name, targetunstackable)) {
			targetunstackable.push(skl.name);
			var targetSklDebuffs = targetSkls[i]["enemydebuff"]();
			if (targetSklDebuffs && targetSklDebuffs.hasOwnProperty("Crit"))
				crit += attackerSklDebuffs["Crit"];
		}
	}

	// account for skills on target's support units
	if (target.getPartner()["unit"]!=undefined) {
		var targetPartner = target.getPartner();
		var targetPartnerSkls = targetPartner["unit"].getSkills();
		for (var i=0; i<targetPartnerSkls.length; i++) {
			var skl = targetPartnerSkls[i];
			if (targetPartnerSkls[i].hasOwnProperty("supporteffect") && targetPartnerSkls[i].affects && isIn("Ddg", targetPartnerSkls[i].affects)
				&& !isIn(skl.name, targetunstackable)) {
				targetunstackable.push(skl.name);
				var targetPartnerSklEffects = targetPartnerSkls[i]["supporteffect"](attacker);
				if (targetPartnerSklEffects && targetPartnerSklEffects.hasOwnProperty("Ddg")) {
					crit -= targetPartnerSklEffects["Ddg"];
				}
			}
			if (targetPartnerSkls[i].hasOwnProperty("enemydebuff") && targetPartnerSkls[i].affects && isIn("Crit", targetPartnerSkls[i].affects)
				&& !isIn(skl.name, targetunstackable)) {
				targetunstackable.push(skl.name);
				var targetPartnerSklDebuffs = targetPartnerSkls[i]["enemydebuff"]();
				if (targetPartnerSklDebuffs && targetPartnerSklDebuffs.hasOwnProperty("Crit")) {
					crit += targetPartnerSklDebuffs["Crit"];
				}
			}
			if (skl.name == "Dual Support+" && !isIn(skl.name, targetunstackable)) {
				targetSupportRank += 4;
			}
		}
	}


	// account for attacker's crit support bonuses
	if (attacker.getPartner()["unit"]!=undefined) {
		var attackerPartner = attacker.getPartner();
		if (attackerPartner.supportLevel == "none") attackerSupportRank += 1;
		else if (attackerPartner.supportLevel == 'C') attackerSupportRank += 2;
		else if (attackerPartner.supportLevel == 'B') attackerSupportRank += 3;
		else if (attackerPartner.supportLevel == 'A') attackerSupportRank += 4;
		else if (attackerPartner.supportLevel == 'S') attackerSupportRank += 5;
	}

	if (attackerSupportRank>=4 && attackerSupportRank<8) crit += 10;
	else if (attackerSupportRank>=8 && attackerSupportRank<12) crit += 15;
	else if (attackerSupportRank>=12) crit += 20;



	// account for target's crit evade support bonuses
	if (target.getPartner()["unit"]!=undefined) {
		var targetPartner = target.getPartner();
		if (targetPartner.supportLevel == "none") targetSupportRank += 1;
		else if (targetPartner.supportLevel == 'C') targetSupportRank += 2;
		else if (targetPartner.supportLevel == 'B') targetSupportRank += 3;
		else if (targetPartner.supportLevel == 'A') targetSupportRank += 4;
		else if (targetPartner.supportLevel == 'S') targetSupportRank += 5;
	}

	if (targetSupportRank>=3 && targetSupportRank<7) crit -= 10;
	else if (targetSupportRank>=7 && targetSupportRank<11) crit -= 15;
	else if (targetSupportRank>=11) crit -= 20;	

	if (crit < 0) crit = 0;
	else if (crit > 100) crit = 100;
	return crit;
}
function canDouble(attacker, target) {
	var threshold = 5;
	return attacker.getCurrentStat("Spd") - target.getCurrentStat("Spd") >= threshold;
	// in Fates, allow for:
	// - attacker's weapon to affect his/her own threshold
	// - target's weapon to affect the attacker's threshold
}
function isBrave(attacker) {
	return attacker.getWeapon().brave ? true : false;
}
function doubleMult(attacker, target, initiator) {
	var output = "";
	var mult = 1;
	if (isBrave(attacker)) mult *= 2;	// in Fates, allow for the double strike to only apply when the brave user initiates
	if (canDouble(attacker, target)) mult *= 2;
	if (mult > 1) output += " (x" + mult + ")";
	return output;
}
function isAlive(unit) {
	return unit.getCurrentHP() > 0;
}


function battleForecast(attacker, target, initiator, range) {
	if (!isAlive(attacker) || !isAlive(target)) return;
	var output = "";
	output += attacker.getNickname() + space(columnWidth - attacker.getNickname().length) + target.getNickname() + "\n";
	output += '- '+attacker.getWeapon().name + space(columnWidth - (attacker.getWeapon().name.length+2)) + '- '+target.getWeapon().name + "\n";
	var attackerHP = "HP: " + attacker.getCurrentHP()+'/'+attacker.getCurrentStat("HP");
	var targetHP = "HP: " + target.getCurrentHP()+'/'+target.getCurrentStat("HP");
	output += attackerHP + space(columnWidth - attackerHP.length) + targetHP + "\n";

	var attackerInRange = isIn(range, attacker.getWeapon()["range"]);
	var targetInRange = isIn(range, target.getWeapon()["range"]);

	var attackerAtk = "Atk: ";
	if (attackerInRange)
		attackerAtk += calcDamage(attacker,target,initiator) + doubleMult(attacker,target,initiator); 
	else attackerAtk += '-';
	var targetAtk = "Atk: ";
	if (targetInRange)
		targetAtk += calcDamage(target,attacker,initiator) + doubleMult(target,attacker,initiator);
	else targetAtk += '-';
	output += attackerAtk + space(columnWidth - attackerAtk.length) + targetAtk + "\n";

	var attackerHit = "Hit: ";
	if (attackerInRange) attackerHit += calcHit(attacker,target,initiator)+'%'; else attackerHit += '-';
	var targetHit = "Hit: ";
	if (targetInRange) targetHit += calcHit(target,attacker,initiator)+'%'; else targetHit += '-';
	output += attackerHit + space(columnWidth - attackerHit.length) + targetHit + "\n";

	var attackerCrit = "Crit: ";
	if (attackerInRange) attackerCrit += calcCrit(attacker,target,initiator)+'%'; else attackerCrit += '-';
	var targetCrit = "Crit: ";
	if (targetInRange) targetCrit += calcCrit(target,attacker,initiator)+'%'; else targetCrit += '-';
	output += attackerCrit + space(columnWidth - attackerCrit.length) + targetCrit + "\n";
	console.log(output);
}
function initiateBattle(attacker, target, range) {
	if (!isIn(range, attacker.getWeapon()["range"])) { console.log(attacker.getName()+" cannot attack at "+range+" range"); return; }
	if ( ((target.hasSkill("vantage") && (target.getCurrentHP() <= (target.getCurrentStat("HP")/2))) || target.hasSkill("vantage+"))
		&& isIn(range, target.getWeapon()["range"]) && isAlive(target) ) {
		var v = target.hasSkill("vantage+") ? "Vantage+" : "Vantage";
		console.log(target.getNickname() + "'s " + v + " activated!");
		attack(target, attacker, attacker, range);
		if (isAlive(target) && isAlive(attacker)) attack(attacker, target, attacker, range);
		if (canDouble(target, attacker) && isAlive(target) && isAlive(attacker)) attack(target, attacker, attacker, range);
		if (canDouble(attacker, target) && isAlive(attacker) && isAlive(target)) attack(attacker, target, attacker, range);
	}
	else {
		attack(attacker, target, attacker, range);
		if (isAlive(target) && isAlive(attacker) && isIn(range, target.getWeapon()["range"])) attack(target, attacker, attacker, range);
		if (canDouble(attacker, target) && isAlive(attacker) && isAlive(target)) attack(attacker, target, attacker, range);
		if (canDouble(target, attacker) && isAlive(target) && isAlive(attacker) && isIn(range, target.getWeapon()["range"])) attack(target, attacker, attacker, range);
	}
}
function attack(attacker, target, initiator, range) {

	var headingMessage = "";
	if (isAlive(attacker) && isAlive(target)) {
		headingMessage += "<@@ "+attacker.getNickname() + "'s Attack: ";
		headingMessage += space(messageWidth - headingMessage.length);
		if (initiator==attacker)
			headingMessage += (" (" + attacker.getNickname() + ": " + attacker.getCurrentHP() + " HP, " + target.getNickname() + ": " + target.getCurrentHP() + " HP) @@>");
		else if (initiator==target)
			headingMessage += (" (" + target.getNickname() + ": " + target.getCurrentHP() + " HP, " + attacker.getNickname() + ": " + attacker.getCurrentHP() + " HP) @@>");
		console.log(headingMessage);
	}


	var baseDamage = calcDamage(attacker, target, initiator);
	var hitChance = calcHit(attacker, target, initiator);

	var consecutive = 1; if (isBrave(attacker)) consecutive = 2;

	var procBonus = 0; if (attacker.hasSkill("rightful_king")) procBonus += 10;
	if (attacker.hasSkill("rightful_god")) procBonus += 30;

	for (var i=0; (i<consecutive && isAlive(target) && isAlive(attacker)); i++) {

		// check for procs regardless of hit
		var proc = "none";
		if (proc=="none" && attacker.hasSkill("lethality")) {
			var procChance = Math.floor(attacker.getCurrentStat("Skl")*0.25) + procBonus;
			if (singleRNG() < procChance) {
				proc = "lethality";
				console.log(attacker.getNickname()+"'s Lethality activated!")
			}
		}
		if (proc=="none" && attacker.hasSkill("aether")) {
			var procChance = Math.floor(attacker.getCurrentStat("Skl")*0.5) + procBonus;
			if (singleRNG() < procChance) {
				proc = "aether";
				console.log(attacker.getNickname()+"'s Aether activated!")
			}
		}
		if (proc=="none" && attacker.hasSkill("astra")) {
			var procChance = Math.floor(attacker.getCurrentStat("Skl")*0.5) + procBonus;
			if (singleRNG() < procChance) {
				proc = "astra";
				console.log(attacker.getNickname()+"'s Astra activated!")
			}
		}
		if (proc=="none" && attacker.hasSkill("sol")) {
			var procChance = (attacker.getCurrentStat("Skl")) + procBonus;
			if (singleRNG() < procChance) {
				proc = "sol";
				console.log(attacker.getNickname()+"'s Sol activated!")
			}
		}
		if (proc=="none" && (attacker.hasSkill("luna") || attacker.hasSkill("luna+"))) {
			var procChance = (attacker.getCurrentStat("Skl")) + procBonus;
			var l = "Luna";
			if (attacker.hasSkill("luna+")) { procChance = 100; l = "Luna+"; }
			if (singleRNG() < procChance) {
				proc = "luna";
				console.log(attacker.getNickname()+"'s " + l + " activated!")
			}
		}
		if (proc=="none" && attacker.hasSkill("ignis")) {
			var procChance = (attacker.getCurrentStat("Skl")) + procBonus;
			if (singleRNG() < procChance) {
				proc = "ignis";
				console.log(attacker.getNickname()+"'s Ignis activated!")
			}
		}
		if (proc=="none" && attacker.hasSkill("vengeance")) {
			var procChance = (attacker.getCurrentStat("Skl")*2) + procBonus;
			if (singleRNG() < procChance) {
				proc = "vengeance";
				console.log(attacker.getNickname()+"'s Vengeance activated!")
			}
		}

		// check for hit (in the case of Astra/Aether, perform a separate check for hit on each attack)

		if (proc == "astra") {
			// 5 consecutive attacks at half damage
			for (var j=0; (j<5 && isAlive(target) && isAlive(attacker)); j++) {
				if (doubleRNG() < hitChance) {
					successfulHit(attacker,target,Math.floor(baseDamage/2),proc,initiator,range);
				}
				else {
					missedHit(attacker,target,initiator);
				}
			}
		}
		else if (proc == "aether") {
			// 1 Sol attack and 1 Luna attack in succession
			for (var j=0; (j<2 && isAlive(target) && isAlive(attacker)); j++) {
				if (doubleRNG() < hitChance) {
					if (j==0) proc = "sol"; else if (j==1) proc = "luna";
					successfulHit(attacker,target,baseDamage,proc,initiator,range);
				}
				else {
					missedHit(attacker,target,initiator);
				}
			}
		}
		else {
			if (doubleRNG() < hitChance) {
				successfulHit(attacker,target,baseDamage,proc,initiator,range);
			}
			else {
				missedHit(attacker,target,initiator);
			}
		}
		console.log("----------");
	}


}

function successfulHit(attacker, target, damage, proc, initiator, range) {
	var finalDamage = damage;
	var recoverMult = 0; var recoveredAmt = 0;

	// weapon special attributes (e.g. healing)
	if (attacker.getWeapon()["heal"] && attacker.getCurrentHP() < attacker.getCurrentStat("HP")) recoverMult += 0.5; 

	// offensive procs
	if (proc == "lethality") {
		finalDamage = target.getCurrentHP();
	}
	if (proc == "sol" && attacker.getCurrentHP() < attacker.getCurrentStat("HP")) {
		recoverMult += 0.5;
	}
	if (proc == "luna") {
		if (attacker.getWeapon()["damage"]=="physical")
			finalDamage += Math.floor(target.getCurrentStat("Def")/2);
		else if (attacker.getWeapon()["damage"]=="magical")
			finalDamage += Math.floor(target.getCurrentStat("Res")/2);
	}
	if (proc == "ignis") {
		if (attacker.getWeapon()["damage"]=="physical")
			finalDamage += Math.floor(attacker.getCurrentStat("Mag")/2);
		else if (attacker.getWeapon()["damage"]=="magical")
			finalDamage += Math.floor(attacker.getCurrentStat("Str")/2);
	}
	if (proc == "vengeance") {
		finalDamage += Math.floor((attacker.getCurrentStat("HP") - attacker.getCurrentHP())/2);
	}

	var critChance = calcCrit(attacker, target);
	var crit = false;
	if (singleRNG() < critChance) { finalDamage *= 3; crit = true; }

	// defensive procs
	var targetProc = "none";
	var targetProcBonus = 0; if (target.hasSkill("rightful_king")) targetProcBonus += 10;
	if (target.getCurrentHP() - finalDamage <= 0 && target.hasSkill("miracle") && target.getCurrentHP() > 1 && targetProc == "none") {
		var procChance = target.getCurrentStat("Lck") + targetProcBonus;
		if (singleRNG() < procChance) {
			targetProc = "miracle";
			finalDamage = target.getCurrentHP() - 1;
			console.log(target.getNickname()+"'s Miracle activated!");
		}
	}
	if (targetProc == "none") {
		if ( (target.hasSkill("pavise") || target.hasSkill("pavise+")) && 
			(attacker.getWeapon()["type"]=="sword" || attacker.getWeapon()["type"]=="lance" || attacker.getWeapon()["type"]=="axe" || 
				attacker.getWeapon()["name"]=="beaststone+")) {
			var procChance = target.getCurrentStat("Skl") + targetProcBonus;
			var p = "Pavise";
			if (target.hasSkill("pavise+")) { procChance = 100; p = "Pavise+"; }
			if (singleRNG() < procChance) {
				targetProc = "pavise";
				if (proc != "lethality") finalDamage = Math.floor(finalDamage/2);
				console.log(target.getNickname()+"'s Pavise activated!");
			}
		}
		else if ( (target.hasSkill("aegis") || target.hasSkill("aegis+")) && 
			(attacker.getWeapon()["type"]=="bow" || attacker.getWeapon()["type"]=="tome" || attacker.getWeapon()["name"]=="dragonstone")) {
			var procChance = target.getCurrentStat("Skl") + targetProcBonus;
			var a = "Aegis";
			if (target.hasSkill("aegis+")) { procChance = 100; a = "Aegis+"; }
			if (singleRNG() < procChance) {
				targetProc = "aegis";
				if (proc != "lethality") finalDamage = Math.floor(finalDamage/2);
				console.log(target.getNickname()+"'s Aegis activated!");
			}
		}
	}


	// if target takes damage, target's HP is decreased
	var targetOriginalHP = target.getCurrentHP();
	target.setCurrentHP(target.getCurrentHP() - finalDamage);
	if (target.getCurrentHP() < 0) target.setCurrentHP(0);

	var hitMessage = "";
	hitMessage += (attacker.getNickname() + " hit " + target.getNickname() + " for " + finalDamage + " damage!");
	if (crit) hitMessage += " Critical hit!";
	hitMessage += space(messageWidth - hitMessage.length);
	if (initiator==attacker)
		hitMessage += (" (" + attacker.getNickname() + ": " + attacker.getCurrentHP() + " HP, " + target.getNickname() + ": " + target.getCurrentHP() + " HP)");
	else if (initiator==target)
		hitMessage += (" (" + target.getNickname() + ": " + target.getCurrentHP() + " HP, " + attacker.getNickname() + ": " + attacker.getCurrentHP() + " HP)");
	console.log(hitMessage);

	// if attacker recovers HP, attacker's HP is increased
	var attackerOriginalHP = attacker.getCurrentHP();
	if (recoverMult > 0) {
		recoveredAmt += Math.floor( (targetOriginalHP - target.getCurrentHP()) * recoverMult);
		if (recoveredAmt > attacker.getCurrentStat("HP") - attacker.getCurrentHP())
			recoveredAmt = attacker.getCurrentStat("HP") - attacker.getCurrentHP();
		attacker.setCurrentHP(attacker.getCurrentHP() + recoveredAmt);
	}

	if (recoverMult > 0) {
		var recoverMessage = "";
		recoverMessage += (attacker.getNickname() + " recovered " + recoveredAmt + " HP!");
		recoverMessage += space(messageWidth - recoverMessage.length);
		if (initiator==attacker)
			recoverMessage += (" (" + attacker.getNickname() + ": " + attacker.getCurrentHP() + " HP, " + target.getNickname() + ": " + target.getCurrentHP() + " HP)");
		else if (initiator==target)
			recoverMessage += (" (" + target.getNickname() + ": " + target.getCurrentHP() + " HP, " + attacker.getNickname() + ": " + attacker.getCurrentHP() + " HP)");
		console.log(recoverMessage);
	}

	// counter shenanigans
	attackerOriginalHP = attacker.getCurrentHP();
	if (target.hasSkill("counter") && range==1 && isAlive(target) && finalDamage > 0) {
		attacker.setCurrentHP(attacker.getCurrentHP() - finalDamage);
		if (attacker.getCurrentHP() < 0) attacker.setCurrentHP(0);
		console.log(target.getNickname() + "'s Counter activated! ")
		var counterMessage = attacker.getNickname() + " took " + finalDamage + " damage!";
		counterMessage += space(messageWidth - counterMessage.length);
		if (initiator==attacker)
			counterMessage += (" (" + attacker.getNickname() + ": " + attacker.getCurrentHP() + " HP, " + target.getNickname() + ": " + target.getCurrentHP() + " HP)");
		else if (initiator==target)
			counterMessage += (" (" + target.getNickname() + ": " + target.getCurrentHP() + " HP, " + attacker.getNickname() + ": " + attacker.getCurrentHP() + " HP)");
		console.log(counterMessage);
	}

	// death
	if (target.getCurrentHP() <= 0) console.log(target.getNickname() + " was defeated!");
	if (attacker.getCurrentHP() <= 0) console.log(attacker.getNickname() + " was defeated!");
}
function missedHit(attacker, target, initiator) {
	var missMessage = "";
	missMessage += (attacker.getNickname() + "'s attack missed!");

	missMessage += space(messageWidth - missMessage.length);
	if (initiator==attacker)
		missMessage += (" (" + attacker.getNickname() + ": " + attacker.getCurrentHP() + " HP, " + target.getNickname() + ": " + target.getCurrentHP() + " HP)");
	else if (initiator==target)
		missMessage += (" (" + target.getNickname() + ": " + target.getCurrentHP() + " HP, " + attacker.getNickname() + ": " + attacker.getCurrentHP() + " HP)");
	console.log(missMessage);	
}

function triggerSelfSkills(unit, designation) {
	var skls = unit.getSkills();
	for (var i=0; i<skls.length; i++) {
		var skl = skls[i];
		if (skl.hasOwnProperty(designation))
			skl[designation](unit);
	}
}


// text-based displays for console

function displayStats(unit) {
	var display = "| ";
	for (var stat in unit.getCurrentStats()) {
		if (stat == "HP") {
			display += ("HP: " + unit.getCurrentHP() + "/" + unit.getCurrentStat("HP") + " | ");
		}
		else {
			var original = unit.getStat(stat);
			var current = unit.getCurrentStat(stat);
			var statValue = stat + ": " + original;
			var diff = current - original;
			var bonus = "";
			if (diff > 0) bonus += "(+" + diff + ")";
			else if (diff < 0) bonus += "(-" + diff + ")";
			statValue += bonus;
			display += statValue + " | ";
		}
	}
	console.log(display);
}
function displayCombatStats(unit) {
	var display = "| ";
	display += "Atk: " + unit.getAttack() + " | ";
	display += "Hit: " + unit.getHit() + " | ";
	display += "Crit: " + unit.getCrit() + " | ";
	display += "Avo: " + unit.getAvo() + " | ";
	console.log(display);
}







// battle setup

var player1 = new Unit("avatar_m", "general");
player1.setNickname("Meg");
player1.setWeapon("brave_lance", [4,20,0]);
player1.setSkills("hp+5", "axebreaker", "luna", "aggressor", "counter");
player1.setParent("libra");
player1.setAssetFlaw("Str", "Mag");
//player1.addTonics("Mag","Skl","Spd");
//player1.addRallies("Spectrum", "Heart", "Str","Mag","Skl","Spd","Def","Res");

var player1a = new Unit("morgan_f", "sage");
player1a.setWeapon("book_of_naga", [5,15,0]);
player1a.setSkills("tomefaire","solidarity", "anathema", "dual_support+", "limit_breaker");
player1a.setParent("sumia","Skl","Mag");

//player1.pairUpWith(player1a, 'S');

console.log(player1.getNickname());
displayStats(player1);
console.log(player1.getClass()["name"], player1.getWeapon()["name"]);
displayCombatStats(player1);
console.log();
var player2 = new Unit("avatar_m", "paladin");
player2.setNickname("Lucas");
player2.setWeapon("gae_bolg", [5,10,1]);
player2.setSkills("lucky_seven", "aegis", "luna", "counter", "sol");
//player2.setTerrainBonus(throne);
player2.setParent("avatar_f","Spd","Skl");
player2.setAssetFlaw("Res", "HP");
console.log(player2.getNickname());
displayStats(player2);
console.log(player2.getClass()["name"], player2.getWeapon()["name"]);
displayCombatStats(player2);
console.log();


// Start a battle!

player1.setCurrentHP(player1.getCurrentStat("HP"));
player2.setCurrentHP(player2.getCurrentStat("HP"));

// If both players are capable of fighting at 2 range, fight at 2 range
var player1Range = 2;
var player2Range = 2;
// If player 1 is locked to 1 range, player 2 must fight at 1 range if possible
if (isIn(1, player1.getWeapon()["range"]) && !isIn(2, player1.getWeapon()["range"])) {
	player1Range = 1;
	if (isIn(1, player2.getWeapon()["range"])) player2Range = 1;
}
// If player 2 is locked to 1 range, player 1 must fight at 1 range if possible
if (isIn(1, player2.getWeapon()["range"]) && !isIn(2, player2.getWeapon()["range"])) {
	player2Range = 1;
	if (isIn(1, player1.getWeapon()["range"])) player1Range = 1;
}

var whoGoesFirst = "player2"
while (isAlive(player1) && isAlive(player2)) {
	if (whoGoesFirst == "player1") {
		// I go first
		console.log("<@@ TURN " + turnCount + ": PLAYER 1 PHASE @@>")
		triggerSelfSkills(player1, "startofturn");
		battleForecast(player1, player2, player1, player1Range);
		initiateBattle(player1, player2, player1Range);
		if (isAlive(player1) && isAlive(player2)) {
			console.log("<@@ PLAYER 2 PHASE @@>");
		 	triggerSelfSkills(player2, "startofturn");
		}
		battleForecast(player1, player2, player2, player2Range);
		initiateBattle(player2, player1, player2Range);
		console.log();
	}
	else if (whoGoesFirst == "player2") {
		// Opponent goes first
		console.log("<@@ TURN " + turnCount + ": PLAYER 2 PHASE @@>")
		triggerSelfSkills(player2, "startofturn");
		battleForecast(player1, player2, player2, player2Range);
		initiateBattle(player2, player1, player2Range);
		if (isAlive(player1) && isAlive(player2)) {
			console.log("<@@ PLAYER 1 PHASE @@>");
 			triggerSelfSkills(player1, "startofturn");
		}
		battleForecast(player1, player2, player1, player1Range);
		initiateBattle(player1, player2, player1Range);
		console.log();
	}
	turnCount++;
}
if (isAlive(player1)) console.log(player1.nickname + " wins!");
else if (isAlive(player2)) console.log(player2.nickname + " wins!");
console.log();


// var player3 = new Unit("cynthia", "falcon_knight");
// player3.setWeapon("brave_lance", [12,15,0]);
// player3.setSkills("luna", "limit_breaker", "iotes_shield");
// player3.setParent("frederick");
// battleForecast(player1, player3, player3, 1);
// initiateBattle(player3, player1, 1);

// var player4 = new Unit("kjelle", "general");
// player4.setWeapon("helswath", [12,15,0]);
// player4.setSkills("pavise", "limit_breaker", "sol");
// player4.setParent("donnel");
// battleForecast(player1, player4, player4, 2);
// initiateBattle(player4, player1, 2);
