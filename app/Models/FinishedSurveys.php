<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Surveys;

class FinishedSurveys extends Model
{
    use HasFactory;

    protected $fillable=[
        'email',
        'survey_key',
        'survey_answers'
    ];

    protected $casts = [
        'survey_answers' => 'array'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function survey(){
        return $this->belongsTo(Surveys::class);
    }
}
