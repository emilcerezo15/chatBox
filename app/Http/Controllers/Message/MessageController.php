<?php

namespace App\Http\Controllers\Message;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use App\Message;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{

    public function seen (Request $request) {

        Message::where('thread_id', $request->input('threadId'))
            ->where('sender_id',  $request->input('id'))->update(
                [
                    'status' => 0
                ]
            );

        return Auth::User()->id;

    }

}
