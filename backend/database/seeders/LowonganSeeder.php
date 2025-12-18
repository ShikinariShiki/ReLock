<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Rekruter;
use App\Models\Lowongan;

class LowonganSeeder extends Seeder
{
    public function run(): void
    {
        // Get recruiters
        $rekruters = Rekruter::all();

        if ($rekruters->isEmpty()) {
            $this->command->warn('No recruiters found. Please run RecruiterSeeder first.');
            return;
        }

        $lowongans = [
            // Jobs for Tech Corp (recruiter 1)
            [
                'recruiter_id' => $rekruters[0]->id ?? 1,
                'title' => 'Senior Full Stack Developer',
                'company_name' => 'Tech Corp Indonesia',
                'location' => 'Jakarta, Indonesia',
                'department' => 'Engineering',
                'type' => 'Full Time',
                'mode' => 'Hybrid',
                'level' => 'Senior (5+ Years)',
                'deadline' => now()->addDays(30),
                'duration' => 'Permanent',
                'salary_min' => 25000000,
                'salary_max' => 40000000,
                'contact_name' => 'Amanda Smith',
                'contact_email' => 'hr@techcorp.com',
                'contact_phone' => '+622112345678',
                'description' => 'We are looking for a Senior Full Stack Developer to join our growing engineering team. You will be responsible for developing and maintaining our core platform using modern technologies.',
                'responsibilities' => "- Design and implement scalable web applications\n- Mentor junior developers and conduct code reviews\n- Collaborate with product team to define technical requirements\n- Optimize application performance and security\n- Participate in agile development processes",
                'requirements' => "- 5+ years of experience in web development\n- Proficiency in React, Node.js, and TypeScript\n- Experience with cloud services (AWS/GCP)\n- Strong understanding of software architecture\n- Excellent communication skills",
                'benefits' => "- Competitive salary with annual bonus\n- Health insurance for family\n- Flexible working hours\n- Professional development budget\n- Stock options",
                'status' => 'active',
            ],
            [
                'recruiter_id' => $rekruters[0]->id ?? 1,
                'title' => 'DevOps Engineer',
                'company_name' => 'Tech Corp Indonesia',
                'location' => 'Jakarta, Indonesia',
                'department' => 'Infrastructure',
                'type' => 'Full Time',
                'mode' => 'Remote',
                'level' => 'Mid Level (3-5 Years)',
                'deadline' => now()->addDays(21),
                'duration' => 'Permanent',
                'salary_min' => 18000000,
                'salary_max' => 28000000,
                'contact_name' => 'Amanda Smith',
                'contact_email' => 'hr@techcorp.com',
                'contact_phone' => '+622112345678',
                'description' => 'Join our DevOps team to build and maintain our cloud infrastructure. You will work on CI/CD pipelines, container orchestration, and infrastructure automation.',
                'responsibilities' => "- Build and maintain CI/CD pipelines\n- Manage Kubernetes clusters\n- Implement infrastructure as code\n- Monitor system performance and reliability\n- Automate deployment processes",
                'requirements' => "- 3+ years of DevOps experience\n- Proficiency in Docker and Kubernetes\n- Experience with AWS or GCP\n- Knowledge of Terraform or Pulumi\n- Scripting skills (Bash, Python)",
                'benefits' => "- Competitive salary\n- Full remote work\n- Health insurance\n- Learning budget\n- Flexible schedule",
                'status' => 'active',
            ],

            // Jobs for Startup Hub (recruiter 2)
            [
                'recruiter_id' => $rekruters[1]->id ?? 2,
                'title' => 'Frontend Developer (React)',
                'company_name' => 'Startup Hub',
                'location' => 'Bandung, Indonesia',
                'department' => 'Product',
                'type' => 'Full Time',
                'mode' => 'Hybrid',
                'level' => 'Entry Level (1-3 Years)',
                'deadline' => now()->addDays(14),
                'duration' => 'Permanent',
                'salary_min' => 8000000,
                'salary_max' => 15000000,
                'contact_name' => 'David Rahman',
                'contact_email' => 'talent@startuphub.io',
                'contact_phone' => '+622112345679',
                'description' => 'We are looking for a passionate Frontend Developer to join our team. You will work on exciting startup projects and have the opportunity to grow with us.',
                'responsibilities' => "- Develop responsive web interfaces\n- Implement UI designs with React\n- Write clean and maintainable code\n- Collaborate with design and backend teams\n- Participate in sprint planning",
                'requirements' => "- 1-3 years of frontend experience\n- Proficiency in React and JavaScript\n- Understanding of HTML, CSS, and responsive design\n- Familiarity with Git\n- Good problem-solving skills",
                'benefits' => "- Startup equity\n- Flexible hours\n- Learning opportunities\n- Young and dynamic team\n- Free snacks and coffee",
                'status' => 'active',
            ],
            [
                'recruiter_id' => $rekruters[1]->id ?? 2,
                'title' => 'UI/UX Designer',
                'company_name' => 'Startup Hub',
                'location' => 'Bandung, Indonesia',
                'department' => 'Design',
                'type' => 'Full Time',
                'mode' => 'On-site',
                'level' => 'Mid Level (3-5 Years)',
                'deadline' => now()->addDays(28),
                'duration' => 'Permanent',
                'salary_min' => 12000000,
                'salary_max' => 20000000,
                'contact_name' => 'David Rahman',
                'contact_email' => 'talent@startuphub.io',
                'contact_phone' => '+622112345679',
                'description' => 'We need a creative UI/UX Designer to create amazing user experiences for our portfolio of startups. You will work closely with founders and developers.',
                'responsibilities' => "- Design intuitive user interfaces\n- Conduct user research and testing\n- Create wireframes and prototypes\n- Build and maintain design systems\n- Collaborate with development team",
                'requirements' => "- 3+ years of UI/UX experience\n- Proficiency in Figma\n- Strong portfolio of web/mobile designs\n- Understanding of user-centered design\n- Excellent visual design skills",
                'benefits' => "- Creative freedom\n- Modern office in Bandung\n- Health insurance\n- Annual retreat\n- Professional development",
                'status' => 'active',
            ],

            // Jobs for Global Finance (recruiter 3)
            [
                'recruiter_id' => $rekruters[2]->id ?? 3,
                'title' => 'Data Analyst',
                'company_name' => 'Global Finance Indonesia',
                'location' => 'Jakarta, Indonesia',
                'department' => 'Analytics',
                'type' => 'Full Time',
                'mode' => 'Hybrid',
                'level' => 'Entry Level (1-3 Years)',
                'deadline' => now()->addDays(35),
                'duration' => 'Permanent',
                'salary_min' => 10000000,
                'salary_max' => 18000000,
                'contact_name' => 'Lisa Tanaka',
                'contact_email' => 'careers@globalfinance.co.id',
                'contact_phone' => '+622112345680',
                'description' => 'Join our analytics team to derive insights from financial data. You will work on various projects to support business decision-making.',
                'responsibilities' => "- Analyze financial data and trends\n- Create reports and dashboards\n- Support business teams with data insights\n- Maintain data quality standards\n- Present findings to stakeholders",
                'requirements' => "- Bachelor degree in Statistics, Math, or related field\n- Proficiency in SQL and Excel\n- Experience with BI tools (Tableau, Power BI)\n- Analytical mindset\n- Good communication skills",
                'benefits' => "- Competitive salary\n- Performance bonus\n- Health and life insurance\n- Career development program\n- Modern office facilities",
                'status' => 'active',
            ],
            [
                'recruiter_id' => $rekruters[2]->id ?? 3,
                'title' => 'Backend Engineer (Java)',
                'company_name' => 'Global Finance Indonesia',
                'location' => 'Jakarta, Indonesia',
                'department' => 'Technology',
                'type' => 'Full Time',
                'mode' => 'Hybrid',
                'level' => 'Senior (5+ Years)',
                'deadline' => now()->addDays(45),
                'duration' => 'Permanent',
                'salary_min' => 30000000,
                'salary_max' => 50000000,
                'contact_name' => 'Lisa Tanaka',
                'contact_email' => 'careers@globalfinance.co.id',
                'contact_phone' => '+622112345680',
                'description' => 'We are seeking an experienced Backend Engineer to develop and maintain our core banking systems. This is a critical role in our digital transformation journey.',
                'responsibilities' => "- Design and develop microservices\n- Ensure system security and compliance\n- Optimize database performance\n- Lead technical design discussions\n- Mentor junior engineers",
                'requirements' => "- 5+ years of Java development experience\n- Experience with Spring Boot and microservices\n- Knowledge of financial systems is a plus\n- Strong understanding of security best practices\n- Experience with Oracle or PostgreSQL",
                'benefits' => "- Top-tier salary package\n- Annual bonus up to 3 months\n- Premium health insurance\n- Retirement plan\n- International exposure opportunities",
                'status' => 'active',
            ],
            [
                'recruiter_id' => $rekruters[0]->id ?? 1,
                'title' => 'Mobile Developer (Flutter)',
                'company_name' => 'Tech Corp Indonesia',
                'location' => 'Jakarta, Indonesia',
                'department' => 'Mobile',
                'type' => 'Contract',
                'mode' => 'Remote',
                'level' => 'Mid Level (3-5 Years)',
                'deadline' => now()->addDays(7),
                'duration' => '12 months',
                'salary_min' => 20000000,
                'salary_max' => 30000000,
                'contact_name' => 'Amanda Smith',
                'contact_email' => 'hr@techcorp.com',
                'contact_phone' => '+622112345678',
                'description' => 'Contract position for an experienced Flutter developer to help build our new mobile application. Possibility of extension or conversion to full-time.',
                'responsibilities' => "- Develop cross-platform mobile apps with Flutter\n- Implement UI designs and animations\n- Integrate with REST APIs\n- Write unit and integration tests\n- Collaborate with iOS and Android teams",
                'requirements' => "- 3+ years of mobile development experience\n- Strong Flutter and Dart skills\n- Experience with state management (Bloc, Riverpod)\n- Published apps on App Store/Play Store\n- Good English communication",
                'benefits' => "- Competitive contract rate\n- Fully remote work\n- Flexible hours\n- Modern tech stack\n- Conversion possibility",
                'status' => 'active',
            ],
            [
                'recruiter_id' => $rekruters[1]->id ?? 2,
                'title' => 'Marketing Intern',
                'company_name' => 'Startup Hub',
                'location' => 'Bandung, Indonesia',
                'department' => 'Marketing',
                'type' => 'Internship',
                'mode' => 'On-site',
                'level' => 'Internship',
                'deadline' => now()->addDays(10),
                'duration' => '6 months',
                'salary_min' => 2000000,
                'salary_max' => 3500000,
                'contact_name' => 'David Rahman',
                'contact_email' => 'talent@startuphub.io',
                'contact_phone' => '+622112345679',
                'description' => 'Great opportunity for students or fresh graduates to learn digital marketing in a startup environment. You will work directly with our marketing team.',
                'responsibilities' => "- Assist with social media management\n- Create content for various platforms\n- Help with email marketing campaigns\n- Research market trends\n- Support event organization",
                'requirements' => "- Currently studying or fresh graduate\n- Interest in digital marketing\n- Good writing skills\n- Familiar with social media platforms\n- Creative and proactive",
                'benefits' => "- Monthly allowance\n- Certificate of completion\n- Mentorship program\n- Networking opportunities\n- Potential full-time offer",
                'status' => 'active',
            ],
        ];

        foreach ($lowongans as $lowongan) {
            Lowongan::create($lowongan);
        }
    }
}
