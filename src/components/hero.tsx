'use client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto text-center">
        <motion.h1 
          className="text-5xl font-bold mb-6 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Effortless Docker Execution at Scale
        </motion.h1>
        <motion.p 
          className="text-xl mb-8 text-gray-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Run, Monitor, and Scale Dockerized workloads with our platform integrated with AWS ECS.
        </motion.p>
        <motion.div 
          className="flex justify-center space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button size="lg">Request Demo</Button>
          <Button size="lg" variant="outline">Sign Up</Button>
        </motion.div>
      </div>
    </section>
  )
}

