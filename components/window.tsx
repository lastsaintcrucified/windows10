"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Square, X } from "lucide-react";
import type { WindowState } from "@/app/page";

interface WindowProps {
	window: WindowState;
	isActive: boolean;
	children: React.ReactNode;
	onClose: () => void;
	onMinimize: () => void;
	onMaximize: () => void;
	onUpdate: (updates: Partial<WindowState>) => void;
	onBringToFront: () => void;
}

export default function Window({
	window,
	isActive,
	children,
	onClose,
	onMinimize,
	onMaximize,
	onUpdate,
	onBringToFront,
}: WindowProps) {
	const [isDragging, setIsDragging] = useState(false);
	const [isResizing, setIsResizing] = useState(false);
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
	const [resizeStart, setResizeStart] = useState({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
	});
	const windowRef = useRef<HTMLDivElement>(null);

	const handleMouseDown = (e: React.MouseEvent) => {
		if (
			e.target === e.currentTarget ||
			(e.target as HTMLElement).closest(".window-header")
		) {
			onBringToFront();
			setIsDragging(true);
			setDragStart({
				x: e.clientX - window.position.x,
				y: e.clientY - window.position.y,
			});
		}
	};

	const handleResizeMouseDown = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsResizing(true);
		setResizeStart({
			x: e.clientX,
			y: e.clientY,
			width: window.size.width,
			height: window.size.height,
		});
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (isDragging && !window.isMaximized) {
			onUpdate({
				position: {
					x: e.clientX - dragStart.x,
					y: e.clientY - dragStart.y,
				},
			});
		}

		if (isResizing && !window.isMaximized) {
			const newWidth = Math.max(
				300,
				resizeStart.width + (e.clientX - resizeStart.x)
			);
			const newHeight = Math.max(
				200,
				resizeStart.height + (e.clientY - resizeStart.y)
			);

			onUpdate({
				size: { width: newWidth, height: newHeight },
			});
		}
	};

	const handleMouseUp = () => {
		setIsDragging(false);
		setIsResizing(false);
	};

	useEffect(() => {
		if (isDragging || isResizing) {
			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
		}

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};
	}, [
		isDragging,
		isResizing,
		dragStart,
		resizeStart,
		window.isMaximized,
		onUpdate,
	]);

	if (window.isMinimized) return null;

	const windowStyle = window.isMaximized
		? { top: 0, left: 0, width: "100vw", height: "calc(100vh - 48px)" }
		: {
				top: window.position.y,
				left: window.position.x,
				width: window.size.width,
				height: window.size.height,
		  };

	return (
		<div
			ref={windowRef}
			className={`absolute bg-white border border-gray-300 rounded-lg shadow-2xl overflow-hidden ${
				isActive ? "ring-2 ring-blue-500" : ""
			}`}
			style={{
				...windowStyle,
				zIndex: window.zIndex,
			}}
			onMouseDown={handleMouseDown}
		>
			{/* Title Bar */}
			<div className='window-header h-8 bg-gray-100 border-b border-gray-300 flex items-center justify-between px-3 cursor-move'>
				<span className='text-sm font-medium text-gray-800 truncate'>
					{window.title}
				</span>
				<div className='flex items-center space-x-1'>
					<Button
						variant='ghost'
						size='sm'
						className='h-6 w-6 p-0 hover:bg-gray-200'
						onClick={onMinimize}
					>
						<Minus className='w-3 h-3' />
					</Button>
					<Button
						variant='ghost'
						size='sm'
						className='h-6 w-6 p-0 hover:bg-gray-200'
						onClick={onMaximize}
					>
						<Square className='w-3 h-3' />
					</Button>
					<Button
						variant='ghost'
						size='sm'
						className='h-6 w-6 p-0 hover:bg-red-500 hover:text-white'
						onClick={onClose}
					>
						<X className='w-3 h-3' />
					</Button>
				</div>
			</div>

			{/* Content */}
			<div
				className='flex-1 overflow-auto'
				style={{ height: "calc(100% - 32px)" }}
			>
				{children}
			</div>

			{/* Resize Handle */}
			{!window.isMaximized && (
				<div
					className='absolute bottom-0 right-0 w-4 h-4 cursor-se-resize'
					onMouseDown={handleResizeMouseDown}
				>
					<div className='absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 border-gray-400'></div>
				</div>
			)}
		</div>
	);
}
