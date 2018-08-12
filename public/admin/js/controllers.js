
adminApp.controller('NavCtrl', function ($scope, $state) {
    $scope.active = $state;
    $scope.isActive = function (viewLocation) {
        var active = (viewLocation === $state.current.name);
        return active;
    };
});

adminApp.controller('AllPostsCtrl', function ($scope, postList) {
    $scope.posts = postList;
    $scope.activePost = false;
    $scope.setActive = function (post) {
        $scope.activePost = post;
    }
});

adminApp.controller('AddPostCtrl', function ($scope, Posts) {
    $scope.post = {};
    $scope.addPost = function (newPost) {
        Posts.add(newPost).then(function (res) {
            console.log(res);
        });
    };


});
/*
* Dashboard controller
*/
adminApp.controller('dashboardCtrl', function ($scope) {

});
/**
 * AllUsersCtrl
 */
adminApp.controller('AllUsersCtrl', function ($scope, userList, Products, Users, $location) {
    console.log('userList')
    $scope.users = userList;
    $scope.activePost = false;
    $scope.setActive = function (user) {
        $scope.activeUser = user;
        console.log($scope.activeUser);
    }
    $scope.deleteUser = function (id) {
        $scope.data = {};
        $scope.data.id = id;
        console.log($scope.data);
        if (confirm('Deleting a vendor profile would delete products associated with it.'  + 
            ' Do you want to continue?')) {
            Users.remove($scope.data).then(function (res) {
                console.log(res);
                if (res) {
                    Products.deleteProd($scope.data).then(function (res1) {
                        console.log(res1);
                        if (res1) {
                             alert(res1.message);
                        } else {
                            $scope.update = "error";
                        }
                    });
                    // window.location.reload();
                    Users.all().then(function (res) {
                        $scope.users = res;
                        console.log(res);
                    })
                } else {
                    $scope.update = "error";
                    console.log('err')
                }
            });
        }
      
    }
});
/*
* Add user
*/
adminApp.controller('addUserCtrl', function ($scope, Users, $rootScope) {
    $scope.user = {}
    console.log("location")
     $scope.uploadFile = function (input) {
         console.log(input);
        $scope.loading = true;
        console.log(input.files[0]);
        Users.uploadimage(input.files[0]).then(function (res) {
            // console.log(res[0].location);
            $scope.loading = false;
            if (res) {
                $rootScope.imgshow = res[0].location;
            }
        });
    };
    
    
    $scope.addUser = function () {
        $scope.newUser = this.user;
        $scope.newUser.image = $rootScope.imgshow;
        console.log($scope.newUser)
//        return false;
        Users.add($scope.newUser).then(function (res) {
            console.log(res);
            alert(res.message);
            $rootScope.imgshow = null;
        });
        console.log('added')
        // Users.add($scope.newPost);
        this.user = {};
        

    }
});

/**
 * EditUsersCtrl
 */
