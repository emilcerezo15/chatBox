<!DOCTYPE html>

<html lang="{{ config('app.locale') }}">

    <head>

        <meta charset="utf-8">

        <meta http-equiv="X-UA-Compatible" content="IE=edge">

        <meta name="viewport" content="width=device-width, initial-scale=1">

        <meta name="csrf-token" content="{{ csrf_token() }}" />

        <title>Chatbox - @yield('title')</title>

        <script>

             window.Laravel = <?php echo json_encode([
                'csrfToken' => csrf_token(),
             ]); ?>

        </script>


        <script src="{{ asset('/js/jquery.js') }}"></script>

        <script src="{{ asset('/js/app.js') }}"></script>

        <script src="{{ asset('/js/all.js') }}"></script>

        <link href="{{ asset('/css/all.css') }}" rel="stylesheet" />

        <script src="{{ asset('/js/socket.io.js') }}"></script>

        <link href="{{ asset('/css/app.css') }}" rel="stylesheet" />

        <link href="{{ asset('/css/chat.css') }}" rel="stylesheet" />


    </head>

    <body>
        <input id="BASE_URL" type="hidden" value="{{ URL::to('/') }}"/>
        @if(isset(Auth::User()->id))
            {{ csrf_field() }}

            <div class="user-header">
                <?php $user = App\User::where('id', Auth::User()->id)->first(); ?>
                <h3>{{ $user->firstname. " " .$user->lastname }}</h3>
                <a id="logout" href="{{ route('logout') }}" >Logout</a>
            </div>
        @endif

        <div class="container">

            @yield('content')

        </div>

    </body>
</html>