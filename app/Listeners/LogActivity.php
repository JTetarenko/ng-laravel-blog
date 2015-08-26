<?php

namespace App\Listeners;

use App\Events\UserDoneActivity;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

use Auth;
use Spatie\Activitylog\ActivitylogFacade as Activity;

/**
 * Class LogActivity
 * @package App\Listeners
 */
class LogActivity
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle event
     *
     * @param UserDoneActivity $event
     */
    public function handle(UserDoneActivity $event)
    {
        Activity::log($event->string, Auth::user());
    }
}
