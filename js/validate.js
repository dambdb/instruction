"use strict";
/*функция запроса*/
var request_send = function(url, formData) {
    var request = new XMLHttpRequest();
    request.open("POST", url, true);
    /*var formData = new FormData(document.forms.request_form);*/
    request.send(formData);
    request.onreadystatechange = function() {
        if (request.readyState != 4) return;
        if (request.status != 200) {
            alert(request.status + ': ' + request.statusText);
        } else {
            console.log(request.responseText);
            respons_request(JSON.parse(request.responseText));
        }
    };
};
/*обработка телефона*/
var phone_substr = function(phone) {
    return phone.replace(/[+\s]/g, '');
};

/*обработка результата запроса если что-то не корректно отправили*/
var respons_request = function(JSON_obj) {
    if (JSON_obj.status == 'ok') {
        document.getElementsByName('answer_acept')[0].style.display = 'block';
        document.getElementsByName('answer_error')[0].style.display = 'none';
    } else {
        document.getElementsByName('answer_error')[0].style.display = 'block';
        document.getElementsByName('answer_acept')[0].style.display = 'none';
        if (JSON_obj.fields !== undefined) {
            for (var i = 0; i < JSON_obj.fields.length; i++) {
                document.getElementsByName(JSON_obj.fields[i])[0].style.border = '1px red solid';
            }
        }
    }

};



/*функция валидации*/
var validate_input = function(event) {
    event.preventDefault();
    document.getElementById("my_btn").disabled = true;
    /*не работает на быстрой скорости обработки*/
    document.getElementsByClassName('load_gif')[0].style.display = 'inline';

    var formData = new FormData(document.forms.request_form);

    var name_pattern = /[A-Za-z/s|А-ЯЁа-яё/s]{5,}/g;
    var phone_pattern = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    var email_pattern = /^(([^<>()!\[\]\\.,;:\s@"]+(\.[^<>()!\[\]\\.,;:\s@"]+)*)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/;
    var text_pattern = /[\w\s|А-ЯЁа-яё\s]{10,}/g; /*pattern rewrayt*/
    var name = formData.get('name');
    var phone = phone_substr(formData.get('phone'));
    formData.set('phone', phone);
    var email = formData.get('email');
    var text = formData.get('text');

    var name_pattern = name_pattern.test(name);
    var phone_pattern = phone_pattern.test(phone);
    var email_pattern = email_pattern.test(email);
    var text_pattern = text_pattern.test(text);

    var flag = true;
    if (name_pattern == true) {
        document.getElementsByName('name')[0].style.border = '1px green solid';
    } else {
        flag = false;
        document.getElementsByName('name')[0].style.border = '1px red solid';
    }

    if (phone_pattern == true) {
        document.getElementsByName('phone')[0].style.border = '1px green solid';
    } else {
        flag = false;
        document.getElementsByName('phone')[0].style.border = '1px red solid';
    }

    if (email_pattern == true) {
        document.getElementsByName('email')[0].style.border = '1px green solid';
    } else {
        flag = false;
        document.getElementsByName('email')[0].style.border = '1px red solid';
    }

    if (text_pattern == true) {
        document.getElementsByName('text')[0].style.border = '1px green solid';
    } else {
        flag = false;
        document.getElementsByName('text')[0].style.border = '1px red solid';
    }

    if (flag !== false) {
        var url = "https://test.em70.ru/rav/callback/";
        request_send(url, formData);
        document.getElementsByName('answer_error')[0].style.display = 'none';
        document.getElementsByName('answer_acept')[0].style.display = 'block';
        /*не работает на быстрой скорости обработки*/
        document.getElementById("my_btn").disabled = false;
        document.getElementsByClassName('load_gif')[0].style.display = 'none';
    } else {
        document.getElementsByName('answer_error')[0].style.display = 'block';
        document.getElementsByName('answer_acept')[0].style.display = 'none';
        /*не работает на быстрой скорости обработки*/
        document.getElementById("my_btn").disabled = false;
        document.getElementsByClassName('load_gif')[0].style.display = 'none';
        return false;
    }
};



