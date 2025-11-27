<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('job_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('candidate_id')->constrained()->onDelete('cascade');
            $table->unsignedBigInteger('job_listing_id');
            $table->foreign('job_listing_id')->references('id')->on('job_listings')->onDelete('cascade');
            $table->string('cv_path');
            $table->enum('cv_type', ['existing', 'new'])->default('existing');
            $table->enum('status', ['pending', 'reviewed', 'shortlisted', 'rejected', 'accepted'])->default('pending');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('job_applications');
    }
};
