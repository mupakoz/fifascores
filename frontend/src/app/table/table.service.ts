import Model = require('./table.model')

export class TableService {
    static $inject = ['$resource', '$http', '$location'];

    constructor(
                public $resource:any,
                public $http:ng.IHttpService,
                public $location:ng.ILocationService) {
    }

    public getTableData(): Model.TableDTO {
        return {
            playerRows: [
                {
                    nickname: 'Rogal',
                    matches: 3,
                    won: 1,
                    draw: 0,
                    lost: 1,
                    points: 1,
                    goalsDiff: { for: 2, against: 3}
                },
                {
                    nickname: 'Kumis',
                    matches: 2,
                    won: 0,
                    draw: 1,
                    lost: 1,
                    points: 2,
                    goalsDiff: { for: 0, against: 4}
                },
                {
                    nickname: 'Gruby',
                    matches: 3,
                    won: 0,
                    draw: 1,
                    lost: 2,
                    points: 4,
                    goalsDiff: { for: 5, against: 6}
                },
                {
                    nickname: 'Rogal',
                    matches: 3,
                    won: 1,
                    draw: 0,
                    lost: 1,
                    points: 1,
                    goalsDiff: { for: 2, against: 3}
                },
                {
                    nickname: 'Kumis',
                    matches: 2,
                    won: 0,
                    draw: 1,
                    lost: 1,
                    points: 2,
                    goalsDiff: { for: 0, against: 4}
                },
                {
                    nickname: 'Gruby',
                    matches: 3,
                    won: 0,
                    draw: 1,
                    lost: 2,
                    points: 4,
                    goalsDiff: { for: 5, against: 6}
                },
                {
                    nickname: 'Rogal',
                    matches: 3,
                    won: 1,
                    draw: 0,
                    lost: 1,
                    points: 1,
                    goalsDiff: { for: 2, against: 3}
                },
                {
                    nickname: 'Kumis',
                    matches: 2,
                    won: 0,
                    draw: 1,
                    lost: 1,
                    points: 2,
                    goalsDiff: { for: 0, against: 4}
                },
                {
                    nickname: 'Gruby',
                    matches: 3,
                    won: 0,
                    draw: 1,
                    lost: 2,
                    points: 4,
                    goalsDiff: { for: 5, against: 6}
                }
            ]
        };
    }
}
