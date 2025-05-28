/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Desktop from "@/components/desktop";
import Taskbar from "@/components/taskbar";
import StartMenu from "@/components/start-menu";
import WindowManager from "@/components/window-manager";
import ContextMenu from "@/components/context-menu";

export interface WindowState {
	id: string;
	title: string;
	component: string;
	isMinimized: boolean;
	isMaximized: boolean;
	position: { x: number; y: number };
	size: { width: number; height: number };
	zIndex: number;
}

export interface ContextMenuState {
	isVisible: boolean;
	position: { x: number; y: number };
}

export default function Home() {
	const [windows, setWindows] = useState<WindowState[]>([]);
	const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
	const [contextMenu, setContextMenu] = useState<ContextMenuState>({
		isVisible: false,
		position: { x: 0, y: 0 },
	});
	const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
	const [currentTime, setCurrentTime] = useState(new Date());
	const desktopRef = useRef<HTMLDivElement>(null);

	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState<any[]>([]);
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	const openWindow = (component: string, title: string) => {
		const id = `${component}-${Date.now()}`;
		const newWindow: WindowState = {
			id,
			title,
			component,
			isMinimized: false,
			isMaximized: false,
			position: { x: 100 + windows.length * 30, y: 100 + windows.length * 30 },
			size: { width: 800, height: 600 },
			zIndex: 1000 + windows.length,
		};
		setWindows((prev) => [...prev, newWindow]);
		setActiveWindowId(id);
		setIsStartMenuOpen(false);
	};

	const closeWindow = (id: string) => {
		setWindows((prev) => prev.filter((w) => w.id !== id));
		if (activeWindowId === id) {
			setActiveWindowId(null);
		}
	};

	const minimizeWindow = (id: string) => {
		setWindows((prev) =>
			prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
		);
	};

	const maximizeWindow = (id: string) => {
		setWindows((prev) =>
			prev.map((w) =>
				w.id === id
					? {
							...w,
							isMaximized: !w.isMaximized,
							position: w.isMaximized ? w.position : { x: 0, y: 0 },
							size: w.isMaximized
								? w.size
								: { width: window.innerWidth, height: window.innerHeight - 48 },
					  }
					: w
			)
		);
	};

	const restoreWindow = (id: string) => {
		setWindows((prev) =>
			prev.map((w) => (w.id === id ? { ...w, isMinimized: false } : w))
		);
		setActiveWindowId(id);
	};

	const updateWindow = (id: string, updates: Partial<WindowState>) => {
		setWindows((prev) =>
			prev.map((w) => (w.id === id ? { ...w, ...updates } : w))
		);
	};

	const bringToFront = (id: string) => {
		const maxZ = Math.max(...windows.map((w) => w.zIndex));
		setWindows((prev) =>
			prev.map((w) => (w.id === id ? { ...w, zIndex: maxZ + 1 } : w))
		);
		setActiveWindowId(id);
	};

	const handleSearch = (query: string) => {
		setSearchQuery(query);
		if (query.trim()) {
			// Search through apps and mock files
			const apps = [
				{ name: "Calculator", type: "app", component: "calculator" },
				{ name: "Notepad", type: "app", component: "notepad" },
				{ name: "File Explorer", type: "app", component: "file-explorer" },
				{ name: "Settings", type: "app", component: "settings" },
			];

			const mockFiles = [
				{ name: "Documents", type: "folder" },
				{ name: "Downloads", type: "folder" },
				{ name: "Pictures", type: "folder" },
				{ name: "example.txt", type: "file" },
				{ name: "document.pdf", type: "file" },
			];

			const results = [...apps, ...mockFiles].filter((item) =>
				item.name.toLowerCase().includes(query.toLowerCase())
			);
			setSearchResults(results);
			setIsSearchOpen(true);
		} else {
			setSearchResults([]);
			setIsSearchOpen(false);
		}
	};

	const handleSearchResultClick = (result: any) => {
		if (result.type === "app") {
			openWindow(result.component, result.name);
		} else if (
			result.name === "Documents" ||
			result.name === "Downloads" ||
			result.name === "Pictures"
		) {
			openWindow("file-explorer", "File Explorer");
		}
		setIsSearchOpen(false);
		setSearchQuery("");
	};

	const handleDesktopClick = () => {
		setIsStartMenuOpen(false);
		setContextMenu({ isVisible: false, position: { x: 0, y: 0 } });
		setIsSearchOpen(false);
	};

	const handleDesktopRightClick = (e: React.MouseEvent) => {
		e.preventDefault();
		setContextMenu({
			isVisible: true,
			position: { x: e.clientX, y: e.clientY },
		});
	};

	return (
		<div className='h-screen w-screen overflow-hidden relative bg-[url(/wnd.png)] bg-cover bg-center'>
			<Desktop
				ref={desktopRef}
				onClick={handleDesktopClick}
				onContextMenu={handleDesktopRightClick}
				onOpenApp={openWindow}
			/>

			<WindowManager
				windows={windows}
				activeWindowId={activeWindowId}
				onClose={closeWindow}
				onMinimize={minimizeWindow}
				onMaximize={maximizeWindow}
				onUpdate={updateWindow}
				onBringToFront={bringToFront}
			/>

			<StartMenu
				isOpen={isStartMenuOpen}
				onClose={() => setIsStartMenuOpen(false)}
				onOpenApp={openWindow}
			/>

			<ContextMenu
				isVisible={contextMenu.isVisible}
				position={contextMenu.position}
				onClose={() =>
					setContextMenu({ isVisible: false, position: { x: 0, y: 0 } })
				}
			/>

			<Taskbar
				windows={windows}
				onStartClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
				onWindowClick={restoreWindow}
				currentTime={currentTime}
				isStartMenuOpen={isStartMenuOpen}
				searchQuery={searchQuery}
				searchResults={searchResults}
				isSearchOpen={isSearchOpen}
				onSearch={handleSearch}
				onSearchResultClick={handleSearchResultClick}
			/>
		</div>
	);
}
