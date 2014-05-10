angular.module('sailng.messages', [
])

    .config(function config($stateProvider) {
        $stateProvider.state('messages', {
            url: '/messages',
            views: {
                "main": {
                    controller: 'MessagesCtrl',
                    templateUrl: 'messages/index.tpl.html'
                }
            }
        });
    })

    .controller('MessagesCtrl', function MessagesController($scope, $sails, lodash, config, titleService, MessageModel, $filter, ngTableParams) {
        //, $timeout, $animation)
        titleService.setTitle('Messages');

//        $scope.autoChanges = true;
//        $scope.time = '400';
//
//        function watchFn() {
//            applyCss(generateCss(getCssObj($scope)))
//        }
//
//        $scope.$watch('time', watchFn);
//        $timeout(function () {
//            applyCss(generateCss(getCssObj($scope)));
//        }, 100);
//
//        $scope.showCss = function () {
//            alert(generateCss(getCssObj($scope)));
//        }
//
//        $timeout(function () {
//            $scope.poolVector = poolVector;
//            var startRange = getRandomInt($scope.poolVector.length - nrStartItens);
//            $scope.names = $scope.poolVector.slice(startRange, startRange + nrStartItens);
//            console.log(' $scope.names ', $scope.names)
//            $scope.poolVector.splice(startRange, nrStartItens);
//            $timeout(doSomething, 500 + getRandomInt(1000) + TryParseInt($scope.time, 1000));
//        }, 1000);
//        var last = getRandomInt(1);
//
//        function doSomething() {
//            if ($scope.autoChanges && $('.modal:visible').length == 0) {
//                if (last == 0) {
//                    removeName();
//                    last = 1;
//                } else {
//                    addName();
//                    last = 0;
//                }
//            }
//            $timeout(doSomething, 500 + getRandomInt(1000) + TryParseInt($scope.time, 1000));
//        }
//
//        function removeName() {
//            if ($scope.names.length > 5) {
//
//                var maxItens = $scope.names.length;
//                maxItens = maxItens > 4 ? 4 : maxItens;
//                var qtdItens = getRandomInt(maxItens) + 1;
//
//                for (var i = 0; i < qtdItens; i++) {
//                    var index = getRandomInt($scope.names.length - 1);
//                    $scope.poolVector.push.apply($scope.poolVector, $scope.names.splice(index, 1));
//                }
//            } else {
//                addName();
//            }
//        }
//
//        function addName() {
//            if ($scope.poolVector.length > 4) {
//                if ($scope.names.length < 12) {
//
//                    var maxItens = $scope.poolVector.length;
//                    maxItens = maxItens > 4 ? 4 : maxItens;
//                    var qtdItens = getRandomInt(maxItens) + 1;
//
//                    for (var i = 0; i < qtdItens; i++) {
//                        var poolVar = $scope.poolVector.pop();
//                        var namesIndex = getRandomInt($scope.names.length);
//                        $scope.names.splice(namesIndex, 0, poolVar);
//                    }
//                } else {
//                    removeName();
//                }
//            }
//        }
//
//        var poolVector = [
//            'Geoff Goodman',
//            'John Rober',
//            'Tom Davis'
//        ];
//        console.log(' $scope.poolVector ', poolVector)
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
        $scope.getmoment = function () {

            alert(moment().fromNow());
            messagecalc = moment().fromNow();
            //return moment().fromNow();
        }

        $scope.disabled = function (disabled) {
            $scope.disabled = !$scope.disabled
        }

//turn on the animation
        $scope.myAnimation = { enter: 'cool-enter', leave: 'cool-leave' };

//change the animation
        $scope.myAnimation = { enter: 'uncool-enter', leave: 'uncool-leave' };

//remove the animation
        $scope.myAnimation = null;

        $sails.on('message', function (envelope) {
//            console.log('in envelope  ',envelope)
//            console.log('in MessagesCtrl sailson ',envelope.verb)
            switch (envelope.verb) {
                case 'created':
                    $scope.messages.unshift(envelope.data);
                    console.log('envelope.data:: ', envelope.data.comoboday, envelope.data)
                    $scope.tableParams.data = $scope.messages;
                    $scope.tableParams.reload();
                    //               if( $scope.tableParams.settings().groupBy === 'comboday')
                    //               { $scope.tableParams.settings().groupBy = 'title';
                    //               } else $scope.tableParams.settings().groupBy = 'comboday';// this works

                    break;
                case 'destroyed':
                    lodash.remove($scope.messages, {id: envelope.id});
                    $scope.tableParams.data = $scope.messages;
                    $scope.tableParams.reload();
                    break;
                case 'updated': //
                    //lodash.remove($scope.messages, {id: envelope.id});
                    console.log('in MessagesCtrl updated ', envelope.status, envelope.id, envelope)

                    //   lodash.update($scope.messages, {id: envelope.id});

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
            // check here if this message belongs to the currentUser

//            if (message.user.id === config.currentUser.id || config.currentUser.role === '4') {
            // alert(message)
            if ( message.status===5 ) return;
            if (config.currentUser.role === '4') {

                MessageModel.delete(message).then(function (model) {
                    // message has been deleted, and removed from $scope.messages
                });
            } else if ((message.user.id === config.currentUser.id || config.currentUser.role === '4') && (message.status === 1)) {

                MessageModel.delete(message).then(function (model) {
                    // message has been deleted, and removed from $scope.messages
                });

            } else if ((message.user.id === config.currentUser.id ) && (message.status === 1)) {
                // car is not in open status
                MessageModel.delete(message).then(function (model) {
                    // message has been deleted, and removed from $scope.messages
                });
            } else {

                console.log('in stat 5 ', $scope.stats[message.status].name)
                message.status = 5;
                message.title += ' currently '+  $scope.stats[message.status].name;

                MessageModel.update(message).then(function (model) {
                    // message has been deleted, and removed from $scope.messages
                });
            }
        };

//        $scope.destroyMessage = function(message) {
//            // check here if this message belongs to the currentUser
//            //ng-show="currentUser.id === message.user.id || currentUser.role==='4'"><i class="fa fa-trash-o"></i></button>
//            if (message.user.id === config.currentUser.id || config.currentUser.role === '4') {
//                MessageModel.delete(message).then(function(model) {
//                    // message has been deleted, and removed from $scope.messages
//                });
//            }
//        };



        $scope.fetchMessage = function (message) {
            // check here if this message belongs to the currentUser
//            if (message.user.id === config.currentUser.id) {
            if (config.currentUser.role === '4') {

                message.status = 2;
                MessageModel.update(message).then(function (model) {
                    // message has been deleted, and removed from $scope.messages
                });
            }
        };
        $scope.fetchedMessage = function (message) {
            // check here if this message belongs to the currentUser
//            if (message.user.id === config.currentUser.id) {
            if (config.currentUser.role === '4') {

                message.status = 3;
                MessageModel.update(message).then(function (model) {
                    // message has been deleted, and removed from $scope.messages
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
// var   messPromise =  MessageModel.getAll($scope);
// messPromise.then(function (models) {

        MessageModel.getAll($scope).then(function (models) {
            $scope.messages = models;
            var data = $scope.messages;
            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 25,          // count per page
                sorting: {
                    //  comboday: 'asc'     // initial sorting
                    cardate: 'asc'
                }
            }, {
                groupBy: 'comboday',//'cdate',//moment('cardate').format('MM/DD/YYYY'), //    'cardate',//'title',//'comboday', //cardate
                total: data.length,
                getData: function ($defer, params) {
                    var orderedData = params.sorting() ?
                        $filter('orderBy')(data, $scope.tableParams.orderBy()) :
                        data;
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
        });

        $scope.today = function () {
            $scope.newMessage.cardate = new Date();
        };
        $scope.today();

        $scope.showWeeks = true;
        $scope.toggleWeeks = function () {
            $scope.showWeeks = !$scope.showWeeks;
        };

        $scope.clear = function () {
            $scope.newMessage.cardate = null;
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

//$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
//$scope.format = $scope.formats[0];

        $scope.format = "EEE MM/dd/yyyy";

        $scope.newMessage.cartime = new Date();

        $scope.hstep = 1;
        $scope.mstep = 15;

        $scope.options = {
            hstep: [1, 2, 3],
            mstep: [1, 5, 10, 15, 25, 30]
        };

        $scope.ismeridian = true;
        $scope.toggleMode = function () {
            $scope.ismeridian = !$scope.ismeridian;
        };

        $scope.update = function () {
            var d = new Date();
            d.setHours(14);
            d.setMinutes(0);
            $scope.newMessage.cartime = d;
        };

        $scope.changed = function () {
            console.log('Time changed to: ' + $scope.newMessage.cartime);
        };

        $scope.clear = function () {
            $scope.newMessage.cartime = null;
        };

        $scope.checkEvent = function (row) {
            //      $scope.selectedRow = row;
            alert('row ' + row)
        };
        $scope.changeSelection = function (message) {
            console.info(message);
        }
    })
;