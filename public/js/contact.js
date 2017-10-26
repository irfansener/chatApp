function contactList () {
	$('.user-bar').text("Contact list");
	$('.conversation').css("background","none");
	$('.conversation-container').html(" ");
	$('.conversation-container').append(newPeople("","İrfan ŞENER","12:04","deneme","1","irfan"));
	$('.conversation-container').append(newPeople("","İrfan ŞENER","12:04","deneme","1","sener"));
	$('.conversation-compose').hide();

}

function newPeople(img,name,time,message,status,username) {
	var head = '<div class="people" style="cursor:pointer;" onclick=getMessage("'+username+'")>'+
	'<img class="peoplea" src="http://www.techz.vn/review/html/public/images/no_user_pic.png">'+
	'<p class="peoplen">'+name+'</p>'+
	'<p class="peoplem"><i class="zmdi zmdi-check-all"></i>'+
	''+message+'</p></div>';
	return head;
}

function getMessage(username) {
	var userBar = '<div class="back" onclick="contactList()" style="cursor: pointer;"> <i class="zmdi zmdi-arrow-left"></i> </div>'+
	' <div class="avatar"> <img src="https://avatars2.githubusercontent.com/u/398893?s=128" alt="Avatar"> </div>'+
	'<div class="name"> <span id="userName">'+username+'</span> <span class="status">online</span> </div> <div class="actions more"> <i class="zmdi zmdi-more-vert"></i> </div>'+
	' <div class="actions attachment"> <i class="zmdi zmdi-attachment-alt"></i> </div> <div class="actions"> <i class="zmdi zmdi-phone"></i> </div>';
	$('.user-bar').html(userBar);
	$('.conversation').css("background","#efe7dd url(https://cloud.githubusercontent.com/assets/398893/15136779/4e765036-1639-11e6-9201-67e728e86f39.jpg) repeat");
	$('.conversation-compose').show();
	$('.conversation-container').html(" ");
}	
