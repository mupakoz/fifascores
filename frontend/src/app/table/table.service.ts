import Model = require('./table.model')

export class TableService {
    static $inject = ['$resource', '$http', '$location'];

    constructor(
                public $resource:any,
                public $http:ng.IHttpService,
                public $location:ng.ILocationService) {
    }

    public getTableData(): Model.TableDTO {
        return this.$http({
            url: '/api/table',
            method: "GET"
        });
    }
}
