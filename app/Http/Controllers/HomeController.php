<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{

    public function register()
    {
        return view('register');
    }

    public function registerUser(Request $request) {

        $user = new User();

        $user->firstname = $request->input('firstname');

        $user->lastname = $request->input('lastname');

        $user->email = $request->input('email');

        $user->password = Hash::make($request->input('password'));

        $user->save();

        return redirect('/');
    }

    public function login()
    {
        return view('login');
    }

    public function authenticate(Request $request)
    {
        if (Auth::attempt(['email' => $request->input('email'), 'password' => $request->input('password')])) {

            $user           =   User::find(Auth::User()->id);

            $user->status   =   1;

            $user->save();

            return redirect()->intended('/user');
        }

        return redirect('/');
    }

    public function logout () {

        Auth::logout();

        return redirect('/');

    }

    public function index () {

        return redirect('/login');

    }

    public function usersOnline () {

        $data = [
            'usersList' =>  User::where('id', '!=', Auth::User()->id)->get(),
            'user'      =>  Auth::User()->id
        ];

        return $data;
    }

    public function updateUserLogout () {

        $user           =   User::find(Auth::User()->id);

        $user->status   =   0;

        $user->save();

    }

}
