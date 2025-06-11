<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    protected $fillable = ['image_path', 'type', 'color', 'plate_number', 
    'description', 'assigned_user_id', 'created_by', 'updated_by', 'owner_id'];

    /** @use HasFactory<\Database\Factories\VehicleFactory> */
    use HasFactory;

    public function owner() {
        return $this->belongsTo(Owner::class);
    }

    public function assignedUser() {
        return $this->belongsTo(User::class, 'assigned_user_id');
    }

    public function createdBy() {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy() {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
