export interface IMainScope extends ng.IScope {
    activeMenuItem: string;
    menuItems: MenuItem[];
}

export class MenuItem {
    public name: string;
    public url: string;
}

export class MainController {

    public static $inject = [
        '$scope',
        '$resource',
        '$mdSidenav',
        '$location'
    ];

    constructor(private $scope: IMainScope,
                private $resource: ng.resource.IResourceService,
                private $mdSidenav: angular.material.ISidenavObject,
                private $location: angular.ILocationService) {
        $scope.activeMenuItem = 'Strona główna';
        $scope.menuItems = [
            { name: 'Wyniki', url: 'scores'},
            { name: 'Tabela', url: 'table'},
            { name: 'Użytkownicy', url: 'users'}
        ];
        this.pickSelectedMenuItem();
    }

    public pickSelectedMenuItem(): void {
        var urlMenuItem = this.$location.path();

        console.log(urlMenuItem);
    }

    /**
     * First hide the bottomsheet IF visible, then
     * hide or Show the 'left' sideNav area
     */
    public toggleList(): void {
        this.$mdSidenav('left').toggle();
    }

    public goToMenuItem(menuItem: MenuItem): void {
        this.$scope.activeMenuItem = menuItem.name;
        this.$location.path(menuItem.url);
    }
}
