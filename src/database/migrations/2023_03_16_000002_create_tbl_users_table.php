<?php

use App\Constants\Locale;
use App\Constants\Role;
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
        Schema::create('tbl_users', function (Blueprint $table) {
            $table->id();
            $table->string('username')->unique();
            $table->string('password');
            $table->string('name');
            $table->string('family')->nullable();
            $table->string('father_name')->nullable();
            $table->string('national_no')->nullable();
            $table->string('identity_no')->nullable();
            $table->string('birth_date')->nullable();
            $table->unsignedTinyInteger('gender')->default(1);
            $table->text('address')->nullable();
            $table->string('mobile')->nullable();
            $table->string('tel')->nullable();
            $table->string('email')->unique();
            $table->string('google_id')->nullable();
            $table->string('avatar')->nullable();
            $table->string('avatar_original')->nullable();
            $table->string('locale')->default(Locale::FA);
            $table->unsignedTinyInteger('role')->default(Role::USER);
            $table->unsignedTinyInteger('is_active')->default(0);
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
        Schema::table('tbl_users', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
