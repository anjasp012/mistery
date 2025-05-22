<?php

use App\Models\Key;
use App\Models\User;
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
        Schema::create('codes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users', 'id')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('key_id')->constrained('keys', 'id')->cascadeOnDelete()->cascadeOnUpdate();
            $table->boolean('is_reedem')->default(false);
            $table->string('code');
            $table->integer('amount');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vouchers');
    }
};
