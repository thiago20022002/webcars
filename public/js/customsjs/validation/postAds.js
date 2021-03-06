




/* global angular */

$('#postAdForm').formValidation({
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
         * Make of car:
         *      notEmpty: Field cannot be empty
         * */
        make: {
            validators: {
                notEmpty: {
                    message: 'provide make of the car'
                }
            }
        },
        /**
         * Model of car:
         *      notEmpty: Field cannot be empty
         * */
        model: {
            validators: {
                notEmpty: {
                    message: 'provide model of the car'
                }
            }
        },
        /**
         * Year of car:
         *          integer: Field must be a number
         *      greaterThan: Field must be greater than 1
         *         notEmpty: Field cannot be empty
         * */
        year: {
            validators: {
                integer: {
                    message: 'The value is not a number'
                },
                greaterThan: {
                    value: 1,
                    message: 'The year must be postive'
                },
                notEmpty: {
                    message: 'provide year of the car'
                }

            }
        },
        /**
         * Price of car:
         *          integer: Field must be a number
         *      greaterThan: Field must be greater than 1 (Some testers put in negative numbers >.<)
         *         notEmpty: Field cannot be empty
         * */
        price: {
            validators: {
                integer: {
                    message: 'The value is not a number'
                },
                greaterThan: {
                    value: 1,
                    message: 'The price must be postive'
                },
                notEmpty: {
                    message: 'The price of the car'
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
        },
        /**
         * Description of car:
         *         notEmpty: Field cannot be empty
         * */
        description: {
            validators: {
                notEmpty: {
                    message: 'The car description'
                }
            }
        }

    }
})
        .on('err.field.fv', function (e, data) {
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
        }).on('success.form.fv', function (e) {
    // Prevent form submission
    e.preventDefault();


    var scope = angular.element(document.getElementById("postAdScopeID")).scope();
    scope.$apply(function () {
        scope.sendAdPost();
    });

    // Do custom handler
    // such as sending data to server using Ajax ...
});


