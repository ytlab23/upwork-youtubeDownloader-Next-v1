export default function Use({ header, data }) {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              {header.map((feature, index) => (
                <div key={index}>
                  <h2 className="text-base font-semibold leading-7 text-black">
                    <span className="text-red-600">You</span>Tube Downloader
                  </h2>

                  {feature.title}

                  {feature.desc}
                </div>
              ))}
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {data.map((feature, index) => (
                  <div key={index} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900 flex items-center">
                      {/* Adding an SVG icon before the header */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-red-600 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature.header}
                    </dt>
                    <dd className="inline">{feature.data}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <img
            alt={
              header[0].imgLink
                ? `Thumbnail for YouTube downloader`
                : "Product screenshot"
            }
            src={header[0].imgLink || "./image.png"}
            width={2432}
            height={1442}
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
  );
}
