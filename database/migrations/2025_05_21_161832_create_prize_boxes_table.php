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
        Schema::create('prize_boxes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_box_id')->constrained('user_boxes', 'id')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('prize_id')->constrained('prizes', 'id');
            $table->boolean('is_open')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prize_boxes');
    }
};
