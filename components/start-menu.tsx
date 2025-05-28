/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import {
	Power,
	Search,
	Settings,
	User,
	Calculator,
	FileText,
	Folder,
} from "lucide-react";

interface StartMenuProps {
	isOpen: boolean;
	onClose: () => void;
	onOpenApp: (component: string, title: string) => void;
}

export default function StartMenu({
	isOpen,
	onClose,
	onOpenApp,
}: StartMenuProps) {
	if (!isOpen) return null;

	const apps = [
		{ name: "Calculator", icon: Calculator, component: "calculator" },
		{ name: "Notepad", icon: FileText, component: "notepad" },
		{ name: "File Explorer", icon: Folder, component: "file-explorer" },
		{ name: "Settings", icon: Settings, component: "settings" },
	];

	return (
		<div className='absolute bottom-12 left-0 w-80 h-96 bg-black/90 backdrop-blur-md border border-gray-600 rounded-t-lg z-40'>
			{/* Search */}
			<div className='p-4 border-b border-gray-600'>
				<div className='relative'>
					<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
					<input
						type='text'
						placeholder='Search apps, settings, documents'
						className='w-full h-10 pl-10 pr-4 bg-white/10 border border-gray-600 rounded text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500'
					/>
				</div>
			</div>

			{/* Apps Grid */}
			<div className='p-4 flex-1'>
				<div className='grid grid-cols-3 gap-4'>
					{apps.map((app) => (
						<Button
							key={app.name}
							variant='ghost'
							className='h-20 flex flex-col items-center justify-center text-white hover:bg-white/10 p-2'
							onClick={() => onOpenApp(app.component, app.name)}
						>
							<app.icon className='w-8 h-8 mb-2' />
							<span className='text-xs text-center'>{app.name}</span>
						</Button>
					))}
				</div>
			</div>

			{/* User and Power */}
			<div className='border-t border-gray-600 p-2 flex justify-between'>
				<Button
					variant='ghost'
					size='sm'
					className='text-white hover:bg-white/10'
				>
					<User className='w-4 h-4 mr-2' />
					User
				</Button>
				<Button
					variant='ghost'
					size='sm'
					className='text-white hover:bg-white/10'
				>
					<Power className='w-4 h-4' />
				</Button>
			</div>
		</div>
	);
}
