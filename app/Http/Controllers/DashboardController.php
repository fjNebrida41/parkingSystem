<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use App\Models\Owner;
use app\Models\User;

use Illuminate\Support\Facades\Auth;
use App\Http\Resources\VehicleResource;
use App\Http\Resources\OwnerResource;
use App\Http\Resources\UserResource;

class DashboardController extends Controller
{
    public function index() 
    {
        $user = auth()->user();
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        $totalBicycle = Vehicle::query()
            ->where('type', 'bicycle')
            ->count();
        $assignedBicycle = Vehicle::query()
            ->where('type', 'bicycle')
            ->where('created_by', $user->id)
            ->count();    

        $totalMotorcycle = Vehicle::query()
        ->where('type', 'motorcycle')
        ->count();
        $assignedMotorcycle = Vehicle::query()
            ->where('type', 'motorcycle')
            ->where('created_by', $user->id)
            ->count();  

        $totalEBike2s = Vehicle::query()
            ->where('type', 'e_bike_2s')
            ->count();
        $assignedEBike2s = vehicle::query()
            ->where('type', 'e_bike_2s')
            ->where('created_by', $user->id)
            ->count();  

        $totalEBike4s = Vehicle::query()
            ->where('type', 'e_bike_4s')
            ->count();
        $assignedEBike4s = vehicle::query()
            ->where('type', 'e_bike_4s')
            ->where('created_by', $user->id)
            ->count();  

        $totalTimeOut = Owner::query()
            ->where('time_out')
            ->count();
        $assignedTimeOut = Owner::query()
            ->where('time_out')
            ->where('created_by', $user->id)
            ->count();

        $total = Vehicle::query()
            ->count();
        $assignedTotal = Vehicle::query()
            ->where('created_by', $user->id)
            ->count();

        $latestOwners = Owner::query()
            ->where('created_by', $user->id)
            ->orderBy($sortField, $sortDirection)
            ->limit(10)
            ->get();
        $latestOwners = OwnerResource::collection($latestOwners);

        return inertia('Dashboard', compact(
            'totalBicycle',
            'totalMotorcycle',
            'totalEBike2s',
            'totalEBike4s',
            'assignedBicycle',
            'assignedMotorcycle',
            'assignedEBike2s',
            'assignedEBike4s',
            'total',
            'assignedTotal',
            'latestOwners',
            'assignedTimeOut',
            'totalTimeOut',
        ));
    }
}
