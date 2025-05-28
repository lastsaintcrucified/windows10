"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Save, FileText, Edit } from "lucide-react"

export default function Notepad() {
  const [content, setContent] = useState("")

  return (
    <div className="h-full flex flex-col">
      {/* Menu Bar */}
      <div className="border-b border-gray-200 p-2 flex items-center space-x-2">
        <Button variant="ghost" size="sm">
          <FileText className="w-4 h-4 mr-1" />
          File
        </Button>
        <Button variant="ghost" size="sm">
          <Edit className="w-4 h-4 mr-1" />
          Edit
        </Button>
        <Button variant="ghost" size="sm">
          View
        </Button>
        <div className="flex-1"></div>
        <Button variant="ghost" size="sm">
          <Save className="w-4 h-4 mr-1" />
          Save
        </Button>
      </div>

      {/* Text Area */}
      <div className="flex-1 p-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start typing..."
          className="w-full h-full resize-none border-none outline-none font-mono text-sm"
        />
      </div>

      {/* Status Bar */}
      <div className="border-t border-gray-200 px-4 py-1 text-xs text-gray-600 flex justify-between">
        <span>Ln 1, Col 1</span>
        <span>UTF-8</span>
      </div>
    </div>
  )
}
