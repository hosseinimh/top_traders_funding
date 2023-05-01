<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblChallengePlatformsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_challenge_platforms', function (Blueprint $table) {
            $table->id();
            $table->string('value');
            $table->unsignedTinyInteger('free')->default(1);
            $table->unsignedTinyInteger('real')->default(1);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tbl_challenge_platforms', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
}
