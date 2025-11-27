<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('job_listings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('recruiter_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('company_name');
            $table->string('location');
            $table->string('department');
            $table->enum('type', ['Full Time', 'Part Time', 'Contract', 'Freelance', 'Internship'])->default('Full Time');
            $table->enum('mode', ['On-site', 'Remote', 'Hybrid'])->default('On-site');
            $table->string('level');
            $table->date('deadline');
            $table->string('duration');
            $table->decimal('salary_min', 15, 2)->nullable();
            $table->decimal('salary_max', 15, 2)->nullable();
            $table->string('contact_name');
            $table->string('contact_email');
            $table->string('contact_phone');
            $table->text('description');
            $table->text('responsibilities');
            $table->text('requirements');
            $table->text('benefits')->nullable();
            $table->enum('status', ['active', 'closed', 'draft'])->default('active');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('job_listings');
    }
};
