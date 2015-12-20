import Model = require('./../scores.model')
import Services = require('./../scores.service')
import PlayersServices = require('./../../players/players.service')
import PlayersModels = require('./../../players/players.model')

export interface IAddScoreScope extends ng.IScope {
    vm: AddScoreController;
    formData: Model.AddScoreFormData;
    guestPlayers: Model.Autocomplete;
    homeTeamAutocomplete: Model.Autocomplete;
    guestTeamAutocomplete: Model.Autocomplete;
}

export class AddScoreController {

    public tableParams:any;
    public allPlayers:PlayersModels.PlayerDTO[];
    private teams: string[];

    public static $inject = [
        '$scope',
        'ScoresService',
        '$location',
        'PlayersService'
    ];

    constructor(private $scope:IAddScoreScope,
                private scoresService:Services.ScoresService,
                private $location:ng.ILocationService,
                private playersService:PlayersServices.PlayersService) {
        $scope.vm = this;
        $scope.formData = new Model.AddScoreFormData();
        $scope.formData.date = new Date();
        $scope.formData.homeTeamPlayers = [];
        $scope.formData.guestTeamPlayers = [];

        this.loadDictionaries();
    }

    private loadDictionaries(): void {
        var that:AddScoreController = this;

        this.playersService.getAllPlayers().success(function (data:PlayersModels.PlayerDTO[]) {
            that.allPlayers = data;
        });

        this.scoresService.getTeams().success(function (teams:string[]) {
            that.teams = teams;
        });
    }

    addScore():void {
        this.$scope.formData.homeTeamName = this.$scope.homeTeamAutocomplete.searchText;
        this.$scope.formData.guestTeamName = this.$scope.guestTeamAutocomplete.searchText;
        this.$scope.formData.homeTeamPlayers = _.map(this.$scope.formData.homeTeamPlayers, this.nicknameExtractor);
        this.$scope.formData.guestTeamPlayers = _.map(this.$scope.formData.guestTeamPlayers, this.nicknameExtractor);
        this.scoresService.addScore(this.$scope.formData);
    }

    private nicknameExtractor(player: PlayersModels.PlayerDTO): string {
        return player.nickname;
    }

    public teamsQuerySearch(query:string):string[] {
        var results = query ? this.teams.filter(this.createTeamFilterFor(query)) : [];
        return results;
    }

    private createTeamFilterFor(query: string) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(team: string) {
            return (angular.lowercase(team).indexOf(lowercaseQuery) !== -1);
        };
    }

    public querySearch(query:string):PlayersModels.PlayerDTO[] {
        var results = query ? this.allPlayers.filter(this.createFilterFor(query)) : [];
        return results;
    }

    private createFilterFor(query: string) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(player: PlayersModels.PlayerDTO) {
            return (angular.lowercase(player.nickname).indexOf(lowercaseQuery) !== -1);
        };
    }
}
