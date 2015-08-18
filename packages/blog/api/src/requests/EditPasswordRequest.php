<?php 

/*
 * User: Juris Tetarenko
 */

namespace Blog\Api\Requests;;

class EditPasswordRequest extends BaseRequest
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
            'password' => 'confirmed|min:6',
        ];
    }
}