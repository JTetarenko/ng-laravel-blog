<?php 

namespace Blog\db\Repositories\Interfaces;

/**
 * Interface RepositoryInterface
 * @package Blog\db\Repositories\Interfaces
 */
interface RepositoryInterface
{
    public function find($id);
    public function getList($caption, $value);
}