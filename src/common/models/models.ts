export interface Race {
    _id: string,
    index: string,
    name: string,
    speed: number,
    alignment: string,
    age: string,
    size: string,
    size_description: string,
    starting_proficiencies: Array<JustUrl>,
    starting_proficiency_options: ChoosingOptions,
    ability_bonuses: Array<AbilitySimple>,
    ability_bonus_options: ChoosingOptions,
    languages: Array<JustUrl>,
    language_desc: string,
    language_options: ChoosingOptions
    traits: Array<JustUrl>,
    trait_options: ChoosingOptions,
    subraces: Array<JustUrl>
    url: string
}

export interface Subrace {
    index: string,
    name: string,
    race: JustUrl,
    ability_bonuses: Array<AbilitySimple>
    starting_proficiencies: Array<JustUrl>
    languages: Array<any>
    racial_traits: Array<JustUrl>
    desc: string
}

export interface JustUrl {
    name: string,
    url: string,
    bonus?: number,
    index?: string
}

export interface AbilitySimple {
    name: string,
    url: string,
    bonus: number
}

export interface ChoosingOptions {
    choose: number,
    type: string,
    from: Array<JustUrl>
}

export interface Proficiency {
    _id: string,
    index: string,
    type: string,
    name: string
    classes: Array<JustUrl>
    races: [],
    url: string,
    references: Array<{
        url: string
        type: string
        name: string
    }>
}

export interface Results {
    count: number,
    results: Array<JustUrl>
}

export interface Trait {
    index: string,
    name: string,
    desc: Array<string>
}

export interface AbilityScores {
    [key: string]: number    
}

export interface AbilityBonuses extends AbilityScores {}