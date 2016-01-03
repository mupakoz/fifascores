import Model = require('./table.model')

export class TableService {
    static $inject = ['$resource', '$http', '$location'];

    constructor(
                public $resource:any,
                public $http:ng.IHttpService,
                public $location:ng.ILocationService) {
    }

    public getTableData(): ng.IHttpPromise<Model.TableDTO> {
        return this.$http({
            url: '/api/table',
            method: "GET"
        });
    }

    public getPairsTableData(): ng.IHttpPromise<Model.TableDTO> {
        return this.$http({
            url: '/api/table/pairs',
            method: "GET"
        });
    }

    public getSinglesMonthTableData(): ng.IHttpPromise<Model.TableDTO> {
        return this.$http({
            url: '/api/table/single/month',
            method: "GET"
        });
    }
}
