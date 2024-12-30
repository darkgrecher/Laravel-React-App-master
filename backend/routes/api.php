<?php
// routes/api.php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function() {
    Route::get('logout', [AuthController::class, 'logout']);


    Route::get('me', function (Request $request) {
        return response()->json(['data' => $request->user()]);
    });

    Route::apiResource('/user', UserController::class);
});

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

// backend/routes/api.js
