var getUrl              =   window.location;
var baseUrl             =   '';
var _token, _socket     =   '';
var userId, threadId    =   '';
var usersMessage        =   '';
$(document).ready(function () {

    var body                =   $('body');
    var socket              =   io.connect('127.0.0.1:3000');
    var token               =   $('input[name=_token]').val();
    var appendThread        =   0;
    var marginRight         =   0;
    var chatLen             =   [];
    var logout              =   0;

    _token                  =   token;
    _socket                 =   socket;
    baseUrl                 =   $('#BASE_URL').val();

    socket.emit('refreshChat');

    socket.on('refreshOnlineUsersAjax', function () {
        getUsers();
    });

    socket.on('onlineUsersAjax', function(msg) {

        $('.openThread[data-id="' + msg['userId'] + '"]').find('label').removeClass('offline').addClass('online');

    });

    socket.on('ajaxChat', function () {

        userThread(userId);

        getUsers();

        $('.message').val('');

    });

    $('.chatUsers').on('click', '.openThread', function () {

        userId = $(this).data('id');

        userThread(userId);

        appendThread = 1;

    });


    body.delegate('#close', 'click', function () {

        $(this).parent().parent('.chat-layout').remove();

        mapIds  =   $('.chat-layout').map(function () { return $(this).data('id'); }).get();

        newChatLen = [];

        $.each(mapIds, function (i, v) {
            newChatLen.push({'id' : v});
        });

        chatLen = newChatLen;

        marginRight = 0;

        $.each(mapIds, function( ind, val ) {

            $('.chat-layout[data-id="' + val + '"]').removeAttr('style').css('right', marginRight);

            marginRight += 290;

        });

    });

    body.delegate('.message', 'focusin', function () {

        seen ($(this).data('threadid'), $(this).parent().parent('.chat-layout').data('id'));

    });

    function userThread(id) {

        var listClass='';
        var chatLayoutLength    =   $('.chat-layout').length;
        if(id) {
            $.ajax({
                url     :   baseUrl + "/user/getUserThread",
                type    :   'post',
                data : {
                    "_token":   token,
                    "id"    :   id
                },
                success :   function (response) {

                    var message                 = [];
                    var validateChatLayoutCount =   0;
                    var chatLayoutId            =   '.chat-layout[data-id="' + response['sender']['id'] + '"]';

                    threadId = response['threadId'];

                    if(appendThread == 1) {

                        $.each(chatLen, function (i, v) {
                            if(v['id'] == response['sender']['id']){
                                validateChatLayoutCount = 1;
                            }

                        });

                        chatLen.push({'id' : response['sender']['id']});

                        if(chatLayoutLength < 3) {

                            if(validateChatLayoutCount == 0) {

                                $('.chats').append('' +
                                    '<div class="chat-layout" style="right: ' + marginRight + 'px" data-id="' + response['sender']['id'] + '">' +
                                    '<div class="chat-header">' +
                                    '<b class="title"></b><span id="close">x</span>' +
                                    '</div>' +
                                    '<div class="chat-content"><ul></ul></div>' +
                                    '<div class="chat-function"><textarea class="message" onblur="message(this)" data-threadId="' + response['threadId'] + '" ></textarea><button onclick="pushChat(' + response['sender']['id'] + ', ' + response['threadId'] + ')">Send</button></div>' +
                                    '</div>');

                                marginRight += 290;

                            }

                        }

                        appendThread = 0;

                    }

                    $(chatLayoutId).find('b.title').text(response['sender']['firstname']).attr('data-id', response['sender']['id']);

                    $.each(response['message'], function( index, value ) {

                        listClass   = 'other';

                        if(value['sender_id'] == response['user']) {
                            listClass = 'user';
                        }

                        message.push('<li class="' + listClass + '">'+value['body']+'</li>');

                    });


                    $(chatLayoutId).find('ul').html(message);

                }

            });
        }

    }

    function getUsers () {
        $.ajax({
            url     :   baseUrl + "/usersOnline",
            type    :   'get',
            success : function (response) {

                if($('.chatUsers').children().length <= 0) {

                    $.each(response['usersList'], function( index, value ) {

                      $('.chatUsers').append('' +
                          '<div class="all-users openThread" data-id="' + value['id'] + '">' +
                          '<label class="' + (value['status'] == 1 ? 'online' : 'offline') + '"></label>' +
                          value['firstname'] +
                          '</div>');

                        refreshNotif(value['id']);

                    });
                } else {
                    $.each(response['usersList'], function( index, value ) {
                        if(value['status'] == 0) {
                            $('.openThread[data-id="' + value['id'] + '"]').find('label').removeClass().addClass('offline');
                        }
                        refreshNotif(value['id']);
                    });
                }

                socket.emit('onlineUsers', {
                        "user"       :   response['user']
                });

            }
        });
    }

    function refreshNotif (id) {
        $.ajax({
            url     :   baseUrl + "/user/userNotif",
            type    :   'get',
            data : {
                "_token"    :   _token,
                "sender_id" :   id
            },
            success : function (res) {
                if(res > 0)  $('.openThread[data-id="' +id + '"]').append('<span class="notif">'+res+'</span>');
                else $('.openThread[data-id="' +id + '"]').find('.notif').fadeOut('slow', function () {
                    $(this).remove();
                });
            }

        });
    }

    function seen (threadId, id) {

        $.ajax({
            url     :   baseUrl + "/message/seen",
            type    :   'post',
            data : {
                "_token"    :   _token,
                "threadId"  :   threadId,
                "id"        :   id
            },
            success : function () {
                refreshNotif(id);
            }

        });

    }

});

function pushChat (id, threadId) {

    $.ajax({
        url     :   baseUrl + "/user/postUserThread",
        type    :   'post',
        data : {
            "_token"    :   _token,
            "sender_id" :   id,
            "message"   :   usersMessage,
            "thread_id" :   threadId
        },
        success : function () {
            _socket.emit('chat', {
                "msg"       :   usersMessage,
                "user_id"   :   id
            });

        }

    });

}

function message (val) {

    usersMessage = val.value;

}