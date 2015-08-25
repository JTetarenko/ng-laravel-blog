<?php 

/*
 * User: Juris Tetarenko
 */

namespace Blog\Api\Requests;

/**
 * Class EditArticleRequest
 * @package Blog\Api\Requests
 */
class EditArticleRequest extends BaseRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'slug'          => 'required|alpha_dash|min:4|max:60',
            'title'         => 'required|min:4|max:60',
            'category_list' => 'required',
            'excerpt'       => 'required|max:500',
            'body'          => 'required|min:10',
            'published_at'  => 'required|date',
            'image_url'     => 'required|url',
            'tag_list'      => 'max:10',
        ];
    }
}