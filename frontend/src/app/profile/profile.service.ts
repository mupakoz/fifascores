import Model = require('./profile.model')

export class ProfileService {
    static $inject = ['$resource', '$http', '$location'];

    constructor(
                public $resource:ng.IResourceService,
                public $http:ng.IHttpService,
                public $location:ng.ILocationService) {
    }

    public getProfile(nickname: string) {
        return this.$http({
            url: '/api/profile/' + nickname,
            method: "GET"
        });
    }
}
