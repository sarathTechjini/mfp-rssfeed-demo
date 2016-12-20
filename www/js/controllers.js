angular.module('starter.controllers', [])

.controller('NewsCtrl', ["$scope", "MFPInit", "$http", "getNewsService", function($scope, MFPInit, $http,getNewsService) {

    this.apiKey="e8e0a7e1e655407ea5d36313df5df90c";
    this.url="https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=";
    $scope.newsData=[];
    MFPInit.then(function() {
      // WL.App.getServerUrl(function(url) {
      //   $scope.serverurl = url;
      // });
      if(typeof MFPPush !== 'undefined'){
        MFPPush.initialize(
          function(successResponse) {
            console.log("Initialized",successResponse);
            MFPPush.registerNotificationsCallback(notificationReceived);
        }, function(failureResponse) {
            alert("Failed to initialize");
        });
      }
    });
    $scope.$on('$ionicView.enter', function() {
      MFPInit.then(function() { WL.Analytics.log({ AppView: 'MFPF' }, "visit mfpf view"); console.log("mfpf view enter") });
    });

    function greetAdapter() {
      try {
        var resourceRequest = new WLResourceRequest(
          "/adapters/JavaAdapter/resource/status",
          WLResourceRequest.GET
        );
        // resourceRequest.setQueryParameter("name", "Ajay");

        resourceRequest.send().then(
          function(response) {
            console.log(response);
          },
          function(response) {
            console.log(response);
          });
      } catch(e) {
        setTimeout(function(){
          greetAdapter();
        },1000);
      }
      
    }

    function getNews() {
      getNewsService.getAllNews()
        .then(function(res){
          $scope.newsData=res;
        });
    }

    $scope.openTab=function() {

    }

    this.getNews=getNews;
    // $scope.greetAdapter = greetAdapter;
    greetAdapter();

}])

.controller('VideosCtrl', function($scope, getNewsService) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // $scope.chats = getNewsService.all();
  // $scope.remove = function(chat) {
  //   Chats.remove(chat);
  // };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, getNewsService) {
  console.log("inside");
  $scope.news = getNewsService.getNews($stateParams.chatId);
  console.log($scope.news);
})

.controller('SearchCtrl', function($scope) {

})

.controller('SettingsCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

  .run(function($rootScope, $ionicModal, $timeout, MFPInit) {
    try {
      console.log(wl_DirectUpdateChallengeHandler);
    } catch(err) {
      console.log(err);
    }
  });
  //   //MobileFirst Authentication setup
  //   var securityCheckName = 'UserLogin';

  //   MFPInit.then(function() {
  //     LoginChallenge = new WL.Client.createSecurityCheckChallengeHandler(securityCheckName);

  //     LoginChallenge.securityCheckName = securityCheckName;

  //     LoginChallenge.handleChallenge = function(response) {
  //       $rootScope.login();
  //     };

  //     LoginChallenge.processSuccess = function(data) {
  //       WL.Logger.debug("processSuccess");
  //       console.log("LoginChallenge.processSuccess");
  //     };

  //     LoginChallenge.handleFailure = function(error) {
  //       console.log("LoginChallenge.handleFailure");
  //     };


  //     $rootScope.doLogin = function() {
  //       console.log('Submitting LoginData', $rootScope.loginData.username);
  //       $rootScope.closeLogin();
        
  //       $timeout(function() {
  //         LoginChallenge.submitChallengeAnswer({
  //           'username': $rootScope.loginData.username,
  //           'password': $rootScope.loginData.password
  //         });
  //       }, 3000, false, [Pass]);
        
  //       LoginChallenge.submitChallengeAnswer({
  //         'username': $rootScope.loginData.username,
  //         'password': $rootScope.loginData.password
  //       });

  //     };


  //     $rootScope.doLogout = function() {
  //       WLAuthorizationManager.logout(securityCheckName).then(
  //         function() {
  //           WL.Logger.debug("logout onSuccess");
  //           location.reload();
  //         },
  //         function(response) {
  //           WL.Logger.debug("logout onFailure: " + JSON.stringify(response));
  //         });
  //     }
  //   });


  //   $rootScope.loginData = {};
  //   // Create the login modal that we will use later
  //   $ionicModal.fromTemplateUrl('templates/login.html', {
  //     scope: $rootScope
  //   }).then(function(modal) {
  //     $rootScope.modal = modal;
  //   });

  //   // Triggered in the login modal to close it
  //   $rootScope.closeLogin = function() {
  //     $rootScope.modal.hide();
  //   };

  //   // Open the login modal
  //   $rootScope.login = function() {
  //     $rootScope.modal.show();
  //   };

  // })