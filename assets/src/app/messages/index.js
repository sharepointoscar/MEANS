angular.module( 'sailng.messages', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'messages', {
		url: '/messages',
		views: {
			"main": {
				controller: 'MessagesCtrl',
				templateUrl: 'messages/index.tpl.html'
			}
		}
	});
})

.controller( 'MessagesCtrl', function MessagesController( $scope, $sails, lodash, config, titleService, MessageModel ) {
	titleService.setTitle('Messages');
	$scope.newMessage = {};
	$scope.messages = [];
	$scope.currentUser = config.currentUser;

   // see  assets/src/common/models/Message.js
	$sails.on('message', function (envelope) {
		switch(envelope.verb) {
			case 'created':
				$scope.messages.unshift(envelope.data);
				break;
			case 'destroyed':
				lodash.remove($scope.messages, {id: envelope.id});
				break;
            case 'updated': //
                // just update 1 rec
                for (var i in $scope.messages) {
                    if ($scope.messages[i].id == envelope.id) {
                        $scope.messages[i].title = envelope.data.title;
                    }
                }

                break;

        }
    });

        $scope.updateMessage = function(message) {
         //   if (config.currentUser.role === '4') {
                message.title += ' added text';
                MessageModel.update(message).then(function(model) {
               });
           // }
        };

	$scope.destroyMessage = function(message) {
		// check here if this message belongs to the currentUser
		if (message.user.id === config.currentUser.id) {
			MessageModel.delete(message).then(function(model) {
				// message has been deleted, and removed from $scope.messages
			});
		}
	};

	$scope.createMessage = function(newMessage) {
		newMessage.user = config.currentUser.id;

		MessageModel.create(newMessage).then(function(model) {
			$scope.newMessage = {};
		});
	};

	MessageModel.getAll($scope).then(function(models) {
		$scope.messages = models;
	});


    });