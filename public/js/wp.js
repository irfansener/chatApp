/* Time */
var socket = io();
var deviceTime = document.querySelector('.status-bar .time');
var messageTime = document.querySelectorAll('.message .time');

/* Message */
var form = document.querySelector('.conversation-compose');
var conversation = document.querySelector('.conversation-container');

form.addEventListener('submit', newMessage);

function newMessage(e) {
	var input = e.target.input;
    var messageTo = $('#userName').text();
    socket.emit('chat message', {"message": input.value, "from": getCookie("username"), "to": messageTo});  

	input.value = '';

	e.preventDefault();
}

socket.on('chat message', function (msgData) {
	var msg = msgData.message;
	var user = msgData.from;
	var msgTo = msgData.to;
	if(getCookie("username")!==user && getCookie("username")!==msgTo)
		return false;

	var getOrSent = user===getCookie("username") ? "sent" : "received";
	var tickAnim = getOrSent=== "sent" ? '<span class="tick tick-animation">' +
				'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck" x="2047" y="2061"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#92a58c"/></svg>' +
				'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck-ack" x="2063" y="2076"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#4fc3f7"/></svg>' +
			'</span>' : '';

	var element = document.createElement('div');

	element.classList.add('message', getOrSent);

	element.innerHTML = msg +
		'<span class="metadata">' +
			'<span class="time">' + moment().format('h:mm A') + '</span>' +
			tickAnim 
			+
		'</span>';
	
	conversation.appendChild(element);

	animateMessage(element);
	
	element;
	conversation.scrollTop = conversation.scrollHeight;
	$('audio#sendSound')[0].play();
});

function animateMessage(message) {
	setTimeout(function() {
		var tick = message.querySelector('.tick');
		tick.classList.remove('tick-animation');
	}, 500);
}