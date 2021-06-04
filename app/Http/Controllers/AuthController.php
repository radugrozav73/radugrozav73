<?php

namespace App\Http\Controllers;

use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    protected function login(Request $request)  {

        if(!$token = Auth::attempt($request->only('email', 'password'))){
            abort(401);
        }

        return response([
            'token'=>$token,
            'surveys'=>$request->user()->surveys()->select('title', 'about', 'survey_key', 'list_of_questions')->get(),
        ]
            ,201);
    }

    protected function register(Request $request) : String {

        try{
            $user = User::where('email', $request['email'])->first();
        } catch (QueryException $e){
            abort(500);
        }

        if($user){
            abort(409);
        }

        try{
            User::firstOrCreate([
                'email' => $request['email'],
                'name' => $request['name'],
                'password' => Hash::make($request['password'])
            ]);
            return response('Successfully logged in', 201);
        } catch (QueryException $e){
            abort(500);
        }

        return response('User Created', 201);
    }

    protected function destroy() : String {
        try{
            Auth::logout(true);
            return response('Successfully logged off', 200);
        } catch (QueryException $e){
            return response('Error ocurred trying to log out', 500);
        }
    }
}
