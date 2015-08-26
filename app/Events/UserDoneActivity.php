<?php

namespace App\Events;

use App\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

/**
 * Class UserDoneActivity
 * @package App\Events
 */
class UserDoneActivity extends Event
{
    use SerializesModels;

    /**
     * Activity log
     * 
     * @var string
     */
    public $string;

    /**
     * @param string $string
     */
    public function __construct($string)
    {
        $this->string = $string;
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return [];
    }
}
