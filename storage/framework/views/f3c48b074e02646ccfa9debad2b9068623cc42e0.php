<!DOCTYPE html>

<html lang="<?php echo e(config('app.locale')); ?>">

    <head>

        <meta charset="utf-8">

        <meta http-equiv="X-UA-Compatible" content="IE=edge">

        <meta name="viewport" content="width=device-width, initial-scale=1">

        <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>" />

        <title>Chatbox - <?php echo $__env->yieldContent('title'); ?></title>

        <script>

             window.Laravel = <?php echo json_encode([
                'csrfToken' => csrf_token(),
             ]); ?>

        </script>


        <script src="<?php echo e(asset('/js/jquery.js')); ?>"></script>

        <script src="<?php echo e(asset('/js/app.js')); ?>"></script>

        <script src="<?php echo e(asset('/js/all.js')); ?>"></script>

        <link href="<?php echo e(asset('/css/all.css')); ?>" rel="stylesheet" />

        <script src="<?php echo e(asset('/js/socket.io.js')); ?>"></script>

        <link href="<?php echo e(asset('/css/app.css')); ?>" rel="stylesheet" />

        <link href="<?php echo e(asset('/css/chat.css')); ?>" rel="stylesheet" />


    </head>

    <body>
        <input id="BASE_URL" type="hidden" value="<?php echo e(URL::to('/')); ?>"/>
        <?php if(isset(Auth::User()->id)): ?>
            <?php echo e(csrf_field()); ?>


            <div class="user-header">
                <?php $user = App\User::where('id', Auth::User()->id)->first(); ?>
                <h3><?php echo e($user->firstname. " " .$user->lastname); ?></h3>
                <a id="logout" href="<?php echo e(route('logout')); ?>" >Logout</a>
            </div>
        <?php endif; ?>

        <div class="container">

            <?php echo $__env->yieldContent('content'); ?>

        </div>

    </body>
</html>