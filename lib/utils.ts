import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Función para manejar rutas de assets en GitHub Pages
 * Esta función asegura que las rutas de los assets sean correctas tanto en desarrollo como en producción
 *
 * @param path - Ruta relativa del asset (con o sin barra inicial)
 * @returns Ruta completa del asset con el prefijo correcto para GitHub Pages
 */
export function getAssetPath(path: string): string {
  // Obtener el basePath según el entorno
  const basePath = process.env.NODE_ENV === "production" ? "/Portafolio" : ""

  // Normalizar la ruta (asegurar que comience con /)
  const normalizedPath = path.startsWith("/") ? path : `/${path}`

  // Combinar basePath con la ruta normalizada
  return `${basePath}${normalizedPath}`
}

/**
 * Función para manejar rutas de navegación en GitHub Pages
 * Similar a getAssetPath pero específica para enlaces de navegación
 *
 * @param path - Ruta relativa de navegación
 * @returns Ruta completa para navegación
 */
export function getNavPath(path: string): string {
  return getAssetPath(path)
}

