enum AnimalFlags {
    None           = 0,
    HasClaws       = 1 << 0,
    CanFly         = 1 << 1,
}

const printAnimalAbilities = (animal: { flags: number }): void => {
    const animalFlags: number = animal.flags;
    if (animalFlags & AnimalFlags.HasClaws) {
        console.log('animal has claws');
    }
    if (animalFlags & AnimalFlags.CanFly) {
        console.log('animal can fly');
    }
    if (animalFlags == AnimalFlags.None) {
        console.log('nothing');
    }
}

const animal = { flags: AnimalFlags.None };
printAnimalAbilities(animal); // nothing

animal.flags |= AnimalFlags.HasClaws;
printAnimalAbilities(animal); // animal has claws

animal.flags &= ~AnimalFlags.HasClaws;
printAnimalAbilities(animal); // nothing

animal.flags |= AnimalFlags.HasClaws | AnimalFlags.CanFly;
printAnimalAbilities(animal); // animal has claws, animal can fly
