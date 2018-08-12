var categoriesModule = angular.module('ghangout.categories', []);

categoriesModule.service('Categories', function($http) {

    return {
        all: function() {
            return $http.get('/api/categories').then(function(categories) {
                return categories.data;
            });
        },add: function(newCategory) {
            return $http({
                method: 'post',
                url: '/api/categories',
                data: newCategory
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the category!');
                console.error(err);
                return err;
            });
        }, remove: function(prod) {
            //console.log("here")
            return $http({
                method: 'post',
                url: '/api/deletecategory',
                data: prod
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });

        },
        sigledata: function(id) {
            console.log(id)
            return $http.get('/api/categories/getsinglecat/?id=' + id).then(function(res) {
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
        uploadimage: function(image) {
            var fd = new FormData();
            //Take the first selected file
            fd.append("file", image);
            return $http({
                method: 'post',
                url: '/api/categories/uploadimage',
                data: fd,
                withCredentials: true,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Error uploading image!');
                console.error(err);
                return err;
            });
        },
    };
});