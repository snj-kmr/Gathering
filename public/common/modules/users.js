var usersModule = angular.module('ghangout.users', []);

usersModule.service('Users', function($http) {

    return {
        all: function() {
            return $http.get('/api/users').then(function(userList) {
                return userList.data;
            });
        },
        add: function(newUser) {
            return $http({
                method: 'post',
                url: '/api/users',
                data: newUser
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the user!');
                console.error(err);
                return err;
            });
        },
        addnew: function(newUser) {
            return $http({
                method: 'post',
                url: '/api/users/requestnew',
                data: newUser
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the user!');
                console.error(err);
                return err;
            });
        },
        homeadd: function(newUser) {
            return $http({
                method: 'post',
                url: '/api/users/home',
                data: newUser
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
        forgetpass: function(newUser) {
            return $http({
                method: 'post',
                url: '/api/users/forgetpass',
                data: newUser
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
        resetpwd: function(newUser) {
            return $http({
                method: 'post',
                url: '/api/users/resetpassword',
                data: newUser
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
           changepass: function(newUser) {
            return $http({
                method: 'post',
                url: '/api/users/changepass',
                data: newUser
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
        login: function(newUser) {
            return $http({
                method: 'post',
                url: '/api/users/login',
                data: newUser
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
        remove: function(usr) {
            //console.log("here")
            return $http({
                method: 'post',
                url: '/api/deleteuser',
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
        update: function(usr) {

            return $http({
                method: 'post',
                url: '/api/editusrID',
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
         homeupdate: function(usr) {

            return $http({
                method: 'post',
                url: '/api/editusrhome',
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
        sigledata: function(id) {
            return $http({
                method: 'post',
                url: '/api/edituser',
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
        uploadimage: function(image) {
            
            var fd = new FormData();
            //Take the first selected file
            fd.append("file", image);
            return $http({
                method: 'post',
                url: '/api/users/uploaduserimage',
                data: fd,
                withCredentials: true,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
        //New
         uploadimage1: function(image) {
            
            var fd = new FormData();
            //Take the first selected file
            fd.append("file", image);
            return $http({
                method: 'post',
                url: '/api/post_user_image_app',
                data: fd,
                withCredentials: true,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
        organizers: function() {
            return $http.get('/api/users/organizers').then(function(userList) {
                return userList.data;
            });
        },
    };
});