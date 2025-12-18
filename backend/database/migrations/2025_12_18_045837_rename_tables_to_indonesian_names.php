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
        // Drop foreign keys first
        Schema::table('job_applications', function (Blueprint $table) {
            $table->dropForeign(['candidate_id']);
            $table->dropForeign(['job_listing_id']);
        });
        
        Schema::table('job_listings', function (Blueprint $table) {
            $table->dropForeign(['recruiter_id']);
        });
        
        Schema::table('bookmarks', function (Blueprint $table) {
            $table->dropForeign(['candidate_id']);
            $table->dropForeign(['job_listing_id']);
        });
        
        Schema::table('candidates', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
        });
        
        Schema::table('recruiters', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
        });
        
        // Rename tables
        Schema::rename('users', 'akuns');
        Schema::rename('candidates', 'kandidats');
        Schema::rename('recruiters', 'rekruters');
        Schema::rename('job_listings', 'lowongans');
        Schema::rename('job_applications', 'lamarans');
        
        // Rename columns in kandidats
        Schema::table('kandidats', function (Blueprint $table) {
            $table->renameColumn('user_id', 'akun_id');
        });
        
        // Rename columns in rekruters
        Schema::table('rekruters', function (Blueprint $table) {
            $table->renameColumn('user_id', 'akun_id');
        });
        
        // Rename columns in lowongans
        Schema::table('lowongans', function (Blueprint $table) {
            $table->renameColumn('recruiter_id', 'rekruter_id');
        });
        
        // Rename columns in lamarans
        Schema::table('lamarans', function (Blueprint $table) {
            $table->renameColumn('candidate_id', 'kandidat_id');
            $table->renameColumn('job_listing_id', 'lowongan_id');
        });
        
        // Rename columns in bookmarks
        Schema::table('bookmarks', function (Blueprint $table) {
            $table->renameColumn('candidate_id', 'kandidat_id');
            $table->renameColumn('job_listing_id', 'lowongan_id');
        });
        
        // Add foreign keys back
        Schema::table('kandidats', function (Blueprint $table) {
            $table->foreign('akun_id')->references('id')->on('akuns')->onDelete('cascade');
        });
        
        Schema::table('rekruters', function (Blueprint $table) {
            $table->foreign('akun_id')->references('id')->on('akuns')->onDelete('cascade');
        });
        
        Schema::table('lowongans', function (Blueprint $table) {
            $table->foreign('rekruter_id')->references('id')->on('rekruters')->onDelete('cascade');
        });
        
        Schema::table('lamarans', function (Blueprint $table) {
            $table->foreign('kandidat_id')->references('id')->on('kandidats')->onDelete('cascade');
            $table->foreign('lowongan_id')->references('id')->on('lowongans')->onDelete('cascade');
        });
        
        Schema::table('bookmarks', function (Blueprint $table) {
            $table->foreign('kandidat_id')->references('id')->on('kandidats')->onDelete('cascade');
            $table->foreign('lowongan_id')->references('id')->on('lowongans')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop foreign keys
        Schema::table('lamarans', function (Blueprint $table) {
            $table->dropForeign(['kandidat_id']);
            $table->dropForeign(['lowongan_id']);
        });
        
        Schema::table('lowongans', function (Blueprint $table) {
            $table->dropForeign(['rekruter_id']);
        });
        
        Schema::table('bookmarks', function (Blueprint $table) {
            $table->dropForeign(['kandidat_id']);
            $table->dropForeign(['lowongan_id']);
        });
        
        Schema::table('kandidats', function (Blueprint $table) {
            $table->dropForeign(['akun_id']);
        });
        
        Schema::table('rekruters', function (Blueprint $table) {
            $table->dropForeign(['akun_id']);
        });
        
        // Rename columns back
        Schema::table('bookmarks', function (Blueprint $table) {
            $table->renameColumn('kandidat_id', 'candidate_id');
            $table->renameColumn('lowongan_id', 'job_listing_id');
        });
        
        Schema::table('lamarans', function (Blueprint $table) {
            $table->renameColumn('kandidat_id', 'candidate_id');
            $table->renameColumn('lowongan_id', 'job_listing_id');
        });
        
        Schema::table('lowongans', function (Blueprint $table) {
            $table->renameColumn('rekruter_id', 'recruiter_id');
        });
        
        Schema::table('rekruters', function (Blueprint $table) {
            $table->renameColumn('akun_id', 'user_id');
        });
        
        Schema::table('kandidats', function (Blueprint $table) {
            $table->renameColumn('akun_id', 'user_id');
        });
        
        // Rename tables back
        Schema::rename('lamarans', 'job_applications');
        Schema::rename('lowongans', 'job_listings');
        Schema::rename('rekruters', 'recruiters');
        Schema::rename('kandidats', 'candidates');
        Schema::rename('akuns', 'users');
        
        // Add foreign keys back
        Schema::table('job_applications', function (Blueprint $table) {
            $table->foreign('candidate_id')->references('id')->on('candidates')->onDelete('cascade');
            $table->foreign('job_listing_id')->references('id')->on('job_listings')->onDelete('cascade');
        });
        
        Schema::table('job_listings', function (Blueprint $table) {
            $table->foreign('recruiter_id')->references('id')->on('recruiters')->onDelete('cascade');
        });
        
        Schema::table('bookmarks', function (Blueprint $table) {
            $table->foreign('candidate_id')->references('id')->on('candidates')->onDelete('cascade');
            $table->foreign('job_listing_id')->references('id')->on('job_listings')->onDelete('cascade');
        });
        
        Schema::table('candidates', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
        
        Schema::table('recruiters', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }
};
