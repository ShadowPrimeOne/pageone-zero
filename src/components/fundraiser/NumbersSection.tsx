'use client'

import { motion } from 'framer-motion'

export default function NumbersSection() {
  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          className="text-3xl md:text-4xl font-semibold text-[#2D2D2D] mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          What one phone can do.
        </motion.h2>
        
        <motion.div 
          className="space-y-8 text-[#4B4453] text-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p>One sale = <span className="font-semibold text-[#376E6F]">$600 setup</span></p>
          <p>One campaign = <span className="font-semibold text-[#376E6F]">$400/month recurring</span></p>
          <p className="text-xl font-semibold text-[#2D2D2D]">
            Just one sale per day = <span className="text-[#376E6F]">$180,000/year</span> per ambassador
          </p>
          <p>We split revenue with ambassadors.</p>
          <p className="text-xl font-semibold text-[#376E6F]">They earn. Businesses grow.</p>
        </motion.div>
        
        {/* Visual representation */}
        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, staggerChildren: 0.2 }}
          viewport={{ once: true }}
        >
          {[
            { number: "$600", label: "Setup Fee", color: "bg-[#376E6F]" },
            { number: "$400", label: "Monthly Recurring", color: "bg-[#4B4453]" },
            { number: "$180K", label: "Annual Potential", color: "bg-[#FFD97D]" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="text-center p-6 rounded-2xl border-2 border-[#376E6F]/20 bg-white/50 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
            >
              <div className={`w-16 h-16 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <span className="text-white font-bold text-xl">$</span>
              </div>
              <div className="text-3xl font-bold text-[#2D2D2D] mb-2">{stat.number}</div>
              <div className="text-[#4B4453] font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 