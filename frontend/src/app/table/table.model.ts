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
}

export class GoalsDiffDTO {
    for: number;
    against: number;
}
