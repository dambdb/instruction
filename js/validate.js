"use strict";
var validates = function (event) {
  event.preventDefault();
/*-----------------AJAX-ЗАПРОС-ОТВЕТ*/
var request_send = function (url){
/*создаем реквест*/
  var request = new XMLHttpRequest();
/*open request*/
  request.open("POST", url/*"https://test.em70.ru/rav/callback/"*/, true);
/*send request*/
var formData = new FormData(document.forms.request_form);
  request.send(formData); 
/*проверка состояния*/
  request.onreadystatechange = function() {
/*если readyState=1,2,3*/
    if (request.readyState != 4) return;
/*если ответ получили и он валидный == 200*/
    if (request.status != 200) {

      alert( request.status + ': ' + request.statusText );

    } else {
    	/*получаем ответ изменяем состояние заголовка формы на запрос принят*/
      console.log(request.responseText);
      /*как в json*/
      console.log(JSON.parse(request.responseText));
    }
  };
};


/*валидация*/
var validate_input = function (){
var formData = new FormData(document.forms.request_form);

/*шаблоны полей*/
  var name_pattern =/[A-Za-zА-Яа-я]{3,}/g;
  var fone_pattern =/[A-Za-zА-Яа-я]{6,}/g;
  var email_pattern =/[A-Za-zА-Яа-я]{3,}/g;
  var text_pattern =/[A-Za-zА-Яа-я]{3,}/g;
/*значения полей*/
  var name = formData.get('name');
  var fone = formData.get('fone');
  var email = formData.get('email');
  var text = formData.get('text');
/*проверка на true false надо попробавать через масив???*/
  var name_pattern=name_pattern.test(name);
  var fone_pattern=fone_pattern.test(fone);
  var email_pattern=email_pattern.test(email);
  var text_pattern=text_pattern.test(text);



/*в качестве флага беру результат регулярки*/
    /*валидация имени*/
    if (name_pattern == true) {
        /*continue;*/
    } else {
        /*менем цвет бордера*/
    }

    /*валидация телефона*/
    if (fone_pattern == true) {
        /*continue;*/
    } else {
        /*менем цвет бордера*/
    }

    /*валидация емаила*/
    if (email_pattern == true) {
        /*continue;*/
    } else {
        /*менем цвет бордера*/
    }

    /*валидация текста*/
    if (text_pattern == true) {
        /*continue;*/
    } else {
        /*менем цвет бордера*/
    }

   console.log(name_pattern, fone_pattern, email_pattern, text_pattern);
/*
если флаг не false то вызываем ajax
иначе continue;
*/

}


var url="https://test.em70.ru/rav/callback/";
validate_input();
request_send(url);
}
