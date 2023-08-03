<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_challenge_deals', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('challenge_id');
            $table->string('deal_id');
            $table->string('platform');
            $table->string('type');
            $table->string('time');
            $table->string('broker_time');
            $table->double('commission');
            $table->double('swap');
            $table->double('profit');
            $table->string('symbol')->nullable();
            $table->unsignedBigInteger('magic')->nullable();
            $table->string('order_id')->nullable();
            $table->string('position_id')->nullable();
            $table->string('reason')->nullable();
            $table->string('entry_type')->nullable();
            $table->double('volume')->nullable();
            $table->double('price')->nullable();
            $table->double('account_currency_exchange_rate');
            $table->unsignedBigInteger('update_sequence_number')->nullable();
            $table->string('comment')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('challenge_id')->references('id')->on('tbl_challenges');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tbl_challenge_deals', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
