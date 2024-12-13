'use client'
import { motion } from 'framer-motion'
import { Shield, Terminal, BarChart } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Secure Function Deployment',
    description: 'Deploy your Docker functions with enterprise-grade security.',
  },
  {
    icon: Terminal,
    title: 'Live Execution Logs',
    description: 'Monitor your functions in real-time with detailed logs.',
  },
  {
    icon: BarChart,
    title: 'AWS Resource Optimization',
    description: 'Optimize your AWS resources for cost-effective scaling.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

