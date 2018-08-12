var webpagesModule = angular.module('ghangout.webPage', []);

webpagesModule.service('webPages', function ($http) {

	return {
		all: function () {
			return $http.get('/api/webPages').then(function (webList) {
				return webList.data;
			});
		},
		add: function (newcontent) {
			return $http({
				method: 'post',
				url: '/api/webPages',
				data: newcontent
			}).then(function (res) {
				// return the new post
				return res.data;
			}).catch(function (err) {
				console.error('Something went wrong adding the webPages!');
				console.error(err);
				return err;
			});
		},
		addEmployee: function (newcontent) {
			return $http({
				method: 'post',
				url: '/api/webPages/Employee',
				data: newcontent
			}).then(function (res) {
				// return the new post
				return res.data;
			}).catch(function (err) {
				console.error('Something went wrong adding the webPages!');
				console.error(err);
				return err;
			});
		},
		/*addQuestion: function(newcontent){
			return $http({
				method: 'post',
				url: '/api/webPages/Question',
				data: newcontent
			}).then(function(res){
				// return the new post
				return res.data;
			}).catch(function(err){
				console.error('Something went wrong adding the webPages!');
				console.error(err);
				return err;
			});
		},*/
		addLink: function (newcontent) {
			return $http({
				method: 'post',
				url: '/api/webPages/Link',
				data: newcontent
			}).then(function (res) {
				// return the new post
				return res.data;
			}).catch(function (err) {
				console.error('Something went wrong adding the webPages!');
				console.error(err);
				return err;
			});
		},
		remove: function () {

		},
		update: function (newContent) {
			return $http({
				method: 'post',
				url: '/api/webPages/update',
				data: newContent
			}).then(function (res) {
				// return the new post
				return res.data;
			}).catch(function (err) {
				console.error('Something went wrong update the webPages!');
				console.error(err);
				return err;
			});
		},
		updateEmployee: function (newContent) {
			return $http({
				method: 'post',
				url: '/api/webPages/update/Employee',
				data: newContent
			}).then(function (res) {
				// return the new post
				return res.data;
			}).catch(function (err) {
				console.error('Something went wrong update the webPages!');
				console.error(err);
				return err;
			});
		},
		/*updateQuestion: function(newContent){
		return $http({
				method: 'post',
				url: '/api/webPages/update/Question',
				data: newContent
			}).then(function(res){
				// return the new post
				return res.data;
			}).catch(function(err){
				console.error('Something went wrong update the webPages!');
				console.error(err);
				return err;
			});
		},*/
		updateLink: function (newContent) {
			return $http({
				method: 'post',
				url: '/api/webPages/update/Link',
				data: newContent
			}).then(function (res) {
				// return the new post
				return res.data;
			}).catch(function (err) {
				console.error('Something went wrong update the webPages!');
				console.error(err);
				return err;
			});
		},
		uploadimage: function (image) {
			var fd = new FormData();
			//Take the first selected file
			fd.append("file", image);
			return $http({
				method: 'post',
				url: '/api/webPages/uploadimage',
				data: fd,
				withCredentials: true,
				headers: { 'Content-Type': undefined },
				transformRequest: angular.identity
			}).then(function (res) {
				// return the new post
				return res.data;
			}).catch(function (err) {
				console.error('Error uploading image!');
				console.error(err);
				return err;
			});
		},
		find: function(newContent) {
            console.log("here");
            return $http({
                method: 'post',
                url: '/api/webPages/find',
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