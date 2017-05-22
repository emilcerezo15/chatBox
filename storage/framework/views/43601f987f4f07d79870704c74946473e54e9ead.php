<?php $__env->startSection('title', 'Dashboard'); ?>

<?php $__env->startSection('content'); ?>

    <div class="row">

        <div class="chat-divider chat-list">

            <h3>Chat list</h3>

            <div class="chatUsers"></div>

        </div>

        <div class="chats chat-divider">

        </div>

    </div>

<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>