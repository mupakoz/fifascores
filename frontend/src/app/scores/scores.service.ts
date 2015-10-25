import Model = require('./scores.model')

export class ScoresService {
    static $inject = ['$resource', '$http'];

    constructor(// Add the parameter and type definition.
                public $resource:ng.IResourceService,
                public $http:ng.IHttpService) {
    }

    public addScore(dto:Model.AddScoreFormData):void {
        this.$http({
            url: '/api/scores/add',
            method: "POST",
            data: JSON.stringify(dto),
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            console.log('Score added!');
        }).error(function (data, status, headers, config) {
            console.log('Error when adding score!');
        });
    }

    public
    getAllScores():Model.MatchScoreDTO[] {
        return [
            {
                date: new Date('2015-09-05'),
                homeTeamScore: {
                    players: [
                        {
                            firstName: 'Jan',
                            lastName: 'Nowak',
                            nickname: 'Nowik'
                        },
                        {
                            firstName: 'Rafcio',
                            lastName: 'Klekot',
                            nickname: 'Nowaczek'
                        }
                    ],
                    team: 'Real Madryt',
                    score: 4
                },
                guestTeamScore: {
                    players: [{
                        firstName: 'Stefan',
                        lastName: 'Czop',
                        nickname: 'Czopik'
                    }],
                    team: 'Manchester United',
                    score: 2
                }
            },
            {
                date: new Date('2014-09-05'),
                homeTeamScore: {
                    players: [{
                        firstName: 'Pawko',
                        lastName: 'Nowakowski',
                        nickname: 'Nowaczek'
                    }],
                    team: 'Real Madryt',
                    score: 3
                },
                guestTeamScore: {
                    players: [{
                        firstName: 'Rafcio',
                        lastName: 'Klekot',
                        nickname: 'Nowaczek'
                    }],
                    team: 'Manchester United',
                    score: 3
                }
            }
        ];
    }
}
