<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\FinishedSurveys as Completed;

class Surveys extends Model
{
    use HasFactory;
    protected $fillable = [
        'list_of_questions',
        'title',
        'about',
        'survey_key'
    ];
    protected $casts = [
        'list_of_questions' => 'array'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function finished_surveys(){
        return $this->hasMany(Completed::class);
    }
}
