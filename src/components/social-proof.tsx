'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const partners = [
  { name: 'Company 1', logo: '/placeholder.svg' },
  { name: 'Company 2', logo: '/placeholder.svg' },
  { name: 'Company 3', logo: '/placeholder.svg' },
  { name: 'Company 4', logo: '/placeholder.svg' },
]

export default function SocialProof() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Trusted by Industry Leaders</h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {partners.map((partner, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Image 
                src={partner.logo} 
                alt={partner.name} 
                width={120} 
                height={60} 
                className="opacity-50 hover:opacity-100 transition-opacity"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

