import { Button } from "@/components/ui/button"
import { Monitor, Wifi, User, Shield, ReplaceIcon as Update } from "lucide-react"

export default function Settings() {
  const settingsCategories = [
    { name: "System", icon: Monitor, description: "Display, notifications, apps, power" },
    { name: "Network & Internet", icon: Wifi, description: "Wi-Fi, airplane mode, VPN" },
    { name: "Personalization", icon: User, description: "Background, lock screen, colors" },
    { name: "Apps", icon: Update, description: "Uninstall, defaults, optional features" },
    { name: "Accounts", icon: User, description: "Your accounts, email, sync, work, family" },
    { name: "Privacy & Security", icon: Shield, description: "Windows Security, backup, troubleshooting" },
  ]

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 p-4">
        <div className="space-y-2">
          {settingsCategories.map((category, index) => (
            <Button key={index} variant="ghost" className="w-full justify-start p-3 h-auto">
              <div className="flex items-start space-x-3">
                <category.icon className="w-5 h-5 mt-1 text-blue-600" />
                <div className="text-left">
                  <div className="font-medium">{category.name}</div>
                  <div className="text-xs text-gray-500">{category.description}</div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-semibold mb-6">System</h1>

          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h2 className="font-medium mb-2">About</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Device name</span>
                  <span>DESKTOP-WINDOWS10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Processor</span>
                  <span>Intel(R) Core(TM) i7-10700K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Installed RAM</span>
                  <span>16.0 GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">System type</span>
                  <span>64-bit operating system</span>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h2 className="font-medium mb-2">Display</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Resolution</span>
                  <span>1920 x 1080</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Scale</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h2 className="font-medium mb-2">Storage</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Local Disk (C:)</span>
                  <span>256 GB SSD</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "65%" }}></div>
                </div>
                <div className="text-xs text-gray-500">165 GB used of 256 GB</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
