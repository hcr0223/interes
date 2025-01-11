<?php

namespace App\Http\Controllers;

use JWTAuth;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function registro(Request $request) {
        $validatedData = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8'
        ]);

        $user = User::create($validatedData);

        return response()->json(compact('user'), Response::HTTP_OK);
    }

    public function login(Request $request) {
        $request->validate([
            'email' => 'required|email|string',
            'password' => 'required|min:8'
        ]);

        $token = $this->guard($request->email, $request->password);
        $user = auth()->user();

        if($token) {
            return response()->json(compact('token','user'), Response::HTTP_OK)->header('Authorization', $token);
        } else {
            return response()->json(null, Response::HTTP_BAD_REQUEST);
        }
    }

    protected function guard($email, $password) {
        return JWTAuth::attempt([
            'email' => $email,
            'password' => $password
        ]);
    }
}
