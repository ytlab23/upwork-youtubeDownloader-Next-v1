import React from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "How much does it cost to use your services?",
      answer:
        "All our tools are absolutely free. Also, we do not monetize the platform through any ads or data usage. ",
    },
    {
      question: "What's the highest quality I can download?",
      answer:
        "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
      question:
        "Can I use the downloaded content for my own videos or projects? ",
      answer:
        "Nobody knows. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
      question: "Can I use your service on my phone or tablet?",
      answer:
        "Yes, of course. Our interface is mobile-optimized. It works like a charm on most devices, so you can manage your YouTube content on the go without any issues.",
    },
    {
      question: "Do you store or keep any of the downloaded content?",
      answer:
        "No. We comply with all data regulation policies and do not keep the downloaded assets on our devices.",
    },
    {
      question: "Where can I find  more free YouTube tools?",
      answer:
        "Our website specializes in tools designed specifically for downloading YouTube content. If you're interested in additional tools, such as those for YouTube SEO and analytics, we recommend exploring these free options.",
    },
  ];

  return (
    <div className="px-6 py-8 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
        {/* Left side - Header and Support Info */}
        <div className="w-full md:w-1/2 md:pr-12 text-left mb-8 md:mb-0">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Frequently Asked Questions <span className="text-red-600"> (FAQs)</span>
          </h2>
          <p className="mb-6 text-gray-600">
            Curious about how we can enhance your YouTube experience? Explore
            the most common questions from our community and discover the
            answers that can unlock new possibilities for your content creation
            journey!
          </p>
        </div>

        {/* Right side - FAQ Questions */}
        <div className="w-full md:w-1/2">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index}>
                <details className="group rounded-lg bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                    <h2 className="font-medium">{faq.question}</h2>

                    <span className="relative size-5 shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute inset-0 size-5 opacity-0 group-open:opacity-100"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                  </summary>

                  <p className="mt-4 leading-relaxed text-gray-700">
                    {faq.answer}
                  </p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
<div className="space-y-4"></div>;
