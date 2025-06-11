<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateVehicleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'image' => ['image'],
            'owner_id' => ['required', 'exists:owners,id'],
            'assigned_user_id' => ['required', 'exists:users,id'],
            'type' => ['required', 
            Rule::in(['bicycle', 'motorcycle', 'e_bike_2s', 'e_bike_4s'])],
            'color' => ['required', 
            Rule::in(['red', 'orange', 'yellow', 'green',
            'blue', 'black', 'violet', 'white', 'silver', 'gray'])],
            'plate_number' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
        ];
    }
}
