<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;

class UserController extends Controller
{

    public function index()
    {
        return UserResource::collection(
            User::query()->orderBy('id', 'desc')->get()
        );
    }



    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $user = User::create($data);
        return response(new UserResource($user), 201);
    }


    //  Display resource.

    public function show(User $user)
    {
        return new UserResource($user);
    }

    // PUT

    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }
        $user->update($data);
        return new UserResource($user);
    }

    // Delete 

    public function destroy(User $user)
    {
        $user->delete();

        return response()->json(['message' => 'Successfully Deleted'], 200);
    }
}
