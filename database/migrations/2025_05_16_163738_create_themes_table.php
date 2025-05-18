<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('themes', function (Blueprint $table) {
            $table->id();
            $table->string('bg_left')->nullable();
            $table->string('bg_right')->nullable();
            $table->string('bg_mobile')->nullable();
            $table->string('logo_1')->nullable();
            $table->string('logo_2')->nullable();
            $table->string('login_card')->nullable();
            $table->string('login_button')->nullable();
            $table->string('logout_button')->nullable();
            $table->string('claim_card')->nullable();
            $table->string('claim_button')->nullable();
            $table->string('back_button')->nullable();
            $table->string('link_active')->nullable();
            $table->string('features')->nullable();
            $table->string('popup')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('themes');
    }
};
