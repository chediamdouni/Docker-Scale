"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    quote:
      "DockerScale has revolutionized our deployment process. It's fast, reliable, and incredibly easy to use.",
    author: "Jane Doe",
    position: "CTO, Tech Innovators Inc.",
    avatar: "/placeholder.svg",
  },
  {
    quote:
      "The live execution logs have been a game-changer for our team. We can troubleshoot issues in real-time.",
    author: "John Smith",
    position: "Lead Developer, Future Systems",
    avatar: "/placeholder.svg",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <p className="text-gray-600 mb-4">&quot;{testimonial.quote}&quot;</p>
              <div className="flex items-center">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  width={48}
                  height={48}
                  className="rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">
                    {testimonial.position}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
