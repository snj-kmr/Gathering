var productsModule = angular.module('ghangout.products', []);

productsModule.service('Products', function($http) {

    return {
        all: function() {
            return $http.get('/api/products').then(function(products) {
                return products.data;
            });
        },
        myProds: function(myProducts) {
            return $http({
                method: 'post',
                url: '/api/products/vendor_id',
                data: myProducts
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the product!');
                console.error(err);
                return err;
            });
        },add: function(newProduct) {
            return $http({
                method: 'post',
                url: '/api/products',
                data: newProduct
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the product!');
                console.error(err);
                return err;
            });
        }, remove: function(prod) {
            //console.log("here")
            return $http({
                method: 'post',
                url: '/api/deleteproduct',
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
        deleteMany : function(prod){
            return $http({
                method: 'post',
                url: '/api/del_cat_products',
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
        deleteProd : function(prod){
            return $http({
                method: 'post',
                url: '/api/del_user_products',
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
            return $http({
                method: 'post',
                url: '/api/editproduct',
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
         update: function(usr) {

            return $http({
                method: 'post',
                url: '/api/editproID',
                data: usr
            }).then(function(res) {
                // return the new post
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
                url: '/api/products/uploadimage',
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