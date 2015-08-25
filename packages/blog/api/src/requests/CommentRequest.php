<?php 

/*
 * User: Juris Tetarenko
 */

namespace Blog\Api\Requests;

/**
 * Class CommentRequest
 * @package Blog\Api\Requests
 */
class CommentRequest extends BaseRequest
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
            'body' => 'required|min:10|max:300'
        ];
    }
}