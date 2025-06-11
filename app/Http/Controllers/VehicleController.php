<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use App\Models\User;
use App\Models\Owner;

use App\Http\Requests\StoreVehicleRequest;
use App\Http\Requests\UpdateVehicleRequest;
use App\Http\resources\VehicleResource;
use App\Http\resources\UserResource;
use App\Http\resources\OwnerResource;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class VehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $query = Vehicle::query();

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", 'desc');

        if (request('id')) {
            $query->where("id", "like", "%" . request("id") . "%");
        }
        if (request('name')) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request('color')) {
            $query->where("color", "like", "%" . request("color") . "%");
        }
        
        $type = request('type') ?? request('vehicleType');

        if ($type) {
            $query->where("type", $type);
        }

        $vehicles = $query
        ->orderBy($sortField, $sortDirection)
        ->paginate(10)
        ->onEachside(1);

        return inertia('Vehicle/Index', [ 
            "vehicles" => VehicleResource::collection($vehicles),
            'queryParams' => request()->query() ? : null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $latestOwner = Owner::latest()->first();
        $currentUser = Auth::user();

        return inertia("Vehicle/Create", [
            'owner' => $latestOwner ? new OwnerResource($latestOwner) : null,
            'user' => $currentUser ? new UserResource($currentUser) : null,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVehicleRequest $request)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        if ($image) {
            $data['image_path'] = $image->store('vehicle/' . Str::random(), 'public');
        }

        Vehicle::create($data);

        $owner = Owner::find($data['owner_id']);

        return to_route('owner.index')
            ->with('success', "\"{$owner->name}\" was added");
    }


    /**
     * Display the specified resource.
     */
    public function show(Vehicle $vehicle)
    {
        return inertia('Vehicle/Show', [
            'vehicle' => new VehicleResource($vehicle),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Vehicle $vehicle)
    {
        $owners = Owner::query()->orderBy('name', 'asc')->get();
        $users = User::query()->orderBy('name', 'asc')->get();

        return inertia("Vehicle/Edit", [
            'vehicle' => new VehicleResource($vehicle),
            'owners' => OwnerResource::collection($owners),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVehicleRequest $request, Vehicle $vehicle)
    {
        $data = $request->validated();
        $image =$data['image'] ?? null;
        $data['created_by'] = Auth::id();
        if($image) {
            if ($vehicle->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($vehicle->image_path));
            }
            $data['image_path'] = $image->store('vehicle/' . Str::random(), 'public');
        }
        $vehicle->update($data);

        return to_route('vehicle.index')
        ->with('success', "Vehicle \"$vehicle->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vehicle $vehicle)
    {
        $name = $vehicle->name;
        $vehicle->delete();
        if ($vehicle->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($vehicle->image_path));
        }
        return to_route('vehicle.index')
            ->with('success', "Vehicle was deleted");
    }
}
