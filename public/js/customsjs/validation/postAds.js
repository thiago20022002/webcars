




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
        make: {
            validators: {
                notEmpty: {
                    message: 'provide make of the car'
                }
            }
        },
        model: {
            validators: {
                notEmpty: {
                    message: 'provide model of the car'
                }
            }
        },
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
        url: {
            validators: {
                notEmpty: {
                    message: 'The url path of the car'
                },
                regexp: {
                    regexp: /\.(gif|jpg|jpeg|tiff|png)$/i,
                    message: 'it is not a valid image'
                }
            }

        },
        description: {
            validators: {
                notEmpty: {
                    message: 'The car description'
                },
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
;

