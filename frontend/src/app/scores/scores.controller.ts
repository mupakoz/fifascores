import Model = require('./scores.model')
import Services = require('./scores.service')

export interface IScoresScope extends ng.IScope {
    data: Model.MatchScoreDTO[];
    fields: Model.TableField[];
    firstNameTest: string;
    vm: ScoresController;
    query: any;
    selectedRow: any;
    paginationLabel: string;
}

export class ScoresController {

    public tableParams:any;

    public static $inject = [
        '$scope',
        'ScoresService',
        '$location',
        '$mdDialog'
    ];

    constructor(private $scope:IScoresScope,
                private scoresService:Services.ScoresService,
                private $location:ng.ILocationService,
                private $mdDialog) {
        $scope.vm = this;
        var that = this;

        this.reloadScores(this);

        $scope.query = {
            filter: '',
            order: 'date',
            limit: 5,
            page: 1
        };

        $scope.selectedRow = [];

        $scope.paginationLabel = { text: 'Wierszy na stronę:' };
    }

    public addScore():void {
        this.$location.path('/scores/add');
    }

    public reloadScores(that: ScoresController): void {
        that.scoresService.getAllScores().success(function (data) {
            _.forEach(data, function (matchData: Model.MatchScoreDTO) {
                matchData.homeTeamWon = matchData.homeTeamScore.score > matchData.guestTeamScore.score;
                matchData.guestTeamWon = matchData.guestTeamScore.score > matchData.homeTeamScore.score;
                matchData.isDraw = !matchData.homeTeamWon && !matchData.guestTeamWon;
            });

            that.$scope.data = data;
        }).error(function () {
            console.log('Error when receiving data!');
        });
    }

    public confirmDelete(ev,id:string):void {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = this.$mdDialog.confirm()
            .title('Potwierdź usunięcie wyniku')
            .content('Czy jesteś pewny że chcesz usunąć ten wynik?')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Tak!')
            .cancel('Nie...');

        var that: ScoresController = this;
        this.$mdDialog.show(confirm).then(function () {
            that.delete(id);
        });
    }

    public delete(id: string): void {
        var that = this;
        var deleteScorePromise = this.scoresService.delete(id);
        deleteScorePromise.success(function (data, status, headers, config) {
            console.log('Score deleted!');
            that.reloadScores(that);
        }).error(function (data, status, headers, config) {
            console.log('Error when deleting score!');
        });
    }
}
