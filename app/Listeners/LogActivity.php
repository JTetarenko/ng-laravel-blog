<?php

namespace App\Listeners;

use App\Events\UserDoneActivity;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

use Auth;
use Spatie\Activitylog\ActivitylogFacade as Activity;

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
     * Handle the event.
     *
     * @param  UserDoneActivity  $event
     * @return void
     */
    public function handle(UserDoneActivity $event)
    {
        if ($event->data['type'] === 'created article')
        {
            Activity::log('created article @ '. $event->data['in'], Auth::user());
        }
        else if ($event->data['type'] === 'edited article')
        {
            Activity::log('edited article @ '. $event->title, Auth::user());
        }
        else if ($event->data['type'] === 'deleted article')
        {
            Activity::log('deleted article @ '. $event->title, Auth::user());
        }
        else if ($event->data['type'] === 'commented')
        {
            
        }
        else if ($event->data['type'] === 'edited comment')
        {
            
        }
        else if ($event->data['type'] === 'deleted comment')
        {
            
        }
        else if ($event->data['type'] === 'edited profile')
        {
            
        }
    }
}
