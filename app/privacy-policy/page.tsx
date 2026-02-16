import { Metadata } from "next";
import Image from "next/image";
import { LuShield, LuMail } from "react-icons/lu";

export const metadata: Metadata = {
  title: "Privacy Policy – Interview Screener",
  description:
    "Review Interview Screener's Privacy Policy to understand how we collect, use, and protect your personal data in our AI-powered recruitment platform.",
  keywords:
    "privacy policy, data protection, Interview Screener privacy, GDPR compliance, data security",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="relative min-h-screen z-0 py-40">
      {/* Background Gradient */}
      <div
        className="absolute top-0 left-0 w-full h-full z-[-1]"
        style={{
          background:
            "linear-gradient(0deg, rgba(0, 160, 226, 0.00) 24.86%, rgba(51, 136, 255, 0.10) 100%)",
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
            width: "100%",
            height: "auto",
            opacity: 0.6,
          }}
          priority
          fetchPriority="high"
        />
      </div>

      <div className="container mx-auto px-4">
        <article className="bg-white max-w-4xl mx-auto p-4 md:p-10 rounded-xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <LuShield className="text-3xl text-primary" />
            </div>
            <h1 className="font-lexend text-3xl md:text-5xl font-medium text-text mb-2">
              Privacy Policy
            </h1>
            <p className="font-nunito text-lg text-text-light">
              Learn how Interview Screener collects, uses, and protects your
              personal information
            </p>
          </div>

          <div className="mt-10">
            <div className="prose prose-lg max-w-none">
              {/* Section 1 */}
              <section className="mb-12">
                <h2 className="font-lexend text-3xl font-medium text-text mb-4">
                  1. Overview
                </h2>
                <p className="font-nunito text-base leading-normal text-gray-600">
                  This Privacy Policy explains how Interview Screener ("we,"
                  "our," or "us") collects, uses, and protects personal
                  information from candidates, companies, and users of our
                  platform. By accessing or using our services, you consent to
                  the collection and use of your data as described here.
                </p>
              </section>

              {/* Section 2 */}
              <section className="mb-12">
                <h2 className="font-lexend text-3xl font-medium text-text mb-4">
                  2. Information We Collect
                </h2>
                <p className="font-nunito text-base leading-normal text-gray-600 mb-4">
                  We collect the following types of data:
                </p>
                <ul className="font-nunito text-base leading-normal list-disc list-inside text-gray-600 space-y-3 px-4">
                  <li>
                    <strong>Personal Information:</strong> Name, email, phone
                    number, LinkedIn profile, employment history, education, and
                    other resume details.
                  </li>
                  <li>
                    <strong>Interview Data:</strong> Audio, video, transcripts,
                    interview responses, AI-generated scores, and behavioral
                    analysis.
                  </li>
                  <li>
                    <strong>Usage Data:</strong> IP address, browser type,
                    device identifiers, session logs, and usage patterns.
                  </li>
                  <li>
                    <strong>Third-Party Data:</strong> Information gathered from
                    external sites and APIs, including public profiles
                    (LinkedIn, GitHub, job boards) and partner systems
                    integrated through ATS or HR tools.
                  </li>
                  <li>
                    <strong>Automated Resume Collection:</strong> In some cases,
                    resumes and applicant data may be collected automatically
                    through third-party integrations, embedded forms, or
                    WordPress plugins on partner websites. Users acknowledge
                    that data may be received even if submitted indirectly
                    through affiliated sites.
                  </li>
                  <li>
                    <strong>Payment Data:</strong> Collected and processed
                    securely by Stripe; we do not store full credit card
                    details.
                  </li>
                </ul>
              </section>

              {/* Section 3 */}
              <section className="mb-12">
                <h2 className="font-lexend text-3xl font-medium text-text mb-4">
                  3. How We Use Information
                </h2>
                <p className="font-nunito text-base leading-normal text-gray-600 mb-4">
                  We use collected information to:
                </p>
                <ul className="font-nunito text-base leading-normal list-disc list-inside text-gray-600 space-y-3 px-4">
                  <li>Operate, maintain, and improve our Services.</li>
                  <li>
                    Conduct AI-based interviews, scoring, and candidate
                    evaluations.
                  </li>
                  <li>
                    Enrich candidate data using public and third-party sources.
                  </li>
                  <li>Train and improve AI models and algorithms.</li>
                  <li>
                    Provide analytics and reporting to clients and partners.
                  </li>
                  <li>Communicate updates, offers, and new features.</li>
                  <li>
                    Generate anonymized marketing materials and demonstrations.
                  </li>
                </ul>
              </section>

              {/* Section 4 */}
              <section className="mb-12">
                <h2 className="font-lexend text-3xl font-medium text-text mb-4">
                  4. Voice, Video, and Interview Recordings
                </h2>
                <p className="font-nunito text-base leading-normal text-gray-600 mb-4">
                  Interview Screener records voice and video content during
                  interviews. By participating, users consent to the collection
                  and analysis of their recordings for:
                </p>
                <ul className="font-nunito text-base leading-normal list-disc list-inside text-gray-600 space-y-3 px-4">
                  <li>Product functionality and service improvement.</li>
                  <li>AI model training and research.</li>
                  <li>
                    Promotional, educational, or marketing materials, which may
                    include anonymized or representative clips.
                  </li>
                </ul>
              </section>

              {/* Section 5 */}
              <section className="mb-12">
                <h2 className="font-lexend text-3xl font-medium text-text mb-4">
                  5. Data Sharing and Licensing
                </h2>
                <p className="font-nunito text-base leading-normal text-gray-600 mb-4">
                  Interview Screener may share or license data to Certified
                  Partners for hiring, research, or analytical use. Users
                  acknowledge that:
                </p>
                <ul className="font-nunito text-base leading-normal list-disc list-inside text-gray-600 space-y-3 px-4">
                  <li>
                    Partners may use candidate data for their own business and
                    hiring purposes.
                  </li>
                  <li>
                    Interview Screener retains ownership of aggregated and
                    derived datasets.
                  </li>
                  <li>
                    In the event of a merger, sale, or acquisition, all rights
                    and licenses related to user data transfer to the acquiring
                    entity.
                  </li>
                </ul>
              </section>

              {/* Section 6 */}
              <section className="mb-12">
                <h2 className="font-lexend text-3xl font-medium text-text mb-4">
                  6. Data Security and Third-Party Processing
                </h2>
                <p className="font-nunito text-base leading-normal text-gray-600 mb-4">
                  We employ encryption, access controls, and secure cloud
                  infrastructure to protect data. However, Interview Screener
                  utilizes third-party AI processors, including but not limited
                  to OpenAI, and external APIs for enrichment and analysis.
                  While we take reasonable precautions, we cannot guarantee
                  absolute security and are not liable for breaches or leaks
                  beyond our control.
                </p>
                <p className="font-nunito text-base leading-normal text-gray-600">
                  Additionally, uploaded resumes or data submitted through
                  embedded plugins may pass through third-party hosting or
                  integration systems that have their own privacy practices.
                  Interview Screener cannot fully control or guarantee how those
                  third parties handle or store information.
                </p>
              </section>

              {/* Section 7 */}
              <section className="mb-12">
                <h2 className="font-lexend text-3xl font-medium text-text mb-4">
                  7. Data Retention
                </h2>
                <p className="font-nunito text-base leading-normal text-gray-600">
                  User and candidate data are retained indefinitely for system
                  integrity, model training, and research unless deletion is
                  requested where legally permissible. Aggregated and anonymized
                  data may be kept permanently.
                </p>
              </section>

              {/* Section 8 */}
              <section className="mb-12">
                <h2 className="font-lexend text-3xl font-medium text-text mb-4">
                  8. User Rights
                </h2>
                <p className="font-nunito text-base leading-normal text-gray-600">
                  Users may request to access, correct, or delete their personal
                  data by contacting support@interviewscreener.com. Requests for
                  deletion may not affect data already anonymized, aggregated,
                  or used in AI model training.
                </p>
              </section>

              {/* Section 9 */}
              <section className="mb-12">
                <h2 className="font-lexend text-3xl font-medium text-text mb-4">
                  9. International Data Transfers
                </h2>
                <p className="font-nunito text-base leading-normal text-gray-600">
                  Your data may be stored and processed in the United States,
                  India, Vietnam, or other jurisdictions where we or our service
                  providers operate. By using our platform, you consent to these
                  transfers.
                </p>
              </section>

              {/* Section 10 */}
              <section className="mb-12">
                <h2 className="font-lexend text-3xl font-medium text-text mb-4">
                  10. Cookies and Tracking Technologies
                </h2>
                <p className="font-nunito text-base leading-normal text-gray-600">
                  We use cookies and similar technologies to track site
                  activity, analyze traffic, and improve user experience. You
                  may disable cookies in your browser settings, but some
                  features may not function properly.
                </p>
              </section>

              {/* Section 11 */}
              <section className="mb-12">
                <h2 className="font-lexend text-3xl font-medium text-text mb-4">
                  11. No Guarantee of Data Integrity or Availability
                </h2>
                <p className="font-nunito text-base leading-normal text-gray-600">
                  While we maintain backups and redundant systems, Interview
                  Screener is not responsible for data loss, corrupted files, or
                  interruptions resulting from technical failures, packet loss,
                  or third-party outages.
                </p>
              </section>

              {/* Section 12 */}
              <section className="mb-12">
                <h2 className="font-lexend text-3xl font-medium text-text mb-4">
                  12. Children's Privacy
                </h2>
                <p className="font-nunito text-base leading-normal text-gray-600">
                  Our platform may be used by individuals aged 15 and older.
                  Users between 15 and 17 years of age must have parental or
                  employer consent before using Interview Screener or
                  participating in interviews. We do not knowingly collect data
                  from individuals under 15 years old.
                </p>
              </section>

              {/* Section 13 */}
              <section className="mb-12">
                <h2 className="font-lexend text-3xl font-medium text-text mb-4">
                  13. Updates to This Policy
                </h2>
                <p className="font-nunito text-base leading-normal text-gray-600">
                  We may revise this Privacy Policy periodically. Updated
                  versions will be posted on this page with a new effective
                  date. Continued use of our services constitutes acceptance of
                  the revised policy.
                </p>
              </section>

              {/* Section 13A - GDPR and CCPA */}
              <section className="mb-12">
                <h2 className="font-lexend text-3xl font-medium text-text mb-4">
                  13A. GDPR and CCPA Compliance
                </h2>

                <h3 className="font-lexend text-2xl font-medium text-text mt-8 mb-4">
                  European Union (GDPR)
                </h3>
                <p className="font-nunito text-base leading-normal text-gray-600 mb-4">
                  If you are a resident of the European Economic Area (EEA) or
                  the United Kingdom, you have specific data protection rights
                  under the General Data Protection Regulation (GDPR). These
                  include the right to:
                </p>
                <ul className="font-nunito text-base leading-normal list-disc list-inside text-gray-600 space-y-3 px-4">
                  <li>Access the personal data we hold about you.</li>
                  <li>Request correction or deletion of your data.</li>
                  <li>
                    Object to or restrict our processing of your information.
                  </li>
                  <li>Request a copy of your data in a portable format.</li>
                  <li>
                    Withdraw consent at any time where processing is based on
                    consent.
                  </li>
                </ul>
                <p className="font-nunito text-base leading-normal text-gray-600 my-4">
                  Requests related to these rights can be submitted to
                  privacy@interviewscreener.com.
                </p>
                <p className="font-nunito text-base leading-normal text-gray-600 mb-4">
                  We will respond within 30 days and, when applicable, delete,
                  correct, or export your data accordingly.
                </p>
                <p className="font-nunito text-base leading-normal text-gray-600 mb-4">
                  If we process your data as part of services provided to our
                  clients (such as a hiring company using Interview Screener),
                  you acknowledge that we may need to notify or coordinate with
                  that client to complete your request. Interview Screener
                  cannot control how external hiring companies use, store, or
                  retain copies of your information.
                </p>

                <h3 className="font-lexend text-2xl font-medium text-text mt-8 mb-4">
                  California (CCPA)
                </h3>
                <p className="font-nunito text-base leading-normal text-gray-600 mb-4">
                  If you are a resident of California, you have rights under the
                  California Consumer Privacy Act (CCPA) to:
                </p>
                <ul className="font-nunito text-base leading-normal list-disc list-inside text-gray-600 space-y-3 px-4">
                  <li>
                    Request disclosure of what personal data we collect, use, or
                    share.
                  </li>
                  <li>
                    Request deletion of your personal information (subject to
                    legal or business retention requirements).
                  </li>
                  <li>
                    Opt out of the sale or transfer of your personal data
                    (Interview Screener does not sell personal data).
                  </li>
                </ul>
                <p className="font-nunito text-base leading-normal text-gray-600 my-4">
                  To exercise these rights, contact
                  privacy@interviewscreener.com with the subject line "CCPA
                  Request" and include sufficient details to verify your
                  identity.
                </p>
                <p className="font-nunito text-base leading-normal text-gray-600 mb-4">
                  We will never discriminate against you for exercising your
                  privacy rights.
                </p>
              </section>

              {/* Section 14 - Contact */}
              <section className="mb-12">
                <h2 className="font-lexend text-3xl font-bold text-text mb-4">
                  14. Contact
                </h2>
                <div className="bg-light border-l-4 border-l-primary py-6 px-7 mt-5 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <LuMail className="text-xl text-primary" />
                      </div>
                    </div>
                    <div>
                      <p className="font-lexend font-bold text-text mb-2">
                        Interview Screener
                      </p>
                      <p className="font-nunito text-text-light mb-1">
                        Email: support@interviewscreener.com
                      </p>
                      <p className="font-nunito text-text-light">
                        Website: https://interviewscreener.com
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-8 border-t border-zinc-200">
            <p className="font-nunito text-text-light text-sm">
              Last updated: {lastUpdated}
            </p>
          </div>
        </article>
      </div>
    </main>
  );
}