adminApp.controller('editUserCtrl', function ($scope, Users, $stateParams,$rootScope) {
    $scope.user = {};
    $scope.params = {};
    $scope.params.path = $stateParams.paraml;
    
     $scope.uploadFile = function (input) {
        $scope.loading = true;
        // console.log(input.files[0]);
        Users.uploadimage(input.files[0]).then(function (res) {
            console.log(res[0].location);
            $scope.loading = false;
            if (res) {
                $rootScope.imgshowEdit = res[0].location;
            }
        });
    };
    
    Users.sigledata($scope.params).then(function (res) {
        if (res == null) {
            window.location.href = '/404';
        } else {
            console.log(res);
            console.log(res.image);
            $scope.user = res;
            $scope.imgshow = res.image;
            $scope.user.city = res.city[0];
            $scope.user.id = res._id;
//            $scope.user.firstname = res.firstname;
//            $scope.user.lastname = res.lastname;
//            $scope.user.email = res.email;
//            $scope.user.status = res.status;
//            $scope.user.org_name = res.org_name;
//            $scope.user.org_description = res.org_description;
//            $scope.user.cont_email = res.cont_email;
//            $scope.user.org_phone = res.org_phone;
//            $scope.user.phone = res.phone;
//            $scope.user.role = res.role;
            
        }
    });


    $scope.editUser = function () {

        $scope.newPost = {};
        console.log(this.user.city);
        $scope.newPost = this.user;
        $scope.newPost.id = this.user.id;
        if(this.user.role == 'user'){
            this.user.city = '';
        }
         if($scope.imgshow != undefined){
            
            if($rootScope.imgshowEdit != undefined){
               $scope.newPost.image = $rootScope.imgshowEdit;
            } else {
                $scope.newPost.image = $scope.imgshow;
             }
        } else {
            console.log($rootScope.imgshowEdit)
            if($rootScope.imgshowEdit != undefined){
               $scope.newPost.image = $rootScope.imgshowEdit;
            } else {
                $scope.newPost.image = '';
             }
        }
     
        console.log($scope.newPost)
       // return false;
        Users.update($scope.newPost).then(function (res) {
            console.log(res);
            if (res) {
                $scope.update = res.message;
                alert($scope.update);
                $rootScope.imgshowEdit = undefined;
                $scope.imgshow = '';
                //get new infor mation
                    Users.sigledata($scope.params).then(function (res) {
                       if (res == null) {
                           window.location.href = '/404';
                       } else {
                           $scope.user = res;
                            $scope.imgshow = res.image;
                            $scope.user.city = res.city[0];
                            $scope.user.id = res._id;
                       }
                   });

                //
            } else {
                $scope.update = "Error. Please try again later";
                alert($scope.update);
            }
            // console.log(res);
        });
    }
})

/** change password */

adminApp.controller('changepasswordCtrl', function ($scope, Users,$stateParams) {
    $scope.user ={}
    //alert($stateParams.user_id);
    $scope.changePassword = function(){
        if($scope.user.new_password != $scope.user.renew_password){
            $scope.error_msg = "Password did not match!";
             $scope.success_msg = null;
        }else{
            // go ahead
            $scope.UpdatePassword ={};
            $scope.UpdatePassword.id=$stateParams.user_id;
            $scope.UpdatePassword.password=$scope.user.new_password;
            Users.changepass($scope.UpdatePassword).then(function(res){
                console.log(res)
                 $scope.user ={}
                if(res.status==true){
                    $scope.success_msg=res.message;
                       $scope.error_msg = null;
                }else{
                    $scope.error_msg=res.message;
                       $scope.success_msg = null;
                }
            })
        }
    }
    
})
/**
 * AllUsersCtrl
 */
adminApp.controller('AllContactsCtrl', function ($scope, contactList, Contacts, $location) {
    console.log('userList')
    $scope.contacts = contactList;
    $scope.activePost = false;
    $scope.setActive = function (user) {
        $scope.activeUser = user;
        console.log($scope.activeUser);

    }
    $scope.deleteUser = function (id) {
        $scope.data = {};
        $scope.data.id = id;
        console.log($scope.data);
        Contacts.remove($scope.data).then(function (res) {
            console.log(res);
            if (res) {
                alert(res.message);
                window.location.reload();
            } else {
                $scope.update = "error";
            }
        });
    }
});

/*
* Add Category
*/
adminApp.controller('AddCategoryCtrl', function ($scope, Categories,userList, Users, $rootScope) {
    $scope.cat = {}

    $scope.uploadFile = function (input) {
        $scope.loading = true;
        // console.log(input.files[0]);
        Categories.uploadimage(input.files[0]).then(function (res) {
            console.log(res[0].location);
            $scope.loading = false;
            if (res) {
                $rootScope.imgshow = res[0].location;
                console.log($rootScope.imgshow);
            }
        });
    };

    $scope.addCategory = function () {
        console.log(this.cat); //return false;
        $scope.newCat = {};
        $scope.newCat.name = this.cat.name;
        $scope.newCat.ar_name = this.cat.ar_name;
        $scope.newCat.type = this.cat.type; 
//        $scope.newCat.vendorid = this.cat.vendorid; 
        $scope.newCat.image = $rootScope.imgshow;
        console.log($rootScope.imgshow);
        Categories.add($scope.newCat).then(function (res) {
            console.log(res)
            if (res.status == true) {
                alert('Added Successfully');
            } else {
                alert('Something went wrong adding the category!');
            }
        });
        // Users.add($scope.newPost);
        this.cat = {};

    }

});

