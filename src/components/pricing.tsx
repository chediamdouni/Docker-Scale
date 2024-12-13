'use client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '$0',
    features: ['100 Function Executions/month', 'Basic Monitoring', 'Community Support'],
  },
  {
    name: 'Pro',
    price: '$99/month',
    features: ['Unlimited Function Executions', 'Advanced Monitoring', 'Priority Support', 'Custom Integrations'],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: ['Unlimited Everything', 'Dedicated Support', 'On-Premise Deployment', 'SLA Guarantee'],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div 
              key={index}
              className="bg-white p-8 rounded-lg shadow-md flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6">{plan.price}</p>
              <ul className="mb-8 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center mb-2">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full">
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

