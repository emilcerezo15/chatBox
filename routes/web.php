<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::group(['middleware' => 'auth'], function () {

    Route::group(['namespace' => 'User'], function () {

        Route::group(['prefix' => 'user'], function () {

            Route::post('/getUserThread', 'UserThreadController@getUserThread');

            Route::post('/postUserThread', 'UserThreadController@postUserThread');

            Route::get('/userNotif', 'UserNotifController@userNotif');

            Route::get('/', function () {
                return view('chat');
            })->name('message');

        });

    });

    Route::group(['namespace' => 'Message'], function () {

        Route::group(['prefix' => 'message'], function () {

            Route::post('/seen', 'MessageController@seen');

        });

    });

});

Route::get('/usersOnline', 'HomeController@usersOnline');

Route::get('/', 'HomeController@index');

Route::get('/login', 'HomeController@login')->name('login');

Route::post('/authenticate', 'HomeController@authenticate')->name('authenticate');

Route::get('/register', 'HomeController@register')->name('register');

Route::get('/logout', 'HomeController@logout')->name('logout');

Route::post('/registerUser', 'HomeController@registerUser')->name('registerUser');
