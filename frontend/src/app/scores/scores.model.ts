export class TeamScoreDTO {
    players:string[];
    team:string;
    score:number;
}

export class MatchScoreDTO {
    id:string;
    date:Date;
    homeTeamScore:TeamScoreDTO;
    guestTeamScore:TeamScoreDTO;
    homeTeamWon:boolean;
    guestTeamWon:boolean;
    isDraw:boolean;
}

export class AddScoreFormData {
    date:Date;
    score:string;
    homeTeamPlayers:string;
    homeTeamName:string;
    guestTeamPlayers:string;
    guestTeamName:string;
}

export class Autocomplete {
    selectedItem:any;
    searchText:string;
}