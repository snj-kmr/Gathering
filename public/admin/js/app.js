
var adminApp = angular.module('mean-blog.admin', [
	'ui.router',
	'btford.markdown',
	//	'mean-blog.posts',
	'ghangout.users',
	//	'ghangout.contacts',
	//	'ghangout.groups',
	'ghangout.categories',
	'ghangout.subcategories',
	'ghangout.products',
	'ghangout.termsnconditions',
	'ghangout.webPage',
	'ghangout.faq'
]);

adminApp.config(function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('dashboard', {
			url: '/',
			templateUrl: '/admin/templates/admin_index.html',
			controller: 'dashboardCtrl'
		})
		.state('userList', {
			url: '/userList',
			templateUrl: '/admin/templates/userList.html',
			resolve: {
				userList: function (Users) {
					return Users.all().then(function (data) {
						return data;
					});
				}
			},
			controller: 'AllUsersCtrl'
		})
		.state('addUser', {
			url: '/addUser',
			templateUrl: '/admin/templates/addUser.html',
			controller: 'addUserCtrl'
		})
		.state('editUser', {
			url: '/editUser/:paraml',
			templateUrl: '/admin/templates/editUser.html',
			controller: 'editUserCtrl'
		})
		.state('changePassword', {
			url: '/changepassword/:user_id',
			templateUrl: '/admin/templates/changepassword.html',
			controller: 'changepasswordCtrl'
		})

		.state('addCategory', {
			url: '/addCategory',
			templateUrl: '/admin/templates/addCategory.html',
			controller: 'AddCategoryCtrl',
			resolve: {
				userList: function (Users) {
					return Users.all().then(function (data) {
						return data;
					});
				}
			}
		})
		.state('categoryList', {
			url: '/categoryList',
			templateUrl: '/admin/templates/categoryList.html',
			controller: 'AllCategoriesCtrl',
			resolve: {
				categoryList: function (Categories) {
					return Categories.all().then(function (data) {
						return data;
					});
				}
			}
		})
		.state('addSubcategory', {
			url: '/addSubcategory',
			templateUrl: '/admin/templates/addSubcategory.html',
			controller: 'AddSubcategoryCtrl',
			resolve: {
				categoryList: function (Categories) {
					return Categories.all().then(function (data) {
						return data;
					});
				}
			}
		})
		.state('addProduct', {
			url: '/addProduct',
			templateUrl: '/admin/templates/addProduct.html',
			controller: 'AddProductCtrl',
			resolve: {
				categoryList: function (Categories) {
					return Categories.all().then(function (data) {
						return data;
					});
				},
				subcategoryList: function (Subcategories) {
					return Subcategories.allSub().then(function (data) {
						return data;
					});
				},
				userList: function (Users) {
					return Users.all().then(function (data) {
						return data;
					});
				}
			}
		})
		.state('addService', {
			url: '/addService',
			templateUrl: '/admin/templates/addService.html',
			controller: 'AddServiceCtrl',
			resolve: {
				categoryList: function (Categories) {
					return Categories.all().then(function (data) {
						return data;
					});
				},
				subcategoryList: function (Subcategories) {
					return Subcategories.allSub().then(function (data) {
						return data;
					});
				},
				userList: function (Users) {
					return Users.all().then(function (data) {
						return data;
					});
				}
			}
		})
		.state('productList', {
			url: '/productList',
			templateUrl: '/admin/templates/productList.html',
			controller: 'AllProductsCtrl',
			resolve: {
				productList: function (Products) {
					return Products.all().then(function (data) {
						return data;
					});
				}
			}
		})
		.state('editProduct', {
			url: '/editProduct/:paraml',
			templateUrl: '/admin/templates/editProduct.html',
			controller: 'editProductCtrl'
		})
		.state('termsnCondition', {
			url: '/termsnCondition',
			templateUrl: '/admin/templates/termsnCondition.html',
			controller: 'TermsnCondtionCtrl'
		})
		.state('webPages', {
			url: '/webPages',
			templateUrl: '/admin/templates/webPages.html',
			controller: 'webPagesCtrl'
		})
		.state('Employee', {
			url: '/employee',
			templateUrl: '/admin/templates/employee.html',
			controller: 'webPagesCtrl'
		})
		.state('Link', {
			url: '/link',
			templateUrl: '/admin/templates/link.html',
			controller: 'webPagesCtrl'
		})
		.state('addFaqs', {
			url: '/addFaqs',
			templateUrl: '/admin/templates/addFaqs.html',
			controller: 'faqsCtrl'
		})
		.state('faqsList', {
			url: '/faqsList',
			templateUrl: '/admin/templates/faqsList.html',
			controller: 'allFaqsCtrl'
			
		})
		.state('editFaqs', {
			url: '/editFaqs/:paraml',
			templateUrl: '/admin/templates/editFaqs.html',
			controller: 'editFaqsCtrl'
		})
});

