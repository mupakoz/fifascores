export class TeamScoreDTO {
    players:string[];
    team:string;
    score:number;
}

export class MatchScoreDTO {
    date:Date;
    homeTeamScore:TeamScoreDTO;
    guestTeamScore:TeamScoreDTO;
}

export class TableField {
    title: string;
    fieldPath: string;
    type: string;
}

export class AddScoreFormData {
    date: Date;
    score: string;
    homeTeamPlayers: string;
    homeTeamName: string;
    guestTeamPlayers: string;
    guestTeamName: string;
}