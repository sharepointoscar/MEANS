angular.module('models.todo', ['lodash', 'services', 'ngSails'])

    .service('TodoModel',['$q', 'lodash', 'utils', '$sails', function($q, lodash, utils, $sails) {
        this.getAll = function() {
            console.log ('TodoModel ')
            var deferred = $q.defer();
            var url = utils.prepareUrl('todo');
            $sails.get(url, function(models) {
                return deferred.resolve(models);
            });
            return deferred.promise;
        };

        this.create = function(newModel) {
            var deferred = $q.defer();
            var url = utils.prepareUrl('todo');
            $sails.post(url, newModel, function(model) {
                return deferred.resolve(model);
            });
            return deferred.promise;
        };

        this.delete = function(model) {
            var deferred = $q.defer();
            var url = utils.prepareUrl('todo/' + model.id);
            $sails.delete(url, function(model) {
                return deferred.resolve(model);
            });
            return deferred.promise;
        };

        this.update = function(modelu) {
            var deferred = $q.defer();
            var url = utils.prepareUrl('todo');
            console.log ('modelu ',modelu);

            $sails.put(url, modelu, function(model) {
                console.log ('after ',modelu);

                return deferred.resolve(model);
            });

            return deferred.promise;
        };

    }]);
