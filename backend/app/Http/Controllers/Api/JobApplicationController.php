<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Application\ApplyJobRequest;
use App\Http\Requests\Application\UpdateStatusRequest;
use App\Http\Resources\LamaranResource;
use App\Models\Lamaran;
use App\Models\Lowongan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class JobApplicationController extends Controller
{
    /**
     * Apply for a job (candidate only)
     */
    public function apply(ApplyJobRequest $request, $lowonganId)
    {
        $kandidat = $request->user()->candidate;

        if (!$kandidat) {
            return response()->json([
                'message' => 'Only candidates can apply for jobs',
                'error' => 'forbidden',
            ], 403);
        }

        $lowongan = Lowongan::active()->findOrFail($lowonganId);

        // Check if already applied
        $existingApplication = Lamaran::where('candidate_id', $kandidat->id)
            ->where('job_listing_id', $lowonganId)
            ->first();

        if ($existingApplication) {
            return response()->json([
                'message' => 'You have already applied for this job',
                'error' => 'already_applied',
                'application' => new LamaranResource($existingApplication->load('jobListing')),
            ], 409);
        }

        $cvPath = $kandidat->cv_path;

        if ($request->cv_type === 'new' && $request->hasFile('cv')) {
            $cvPath = $request->file('cv')->store('applications', 'public');
        }

        if (!$cvPath) {
            return response()->json([
                'message' => 'Please upload a CV or add one to your profile first',
                'error' => 'cv_required',
            ], 400);
        }

        $lamaran = Lamaran::create([
            'candidate_id' => $kandidat->id,
            'job_listing_id' => $lowonganId,
            'cv_path' => $cvPath,
            'cv_type' => $request->cv_type,
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Application submitted successfully',
            'application' => new LamaranResource($lamaran->load('jobListing.recruiter')),
        ], 201);
    }

    /**
     * Update application status (recruiter only)
     */
    public function updateStatus(UpdateStatusRequest $request, $id)
    {
        $rekruter = $request->user()->recruiter;

        if (!$rekruter) {
            return response()->json([
                'message' => 'Only recruiters can update application status',
                'error' => 'forbidden',
            ], 403);
        }

        $lamaran = Lamaran::with('jobListing')
            ->whereHas('jobListing', function ($q) use ($rekruter) {
                $q->where('recruiter_id', $rekruter->id);
            })
            ->findOrFail($id);

        $lamaran->update($request->validated());

        return response()->json([
            'message' => 'Application status updated successfully',
            'application' => new LamaranResource(
                $lamaran->fresh()->load(['candidate.user', 'jobListing'])
            ),
        ]);
    }

    /**
     * View application details
     */
    public function show(Request $request, $id)
    {
        $akun = $request->user();

        $query = Lamaran::with(['candidate.user', 'jobListing.recruiter']);

        if ($akun->isCandidate()) {
            $query->where('candidate_id', $akun->candidate->id);
        } elseif ($akun->isRecruiter()) {
            $query->whereHas('jobListing', function ($q) use ($akun) {
                $q->where('recruiter_id', $akun->recruiter->id);
            });
        }

        $lamaran = $query->findOrFail($id);

        return response()->json([
            'application' => new LamaranResource($lamaran),
        ]);
    }

    /**
     * Withdraw application (candidate only)
     */
    public function withdraw(Request $request, $id)
    {
        $kandidat = $request->user()->candidate;

        if (!$kandidat) {
            return response()->json([
                'message' => 'Only candidates can withdraw applications',
                'error' => 'forbidden',
            ], 403);
        }

        $lamaran = Lamaran::where('id', $id)
            ->where('candidate_id', $kandidat->id)
            ->firstOrFail();

        // Only allow withdrawal if status is pending or reviewed
        if (!in_array($lamaran->status, ['pending', 'reviewed'])) {
            return response()->json([
                'message' => 'Cannot withdraw application at this stage',
                'error' => 'not_allowed',
            ], 400);
        }

        $lamaran->delete();

        return response()->json([
            'message' => 'Application withdrawn successfully',
        ]);
    }
}
