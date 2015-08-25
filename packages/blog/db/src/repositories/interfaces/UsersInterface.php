<?php 

namespace Blog\db\Repositories\Interfaces;

/**
 * Interface UsersInterface
 * @package Blog\db\Repositories\Interfaces
 */
interface UsersInterface
{
    public function findUser($id);
    public function getUserLatestActivities($id);
    public function getUsersGroup();
    public function registerUser($request);
    public function editProfile($request, $id);
    public function findUserArticles($id);
    public function findUserComments($id);
}