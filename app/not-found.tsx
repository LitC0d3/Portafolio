import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getNavPath } from "@/lib/utils"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-center px-4">
      <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 mb-4">
        404
      </h1>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Página no encontrada</h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <Button
        asChild
        className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white dark:from-blue-500 dark:to-violet-500 dark:hover:from-blue-600 dark:hover:to-violet-600 rounded-full"
      >
        <Link href={getNavPath("/")}>Volver al inicio</Link>
      </Button>
    </div>
  )
}

