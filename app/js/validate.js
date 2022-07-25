/* -------------------------------------------------------------------------
  begin Validation
  * ------------------------------------------------------------------------- */
$(document).ready(function () {
    $(document).on("change", '.js_validate *[required]', function () {
        $(this).each(function () {
            console.log($(this));
            var valid = validate($(document).find($(this)));
            if (valid == false) {
                console.log("valid not passed");
                $(document).find($(this).closest(".js_validate.js-with-btn")).find('.js-btn-disable').prop("disabled", true);
                return false;
            } else {
                console.log("valid passed");
                if ($(document).find($(this).closest(".js_validate.js-with-btn")).find('*[required]').length == $(document).find($(this).closest(".js_validate")).find('.pass').length) {
                    $(document).find($(this).closest(".js_validate.js-with-btn")).find('.js-btn-disable').prop("disabled", false);
                }
            }
        });
    });


    $('.js_validate button[type="submit"]').on("click", function () {
        var valid = validate($(document).find($(this).parents(".js_validate")));
        if (valid == false) {
            console.log("valid not passed");
            return false;
        } else {
            console.log("valid passed");
        }
    });

    $('input[name="day"]').each(function () {
        $(this).daterangepicker({
            singleDatePicker: true,
            parentEl: $(this).closest('.datepicker__container'),
            alwaysShowCalendars:true,
            showDropdowns: true,
            autoApply: true,
            minDate: new Date()

        }, function(start, end, label) {
        });
        $(this).trigger('click');

    })

});

function formatValidate(inputFile) {

    function showMsg(massage) {
        $($($($(inputFile)[0]).closest(".input__container").find(".text-error"))[0]).text(massage);
        $(inputFile[0]).closest(".input__container").addClass("error");
        return false;
    }

    var format = [".png", ".jpg", ".jpeg"];
    if ((inputFile)[0].files.length < 1) {
        showMsg($($(inputFile)[0]).attr("data-error-existence"));
        return false;
    } else {
        var file = (inputFile)[0].files;
        var fileName = file[0].name;
        var fileMaxSize = $(inputFile).data('maxsize');
        console.log(fileMaxSize);
        // console.log(file[0].size/1024/1024);
        if ((file[0].size / 1024 / 1024) < fileMaxSize) {
            for (var i = 0; i < format.length; i++) {
                if (-1 !== fileName.indexOf(format[i])) {
                    $($(inputFile)[0]).closest(".input__container").removeClass("error");
                    $($(inputFile)[0]).closest(".input__container").addClass("pass");
                    $($(inputFile)[0]).siblings(".text-error").text("");
                    return true;
                } else {
                    showMsg($($(inputFile)[0]).attr("data-error-type"));
                }
            }
        } else {
            showMsg($($(inputFile)[0]).attr("data-error-size"));
        }
    }
}


