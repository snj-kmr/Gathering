/*WebPages*/
app.controller('webPagesCtrl', function ($scope, webPageFront, $rootScope, Users, $translate) {
$rootScope.language = 'en';
$rootScope.bodylayout = 'english';
    $scope.data = {}
    webPageFront.all().then(function (data) {
        $scope.text = data[0];
        $scope.texts = data[0];
    });
     $scope.changeLanguage = function (langKey) {
       $translate.use(langKey);
       $rootScope.language = langKey;
       if(langKey=='ar') {
                 $rootScope.bodylayout = 'arabic';
        }
        else {
             $rootScope.bodylayout = 'english';
         }
      //console.log($rootScope.language) 
    };

    Users.all().then(function (data) {
        $scope.businesses = [];
        for (var i in data) {
            if (data[i].role == "vendor") {
                $scope.businesses.push(data[i])
            }
        }
    });
});

// Service provider FAQS
app.controller('faqsCtrl', function ($scope, faqs, $translate, $rootScope, webPageFront) {
$rootScope.language = 'en';
 $rootScope.bodylayout = 'english';
$scope.texts = {};
$scope.data = {}
    webPageFront.all().then(function (data) {
        $scope.texts = data[0];
    });
     faqs.find({'type': "service"}).then( function(data) {
     $scope.data_new = data;       
        });

 $scope.changeLanguage = function (langKey) {  
       $rootScope.language = langKey;
//       var body = document.getElementsByTagName('body')[0];
//            angular.element(body);
//            console.log("abc");
//            console.log(body);
        if(langKey=='ar') {
                 $rootScope.bodylayout = 'arabic';
        }
        else {
             $rootScope.bodylayout = 'english';
         }
    };
});

// Customer provider FAQS
app.controller('faqCtrl', function ($scope, webPageFront, faqs, $translate, $rootScope) {
    $rootScope.language = 'en';
     $rootScope.bodylayout = 'english';
$scope.texts = {};
$scope.data = {}
    webPageFront.all().then(function (data) {
        $scope.texts = data[0];
    });
  //console.log(faqs)
     faqs.find({'type': "customer"}).then( function(data) {
     $scope.data_new = data;    
        });
 $scope.changeLanguage = function (langKey) {
       $rootScope.language = langKey;
        if(langKey=='ar') {
                 $rootScope.bodylayout = 'arabic';
        }
        else {
             $rootScope.bodylayout = 'english';
         }
    };
});

/* Registeration Form*/
app.controller('addFormCtrl', function ($scope, Users, webPageFront, $rootScope) {
    $rootScope.language = 'en';
    $rootScope.bodylayout = 'english';
    $scope.text = {}
    $scope.data = {}
    webPageFront.all().then(function (data) {
        $scope.texts = data[0];
    });
    $scope.addForm = function () {
       // console.log(this.text);
        $scope.newUser = {};
        $scope.newUser = this.text;
        Users.addnew($scope.newUser).then(function (res) {
            console.log(res);
            //alert(res.message);
            setTimeout(function(){ 
            window.location.reload();
        }, 5000);
        });
   // this.text = {};
    }
$scope.changeLanguage = function (langKey) {
       $rootScope.language = langKey;
        if(langKey=='ar') {
                 $rootScope.bodylayout = 'arabic';
        }
        else {
             $rootScope.bodylayout = 'english';
         }
    }; 
});

// Technical problem
app.controller('technicalCtrl', function ($scope, webPageFront, problem, $translate, $rootScope) {
    $rootScope.language = 'en';
    $rootScope.bodylayout = 'english';
//$scope.texts = {};
$scope.data = {}
    webPageFront.all().then(function (data) {
        $scope.texts = data[0];
    });
  //console.log(problem)
    $scope.technical = function () {
        console.log(this.text)
        $scope.newPost = {};
         $scope.newPost = this.text;
        $scope.newPost.type = "technical";
        problem.add($scope.newPost).then(function (res) {
           // alert('Added Successfully');
           setTimeout(function(){ 
            window.location.reload();
        }, 5000);
    });
    //this.text = {};
    }
 $scope.changeLanguage = function (langKey) {
       $rootScope.language = langKey;
       if(langKey=='ar') {
                 $rootScope.bodylayout = 'arabic';
        }
        else {
             $rootScope.bodylayout = 'english';
         }
//      console.log($rootScope.language) 
    };
});

// Recommendation, Complaint and Question
app.controller('recomandCtrl', function ($scope, webPageFront, problem, $translate, $rootScope) {
    $rootScope.language = 'en';
    $rootScope.bodylayout = 'english';
//$scope.texts = {};
$scope.data = {}
    webPageFront.all().then(function (data) {
        $scope.texts = data[0];
    });
  //console.log(problem)
 $scope.changeLanguage = function (langKey) {
       $rootScope.language = langKey;
       if(langKey=='ar') {
                 $rootScope.bodylayout = 'arabic';
        }
        else {
             $rootScope.bodylayout = 'english';
         }
//      console.log($rootScope.language) 
    };

      $scope.recomand = function () {
         console.log(this.text)
        $scope.newPost = {};
        $scope.newPost = this.text;
        $scope.newPost.type = "recomand";
        problem.add($scope.newPost).then(function (res) {
           // alert('Added Successfully');
           setTimeout(function(){ 
            window.location.reload();
        }, 5000);
        });
       // this.text = {};
    };
});

