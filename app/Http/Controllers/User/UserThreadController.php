<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Message;
use Illuminate\Support\Facades\Auth;
use App\Thread;
use App\User;

class UserThreadController extends Controller
{

    public function getUserThread(Request $request) {

        $id         = $request->input('id');

        $authUser   = Auth::User()->id;

        if(isset(Thread::where('sender_id', $id)->where('createdBy_id', $authUser)->first()->id)) {

            $thread     = Thread::where('sender_id', $id)->where('createdBy_id',$authUser)->first()->id;

        } else {

            if(isset(Thread::where('sender_id', $authUser)->where('createdBy_id', $id)->first()->id)) {

                $thread = Thread::where('sender_id', $authUser)->where('createdBy_id', $id)->first()->id;

            } else {

                $newThread = new Thread();

                $newThread->sender_id = $id;

                $newThread->createdBy_id = $authUser;

                $newThread->save();

                $thread     = Thread::where('sender_id', $id)->where('createdBy_id',$authUser)->first()->id;
            }

        }

        $sender     = User::where('id', $request->input('id'))->first();

        if(isset(Message::where('thread_id', $thread)->first()->id)) {

            $message    =   Message::where('thread_id', $thread)->get();

        }  else {

            $message =  "";
        }

        $data = [
            'user'      =>  Auth::User()->id,
            'sender'    =>  $sender,
            'message'   =>  $message,
            'threadId'  =>  $thread
        ];

        return $data;
    }

    public function postUserThread (Request $request) {

        $thread_id = $request->input('thread_id');

        $message = new Message();

        $message->thread_id = $thread_id;

        $message->body = $request->input('message');

        $message->sender_id = Auth::User()->id;

        $message->save();

    }

}
