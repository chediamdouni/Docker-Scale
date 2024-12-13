'use client'
import { motion } from 'framer-motion'

const stats = [
  { value: '10K+', label: 'Functions Executed Daily' },
  { value: '99.99%', label: 'Uptime' },
  { value: '500+', label: 'Satisfied Enterprises' },
]

export default function Stats() {
  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-xl">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