adminApp.controller('AllCategoriesCtrl', function ($scope, categoryList,Products, $location, Subcategories ,Categories) {
    console.log(categoryList)
    $scope.categories = categoryList;
    $scope.activePost = false;
    $scope.setActive = function (product) {
        $scope.activeProduct = product;
        console.log($scope.activeProduct._id);
        Categories.sigledata($scope.activeProduct._id).then(function (res) {
            console.log(res)
            $scope.activeProduct.categoryname = res.name;
            $scope.activeProduct.ar_categoryname = res.ar_name;
            $scope.activeProduct.type = res.type;
        })

    }

    
    $scope.deleteCategory = function (id) {
        $scope.data = {};
        $scope.data.id = id;
        console.log($scope.data);
        if (confirm('This action will also delete all the products under this category.'  + 
            'Do you want to continue?')) {
            Categories.remove($scope.data).then(function (res) {
                console.log(res);
                if (res) {
                    Products.deleteMany($scope.data).then(function (res1) {
                        console.log(res1);
                        if (res1) {
                            alert(res.message);
                        } else {
                            $scope.update = "error";
                        }
                    });

                    Subcategories.deleteMany($scope.data).then(function (res2) {
                        console.log(res2);
                        if (res2) {
                        } else {
                            $scope.update = "error";
                        }
                    });
                    Categories.all().then(function (res) {
                        $scope.categories = res;
                        $scope.activeProduct = '';
                        console.log(res);
                    })
                } else {
                    $scope.update = "error";
                }
            });
        } else {
            // Do nothing!
        }
    }
});

/* add subcategory */
adminApp.controller('AddSubcategoryCtrl', function ($scope, Subcategories, categoryList, $rootScope) {
    $scope.cat = {}
    console.log(categoryList);
    $scope.allCategories = categoryList;
    $scope.uploadFile = function (input) {
        $scope.loading = true;
        // console.log(input.files[0]);
        Subcategories.uploadimage(input.files[0]).then(function (res) {
            console.log(res[0].location);
            $scope.loading = false;
            if (res) {
                $rootScope.imgshow = res[0].location;
            }
        });
    };

    $scope.addSubCategory = function () {
        console.log(this.cat.categoryid); //return false;
        $scope.newCat = {};
        $scope.newCat.name = this.cat.name;
        $scope.newCat.ar_name = this.cat.ar_name;
        $scope.newCat.categoryid = this.cat.categoryid;
        $scope.newCat.image = $rootScope.imgshow;
        Subcategories.add($scope.newCat).then(function (res) {
            console.log(res)
            if (res.status == true) {
                alert('Added Successfully');
            } else {
                alert('Something went wrong adding the subcategory!');
            }
        });
        // Users.add($scope.newPost);
        this.cat = {};

    }

});

