<?php 

/*
 * User: Juris Tetarenko
 */

namespace Blog\Api\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class BaseRequest
 * @package Blog\Api\Requests
 */
class BaseRequest extends FormRequest
{
    public function response(array $errors)
    {
        return response()->json([
            'errors' => $errors
        ], 422);
    }
}