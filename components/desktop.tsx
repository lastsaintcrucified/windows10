"use client";

import Image from "next/image";
import type React from "react";

import { forwardRef } from "react";

interface DesktopProps {
	onClick: () => void;
	onContextMenu: (e: React.MouseEvent) => void;
	onOpenApp: (component: string, title: string) => void;
}

const Desktop = forwardRef<HTMLDivElement, DesktopProps>(
	({ onClick, onContextMenu, onOpenApp }, ref) => {
		return (
			<div
				ref={ref}
				className='absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600'
				onClick={onClick}
				onContextMenu={onContextMenu}
				style={{
					backgroundImage: `url('/placeholder.svg?height=1080&width=1920')`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				{/* Desktop Icons */}
				<div className='p-4 space-y-4'>
					<div
						className='flex flex-col items-center w-16 cursor-pointer group'
						onDoubleClick={() => onOpenApp("file-explorer", "File Explorer")}
					>
						<Image
							src='/myPc.png'
							alt='My Pc'
							width={48}
							height={48}
							className='w-12 h-12 mb-1 group-hover:opacity-80 transition-opacity'
						/>
						<span className='text-white text-xs text-center bg-blue-900/50 px-1 rounded'>
							This PC
						</span>
					</div>

					<div className='flex flex-col items-center w-16 cursor-pointer group'>
						<Image
							src='/folder.png'
							alt='My Pc'
							width={48}
							height={48}
							className='w-12 h-12 mb-1 group-hover:opacity-80 transition-opacity'
						/>
						<span className='text-white text-xs text-center bg-blue-900/50 px-1 rounded'>
							Downloads
						</span>
					</div>
				</div>
			</div>
		);
	}
);

Desktop.displayName = "Desktop";

export default Desktop;