/* add product */
adminApp.controller('AddProductCtrl', function ($scope, subcategoryList, userList, categoryList, Products, $rootScope) {
    $scope.cat = {}
    $scope.subCat = {}
    $scope.allsubCats = null;
    $scope.allCategories = [];
    $scope.allVendors = [];
    console.log(userList);
    $scope.user = $rootScope.currentUser;
    $scope.user_id = $rootScope.currentUser._id;
    //get PRODUCT Categories from all categories
    angular.forEach(categoryList, function (value, key) {
        if (value.type == 'product') {
            $scope.allCategories.push(value);
        }
    });
    console.log($scope.allCategories);
    //get vendors from all users
    
    if($rootScope.currentUser.role == 'admin'){
        angular.forEach(userList, function (value, key) {
            if (value.role == 'vendor') {
                $scope.allVendors.push(value);
            }
        });
        console.log($scope.allVendors);
    } else {
        angular.forEach(userList, function (value, key) {
            if (value._id == $scope.user_id) {
                $scope.allVendors.push(value);
            }
        });
     
    }

    $scope.getSubcat = function (id) {
        var values = [];
        $rootScope.catid = id;
        console.log(id)
        angular.forEach(subcategoryList, function (value, key) {
            console.log(value.categoryid)
            if (value.categoryid == id) {
                console.log(value.categoryid);
                 console.log(id);
                values.push(value);
            }
        });
        $scope.allsubCats = values;
        console.log(values)
        // console.log($scope.allsubCats);
    }

    $scope.getSubcatID = function (subid) {
        console.log(subid);
        $rootScope.subid = subid;
    }

    $scope.vendorDetials = function (vendor_id) {
        console.log(vendor_id);
        angular.forEach($scope.allVendors, function (value, key) {
            console.log(value._id)
            if (value._id == vendor_id) {
                $rootScope.vendorid = vendor_id;
                $rootScope.vendorname = value.firstname + ' ' + value.lastname;
                console.log($rootScope.vendorname, $rootScope.vendorid)
            }
        });

    }

    $scope.uploadFile = function (input) {
        $scope.loading = true;
        // console.log(input.files[0]);
        Products.uploadimage(input.files[0]).then(function (res) {
            console.log(res[0].location);
            $scope.loading = false;
            if (res) {
                $rootScope.imgshow = res[0].location;
            }
        });
    };

    $scope.addProduct = function () {
        console.log(this.cat); //return false;
        $scope.newProduct = {};
        $scope.newProduct.name = this.cat.name;
        $scope.newProduct.ar_name = this.cat.ar_name;
        $scope.newProduct.ar_description = this.cat.ar_description;
        $scope.newProduct.price = this.cat.price;
        $scope.newProduct.description = this.cat.description;
        $scope.newProduct.categoryid = $rootScope.catid;
        $scope.newProduct.subcategoryid = $rootScope.subid;
        $scope.newProduct.vendorid = $rootScope.vendorid;
        $scope.newProduct.trending = this.cat.trending;
        $scope.newProduct.vendorname = $rootScope.vendorname;
        $scope.newProduct.days_prior = this.cat.days_prior;
        $scope.newProduct.stock =  this.cat.stock;
        $scope.newProduct.rating = 0;
        $scope.newProduct.image = $rootScope.imgshow;
        console.log($scope.newProduct);
        Products.add($scope.newProduct).then(function (res) {
            console.log(res)
            if (res.status == true) {
                alert('Added Successfully');
            } else {
                alert('Something went wrong adding the subcategory!');
            }
        });
        // Users.add($scope.newPost);
        this.cat = {};
    }

});

/* All Products
*/
adminApp.controller('AllProductsCtrl', function ($scope,$rootScope, productList, Products, $location, Categories, Subcategories) {
    console.log(productList)
    console.log($rootScope.currentUser._id)
    $scope.user_id = $rootScope.currentUser._id;
    if($rootScope.currentUser.role == 'admin'){
        $scope.products = productList;
    } else {
     
        var data = {
            vendorid :$scope.user_id
        }
        console.log(data)
        Products.myProds(data).then(function (res) {
            console.log(res);
            if (res.length > 0) {
                $scope.products = res;
                
            } else {
                alert('You have not added any products yet!');
            }
        });
    }
    $scope.activePost = false;
    $scope.setActive = function (product) {
        $scope.activeProduct = product;
        console.log($scope.activeProduct.categoryid);
        Categories.sigledata($scope.activeProduct.categoryid).then(function (res) {
            console.log(res)
            $scope.activeProduct.categoryname = res.name;
            $scope.activeProduct.ar_categoryname = res.ar_name;
            $scope.activeProduct.type = res.type;
        })
        Subcategories.sigledata($scope.activeProduct.subcategoryid).then(function (res) {
            console.log(res)
            $scope.activeProduct.subcategoryname = res.name;
            $scope.activeProduct.ar_subcategoryname = res.ar_name;
        })

    }
    $scope.deleteProduct = function (id) {
        $scope.data = {};
        $scope.data.id = id;
        console.log($scope.data);
        Products.remove($scope.data).then(function (res) {
            console.log(res);
            if (res) {
                alert(res.message);
                // window.location.reload();
                Products.all().then(function (res) {
                    $scope.products = res;
                    $scope.activeProduct = '';
                    console.log(res);
                })
            } else {
                $scope.update = "error";
            }
        });
    }
});

