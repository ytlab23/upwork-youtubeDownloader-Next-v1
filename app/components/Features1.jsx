import React from "react";
export default function Features1({header,data}) {
  return (
    <div className="flex items-center justify-center  mt-10">
      <div>
        <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="flex flex-col gap-y-8 lg:items-center lg:gap-x-16">
          {header.map((feature) => (
            <div className="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left" key={feature.title}>
           {feature.title}
           {feature.desc}
            </div>))}

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {data.map((feature) => (
                <a
                  className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                  href="#"
                  key={feature.header}
                >
                  <span className="inline-block rounded-lg bg-gray-50 p-3">
                    <img
                      src="/ribbon.svg" // Path to the SVG in the public folder
                      alt="Ribon Icon"
                      className="size-6" // Adjust size if needed
                    />
                  </span>

                  <h2 className="mt-2 font-bold">{feature.header}</h2>

                  <div className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                    {feature.desc}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
