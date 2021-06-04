<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GetInfoController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CompletedSurveysController;
use App\Http\Controllers\GraphicController;

Route::post('/user/login', [AuthController::class, 'login']);
Route::post('/user/register', [AuthController::class, 'register']);

Route::post('/getSurveyByKey', [GetInfoController::class, 'show'])->middleware('auth');

Route::get('/informations/me', [GetInfoController::class, 'index'])->middleware('auth');
Route::post('/getgraphresults', [GraphicController::class, 'index'])->middleware('auth');

Route::post('/post/completed_surveys', [CompletedSurveysController::class, 'store'])->middleware('auth');

Route::post('/post/survey', [PostController::class, 'store'])->middleware('auth');

Route::delete('/delete/survey/{id}', [PostController::class, 'destroy'])->middleware('auth');
Route::delete('/user/logout', [AuthController::class, 'destroy']);

