"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl: string
  codeUrl: string
}

const ProjectCard = ({ title, description, image, tags, demoUrl, codeUrl }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="overflow-hidden border-purple-900/50 bg-black/40 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
          {title}
        </h3>

        <p className="text-gray-300 mb-4 text-sm">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => {
            const colors = [
              "bg-cyan-900/40 text-cyan-400 hover:bg-cyan-900/60",
              "bg-purple-900/40 text-purple-400 hover:bg-purple-900/60",
              "bg-pink-900/40 text-pink-400 hover:bg-pink-900/60",
            ]
            const colorIndex = index % colors.length

            return (
              <Badge key={index} className={colors[colorIndex]}>
                {tag}
              </Badge>
            )
          })}
        </div>

        <div className="flex space-x-3">
          <Button variant="outline" size="sm" className="border-cyan-900/50 text-cyan-400 hover:bg-cyan-900/20 flex-1">
            <ExternalLink className="mr-2 h-4 w-4" />
            Demo
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-purple-900/50 text-purple-400 hover:bg-purple-900/20 flex-1"
          >
            <Github className="mr-2 h-4 w-4" />
            Code
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProjectCard

