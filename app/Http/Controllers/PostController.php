<?php

namespace App\Http\Controllers;

use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use App\Models\Surveys;

class PostController extends Controller
{
    public function store(Request $request){
        $checkKey = true;
        $key = '';
        while($checkKey == true){
            $generatedKey = str_shuffle("aabbccccwafawfgqwehqwedasfdefghijklmnopqrstuvwxyz01234567890");
            try{
                $checkIfKeyExists = Surveys::where('survey_key', $generatedKey)->count();
            } catch (QueryException $e){
                abort(500);
            }
            
            if($checkIfKeyExists == 0){
                $key = $generatedKey;
                $checkKey = false;
            }
        }

        try{
            $request->user()->surveys()->create([
                'title' => $request->title,
                'about' => $request->about,
                'list_of_questions' => $request->list,
                'survey_key' => $key,
            ]);
            return response('Survey Saved',201);
        } catch(QueryException $e){
            abort(500);
        }
    }

    public function destroy($key, Request $request){
        try{
            $request->user()->surveys()->where('survey_key', $key)->delete();
            return response("Survey Deleted", 204);
        } catch (QueryException $e){
            abort(500);
        }
    }
}
