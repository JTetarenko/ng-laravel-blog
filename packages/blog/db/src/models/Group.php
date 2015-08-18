<?php

namespace Blog\db\Models;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
	/**
	 * Fillable fields for groups
	 * 
	 * @var array
	 */
    protected $fillable = ['name'];

    /**
     * Group have many users
     * 
     * @return Relations Has-Many-Users
     */
    public function users()
    {
    	return $this->hasMany(User::class);
    }
}