'use strict';

angular.module('corianderApp')
  .controller('TwitterCtrl', function ($scope) {
	var tweets = $scope.tweets = [];

	$scope.newTweet = '';
	$scope.editedTweet = null;

  	$scope.addTweet = function(tweet) {
  		$scope.tweets.push(tweet);

  		var newTweet = $scope.newTweet.trim();
		if (!newTweet.length) {
			return;
		}

		tweets.push({
			message: newTweet,
			completed: false
		});

		$scope.newTweet = '';

  	}

	$scope.editTweet = function (tweet) {
		$scope.editedTweet = tweet;
		// Clone the original todo to restore it on demand.
		$scope.originalTweet = angular.extend({}, tweet);
	};

	$scope.doneEditing = function (tweet) {
		$scope.editedTweet = null;
		tweet.message = tweet.message.trim();

		if (!tweet.message) {
			$scope.removeTweet(tweet);
		}
	};

	$scope.revertEditing = function (tweet) {
		tweets[tweets.indexOf(tweet)] = $scope.originalTweet;
		$scope.doneEditing($scope.originalTweet);
	};

	$scope.removeTweet = function (tweet) {
		tweets.splice(tweets.indexOf(tweet), 1);
	};  	

  });
