<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Thread;
use App\Message;

class UserNotifController extends Controller
{

    public function userNotif (Request $request) {
        $authUser = Auth::User()->id;

        $sender_id = $request->input('sender_id');

        $threadId = '';

        $countMsg = '';

        if(isset(Thread::where('sender_id', $authUser)->where('createdBy_id', $sender_id)->first()->id)) {

            $threadId = Thread::where('sender_id', $authUser)->where('createdBy_id', $sender_id)->first()->id;

        } else {

            if(isset(Thread::where('sender_id', $sender_id)->where('createdBy_id', $authUser)->first()->id)) {

                $threadId = Thread::where('sender_id', $sender_id)->where('createdBy_id', $authUser)->first()->id;
            }
        }

        if($threadId) {
            $countMsg = Message::where('thread_id', $threadId)
                ->where('sender_id', $request->input('sender_id'))
                ->where('status', 1)
                ->count();
        }

        return $countMsg;

    }

}
