import React from "react";

export default function CTA({ data }) {
  return (
    <section className="py-10 relative bg-red-600 mt-2 mb-5 flex items-center justify-center h-48">
      {data.map((faq, index) => (
        <div key={index} className="text-center max-w-screen-lg mx-auto">
          <p className="text-white text-xl sm:text-4xl font-bold">
            {faq.header}
          </p>
          <p className="text-white text-sm sm:text-base mt-2 max-w-xl mx-auto opacity-80">
            {faq.desc}
          </p>
        </div>
      ))}
    </section>
  );
}
