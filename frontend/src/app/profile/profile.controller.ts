import Model = require('./profile.model')
import Services = require('./profile.service')

export interface IProfileScope extends ng.IScope {
    vm: ProfileController;
    playerName: string;
    barData: any;
}

export class ProfileController {
    public static $inject = [
        '$scope',
        'ProfileService',
        '$stateParams'
    ];

    constructor(private $scope:IProfileScope,
                private profileService: Services.ProfileService,
                private $stateParams) {
        $scope.vm = this;
        var that: ProfileController = this;

        $scope.playerName = $stateParams.playerName;

        $scope.barData = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            series: [
                [1, 3, 3, 2, 5]
            ]
        };
    }
}