adminApp.controller('editProductCtrl', function ($scope, Products, Categories,$rootScope, $stateParams) {
    $scope.product = {};
    $scope.params = {};
    $scope.params.path = $stateParams.paraml;
    Products.sigledata($scope.params).then(function (res) {
        if (res == null) {
            window.location.href = '/404';
        } else {
            console.log(res);
           $scope.product = res;
           $scope.product.id = res._id;
           $scope.CategoryInfo(res);
        }
    });

    $scope.CategoryInfo = function (product) {
        $scope.activeProduct = product;
        console.log($scope.activeProduct.categoryid);
        Categories.sigledata($scope.activeProduct.categoryid).then(function (res) {
            $scope.activeProduct.type = res.type;
            console.log($scope.activeProduct.type)
            if($scope.activeProduct.type == 'service'){
                $scope.cat_type = "Service";
            } else {
                $scope.cat_type = "Product";
            }
        })
        // Subcategories.sigledata($scope.activeProduct.subcategoryid).then(function (res) {
        //     console.log(res)
        //     $scope.activeProduct.subcategoryname = res.name;
        //     $scope.activeProduct.ar_subcategoryname = res.ar_name;
        // })
    }
    
     $scope.uploadFile = function (input) {
        $scope.loading = true;
        // console.log(input.files[0]);
        Products.uploadimage(input.files[0]).then(function (res) {
            console.log(res[0].location);
            $scope.loading = false;
            if (res) {
                $rootScope.imgshow1 = res[0].location;
            }
        });
    };
    
    
    $scope.editProduct = function () {
        
        $scope.newPost = {};
        $scope.newPost.name = this.product.name;
        $scope.newPost.ar_name = this.product.ar_name;
        $scope.newPost.price = this.product.price;
        $scope.newPost.description = this.product.description;
        $scope.newPost.ar_description = this.product.ar_description;
        $scope.newPost.stock = this.product.stock;
        console.log($scope.product.image);
        console.log($rootScope.imgshow1);
         if($scope.product.image != undefined){
            
            if($rootScope.imgshow1 != undefined || $rootScope.imgshow1 != null){
               $scope.newPost.image = $rootScope.imgshow1;
            } else {
                $scope.newPost.image = $scope.product.image;
             }
        } else {
            if($rootScope.imgshow1 != undefined){
               $scope.newPost.image = $rootScope.imgshow1;
            } else {
                $scope.newPost.image = '';
             }
        }
        $scope.newPost.days_prior = this.product.days_prior;
        $scope.newPost.trending = this.product.trending;
        $scope.newPost.id = this.product.id;
        console.log($scope.newPost)
        // return false;
                Products.update($scope.newPost).then(function (res) {
                    console.log(res);
                    if (res) {
                        $scope.update = res.message;
                        alert($scope.update);
                        $scope.newPost.image = '';
                        $rootScope.imgshow1 = null;
                        Products.sigledata($scope.params).then(function (res) {
                if (res == null) {
                    window.location.href = '/404';
                } else {
                    console.log(res);
                   $scope.product = res;
                   $scope.product.id = res._id;
                   $scope.CategoryInfo(res);
                }
            });
                
            } else {
                $scope.update = "Error. Please try again later";
                alert($scope.update);
            }
            // console.log(res);
        });
    }
})

