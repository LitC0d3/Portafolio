"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface SocialButtonProps {
  icon: ReactNode
  href: string
  label: string
  color: "blue" | "indigo" | "violet"
}

const SocialButton = ({ icon, href, label, color }: SocialButtonProps) => {
  const getHoverColor = () => {
    switch (color) {
      case "blue":
        return "hover:bg-blue-50 dark:hover:bg-blue-900/30"
      case "indigo":
        return "hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
      case "violet":
        return "hover:bg-violet-50 dark:hover:bg-violet-900/30"
      default:
        return "hover:bg-blue-50 dark:hover:bg-blue-900/30"
    }
  }

  const getTextColor = () => {
    switch (color) {
      case "blue":
        return "text-blue-600 dark:text-blue-400"
      case "indigo":
        return "text-indigo-600 dark:text-indigo-400"
      case "violet":
        return "text-violet-600 dark:text-violet-400"
      default:
        return "text-blue-600 dark:text-blue-400"
    }
  }

  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant="ghost"
        size="icon"
        className={`rounded-full text-gray-600 dark:text-gray-300 ${getHoverColor()} ${getTextColor()}`}
        asChild
      >
        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
          {icon}
        </a>
      </Button>
    </motion.div>
  )
}

export default SocialButton

