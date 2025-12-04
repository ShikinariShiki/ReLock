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
        Schema::table('recruiters', function (Blueprint $table) {
            $table->string('tagline')->nullable()->after('company_description');
            $table->text('vision')->nullable()->after('tagline');
            $table->text('mission')->nullable()->after('vision');
            $table->string('industry')->nullable()->after('mission');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('recruiters', function (Blueprint $table) {
            $table->dropColumn(['tagline', 'vision', 'mission', 'industry']);
        });
    }
};