/* add product */
adminApp.controller('AddServiceCtrl', function ($scope, subcategoryList, userList, categoryList, Products, $rootScope) {
    $scope.cat = {}
    $scope.subCat = {}
    $scope.allsubCats = null;
    $scope.allCategories = [];
    $scope.allVendors = [];
    console.log(userList);
    $scope.user = $rootScope.currentUser;
    $scope.user_id = $rootScope.currentUser._id;
    //get PRODUCT Categories from all categories
    angular.forEach(categoryList, function (value, key) {
        if (value.type == 'service') {
            $scope.allCategories.push(value);
        }
    });
    console.log($scope.allCategories);
    //get vendors from all users
    if($rootScope.currentUser.role == 'admin'){
        angular.forEach(userList, function (value, key) {
            if (value.role == 'vendor') {
                $scope.allVendors.push(value);
            }
        });
        console.log($scope.allVendors);
    } else {
        angular.forEach(userList, function (value, key) {
            if (value._id == $scope.user_id) {
                $scope.allVendors.push(value);
            }
        });
     
    }
    
   

    $scope.getSubcat = function (id) {
        var values = [];
        $rootScope.catid = id;
        console.log(id)
        angular.forEach(subcategoryList, function (value, key) {
            console.log(value.categoryid)
            if (value.categoryid == id) {
                console.log(value.categoryid);
                 console.log(id);
                values.push(value);
            }
        });
        $scope.allsubCats = values;
        console.log(values)
        // console.log($scope.allsubCats);
    }

    $scope.getSubcatID = function (subid) {
        console.log(subid);
        $rootScope.subid = subid;
    }

    $scope.vendorDetials = function (vendor_id) {
        console.log(vendor_id);
        angular.forEach($scope.allVendors, function (value, key) {
            console.log(value._id)
            if (value._id == vendor_id) {
                $rootScope.vendorid = vendor_id;
                $rootScope.vendorname = value.firstname + ' ' + value.lastname;
                console.log($rootScope.vendorname, $rootScope.vendorid)
            }
        });

    }

    $scope.uploadFile = function (input) {
        $scope.loading = true;
        // console.log(input.files[0]);
        Products.uploadimage(input.files[0]).then(function (res) {
            console.log(res[0].location);
            $scope.loading = false;
            if (res) {
                $rootScope.imgshow = res[0].location;
            }
        });
    };

    $scope.addProduct = function () {
        console.log(this.cat); 
        //return false;
        $scope.newService = {};
        $scope.newService.name = this.cat.name;
        $scope.newService.ar_name = this.cat.ar_name;
        $scope.newService.ar_description = this.cat.ar_description;
        $scope.newService.price = this.cat.price;
        $scope.newService.days_prior = this.cat.days_prior;
        $scope.newService.description = this.cat.description;
        $scope.newService.categoryid = $rootScope.catid;
        $scope.newService.trending = this.cat.trending;
        $scope.newService.subcategoryid = $rootScope.subid;
        $scope.newService.vendorid = $rootScope.vendorid;
        $scope.newService.vendorname = $rootScope.vendorname;
        $scope.newService.stock =  this.cat.stock;
        $scope.newService.rating = 0;
        $scope.newService.image = $rootScope.imgshow;
        console.log($scope.newService);
        Products.add($scope.newService).then(function (res) {
            console.log(res)
            if (res.status == true) {
                alert('Added Successfully');
            } else {
                alert('Something went wrong adding the service!');
            }
        });
        // Users.add($scope.newPost);
        this.cat = {};
    }

});

/** terms and condition */


adminApp.controller('TermsnCondtionCtrl', function ($scope, $location,termsnCondition) {

    $scope.data = {};
   
    termsnCondition.all().then(function(res){
                console.log(res)
                $scope.data.terms = res[0].terms;
                $scope.data.ar_terms = res[0].ar_terms;
                console.log($scope.data);
    })
    
    $scope.addTerms = function(){
            console.log($scope.data.ar_terms)
             $scope.terms_n_Cond = {};
             $scope.terms_n_Cond.terms = this.data.terms;
             $scope.terms_n_Cond.ar_terms = this.data.ar_terms;
            termsnCondition.add($scope.terms_n_Cond).then(function(res){
                console.log(res)
                if(res.status == true){
                    alert('Updated successfully');
                } else {
                       alert('Error, please try again later');
                }
            })
    }
});


