"use client"

import { Button } from "@/components/ui/button"
import { RefreshCw, Monitor, Palette } from "lucide-react"

interface ContextMenuProps {
  isVisible: boolean
  position: { x: number; y: number }
  onClose: () => void
}

export default function ContextMenu({ isVisible, position, onClose }: ContextMenuProps) {
  if (!isVisible) return null

  return (
    <div
      className="absolute bg-white border border-gray-300 rounded shadow-lg py-1 z-50 min-w-48"
      style={{ top: position.y, left: position.x }}
      onClick={onClose}
    >
      <Button variant="ghost" className="w-full justify-start px-3 py-2 text-sm">
        <RefreshCw className="w-4 h-4 mr-2" />
        Refresh
      </Button>
      <div className="border-t border-gray-200 my-1"></div>
      <Button variant="ghost" className="w-full justify-start px-3 py-2 text-sm">
        <Monitor className="w-4 h-4 mr-2" />
        Display settings
      </Button>
      <Button variant="ghost" className="w-full justify-start px-3 py-2 text-sm">
        <Palette className="w-4 h-4 mr-2" />
        Personalize
      </Button>
    </div>
  )
}
