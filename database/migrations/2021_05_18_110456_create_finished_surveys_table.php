<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFinishedSurveysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('finished_surveys', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('survey_key');
            $table->string('email');
            $table->foreign('survey_key')->references('survey_key')->on('surveys')->onDelete('cascade');
            $table->json('survey_answers');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('finished_surveys');
    }
}
