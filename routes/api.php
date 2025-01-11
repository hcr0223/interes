<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;

Route::post('registro', [AuthController::class, 'registro']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function() {
    Route::post('get-clientes', [ClientController::class, 'list']);
    Route::post('carga-clientes', [ClientController::class, 'upload']);
});