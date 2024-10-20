import Image from "next/image";
import React from "react";
import styles from "./HeroImage.module.css";
import Link from "next/link";

export default function Hero() {
  return (
    <div>
      <section className={styles.heroSection}>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className={`${styles.container} lg:order-last`}>
              <Image
                src="/youtubeLogo.png"
                alt="Hero"
                className={styles.image}
                layout="responsive"
                width={500}
                height={500}
              />
            </div>

            <div className="lg:py-24">
              <h2 className="text-3xl font-bold sm:text-4xl">
                <span style={{ color: "red" }}>You</span>Tube Content Success
                Made Easy
              </h2>

              <p className="mt-4 text-gray-600">
                Get quick and easy access to all important YouTube resources
                like thumbnails, logos, banners, and captions. Download
                everything you need in seconds!
              </p>

              <Link href="/thumbnail">
                <div className="mt-8 inline-block rounded bg-red-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-red-400 focus:outline-none focus:ring focus:ring-yellow-400">
                  TRY NOW!
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
