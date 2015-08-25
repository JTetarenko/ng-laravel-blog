<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

/**
 * Class DatabaseSeeder
 */
class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $this->call(GroupTableSeeder::class);
        $this->call(UserTableSeeder::class);
        $this->call(CategoryTableSeeder::class);

        Model::reguard();
    }
}

/**
 * Class GroupTableSeeder
 */
class GroupTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('groups')->insert([
            'name' => 'Administrators',
            'created_at' => Carbon\Carbon::now(),
            'updated_at' => Carbon\Carbon::now(),
        ]);

        DB::table('groups')->insert([
            'name' => 'Writers',
            'created_at' => Carbon\Carbon::now(),
            'updated_at' => Carbon\Carbon::now(),
        ]);

        DB::table('groups')->insert([
            'name' => 'Users',
            'created_at' => Carbon\Carbon::now(),
            'updated_at' => Carbon\Carbon::now(),
        ]);
    }
}

/**
 * Class UserTableSeeder
 */
class UserTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->insert([
            'username'      => 'administrator',
            'email'         => 'admin@myblog.lv',
            'group_id'      => 1,
            'password'      => bcrypt('password'),
            'created_at'    => Carbon\Carbon::now(),
            'updated_at'    => Carbon\Carbon::now(),
        ]);

        DB::table('users')->insert([
            'username'      => 'writer',
            'email'         => 'writer@myblog.lv',
            'group_id'      => 2,
            'password'      => bcrypt('password'),
            'created_at'    => Carbon\Carbon::now(),
            'updated_at'    => Carbon\Carbon::now(),
        ]);

        DB::table('users')->insert([
            'username'      => 'user',
            'email'         => 'user@myblog.lv',
            'group_id'      => 3,
            'password'      => bcrypt('password'),
            'created_at'    => Carbon\Carbon::now(),
            'updated_at'    => Carbon\Carbon::now(),
        ]);
    }
}

/**
 * Class CategoryTableSeeder
 */
class CategoryTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('categories')->insert([
            'name'      => 'News',
            'created_at'    => Carbon\Carbon::now(),
            'updated_at'    => Carbon\Carbon::now(),
        ]);

        DB::table('categories')->insert([
            'name'      => 'Tech',
            'created_at'    => Carbon\Carbon::now(),
            'updated_at'    => Carbon\Carbon::now(),
        ]);

        DB::table('categories')->insert([
            'name'      => 'Driftworks',
            'created_at'    => Carbon\Carbon::now(),
            'updated_at'    => Carbon\Carbon::now(),
        ]);
    }
}

