<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\resources\UserResource;
use App\Http\resources\OwnerResource;
use Illuminate\Support\Facades\Storage;

use Carbon\Carbon;

class VehicleResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'image_path' => $this->image_path ? Storage::url($this->image_path) : '',
            'type' => $this->type,
            'color' => $this->color,
            'plate_number' =>$this->plate_number,
            'description' => $this->description,
            'assigned_user_id' => $this-> assigned_user_id,
            'assignedUser' => $this -> assignedUser ? new UserResource
            ($this->assignedUser) : null,
            'createdBy' => new UserResource($this->createdBy),
            'updatedBy' => new UserResource($this->updatedBy),
            'owner_id' => $this->owner_id,
            'owner' => new OwnerResource($this->owner),
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
        ];
    }
}
