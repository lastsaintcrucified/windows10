"use client"

import type { WindowState } from "@/app/page"
import Window from "./window"
import Calculator from "./apps/calculator"
import Notepad from "./apps/notepad"
import FileExplorer from "./apps/file-explorer"
import Settings from "./apps/settings"

interface WindowManagerProps {
  windows: WindowState[]
  activeWindowId: string | null
  onClose: (id: string) => void
  onMinimize: (id: string) => void
  onMaximize: (id: string) => void
  onUpdate: (id: string, updates: Partial<WindowState>) => void
  onBringToFront: (id: string) => void
}

export default function WindowManager({
  windows,
  activeWindowId,
  onClose,
  onMinimize,
  onMaximize,
  onUpdate,
  onBringToFront,
}: WindowManagerProps) {
  const renderAppContent = (component: string) => {
    switch (component) {
      case "calculator":
        return <Calculator />
      case "notepad":
        return <Notepad />
      case "file-explorer":
        return <FileExplorer />
      case "settings":
        return <Settings />
      default:
        return <div className="p-4">App not found</div>
    }
  }

  return (
    <>
      {windows.map((window) => (
        <Window
          key={window.id}
          window={window}
          isActive={activeWindowId === window.id}
          onClose={() => onClose(window.id)}
          onMinimize={() => onMinimize(window.id)}
          onMaximize={() => onMaximize(window.id)}
          onUpdate={(updates) => onUpdate(window.id, updates)}
          onBringToFront={() => onBringToFront(window.id)}
        >
          {renderAppContent(window.component)}
        </Window>
      ))}
    </>
  )
}
