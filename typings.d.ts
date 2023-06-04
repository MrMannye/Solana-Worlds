interface Level {
    id: number,
    level: string,
    timeTitle: string,
    time: number,
    money: number,
    position: string
}

interface PariObj {
    longPool: any; // This is how much money is in the Long Pool of the contest
    shortPool: any; // This is how much money is in the Short Pool of the contest
    longOdds: string; // This is the weighted odds of the Long Pool
    shortOdds: string; // This is the weighted odds of the Short Pool
    pubkey: string; // This is the contest pubkey
}