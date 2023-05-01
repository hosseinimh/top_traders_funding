<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblChallengeRulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_challenge_rules', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('duration_1');
            $table->unsignedInteger('duration_2');
            $table->unsignedInteger('duration_real');
            $table->unsignedInteger('duration_free');
            $table->unsignedInteger('daily_sl_1');
            $table->unsignedInteger('daily_sl_2');
            $table->unsignedInteger('daily_sl_real');
            $table->unsignedInteger('daily_sl_free');
            $table->unsignedInteger('total_sl_1');
            $table->unsignedInteger('total_sl_2');
            $table->unsignedInteger('total_sl_real');
            $table->unsignedInteger('total_sl_free');
            $table->unsignedInteger('target_1');
            $table->unsignedInteger('target_2');
            $table->unsignedInteger('target_real');
            $table->unsignedInteger('target_free');
            $table->unsignedInteger('trade_days_1');
            $table->unsignedInteger('trade_days_2');
            $table->unsignedInteger('trade_days_real');
            $table->unsignedInteger('trade_days_free');
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
        Schema::table('tbl_challenge_rules', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
}
