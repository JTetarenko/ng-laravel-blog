<?php 

namespace Blog\db\Repositories\Interfaces;

/**
 * Interface TagsInterface
 * @package Blog\db\Repositories\Interfaces
 */
interface TagsInterface
{
    public function findTag($id);
    public function getTags();
    public function findArticlesByTag($id);
}