//edit post
adminApp.controller('webPagesCtrl', function ($scope, webPages, $rootScope) {
    
    $scope.text = {}
    $scope.uploadFile = function (input) {
        $scope.loading = true;
        webPages.uploadimage(input.files[0]).then(function (res) {
            $scope.loading = false;
            if (res) {
                $scope.imgshow1 = res[0].location;
            }
        });
    };
    $scope.uploadFile1 = function (input) {
        $scope.loading1 = true;
        webPages.uploadimage(input.files[0]).then(function (res) {
            $scope.loading1 = false;
            if (res) {
                $scope.imgshow2 = res[0].location;

            }
        });
    };
    $scope.uploadFile2 = function (input) {
        $scope.loading2 = true;
        webPages.uploadimage(input.files[0]).then(function (res) {
            $scope.loading2 = false;
            if (res) {
                $scope.imgshow3 = res[0].location;
            }
        });
    };
    $scope.uploadFile3 = function (input) {
        $scope.loading3 = true;
        webPages.uploadimage(input.files[0]).then(function (res) {
            $scope.loading3 = false;
            if (res) {
                $scope.imgshow4 = res[0].location;
            }
        });
    };

    $scope.editContent = function () {   
   
    webPages.find({'_id': $scope.text._id }).then( function(data) {
     $scope.data_new = data; 
        $scope.newPost = {};
         $scope.newPost =  $scope.text;
         
        if($scope.imgshow1 !=undefined){
             $scope.newPost.image = $scope.imgshow1;
         }else{
             $scope.newPost.image = $scope.data_new[0].image;
         }
         if($scope.imgshow2 !=undefined){
             $scope.newPost.image1 = $scope.imgshow2;
         }else{
             $scope.newPost.image1 = $scope.data_new[0].image1;
         }
         if($scope.imgshow3 !=undefined){
             $scope.newPost.image2 = $scope.imgshow3;
         }else{
             $scope.newPost.image2 = $scope.data_new[0].image2;
         }
         if($scope.imgshow4!=undefined){
             $scope.newPost.image3 = $scope.imgshow4;
         }else{
             $scope.newPost.image3 = $scope.data_new[0].image3;
         }
   
     webPages.update($scope.newPost).then(function (res) {
            alert("Updated Successfully !");
        });          
    });
    }
    
/*  $scope.Content = function () {
        console.log(this.text.employee1);
        $scope.newPost = {};
        $scope.newPost = this.text;
   console.log($scope.newPost);
       webPages.addEmployee($scope.newPost).then(function (res) {
            alert("Updated Successfully !");
        });
    }
*/
    $scope.linkContent = function () {
    
        console.log(this.text.instagram);
        $scope.newPost = {};
         $scope.newPost = this.text;
       console.log($scope.newPost);
      webPages.addLink($scope.newPost).then(function (res) {
            console.log(res);
            alert("Updated Successfully !");
        });
    }

    webPages.all().then(function(data){      
        $scope.text = data[0];  
    });
});

//add faqs
adminApp.controller('faqsCtrl', function ($scope, faqs) {

    $scope.faqsContent = function () {
        $scope.newPost = {};
         $scope.newPost = this.text;

        faqs.add($scope.newPost).then(function (res) {
            alert('Added Successfully');
        });
    }
});


//All FAQS
adminApp.controller('allFaqsCtrl', function ($scope, faqs, $location) {

    faqs.all().then(function(data){       
        $scope.texts = data;
    });
    
    $scope.activePost = false;
    $scope.setActive = function (data) {
        $scope.activeText = data;
    }

    $scope.deleteFaqs = function (id) {
        $scope.data = {};
        $scope.data.id = id;
        if (confirm('Deleting a Question.'  + ' Do you want to continue?')) {
            faqs.remove($scope.data).then(function (res) {
                if (res) {
                     window.location.reload();
                    faqs.all().then(function (res) {
                        alert("Removed successfully")
                        $scope.text = res;
                    })
                } else {
                    $scope.update = "error";
                }
            });
        }     
    }
});

/**
 * EditFaqsCtrl
 */
adminApp.controller('editFaqsCtrl', function ($scope, faqs, $stateParams) {

    $scope.text = {};
    $scope.params = {};
    $scope.params.path = $stateParams.paraml;
    faqs.sigledata($scope.params).then(function (res) {
        if (res == null) {
            window.location.href = '/404';
        } else {
            $scope.text = res;
        }
    });
    $scope.editFaqs = function () {
    $scope.newPost = {};
    $scope.newPost = this.text;

        faqs.update($scope.newPost).then(function (res) {
            console.log(res);
            if (res) {
                $scope.update = res.message;
                alert("'Edit Successfully'");
            } else {
                $scope.update = "Error. Please try again later";
                alert("$scope.update");
            }
        });
    }
})
