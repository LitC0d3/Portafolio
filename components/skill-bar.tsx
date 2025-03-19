"use client"

import { useEffect, useState } from "react"

interface SkillBarProps {
  name: string
  percentage: number
  color: "cyan" | "purple" | "pink"
}

const SkillBar = ({ name, percentage, color }: SkillBarProps) => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(percentage)
    }, 100)

    return () => clearTimeout(timer)
  }, [percentage])

  const getGradient = () => {
    switch (color) {
      case "cyan":
        return "from-cyan-500 to-cyan-300"
      case "purple":
        return "from-purple-500 to-purple-300"
      case "pink":
        return "from-pink-500 to-pink-300"
      default:
        return "from-cyan-500 to-cyan-300"
    }
  }

  const getBorderColor = () => {
    switch (color) {
      case "cyan":
        return "border-cyan-900/50"
      case "purple":
        return "border-purple-900/50"
      case "pink":
        return "border-pink-900/50"
      default:
        return "border-cyan-900/50"
    }
  }

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-gray-300">{name}</span>
        <span className="text-gray-400">{percentage}%</span>
      </div>
      <div className={`h-2 w-full bg-gray-900/60 rounded-full border ${getBorderColor()}`}>
        <div
          className={`h-full rounded-full bg-gradient-to-r ${getGradient()} transition-all duration-1000 ease-out`}
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  )
}

export default SkillBar

