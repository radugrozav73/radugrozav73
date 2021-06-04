<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FinishedSurveys as Completed;
use Illuminate\Database\QueryException;

class CompletedSurveysController extends Controller
{
    public function store(Request $request):Object{

        try{
            $check = Completed::where('survey_key', $request->key)->where('email', $request->user()->email)->count();
        } catch (QueryException $e){
            return response($e, 500);
        }

        if($check > 0){
            return response('Already Finished', 403);
        }

        try{
            Completed::create([
                'survey_key' => $request->key,
                'email' => $request->user()->email,
                'survey_answers' => $request->answer,
            ]);
            return response('Successfully created', 201);
        } catch (QueryException $e){
            return response($e, 500);
        }
    }
}
