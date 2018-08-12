var problemsModule = angular.module('ghangout.problem', []);

problemsModule.service('problem', function ($http) {

	return {
		all: function () {
			return $http.get('/api/problem').then(function (problem) {
				return problem.data;
			});
		},
        add: function(newcontent){
            console.log("here1")
			return $http({
				method: 'post',
				url: '/api/problem',
				data: newcontent
			}).then(function(res){
                console.log("here")
				// return the new post
				return res.data;
			}).catch(function(err){
				console.error('Something went wrong adding the problem!');
				console.error(err);
				return err;
			});
		}/*,
        update: function(newContent){
		return $http({
				method: 'post',
				url: '/api/problem/update',
				data: newContent
			}).then(function(res){
				// return the new post
				return res.data;
			}).catch(function(err){
				console.error('Something went wrong update the webPages!');
				console.error(err);
				return err;
			});
		},
		 sigledata: function(id) {
            return $http({
                method: 'post',
                url: '/api/editProblem',
                data: id
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
        remove: function(newContent) {
            return $http({
                method: 'post',
                url: '/api/problem/remove',
                data: newContent
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });

        },
		find: function(newContent) {
            return $http({
                method: 'post',
                url: '/api/problem/find',
                data: newContent
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });

        }*/
    };
});
