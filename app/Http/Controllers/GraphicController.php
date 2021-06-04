<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Surveys;
use App\Models\FinishedSurveys;
use Illuminate\Database\QueryException;

class GraphicController extends Controller
{
    public function index(Request $request){
        try{
            $resultFinshed = FinishedSurveys::select('email', 'survey_answers')->where('survey_key', $request->key)->get();
            $resultUnfinished = Surveys::select('title', 'about', 'list_of_questions', 'survey_key')->where('survey_key', $request->key)->get();
        } catch(QueryException $e){
            return response($e, 500);
        }

        return response(['finished' => $resultFinshed, 'unfinished' => $resultUnfinished], 200);
    }
}
