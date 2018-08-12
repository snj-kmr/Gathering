var app = angular.module('gathering.home', [
	'ui.router',
	'ngMaterial',
        'ghangout.users',
        // 'ghangout.contacts',
        // 'ghangout.groups',
	//'ghangout.webPage',
        'ghangout.webPageFront',
	'ghangout.faq',
	'ghangout.problem'

]);

app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
                .state('home', {
			url: "/",
			templateUrl: "/home/templates/index.html",
			controller: 'webPagesCtrl',
		})
               
	$urlRouterProvider.otherwise("/");
});
app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
                .state('faqs', {
			url: "/faqs",
			templateUrl: "/home/templates/faq-service.html",
			controller: 'faqsCtrl',
		})
               
	$urlRouterProvider.otherwise("/");
});
app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
                .state('faq', {
			url: "/faq",
			templateUrl: "/home/templates/faq-customer.html",
			controller: 'faqCtrl',
//                        resolve: {
//                            groupsList: function(Groups){
//                                    return Groups.all().then(function(data){
//                                        console.log('1')
//                                        console.log(data)
//                                            return data;
//                                    });
//                            }
//			}
		})
               
	$urlRouterProvider.otherwise("/");
});
app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('form', {
			url: '/form',
			templateUrl: '/home/templates/form.html',
			controller: 'addFormCtrl'
		})
			$urlRouterProvider.otherwise("/");
});

app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('technical', {
			url: '/technical',
			templateUrl: '/home/templates/technical.html',
			controller: 'technicalCtrl'
		})
			$urlRouterProvider.otherwise("/");
});

app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('recomand', {
			url: '/recomand',
			templateUrl: '/home/templates/recomand.html',
			controller: 'recomandCtrl'
		})
			$urlRouterProvider.otherwise("/");
});