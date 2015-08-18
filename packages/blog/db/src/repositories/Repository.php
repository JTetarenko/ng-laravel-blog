<?php 

namespace Blog\db\Repositories;

use Blog\db\Repositories\Interfaces\RepositoryInterface;

class Repository implements RepositoryInterface
{
	/**
	 * Eloquent model
	 * 
	 * @var object
	 */
	protected $model;

	/**
	 * Pagination pages
	 *
	 * @var integer
	 */
	const PAGES = 5;

	/**
	 * Fill model variable with Eloquent model
	 * 
	 * @param Object $model
	 */
	public function __construct($model)
	{
		$this->model = $model;
	}

	/**
	 * Find object
	 * 
	 * @param  integer $id 
	 * @return object
	 */
	public function find($id)
	{
		return $this->model->find($id);
	}

	/**
	 * Get list array
	 * @param  mixed $caption
	 * @param  mixed $value
	 * @return array          
	 */
	public function getList($caption, $value)
	{
		return $this->model->lists($caption, $value);
	}
}