function validate(form) {
    var error_class = "error";
    var norma_class = "pass";
    var item = form.find("[required]");
    var e = 0;

    var reg = undefined;
    var pass = $('.password').val();
    var pass1 = $('.password_1').val();
    var passold = $('.password_old').val();
    var email = false;
    var password = false;
    var password_1 = false;
    var password_old = false;
    var phone = false;
    var undef = false;
    var comment = false;
    var date = false;
    var number = false;
    var arr = [];

    function mark(object, expression, minSign, maxSign) {
        if (expression) {
            object.closest('.input__container').addClass(error_class).removeClass(norma_class);
            if (email) {
                console.log(object.val());
                if (object.val().length > 0) {
                    if (object.val().length < 6) {
                        object.closest('.input__container').find('.text-error').text(object.attr("data-error-min"));
                    } else if (object.val().length > 37) {
                        object.closest('.input__container').find('.text-error').text(object.attr("data-error-max"));
                    } else {
                        object.closest('.input__container').find('.text-error').text(object.attr("data-error-wrong"));
                    }
                } else {
                    object.closest('.input__container').find('.text-error').text(object.attr("data-error-empty"));
                }
            }
            if (password_old) {
                console.log(object.val());
                if (object.val().length > 0) {
                    if (object.val().length < 6) {
                        object.closest('.input__container').find('.text-error').text(object.attr("data-error-min"));
                    } else if (object.val().length > 20) {
                        object.closest('.input__container').find('.text-error').text(object.attr("data-error-max"));
                    } else {
                        if (object.val() == pass || object.val() == pass1) {
                            object.closest('.input__container').find('.text-error').text(object.attr("data-error-wrong-old"));
                        } else {
                            object.closest('.input__container').find('.text-error').text(object.attr("data-error-wrong"));
                        }
                    }
                } else {
                    object.closest('.input__container').find('.text-error').text(object.attr("data-error-empty"));
                }
            }
            if (password) {
                if (object.val().length > 0) {
                    if (object.val().length < 6) {
                        object.closest('.input__container').find('.text-error').text(object.attr("data-error-min"));
                    } else if (object.val().length > 20) {
                        object.closest('.input__container').find('.text-error').text(object.attr("data-error-max"));
                    } else {
                        if (object.val() !== pass1) {
                            object.closest('.input__container').find('.text-error').text(object.attr("data-error-wrong-new"));
                        } else {
                            console.log(object.val(), passold);
                            object.closest('.input__container').find('.text-error').text(object.attr("data-error-wrong"));
                        }
                    }
                } else {
                    object.closest('.input__container').find('.text-error').text(object.attr("data-error-empty"));
                }
            }
            if (password_1) {
                if (object.val().length > 0) {
                    if (object.val().length < 6) {
                        object.closest('.input__container').find('.text-error').text(object.attr("data-error-min"));
                    } else if (object.val().length > 20) {
                        object.closest('.input__container').find('.text-error').text(object.attr("data-error-max"));
                    } else {
                        if (object.val() !== pass) {
                            object.closest('.input__container').find('.text-error').text(object.attr("data-error-wrong-new"));
                        } else {
                            object.closest('.input__container').find('.text-error').text(object.attr("data-error-wrong"));
                        }
                    }
                } else {
                    object.closest('.input__container').find('.text-error').text(object.attr("data-error-empty"));
                }
            }
            if (phone) {
                console.log(object.val());
                if (object.val().length != 17) {
                    object.closest('.input__container').find('.text-error').text(object.attr("data-error-empty"));
                } else {
                    object.closest('.input__container').find('.text-error').text(object.attr("data-error-wrong"));
                }
            }
            if (date) {
                console.log(object.val());
                if (object.val().length != 4) {
                    object.closest('.input__container').find('.text-error').text(object.attr("data-error-empty"));
                } else {
                    object.closest('.input__container').find('.text-error').text(object.attr("data-error-wrong"));
                }
            }
            if (comment) {
                console.log('comment');

                if (object.val().length < minSign || object.val().length > maxSign) {
                    object.parents('.input-container').attr('data-error', object.attr('data-error-empty'));
                } else {
                    object.parents('.input-container').attr('data-error', object.attr('data-error-wrong'));
                }
            }
            if (number) {
                console.log(object.val());
                if (object.val().length < 4 || object.val().length > 100) {
                    object.closest('.input__container').find('.text-error').text(object.attr("data-error-empty"));
                } else {
                    object.closest('.input__container').find('.text-error').text(object.attr("data-error-wrong"));
                }
            }
            if (undef) {
                console.log(object.val());
                if (object.val().length > 0) {
                    if (object.val().length > minSign && object.val().length < maxSign) {
                        object.closest('.input__container').find('.text-error').text(object.attr("data-error-wrong"));
                    } else {
                        object.closest('.input__container').find('.text-error').text(object.attr("data-error-empty"));
                    }
                } else {
                    object.closest('.input__container').find('.text-error').text(object.attr("data-error-empty"));
                }
            }
            console.log("expression=true");
            e++;
        } else {
            // console.log($(object[0]).hasClass("select"));
            if ($(object[0]).hasClass("select")) {
                if ($(object[0]).prop("selectedIndex") != 0) {
                    object.closest('.input__container').addClass(norma_class).removeClass(error_class);
                    e = 0;
                } else {
                    object.closest('.input__container').addClass(error_class).removeClass(norma_class);
                    e = 0;
                }
            } else {
                object.closest('.input__container').addClass(norma_class).removeClass(error_class);
                e = 0;
                // console.log("expression=false");
            }
        }
        arr.push(expression);
    }

    if (form.hasClass('js_validate')) {
        var field = form.find("[required]"),
            select = form.find('.js_valid_select'),
            radio = form.find('.js_valid_radio'),
            file = form.find('.input__container-file'),
            checkbox = form.find('.js_valid_checkbox');
        field.each(function () {
            var dataValidate = $(this).attr("data-validate");
            caseDataValidate(dataValidate, $(this));
        });
        // select.each(function () {
        //     validSelect($(this).find('select option'));
        // });
        radio.each(function () {
            validRadio($(this).find('input[type="radio"]'));
        });
        checkbox.each(function () {
            validCheckbox($(this).find('input[type="checkbox"]'));
        });
        file.each(function () {
            validFile($(this).find('input[type="file"]'));
        });
    } else {
        var dataValidate = form.attr("data-validate"),
            inputContainer = form.closest('.input__container'),
            field = form,
            select = inputContainer.find('select option'),
            radio = inputContainer.find('input[type="radio"]'),
            file = inputContainer.find('input[type="file"]'),
            checkbox = inputContainer.find('input[type="checkbox"]');
        // console.log(checkbox);
        if (inputContainer.hasClass('js_valid_select')) {
            // validSelect(select);
        } else if (inputContainer.hasClass('js_valid_radio')) {
            validRadio(radio);
        } else if (inputContainer.hasClass('js_valid_checkbox')) {
            validCheckbox(checkbox);
        } else if (inputContainer.hasClass('input__container-file')) {
            validFile(file);
        } else {
            caseDataValidate(dataValidate, field);
        }
    }

    function caseDataValidate(dataValidate, fieldIn) {
        var minSign = fieldIn.attr("data-minsign");
        var maxSign = fieldIn.attr("data-maxsign");
        // console.log(dataValidate, fieldIn);
        switch (dataValidate) {
            case "text":
                reg = new RegExp('^[\/\'?!,.()+"=!":?&|,.;А-Яа-яёЁЇїІіЄєҐґa-zA-Z_0-9 -]{' + minSign + ',' + maxSign + '}$');
                undef = true;
                mark(fieldIn, !reg.test($.trim(fieldIn.val())), minSign, maxSign);
                undef = false;
                break;
            case "comment":
                reg = new RegExp('^[\'А-Яа-яёЁЇїІіЄєҐґa-zA-Z -/]{' + minSign + ',' + maxSign + '}$');
                undef = true;
                mark(fieldIn, !reg.test($.trim(fieldIn.val())), minSign, maxSign);
                undef = false;
                break;
            case "date":
                reg = /^\d{2,10}[,.]?\d{2,10}[,.]?\d{2,10}$/;
                date = true;
                mark(fieldIn, !reg.test($.trim(fieldIn.val())));
                date = false;
                break;
            case "number":
                //reg = /^\d+$/;
                reg = new RegExp('^[0-9]{' + minSign + ',' + maxSign + '}$');
                number = true;
                mark(fieldIn, !reg.test($.trim(fieldIn.val())));
                number = false;
                break;
            case "email":
                reg = /^([A-Za-z0-9_\-\.]{1,15})+\@([A-Za-z0-9_\-\.]{1,10})+\.([A-Za-z]{2,10})$/;
                email = true;
                if ($.trim(fieldIn.val()).length > 37) {
                    mark(fieldIn, true);
                } else {
                    mark(fieldIn, !reg.test($.trim(fieldIn.val())));
                }
                email = false;
                break;
            case "phone":
                phone = true;
                reg = /[0-9-()+]{17}$/;
                mark(fieldIn, !reg.test($.trim(fieldIn.val())));
                phone = false;
                break;
            case "file":
                formatValidate(fieldIn);
            case "select2":
                if (fieldIn.val() == null || fieldIn.val().length == 0 || fieldIn.val() == undefined || fieldIn.val() == -1) {
                    mark(fieldIn, true);
                    break;
                } else {
                    mark(fieldIn, false);
                    break;
                }
                ;
            default:
                reg = new RegExp(fieldIn.attr("data-validate"), "g");
                mark(fieldIn, !reg.test($.trim(fieldIn.val())));
                break;
        }
    }

// js_valid_radio
    function validRadio(inp) {
        var rezalt = 0;
        for (var i = 0; i < inp.length; i++) {
            if ($(inp[i]).is(':checked') === true) {
                rezalt = 1;
                break;
            } else {
                rezalt = 0;
            }
        }
        if (rezalt === 0) {
            inp.closest('.input__container').addClass(error_class).removeClass(norma_class);
            e = 1;
        } else {
            inp.closest('.input__container').addClass(norma_class).removeClass(error_class);
        }
    };


    function validFile(inp) {
        var rezalt = 0;
        for (var i = 0; i < inp.length; i++) {
            if (formatValidate(inp) == true) {
                rezalt = 1;
                break;
            } else {
                rezalt = 0;
            }
        }
        if (rezalt === 0) {
            inp.closest('.input__container').addClass(error_class).removeClass(norma_class);
            e = 1;
        } else {
            inp.closest('.input__container').addClass(norma_class).removeClass(error_class);
        }
    };

// js_valid_checkbox
    function validCheckbox(inp) {
        var rezalt = 0;
        for (var i = 0; i < inp.length; i++) {
            if ($(inp[i]).is(':checked') === true) {
                rezalt = 1;
                break;
            } else {
                rezalt = 0;
            }
        }
        console.log(rezalt);
        if (rezalt === 0) {
            inp.closest('.checkbox__input').addClass(error_class).removeClass(norma_class);
            e = 1;
        } else {
            inp.closest('.checkbox__input').addClass(norma_class).removeClass(error_class);
        }
    };


    if ($.inArray(true, arr) == -1 && e == 0) {
        return true;
    } else {
        form.find("." + error_class + " input:first").focus();
        return false;
    }
}


/* -------------------------------------------------------------------------
 end Validation
 * ------------------------------------------------------------------------- */