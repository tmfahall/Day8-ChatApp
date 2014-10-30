var chatApp = {};

chatApp.messages = [];

var source = new EventSource('https://chatapp1000.firebaseio.com/messages/.json');

chatApp.eventPut = function (e) {}




chatApp.messagePut = function () {
    var nameLocation = document.getElementById('name');
    var messageLocation = document.getElementById('message');
    

    var name = nameLocation.value;
    var message = messageLocation.value;

    messageLocation.value = '';

    

    var data = {
        name: name,
        message: message,
        time: (new Date()).toLocaleTimeString()
    };

    var request = new XMLHttpRequest();

    request.open('POST', 'https://chatapp1000.firebaseio.com/messages/.json', true)

    request.onload = function () {

    };
    request.onerror = function () {

    };
    request.send(JSON.stringify(data));

};

chatApp.loadMessages = function () {
    var request = new XMLHttpRequest();

    request.open('GET', 'https://chatapp1000.firebaseio.com/messages/.json', false);
    request.onload = function () {
        var data = {};

        if (this.status >= 200 && this.status < 400) {
            data = JSON.parse(this.response);
            for (var name in data) {
                chatApp.messages.push(data[name]);
            };
        };
    };

    request.onerror = function () {

    }

    request.send();

};

chatApp.eventPut = function (e) {
    var data = JSON.parse(e.data);
    var h;
    if (data.data.hasOwnProperty('message')) {
        h = document.getElementById('output').innerHTML;
        h += data.data.time + '  -  ' + data.data.name + '  -  ' + data.data.message + '&#013;&#010;';

        g = document.getElementById('output1').innerHTML;
        g += data.data.time + '  -  ' + data.data.name + '  -  ' + data.data.message + '<br/>';

    }
    else {
        
        h = document.getElementById('output').innerHTML;
        g = document.getElementById('output1').innerHTML;

        for (var i in data.data) {
            
            h += data.data[i].time + '  -  ' + data.data[i].name + '  -  ' + data.data[i].message + '&#013;&#010;';
            g += data.data[i].time + '  -  ' + data.data[i].name + '  -  ' + data.data[i].message + '<br/>';
        };
    };
    

    document.getElementById('output').innerHTML = h;
    document.getElementById('output1').innerHTML = g;

    var textarea = document.getElementById('output');
    textarea.scrollTop = textarea.scrollHeight;
    var divarea = document.getElementById('output1');
    divarea.scrollTop = divarea.scrollHeight;
}

source.addEventListener('put', chatApp.eventPut, false)