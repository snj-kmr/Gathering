var subcategoriesModule = angular.module('ghangout.subcategories', []);

subcategoriesModule.service('Subcategories', function($http) {

    return {
        all: function() {
            return $http.get('/api/categories').then(function(categoryList) {
                return categoryList.data;
            });
        },
         allSub: function() {
            return $http.get('/api/subcategories').then(function(subcategoryList) {
                return subcategoryList.data;
            });
        },add: function(newSubCategory) {
            return $http({
                method: 'post',
                url: '/api/subcategories',
                data: newSubCategory
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding subcategory!');
                console.error(err);
                return err;
            });
        }, 
        sigledata: function(id) {
            console.log(id)
            return $http.get('/api/subcategories/getsinglecat/?id=' + id).then(function(res) {
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong !');
                console.error(err);
                return err;
            });
        },
        deleteMany : function(prod){
            return $http({
                method: 'post',
                url: '/api/del_subcats',
                data: prod
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong deleting the subcategories!');
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
                url: '/api/subcategories/uploadimage',
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