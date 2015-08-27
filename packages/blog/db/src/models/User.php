<?php

namespace Blog\db\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

/**
 * Class User
 * @package Blog\db\Models
 */
class User extends Model implements AuthenticatableContract, CanResetPasswordContract
{
    use Authenticatable, CanResetPassword;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['username', 'email', 'password'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password'];

    /**
     * Password attribute mutator
     * 
     * @param string $password
     */
    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = bcrypt($password);
    }

    /**
     * User have many articles
     * 
     * @return Relations Has-Many-Articles
     */
    public function articles()
    {
        return $this->hasMany(Article::class);
    }

    /**
     * User have only one group
     * 
     * @return Relations Belongs-To-Groups
     */
    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    /**
     * User have many comments
     * 
     * @return Relations Has-Many-Comments
     */
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Update user in database
     * @param  array  $data 
     * @param  User   $user    User model
     */
    public static function editProfile($data, User $user)
    {
        $user->update($data);
    }
}
