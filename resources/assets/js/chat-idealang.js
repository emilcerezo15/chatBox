var threadId            = '';
var getUrl              =   window.location;
var baseUrl             =   getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
var _token, _socket              =   '';

$(document).ready(function () {

    var socket              =   io.connect('127.0.0.1:3000');
    var token               =   $('input[name=_token]').val();
    var userId              =   '';
    var chatLen             =   [];
    var marginRight         =   0;
    var threadAdd           =   1;
    _token                  =   token;
    _socket                 =   socket;

    socket.emit('refreshChat');

    socket.on('refreshOnlineUsersAjax', function () {
        getUsers();
    });

    socket.on('onlineUsersAjax', function(msg) {

        $('.openThread[data-id="' + msg['userId'] + '"]').find('label').removeClass('offline').addClass('online');

    });

    socket.on('ajaxChat', function () {

        userThread(userId);

        $('.message').val('');

    });

    $('.chatUsers').on('click', '.openThread', function () {

        userId = $(this).data('id');

        $('.chats').show();

        userThread(userId);

        threadAdd = 1;

    });

    function userThread(id) {

        var listClass='';

        $.ajax({
            url     :   baseUrl + "/public/getUserThread?id="+id,
            type    :   'post',
            data : {
                "_token": token
            },
            success :   function (response) {
                var message                 =   [];
                var chatLayoutLength        =   $('.chat-layout').length;
                var validateChatLayoutCount =   0;
                var chatLayoutId            =   '.chat-layout[data-id="' + response['sender']['id'] + '"]';

                if(threadAdd == 1) {
                    $.each(chatLen, function (i, v) {
                        if(v['id'] == response['sender']['id']){
                            validateChatLayoutCount = 1;
                        }
                    });

                    chatLen.push({'id' : response['sender']['id']});

                    if(chatLayoutLength > 2) {

                        $('.chat-layout:first-child').remove();

                        mapIds  =   $('.chat-layout').map(function () { return $(this).data('id'); }).get();

                        chatLen = mapIds;

                        marginRight = 0;

                        $.each(mapIds, function( ind, val ) {

                            $('.chat-layout[data-id="' + val + '"]').removeAttr('style').css('right', marginRight);

                            marginRight += 290;

                        });

                    }

                    if(validateChatLayoutCount == 0) {
                        $('.chats').append('' +
                            '<div class="chat-layout" style="right: ' + marginRight +'px" data-id="' + response['sender']['id'] + '">' +
                            '<div class="chat-header">' +
                            '<b class="title"></b>' +
                            '</div>' +
                            '<div class="chat-content"><ul></ul></div>' +
                            '<div class="chat-function"><textarea class="message"></textarea><button onclick="pushChat(' + response['sender']['id'] + ')">Send</button></div>' +
                            '</div>');

                        $(chatLayoutId).find('b.title').text(response['sender']['firstname']).attr('data-id', response['sender']['id']);

                        $.each(response['message'], function( index, value ) {

                            listClass   = 'other';

                            if(value['sender_id'] == response['user']) listClass = 'user';

                            message.push('<li class="' + listClass + '">'+value.body+'</li>');

                            if(value['thread_id']) threadId = value['thread_id'];

                            else threadId = "";

                        });

                        if(!threadId) {
                            threadId = response['threadId'];
                        }

                        $(chatLayoutId).css('right', marginRight + 'px').find('ul').html(message);

                        marginRight += 290;

                    }

                }

                threadAdd = 0;

            }

        });

    }

    function getUsers () {
        $.ajax({
            url     :   baseUrl + "/public/usersOnline",
            type    :   'get',
            success : function (response) {

                var userList =  [];
                $.each(response['usersList'], function( index, value ) {
                    userList.push('' +
                        '<div class="all-users openThread" data-id="' + value['id'] + '">' +
                        '<label class="' + (value['status'] == 1 ? 'online' : 'offline') + '"></label>' +
                        value['firstname'] +
                        '</div>')
                });

                $('.chatUsers').html(userList);

                socket.emit('onlineUsers', {
                    "user"       :   response['user']
                });
            }
        });
    }

});


function pushChat (id) {

    message = $('.chat-layout[data-id="' + id + '"]').parent().parent().find('.message').val();

    $.ajax({
        url     :   baseUrl + "/public/postUserThread?sender_id="+id+'&message='+message+'&thread_id='+threadId,
        type    :   'post',
        data : {
            "_token": _token
        },
        success : function () {
            _socket.emit('chat', {
                "msg"       :   message,
                "user_id"   :   id
            });
        }

    });

}
