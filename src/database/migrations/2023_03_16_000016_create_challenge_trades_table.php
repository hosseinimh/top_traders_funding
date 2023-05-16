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
        Schema::create('tbl_challenge_trades', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('challenge_id');
            $table->unsignedBigInteger('deal_id');
            $table->string('platform');
            $table->unsignedTinyInteger('type');
            $table->string('time');
            $table->string('broker_time');
            $table->double('commission');
            $table->double('swap');
            $table->double('profit');
            $table->string('symbol')->nullable();
            $table->unsignedBigInteger('magic')->nullable();
            $table->unsignedBigInteger('order_id')->nullable();
            $table->unsignedBigInteger('position_id')->nullable();
            $table->unsignedTinyInteger('reason')->nullable();
            $table->unsignedTinyInteger('entry_type')->nullable();
            $table->double('volume')->nullable();
            $table->double('price')->nullable();
            $table->double('account_currency_exchange_rate');
            $table->unsignedBigInteger('update_sequence_number');

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
        Schema::dropIfExists('tbl_challenge_trades');
    }
};
