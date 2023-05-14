<?php

use App\Constants\ChallengeLevel;
use App\Constants\ChallengeStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblChallengesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_challenges', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('balance_id');
            $table->unsignedBigInteger('server_id');
            $table->unsignedBigInteger('platform_id');
            $table->unsignedBigInteger('leverage_id');
            $table->unsignedTinyInteger('level');
            $table->unsignedTinyInteger('status')->default(ChallengeStatus::WAITING_VERIFICATION);
            $table->unsignedBigInteger('account_no')->nullable();
            $table->string('password')->nullable();
            $table->string('investor_password')->nullable();
            $table->string('meta_api_token')->nullable();
            $table->string('meta_api_account_id')->nullable();
            $table->unsignedBigInteger('equity');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('user_id')->references('id')->on('tbl_users');
            $table->foreign('balance_id')->references('id')->on('tbl_challenge_balances');
            $table->foreign('server_id')->references('id')->on('tbl_challenge_servers');
            $table->foreign('platform_id')->references('id')->on('tbl_challenge_platforms');
            $table->foreign('leverage_id')->references('id')->on('tbl_challenge_leverages');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tbl_challenges', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
}
