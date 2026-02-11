import { Metadata } from 'next';
import Image from 'next/image';
import { LuFileText, LuMail } from 'react-icons/lu';

export const metadata: Metadata = {
  title: 'Terms of Service – Interview Screener',
  description: 'Read Interview Screener\'s Terms of Service. Understand our AI-powered recruitment platform usage policies, user responsibilities, and service agreements.',
  keywords: 'terms of service, Interview Screener terms, AI recruitment terms, service agreement, user terms',
};

export default function TermsOfServicePage() {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="relative min-h-screen z-0">
      {/* Background Gradient */}
      <div 
        className="absolute top-0 left-0 w-full h-full z-[-1]"
        style={{
          background: 'linear-gradient(0deg, rgba(0, 160, 226, 0.00) 24.86%, rgba(51, 136, 255, 0.10) 100%)'
        }}
      />
      
      {/* Background Image Overlay */}
      <div className="absolute top-0 left-0 w-full h-full z-[-2]">
        <Image 
          src="/banner_grid.png" 
          alt="Grid Background"
          width={3840}
          height={2604}
          sizes="100vw"
          className="w-full"
          style={{
            width: '100%',
            height: 'auto',
            opacity: 0.6,
          }}
          priority
          fetchPriority="high"
        />
      </div>

      {/* Header */}
      <div className="pt-32 pb-16 sm:pt-28 sm:pb-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <LuFileText className="text-3xl text-primary" />
            </div>
            <h1 className="font-lexend text-5xl sm:text-4xl font-bold text-text mb-4">
              Terms of Service
            </h1>
            <p className="font-nunito text-lg text-text-light">
              Please read these Terms of Service carefully before using Interview Screener
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            {/* Section 1 */}
            <section className="mb-12">
              <h2 className="font-lexend text-3xl font-bold text-text mb-4">1. Overview</h2>
              <p className="font-nunito text-[17px] leading-[1.8] text-text">
                Interview Screener ("we," "our," or "us") provides AI-driven recruitment software that automates resume parsing, interview assessment, and candidate evaluation. By using our services, you ("User," "Candidate," or "Company") agree to these Terms of Service.
              </p>
            </section>

            {/* Section 2 */}
            <section className="mb-12">
              <h2 className="font-lexend text-3xl font-bold text-text mb-4">2. Eligibility and Use of Services</h2>
              <p className="font-nunito text-[17px] leading-[1.8] text-text">
                You must be at least 18 years old to use Interview Screener. You agree to use the Services only for lawful purposes and in compliance with these Terms. Misuse, data scraping, or any unauthorized access will result in suspension or termination.
              </p>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h2 className="font-lexend text-3xl font-bold text-text mb-4">3. Payments and Refunds</h2>
              <p className="font-nunito text-[17px] leading-[1.8] text-text">
                All payments are processed securely through Stripe. All purchases, credits, or memberships are non-refundable. By submitting payment, you authorize Interview Screener to charge your payment method for the selected service plan. Refunds are not issued once access to the service has been granted.
              </p>
            </section>

            {/* Section 4 */}
            <section className="mb-12">
              <h2 className="font-lexend text-3xl font-bold text-text mb-4">4. Ownership of Data and Content</h2>
              <p className="font-nunito text-[17px] leading-[1.8] text-text mb-4">
                All data, files, resumes, audio, video, interview responses, or related materials uploaded or generated through the platform automatically become part of the Interview Screener Database.
              </p>
              <p className="font-nunito text-[17px] leading-[1.8] text-text mb-4">
                We retain full ownership of the database, its structure, metadata, and all derived data. This includes any AI models, analytics, or scoring derived from candidate interactions.
              </p>
              <p className="font-nunito text-[17px] leading-[1.8] text-text mb-4">
                By using the Service, you grant Interview Screener a perpetual, worldwide, royalty-free, and transferable license to collect, analyze, enrich, reproduce, and use your submitted data for research, algorithm training, product improvement, marketing, or promotional purposes.
              </p>
              <p className="font-nunito text-[17px] leading-[1.8] text-text mb-4">
                You also hereby authorize Interview Screener to license this data to Certified Partners of the platform, allowing them to use, process, or analyze the data for their own business and hiring purposes.
              </p>
              <p className="font-nunito text-[17px] leading-[1.8] text-text">
                If Interview Screener is sold, merged, or acquired, all rights, licenses, and ownership of the Interview Screener Database, including user data, shall automatically transfer to the acquiring or successor entity. Users acknowledge and agree that such a transfer does not require additional notice or consent.
              </p>
            </section>

            {/* Section 5 */}
            <section className="mb-12">
              <h2 className="font-lexend text-3xl font-bold text-text mb-4">5. Data Sources and Third-Party Collection</h2>
              <p className="font-nunito text-[17px] leading-[1.8] text-text mb-4">
                We may collect and process candidate information from third-party sources, including but not limited to:
              </p>
              <ul className="font-nunito text-[17px] leading-[1.8] text-text space-y-3 mb-4">
                <li>Publicly available data on job boards, LinkedIn, and professional websites.</li>
                <li>Data from integrated partner platforms (e.g., ATS, HR systems).</li>
                <li>Uploaded resumes, documents, emails, and communication logs.</li>
              </ul>
              <p className="font-nunito text-[17px] leading-[1.8] text-text">
                We may also use third-party APIs, enrichment tools, and AI processors (such as OpenAI) to verify or supplement user data. By using Interview Screener, you consent to this collection and processing, acknowledging that third-party systems may have independent data handling practices.
              </p>
            </section>

            {/* Section 6 */}
            <section className="mb-12">
              <h2 className="font-lexend text-3xl font-bold text-text mb-4">6. Voice, Video, and Interview Content</h2>
              <p className="font-nunito text-[17px] leading-[1.8] text-text mb-4">
                Interview Screener records and stores candidate voices, videos, and responses during AI interviews. These recordings may be used for:
              </p>
              <ul className="font-nunito text-[17px] leading-[1.8] text-text space-y-3 mb-4">
                <li>Quality assurance and feature improvement.</li>
                <li>AI model training to enhance voice and sentiment analysis accuracy.</li>
                <li>Marketing and promotional material, provided that identifying details may be anonymized or consent obtained when required.</li>
              </ul>
              <p className="font-nunito text-[17px] leading-[1.8] text-text">
                You grant Interview Screener full rights to reproduce, distribute, and publicly display anonymized or representative clips from interview sessions in ads, demonstrations, case studies, or other marketing materials.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-12">
              <h2 className="font-lexend text-3xl font-bold text-text mb-4">7. Sharing with Certified Partners</h2>
              <p className="font-nunito text-[17px] leading-[1.8] text-text mb-4">
                We may share candidate profiles and data with organizations officially registered as Certified Partners of Interview Screener for hiring, matching, analytical, or business intelligence purposes.
              </p>
              <p className="font-nunito text-[17px] leading-[1.8] text-text">
                Certified Partners are expected to maintain confidentiality and comply with applicable data protection standards, but Interview Screener is not responsible for the actions or practices of third-party Certified Partners.
              </p>
            </section>

            {/* Section 8 */}
            <section className="mb-12">
              <h2 className="font-lexend text-3xl font-bold text-text mb-4">8. Marketing and Communications Consent</h2>
              <p className="font-nunito text-[17px] leading-[1.8] text-text">
                By registering or submitting your data, you consent to receive promotional, marketing, and product update communications from Interview Screener and its Certified Partners. You may unsubscribe from non-transactional messages at any time.
              </p>
            </section>

            {/* Section 9 */}
            <section className="mb-12">
              <h2 className="font-lexend text-3xl font-bold text-text mb-4">9. No Hire Guarantee and Performance Disclaimer</h2>
              <p className="font-nunito text-[17px] leading-[1.8] text-text mb-4">
                Interview Screener does not guarantee employment, hiring outcomes, or performance metrics such as time-to-hire, cost savings, or candidate quality improvements.
              </p>
              <p className="font-nunito text-[17px] leading-[1.8] text-text mb-4">
                While use cases and benchmarks may be provided as examples, results vary by company, region, hiring volume, salary levels, and job type.
              </p>
              <p className="font-nunito text-[17px] leading-[1.8] text-text">
                Interview Screener shall not be held liable for any failure to achieve specific metrics, cost reductions, or hiring goals, nor for any job offers, salary negotiations, or employment decisions made by third parties.
              </p>
            </section>

            {/* Section 10 */}
            <section className="mb-12">
              <h2 className="font-lexend text-3xl font-bold text-text mb-4">10. Data Security, Storage, and Liability</h2>
              <p className="font-nunito text-[17px] leading-[1.8] text-text mb-4">
                Interview Screener implements industry-standard measures to protect stored data. However, by using third-party AI processors such as OpenAI or other cloud vendors, you acknowledge that data breaches or leaks may occur beyond our control.
              </p>
              <p className="font-nunito text-[17px] leading-[1.8] text-text mb-4">
                Interview Screener is not liable for any data exposure, loss, or unauthorized access resulting from third-party platforms, vendors, or service providers.
              </p>
              <p className="font-nunito text-[17px] leading-[1.8] text-text">
                Voice quality issues, transmission errors, packet losses, or partial loss of audio, video, or data during interviews are also outside our responsibility.
              </p>
            </section>

            {/* Section 11 */}
            <section className="mb-12">
              <h2 className="font-lexend text-3xl font-bold text-text mb-4">11. Intellectual Property</h2>
              <p className="font-nunito text-[17px] leading-[1.8] text-text">
                All software, designs, AI models, trademarks, and content on the platform are the property of Interview Screener or its licensors. Users are prohibited from copying, reselling, reverse-engineering, or creating derivative works without express written permission.
              </p>
            </section>

            {/* Section 12 */}
            <section className="mb-12">
              <h2 className="font-lexend text-3xl font-bold text-text mb-4">12. Limitation of Liability</h2>
              <p className="font-nunito text-[17px] leading-[1.8] text-text mb-4">
                To the fullest extent permitted by law, Interview Screener and its affiliates shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of the Services, data processing, or integrations with third-party AI providers.
              </p>
              <p className="font-nunito text-[17px] leading-[1.8] text-text">
                In no event shall Interview Screener's total liability exceed the total amount paid by the user to Interview Screener in the twelve (12) months preceding the event giving rise to the claim.
              </p>
            </section>

            {/* Section 13 */}
            <section className="mb-12">
              <h2 className="font-lexend text-3xl font-bold text-text mb-4">13. Modifications to Terms</h2>
              <p className="font-nunito text-[17px] leading-[1.8] text-text">
                We reserve the right to update or modify these Terms at any time. Updated versions will be posted on this page with a revised effective date. Continued use of the platform constitutes acceptance of the updated Terms.
              </p>
            </section>

            {/* Section 14 */}
            <section className="mb-12">
              <h2 className="font-lexend text-3xl font-bold text-text mb-4">14. Governing Law</h2>
              <p className="font-nunito text-[17px] leading-[1.8] text-text">
                These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States.
              </p>
            </section>

            {/* Section 15 - Contact */}
            <section className="mb-12">
              <h2 className="font-lexend text-3xl font-bold text-text mb-4">15. Contact Information</h2>
              <p className="font-nunito text-[17px] leading-[1.8] text-text mb-4">
                For questions or concerns, please contact:
              </p>
              <div className="bg-[#f8f9fa] rounded-lg p-6 border border-[#f1f1f1]">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <LuMail className="text-xl text-primary" />
                    </div>
                  </div>
                  <div>
                    <p className="font-lexend font-bold text-text mb-2">Interview Screener</p>
                    <p className="font-nunito text-text-light mb-1">Email: support@interviewscreener.com</p>
                    <p className="font-nunito text-text-light">Website: https://interviewscreener.com</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="text-center pt-8 border-t border-[#f1f1f1]">
            <p className="font-nunito text-text-light">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
