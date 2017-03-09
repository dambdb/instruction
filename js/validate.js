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
var url="https://test.em70.ru/rav/callback/";
request_send(url);
}
