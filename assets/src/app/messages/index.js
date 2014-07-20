angular.module('sailng.messages', [
])
/*            }
 */
  //  .config(function config($stateProvider) {
    .config( ['$stateProvider',function config( $stateProvider ) {

        $stateProvider.state('messages', {
            url: '/messages',
            views: {
                "main": {
                    controller: 'MessagesCtrl',
                    templateUrl: 'messages/index.tpl.html'
                }
            }
        });
    }])
        .controller( 'MessagesCtrl', ['$scope', '$sails', 'lodash', 'config', 'titleService', 'MessageModel','$filter',
        'ngTableParams','$location',
        function MessagesController( $scope, $sails, lodash, config, titleService, MessageModel,$filter, ngTableParams,$location ) {

        titleService.setTitle('Messages');
        $scope.newMessage = {};
        $scope.messages = [];
        $scope.currentUser = config.currentUser;
        console.log('scope.currentUser.data:: ', $scope.currentUser)

        $scope.stats = [
            {name: 'null', value: 0},
            {name: 'open', value: 1},
            {name: 'fetching', value: 2},
            {name: 'fetched', value: 3},
            {name: 'out', value: 4},
            {name: 'canceled', value: 5}

        ];

//turn on the animation
            $scope.myAnimation = { enter: 'cool-enter', leave: 'cool-leave' };

//change the animation
            $scope.myAnimation = { enter: 'uncool-enter', leave: 'uncool-leave' };

//remove the animation
            $scope.myAnimation = null;

        $scope.disabled = function (disabled) {
            $scope.disabled = !$scope.disabled
        }

//turn on the animation
        $scope.myAnimation = { enter: 'cool-enter', leave: 'cool-leave' };

//change the animation
        $scope.myAnimation = { enter: 'uncool-enter', leave: 'uncool-leave' };

//remove the animation
        $scope.myAnimation = null;
            if ($scope.currentUser===undefined){
                // alert('You must login to view')
                $location.path('/');

                //window.location = '/';exit;
            }



            $sails.on('message', function (envelope) {

                switch (envelope.verb) {
                    case 'created':
                        $scope.messages.unshift(envelope.data);
                        console.log('envelope.data:: ', envelope.data.comoboday, envelope.data)
                        $scope.tableParams.data = $scope.messages;
                        $scope.tableParams.reload();
                        break;
                    case 'destroyed':
                        lodash.remove($scope.messages, {id: envelope.id});
                        $scope.tableParams.data = $scope.messages;
                        $scope.tableParams.reload();
                        break;
                    case 'updated': //
                        //lodash.remove($scope.messages, {id: envelope.id});
                        console.log('in MessagesCtrl updated ', envelope.status, envelope.id, envelope)
                        for (var i in $scope.messages) {
                            if ($scope.messages[i].id == envelope.id) {
                                $scope.messages[i].status = envelope.data.status;
                                if (  envelope.data.title !== undefined )   $scope.messages[i].title = envelope.data.title;
                            }
                        }
                        $scope.tableParams.data = $scope.messages;
                        $scope.tableParams.reload();
                        break;
                }
            });

            $scope.destroyMessage = function (message) {
                if (config.currentUser.role === '4') {
                    MessageModel.delete(message).then(function (model) {
                        // message has been deleted, and removed from $scope.messages
                    });
                } else if ((message.user.id === config.currentUser.id || config.currentUser.role === '4') && (message.status === 1)) {

                    MessageModel.delete(message).then(function (model) {
                        // message has been deleted, and removed from $scope.messages
                    });

                } else if ((message.user.id === config.currentUser.id ) && (message.status === 1)) {
                    MessageModel.delete(message).then(function (model) {
                        // message has been deleted, and removed from $scope.messages
                    });
                }
            };


            $scope.fetchMessage = function (message) {
                if (config.currentUser.role === '4') {
                    message.status = 2;
                    MessageModel.update(message).then(function (model) {
                    });
                }
            };
            $scope.fetchedMessage = function (message) {
                if (config.currentUser.role === '4') {
                    message.status = 3;
                    MessageModel.update(message).then(function (model) {
                    });
                }
            };
            $scope.createMessage = function (newMessage) {
                newMessage.user = config.currentUser.id;
                newMessage.status = 1;
                console.log('createMessage:: ', newMessage.cdate, newMessage)
                MessageModel.create(newMessage).then(function (model) {
                    $scope.newMessage.title = '';

                });
            };

//            MessageModel.getAll($scope).then(function(models) {
//
//
//                $scope.messages =  models.data;
//                var data =$scope.messages;
//                console.log('data ',data)
//                $scope.tableParams = new ngTableParams({
//                    page: 1,            // show first page
//                    count: 25,          // count per page
//                    sorting: {
//                        //  comboday: 'asc'     // initial sorting
//                        title: 'asc'
//                    }
//                }, {
//                    total: data.length,
//                    getData: function($defer, params) {
//                        var orderedData = params.sorting() ?
//                            $filter('orderBy')(data, $scope.tableParams.orderBy()) :
//                            data;
//                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
//                    }
//
//
//                });
//            });
//
            MessageModel.getAll($scope).then(function(models) {
                $scope.messages = models.data;
                var data =$scope.messages;
                console.log('data ',data)
                $scope.tableParams = new ngTableParams({
                    page: 1,            // show first page
                    count: 25,          // count per page
                    sorting: {
                        //  comboday: 'asc'     // initial sorting
                        title: 'asc'
                    }
                }, {
                    total: data.length,
                    getData: function($defer, params) {
                        var orderedData = params.sorting() ?
                            $filter('orderBy')(data, $scope.tableParams.orderBy()) :
                            data;
                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
            });




//-----------------------

        $scope.today = function () {
            $scope.newMessage.cardate = new Date();
        };
        $scope.today();

        $scope.showWeeks = true;
        $scope.toggleWeeks = function () {
            $scope.showWeeks = !$scope.showWeeks;
        };

        $scope.clear = function () {
            $scope.newMessage.date = null;
        };

// Disable weekend selection
        $scope.disabled = function (date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMin = function () {
            $scope.minDate = ( $scope.minDate ) ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            'year-format': "'yy'",
            'starting-day': 1
        };

        $scope.format = "EEE MM/dd/yyyy";

        $scope.newMessage.cartime = new Date();


        $scope.ismeridian = true;
        $scope.toggleMode = function () {
            $scope.ismeridian = !$scope.ismeridian;
        };

        $scope.update = function () {
           // var d = new Date();

         //   $scope.newMessage.date = d;
        };

        $scope.changed = function () {
            console.log('Time changed to: ' + $scope.newMessage.date);
        };

        $scope.clear = function () {
            $scope.newMessage.date = null;
        };

        $scope.checkEvent = function (row) {
            //      $scope.selectedRow = row;
            alert('row ' + row)
        };
        $scope.changeSelection = function (message) {
            console.info(message);
        }
    }])
;