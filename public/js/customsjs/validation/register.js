/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global angular */

function activateTabs() {
    $("#tabs-nav li").each(function () {

        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        } else {
            $(this).addClass("active");
        }
    });
}


$('#registerForm').formValidation({
    framework: 'bootstrap',
    // Only disabled elements are excluded
    // The invisible elements belonging to inactive tabs must be validated
    excluded: [':disabled'],
    icon: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
        /**
         * UserName:
         *         notEmpty: Field cannot be empty
         *         regexp: Regular expression to check for a valid format email(will not check it the email is vaild itself)
         * */
        username: {
            validators: {
                notEmpty: {
                    message: 'The username is required'
                },
                regexp: {
                    regexp: /[^\s@]+@[^\s@]+\.[^\s@]+/,
                    message: 'Email is not valid'
                }
            }
        },
        /**
         * Password:
         *         notEmpty: Field cannot be empty
         *         stringLength: Checks for the length to be atleast 8 characters long
         * */
        password: {
            validators: {
                notEmpty: {
                    message: 'The password is required'
                },
                stringLength: {
                    message: 'must be at least 8 characters',
                    min: 4
                }
            }
        },
        /**
         * ConfirmPassword:
         *         stringLength: Checks for the length to be atleast 8 characters long.
         *         notEmpty: Field cannot be empty.
         *         identical: Checks to see if the passwords match to confirm the password.
         * */
        confirmPassword: {
            validators: {
                stringLength: {
                    message: 'must be at least 8 characters',
                    min: 4
                }, notEmpty: {
                    message: 'the confirm password is required'
                },
                identical: {
                    field: 'password',
                    message: 'password does not match'
                }

            }
        },
        /**
         * FirstName:
         *         notEmpty: Field cannot be empty.
         * */
        fname: {
            validators: {
                notEmpty: {
                    message: 'provide first name'
                }
            }
        },
        /**
         * LastName:
         *         notEmpty: Field cannot be empty.
         * */
        lname: {
            validators: {
                notEmpty: {
                    message: 'provide last name'
                }
            }
        },
        /**
         * PhoneNumber:
         *         notEmpty: Field cannot be empty.
         *         regexp: Checks to see if the field matches a phone number pattern.
         * */
        phone: {
            validators: {
                notEmpty: {
                    message: 'provide phone number'
                },
                regexp: {
                    regexp: /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/,
                    message: 'phone number is invalid'
                }

            }
        },
        /**
         * Address:
         *         notEmpty: Field cannot be empty.
         * */
        address: {
            validators: {
                notEmpty: {
                    message: 'provide address'
                }
            }
        },
        /**
         * ZipCode:
         *         notEmpty: Field cannot be empty.
         *         regexp: Checks if field is a valid zipcode pattern.
         * */
        zipCode: {
            validators: {
                notEmpty: {
                    message: 'provide a zip code'
                },
                regexp: {
                    regexp: /(^\d{5}$)|(^\d{5}-\d{4}$)/,
                    message: 'zip code is invalid'
                }
            }
        },
        /**
         * URL Image:
         *         notEmpty: Field cannot be empty.
         *         regexp: Checks to see if the field matches a valid image extension pattern.
         * */
        url: {
            validators: {
                notEmpty: {
                    message: 'provide image url'
                },
                regexp: {
                    regexp: /\.(gif|jpg|jpeg|tiff|png)$/i,
                    message: 'it is not a valid image'
                }
            }

        },
        /**
         * URL File:
         *          Checks if the file provided by user is over 10mb.
         *          Provides an error message if it exceeds that.
         * */
        urlFile: {
            validators: {
                callback: {
                    message: 'Image can not exceed 10mb',
                    callback: function (value, validator, $field) {
                        var element = document.getElementById('imageFile');
                       
                        var img =element.files[0].size;
                        
                        var imgsize = img / 1024;
                  
                        return imgsize < 10196;
                    }
                }
            }
        }

    }
})
        .on('err.field.fv', function (e, data) {
            e.preventDefault();
            // data.fv --> The FormValidation instance

            // Get the first invalid field
            var $invalidFields = data.fv.getInvalidFields().eq(0);
            // Get the tab that contains the first invalid field
            var $tabPane = $invalidFields.parents('.tab-pane'),
                    invalidTabId = $tabPane.attr('id');
            // If the tab is not active
            if (!$tabPane.hasClass('active')) {
                // Then activate it
                $tabPane.parents('.tab-content')
                        .find('.tab-pane')
                        .each(function (index, tab) {
                            var tabId = $(tab).attr('id'),
                                    $li = $('a[href="#' + tabId + '"][data-toggle="tab"]').parent();
                            if (tabId === invalidTabId) {
                                // activate the tab pane
                                $(tab).addClass('active');
                                // and the associated <li> element
                                $li.addClass('active');
                            } else {
                                $(tab).removeClass('active');
                                $li.removeClass('active');
                            }
                        });
                // Focus on the field
                $invalidFields.focus();
            }
        }
        ).on('success.form.fv', function (e) {
    // Prevent form submission
    e.preventDefault();

    // Do custom handler
    var scope = angular.element(document.getElementById("registerScopeID")).scope();
    scope.$apply(function () {
        scope.sendRegisterPost();
    });


});
;
