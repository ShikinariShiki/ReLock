<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('candidates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('phone')->nullable();
            $table->string('linkedin')->nullable();
            $table->string('location')->nullable();
            $table->text('about')->nullable();
            $table->string('role')->nullable();
            $table->json('skills')->nullable();
            $table->json('experiences')->nullable();
            $table->json('organizations')->nullable();
            $table->json('education')->nullable();
            $table->string('preferred_location')->nullable();
            $table->string('experience_level')->nullable();
            $table->string('portfolio_link')->nullable();
            $table->string('cv_path')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('candidates');
    }
};
