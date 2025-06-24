<?php

namespace App\Http\Controllers;

use App\Models\Owner;
use App\Models\User;

use App\Http\Requests\StoreOwnerRequest;
use App\Http\Requests\UpdateOwnerRequest;
use App\Http\resources\OwnerResource;
use App\Http\resources\VehicleResource;
use App\Http\resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class OwnerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Owner::query();

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", 'desc');

        if (request('id')) {
            $query->where("id", "like", "%" . request("id") . "%");
        }
        if (request('name')) {
            $query->where("name", "like", "%" . request("name") . "%");
        }

        if ($request->status ==='not_checked_out') {
            $query->whereNull('time_out');
        }

        $owners = $query
        ->orderBy($sortField, $sortDirection)
        ->paginate(10)
        ->onEachside(1);

        return inertia('Owner/Index', [ 
            "owners" => OwnerResource::collection($owners),
            'queryParams' => request()->query() ? : null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::query()->orderBy('name', 'asc')->get();

        return inertia("Owner/Create", [
            'owners' => Owner::orderBy('created_at', 'desc')->get(),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOwnerRequest $request)
    {
        
        $data = $request->validated();
        $image =$data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        if($image) {
            $data['image_path'] = $image->store('owner/' . Str::random(), 'public');
        }
        Owner::create($data);
        return to_route('vehicle.create');
    }

    /**
     * Display the specified resource.
     */
    public function show(Owner $owner)
    {   
        $query = $owner->vehicles();

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", 'desc');

        if (request('id')) {
            $query->where("id", "like", "%" . request("id") . "%");
        }
        if (request('name')) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        $vehicles = $query
        ->orderBy($sortField, $sortDirection)
        ->paginate(10)
        ->onEachside(1);

        return inertia('Owner/Show', [
            'owner' => new OwnerResource($owner),
            "vehicles" => VehicleResource::collection($vehicles),
            "queryParams" => request()->query() ? : null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Owner $owner)
    {
        return inertia('Owner/Edit', [
            'owner' => new OwnerResource($owner),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOwnerRequest $request, Owner $owner)
    {
        $data = $request->validated();
        $image =$data['image'] ?? null;
        unset($data['created_by']);
        $data['updated_by'] = Auth::id();
        if($image) {
            if ($owner->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($owner->image_path));
            }
            $data['image_path'] = $image->store('owner/' . Str::random(), 'public');
        }
        $owner->update($data);

        return to_route('owner.index')
        ->with('success', "Owner \"$owner->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Owner $owner)
    {
        $name = $owner->name;
        $owner->delete();
        if ($owner->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($owner->image_path));
        }
        return to_route('owner.index')
            ->with('success', "Owner \"$name\" was deleted");
    }

    public function assignedToMe()
    {
        $user = auth()->user();
        $query = Owner::query()->where('created_by', $user->id);

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request('id')) {
            $query->where("id", "like", "%" . request("id") . "%");
        }
        if (request('name')) {
            $query->where("name", "like", "%" . request("name") . "%");
        }

        $owners = $query->orderBy($sortField, $sortDirection)
        ->paginate(10)
        ->onEachSide(1);

        return inertia("Owner/Index", [
            "owners" => OwnerResource::collection($owners),
            'queryParams' => request()->query() ? : null,
            'success' => session('success'),
        ]);
    }
}
