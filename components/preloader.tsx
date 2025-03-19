"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const Preloader = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time (you can remove this in production)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-50 dark:bg-gray-900"
      initial={{ opacity: 1 }}
      animate={{ opacity: loading ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={() => {
        if (!loading) {
          document.body.style.overflow = "auto"
        } else {
          document.body.style.overflow = "hidden"
        }
      }}
      style={{ pointerEvents: loading ? "auto" : "none" }}
    >
      <div className="text-center">
        <motion.div
          className="flex items-center justify-center mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-500 dark:to-violet-500 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                  AVM
                </span>
              </div>
            </div>
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-t-transparent border-blue-600 dark:border-blue-400"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            ></motion.div>
          </div>
        </motion.div>
        <motion.p
          className="text-gray-600 dark:text-gray-300 text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Cargando Portfolio...
        </motion.p>
      </div>
    </motion.div>
  )
}

export default Preloader

