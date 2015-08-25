<?php 

/*
 * User: Juris Tetarenko
 */

namespace Blog\Api\Requests;

/**
 * Class RegisterUserRequest
 * @package Blog\Api\Requests
 */
class RegisterUserRequest extends BaseRequest
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
            'username' => 'required|min:4|max:255|unique:users',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'confirmed|min:6',
        ];
    }
}