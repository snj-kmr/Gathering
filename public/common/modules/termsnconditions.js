var termsnconditionModule = angular.module('ghangout.termsnconditions', []);

termsnconditionModule.service('termsnCondition', function($http) {

    return {
        all: function() {
            return $http.get('/api/termsnconditions').then(function(terms) {
                return terms.data;
            });
        },
        add: function(terms) {
            return $http({
                method: 'post',
                url: '/api/termsnconditions',
                data: terms
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong! Try again later');
                console.error(err);
                return err;
            });
        },
    }
});