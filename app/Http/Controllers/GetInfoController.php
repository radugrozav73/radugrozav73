<?php

namespace App\Http\Controllers;

use App\Models\Surveys;
use Illuminate\Http\Request;
use App\Models\FinishedSurveys;
use App\Models\User;
use Illuminate\Database\QueryException;


class GetInfoController extends Controller
{
    public function __construct(){
        try{
            $this->middleware('auth');
        } catch(QueryException $e){
            return response("unauthorized");
        }
    }

    public function show(Request $request): Object{
        try{
            $survey = Surveys::where('survey_key', $request->key)->get();
        } catch (QueryException $e){
            return response('Error ocured trying to find the survey', 500);
        }

        try{
            $check = FinishedSurveys::where('survey_key', $request->key)->where('email', $request->user()->email)->count();
        } catch (QueryException $e){
            return response('Error ocured trying to find the survey', 500);
        }

        if($check > 0){
            abort(403);
        }

        return response()->json([
            'title' => $survey[0]->title,
            'about' => $survey[0]->about,
            'list_of_questions' => $survey[0]->list_of_questions,
            'survey_key' => $survey[0]->survey_key
        ]);
    }

    public function index(Request $request):Object{
        try{
            $post = Surveys::query();
            $posts = $post->select('title', 'list_of_questions', 'about', 'survey_key')->where('user_id', $request->user()->id)->paginate(6);
            $count = $post->where('user_id', $request->user()->id)->count();
        } catch ( QueryException $e){
            abort(500);
        }
        return response(['posts' => $posts, 'count'=>$count, 'name'=>$request->user()->name] ,200);
    }
}
