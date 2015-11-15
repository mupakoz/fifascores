export class TableDTO {
    playerRows: PlayerTableRowDTO[];
}

export class PlayerTableRowDTO {
    nickname: string;
    matches: number;
    won: number;
    draw: number;
    lost: number;
    points: number;
    goalsDiff: GoalsDiffDTO;
    pointsPerGame: number;
    goalsPerGame: number;
}

export class GoalsDiffDTO {
    scored: number;
    against: number;
}
