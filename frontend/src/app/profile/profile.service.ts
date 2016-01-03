import Model = require('./profile.model')

export class ProfileService {
    static $inject = ['$resource', '$http', '$location'];

    constructor(
                public $resource:ng.IResourceService,
                public $http:ng.IHttpService,
                public $location:ng.ILocationService) {
    }
}
