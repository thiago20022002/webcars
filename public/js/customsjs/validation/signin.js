

$('#signinForm').formValidation({
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
        username: {
            validators: {
                notEmpty: {
                    message: 'The username is required'
                },
                regexp: {
                    regexp:  /[^\s@]+@[^\s@]+\.[^\s@]+/,
                    message: 'email is not valid'
                }
            }
        },
        password: {
            validators: {
                notEmpty: {
                    message: 'the password name is required'
                },
                stringLength: {
                    message: 'must be at least 8 characters',
                    min: 4
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


    var scope = angular.element(document.getElementById("singinScopeID")).scope();
    scope.$apply(function () {
        scope.sendLoginPost();
    });

    // Do custom handler
    // such as sending data to server using Ajax ...
});
;

