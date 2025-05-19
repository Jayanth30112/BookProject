"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <section
      className="relative h-[620px] w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/bg-lib.jpg)" }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex h-full items-center justify-center text-center px-4">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Manage Your Library Effortlessly
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Our Book Library Management System helps you organize, track, and
            access your books with ease and efficiency.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/add-book">
              <Button variant="default" size="lg">
                Get Started
              </Button>
            </Link>
            {/* <Link href="/about">
              <Button
                variant="outline"
                size="lg"
                className="text-white border-white hover:bg-white hover:text-black"
              >
                Learn More
              </Button>
            </Link> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
