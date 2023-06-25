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
        Schema::create('tbl_sent_emails', function (Blueprint $table) {
            $table->id();
            $table->string('from', 50);
            $table->string('to', 50);
            $table->string('type');
            $table->string('message_fields');
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
        Schema::table('tbl_campaigns', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
