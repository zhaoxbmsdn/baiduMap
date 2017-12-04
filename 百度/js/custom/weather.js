/*
 *   设置一个全局的stomp客户端，方便用于建立连接和关闭连接
 */
var stompClient = null;


window.addEventListener('load',function(){
	var socket = new SockJS('/rest/websocket');
	stompClient = Stomp.over(socket);
	stompClient.connect({},function(frame){
		console.log('Connected: ' + frame);
		stompClient.subscribe('/subscribe/aqi',function(payload){
			console.log(payload.body);
		});
	},function(){
		console.log('连接错误！');
	});
	
});

window.addEventListener('unload',function(){
	if(stompClient !== null)
	{
		stompClient.disconnect();
	}
});