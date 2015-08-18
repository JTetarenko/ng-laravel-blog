<?php 

/*
 * User: Juris Tetarenko
 */

namespace Blog\Api\Requests;

class CreateArticleRequest extends BaseRequest
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
            'slug'          => 'required|unique:articles|alpha_dash|min:4|max:60',
            'title'         => 'required|unique:articles|min:4|max:60',
            'category_list' => 'required',
            'excerpt'       => 'required|max:500',
            'body'          => 'required|min:10',
            'published_at'  => 'required|date|after:yesterday|date_format: "Y-m-d"',
            'image_url'     => 'required|url',
            'tag_list'      => 'max:10',
        ];
    }
}