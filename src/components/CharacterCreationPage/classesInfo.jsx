export const RACES = ["Dragonborn","Dwarf","Elf","Gnome","Half-Elf","Half-Orc","Halfling","Human","Tiefling"];
export const CLASSES = ["Artificer", "Barbarian", "Bard", "Bloodhunter", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"];
export const SUBCLASSES = {
    "Artificer" : ["Alchemist", "Armorer", "Artillerist", "Battle Smith"],
    "Barbarian" : ["Ancestral Guardian","Battlerager", "Beast", "Berseker", "Giant", "Storm Herald", "Totem Warrior", "Wild Magic", "Zealot"],
    "Bard" : ["College of Creation","College of Eloquence","College of Glamour","College of Lore",
                "College of Spirits","College of Swords","College of Valor","College of Whispers"],
    "Bloodhunter" : ["Ghostslayer", "Lycan", "Mutant", "Profane Soul"],
    "Cleric" : ["Arcana", "Death", "Forge", "Grave", "Knowledge", "Life", "Light", "Nature", "Order", "Peace", "Tempest", "Trickery", "Twilight", "War"],
    "Druid" : ["Circle of Dreams", "Circle of the Land", "Circle of the Moon", "Circle of the Shepard", "Circle of Spores", "Circle of Stars", "Circle of Wildfire"],
    "Fighter" : ["Arcane Archer", "Banneret", "Battle Master", "Cavalier", "Champion", "Echo Knight", "Eldritch Knight", "Psi Warrior", "Rune Warrior", "Samurai"],
    "Monk" : ["Way of Mercy","Way of the Ascendant","Way of the Astral Self","Way of the Drunken Master","Way of the Four Elements",
        "Way of the Kensei","Way of the Long Death","Way of the Open Hand","Way of Shadow","Way of Sun Soul"],
    "Paladin" : ["Oath of the Ancients","Oath of Conquest","Oath of the Crown","Oath of Devotion","Oath of Glory","Oath of Redemption",
        "Oath of Vengence","Oath of the Watchers", "Oathbreaker"],
    "Ranger" : ["Beast Master", "Drakewarden", "Fey Wanderer", "Gloom Stalker", "Horizon Walker", "Hunter", "Monster Slayer", "Swarmkeeper"],
    "Rogue" : ["Arcane Trikster", "Assassin", "Inquisitive", "Mastermind", "Phantom", "Scout", "Soulknife", "Swashbuckler", "Thief"],
    "Sorcerer" : ["Aberrant Mind", "Clockwork Soul", "Draconic Bloodline", "Divine Soul", "Lunar Sourcery", "Shadow Magic", "Storm Sorcery", "Wild Magic"],
    "Warlock" : ["Archfey", "Celestial", "Fathomless", "Fiend", "Genie", "Great Old One", "Hexblade", "Undead", "Undying"],
    "Wizard" : ["School of Abjuration","School of Bladesinging","School of Chronurgy","School of Conjuration","School of Divination","School of Enchantment",
        "School of Evocation","School of Graviturgy","School of Illusion","School of Necromancy","Order of Scribes","School of Transmutation","School of War Magic"
    ]
};

export const CLASS_DESCRIPTION = {
    "Artificer" : `Makers of magic-infused objects, artificers are defined by their inventive nature. 
                    They see magic as a complex system waiting to be decoded and controlled. 
                    Instead of ephemeral spells, they seek to craft durable, useful, marvelous magical items.`,
    "Barbarian" : `For some, their rage springs from a communion with fierce animal spirits. 
                    Others draw from a roiling reservoir of anger at a world full of pain.
                    For every barbarian, rage is a power that fuels not just a battle frenzy but also uncanny reflexes, resilience, and feats of strength.`,

    "Bard" : `Whether scholar, skald, or scoundrel, a bard weaves magic through words and music to inspire allies, demoralize foes, manipulate minds, create illusions, and even heal wounds. 
            The bard is a master of song, speech, and the magic they contain.`,

    "Bloodhunter" : `Often feared or misunderstood, and driven by an unending drive to destroy the wicked, blood hunters are clever, arcane warriors who have bound their essence to the dark creatures they hunt to better stalk and survive their prey. 
                    Armed with the rites of forbidden blood magic and a willingness to sacrifice their own vitality and humanity for the cause, they protect the realms from the shadows, ever vigilant to avoid becoming the same monsters they choose to hunt.`,

    "Cleric": `Clerics are intermediaries between the mortal world and the distant planes of the gods. 
                As varied as the gods they serve, clerics strive to embody the handiwork of their deities. 
                No ordinary priest, a cleric is imbued with divine magic.`,

    "Druid" : `Whether calling on the elemental forces of nature or emulating the creatures of the animal world, druids are an embodiment of nature's resilience, cunning, and fury. 
                They claim no mastery over nature, but see themselves as extensions of nature's indomitable will.`,

    "Fighter" : `Fighters share an unparalleled mastery with weapons and armor, and a thorough knowledge of the skills of combat. 
                They are well acquainted with death, both meting it out and staring it defiantly in the face.`,

    "Monk" : `Monks are united in their ability to magically harness the energy that flows in their bodies. 
                Whether channeled as a striking display of combat prowess or a subtler focus of defensive ability and speed, this energy infuses all that a monk does.`,
        
    "Paladin" : `Whether sworn before a god's altar and the witness of a priest, in a sacred glade before nature spirits and fey beings, or in a moment of desperation and grief with the dead as the only witness, a paladin's oath is a powerful bond.`,

    "Ranger" : `Far from the bustle of cities and towns, past the hedges that shelter the most distant farms from the terrors of the wild, amid the dense-packed trees of trackless forests and across wide and empty plains, rangers keep their unending watch.`,

    "Rogue" : `Rogues rely on skill, stealth, and their foes' vulnerabilities to get the upper hand in any situation. 
                They have a knack for finding the solution to just about any problem, demonstrating a resourcefulness and versatility that is the cornerstone of any successful adventuring party.`,
    
    "Sorcerer" : `Sorcerers carry a magical birthright conferred upon them by an exotic bloodline, some otherworldly influence, or exposure to unknown cosmic forces. 
                No one chooses sorcery; the power chooses the sorcerer.`,
    
    "Warlock" : `Warlocks are seekers of the knowledge that lies hidden in the fabric of the multiverse. 
                Through pacts made with mysterious beings of supernatural power, warlocks unlock magical effects both subtle and spectacular.`,

    "Wizard" : `Wizards are supreme magic-users, defined and united as a class by the spells they cast. 
                Drawing on the subtle weave of magic that permeates the cosmos, wizards cast spells of explosive fire, arcing lightning, subtle deception, brute-force mind control, and much more.`
}

export const CLASSES_HD = {
    "Artificer" : 8,
    "Barbarian" : 12,
    "Bard" : 8, 
    "Bloodhunter" : 10, 
    "Cleric" : 8, 
    "Druid" : 8, 
    "Fighter" : 10,
    "Monk" : 8,
    "Paladin" : 10,
    "Ranger" : 10,
    "Rogue" : 8,
    "Sorcerer" : 6,
    "Warlock" : 8,
    "Wizard" : 6
}

