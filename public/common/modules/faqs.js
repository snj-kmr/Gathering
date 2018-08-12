var faqsModule = angular.module('ghangout.faq', []);

faqsModule.service('faqs', function ($http) {

	return {
		all: function () {
			return $http.get('/api/faqs').then(function (question) {
				return question.data;
			});
		},
        add: function(newcontent){
			return $http({
				method: 'post',
				url: '/api/faqs',
				data: newcontent
			}).then(function(res){
				// return the new post
				return res.data;
			}).catch(function(err){
				console.error('Something went wrong adding the webPages!');
				console.error(err);
				return err;
			});
		},
        update: function(newContent){
		return $http({
				method: 'post',
				url: '/api/faqs/update',
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
                url: '/api/editFaqs',
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
            //console.log("here")
            return $http({
                method: 'post',
                url: '/api/faqs/remove',
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
            console.log("here");
            return $http({
                method: 'post',
                url: '/api/faqs/find',
                data: newContent
            }).then(function(res) {
				console.log(res)
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });

        }
        	};
});
