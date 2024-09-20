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
                Unlock <span style={{ color: "red" }}>You</span>Tube Content
                Effortlessly
              </h2>

              <p className="mt-4 text-gray-600">
                Download Thumbnails, Logos, Banners, Captions, and More in
                Seconds. Whether you&apos;re a content creator, marketer, or
                researcher, access the assets you need with a single click.
                Quick, easy, and reliable.
              </p>

              <Link href="/thumbnail">
                <div className="mt-8 inline-block rounded bg-red-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-red-400 focus:outline-none focus:ring focus:ring-yellow-400">
                  Get Started Today
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
