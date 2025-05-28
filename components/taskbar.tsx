/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import type { WindowState } from "@/app/page";
import {
	Search,
	Wifi,
	Battery,
	Volume2,
	Volume1,
	VolumeX,
	Folder,
	FileText,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface TaskbarProps {
	windows: WindowState[];
	onStartClick: () => void;
	onWindowClick: (id: string) => void;
	currentTime: Date;
	isStartMenuOpen: boolean;
	searchQuery: string;
	searchResults: any[];
	isSearchOpen: boolean;
	onSearch: (query: string) => void;
	onSearchResultClick: (result: any) => void;
}

export default function Taskbar({
	windows,
	onStartClick,
	onWindowClick,
	currentTime,
	isStartMenuOpen,
	searchQuery,
	searchResults,
	isSearchOpen,
	onSearch,
	onSearchResultClick,
}: TaskbarProps) {
	const [isWifiOpen, setIsWifiOpen] = useState(false);
	const [isVolumeOpen, setIsVolumeOpen] = useState(false);
	const [volume, setVolume] = useState(50);
	const [isMuted, setIsMuted] = useState(false);

	const formatTime = (date: Date) => {
		return date.toLocaleTimeString("en-US", {
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		});
	};

	const formatDate = (date: Date) => {
		return date.toLocaleDateString("en-US", {
			month: "2-digit",
			day: "2-digit",
			year: "numeric",
		});
	};

	return (
		<div className='absolute bottom-0 left-0 right-0 h-12 bg-black/80 backdrop-blur-md border-t border-gray-600 flex items-center px-2 z-50'>
			{/* Start Button */}
			<Button
				variant='ghost'
				size='sm'
				className={`h-10 px-3 text-white hover:bg-white/10 ${
					isStartMenuOpen ? "bg-white/20" : ""
				}`}
				onClick={onStartClick}
			>
				<Image
					src='/start.png'
					alt='My Pc'
					width={48}
					height={48}
					className='w-5 h-5 mb-1 group-hover:opacity-80 transition-opacity'
				/>
			</Button>

			{/* Search */}
			<div className='ml-2 flex-1 max-w-md relative'>
				<div className='relative'>
					<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
					<input
						type='text'
						placeholder='Type here to search'
						value={searchQuery}
						onChange={(e) => onSearch(e.target.value)}
						className='w-full h-8 pl-10 pr-4 bg-white/10 border border-gray-600 rounded text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500'
					/>
				</div>

				{/* Search Results */}
				{isSearchOpen && searchResults.length > 0 && (
					<div className='absolute top-10 left-0 right-0 bg-black/90 backdrop-blur-md border border-gray-600 rounded-b max-h-64 overflow-y-auto z-50'>
						{searchResults.map((result, index) => (
							<div
								key={index}
								className='px-4 py-2 hover:bg-white/10 cursor-pointer flex items-center space-x-2'
								onClick={() => onSearchResultClick(result)}
							>
								{result.type === "app" ? (
									<div className='w-4 h-4 bg-blue-500 rounded'></div>
								) : result.type === "folder" ? (
									<Folder className='w-4 h-4 text-yellow-500' />
								) : (
									<FileText className='w-4 h-4 text-gray-400' />
								)}
								<span className='text-white text-sm'>{result.name}</span>
								<span className='text-gray-400 text-xs ml-auto'>
									{result.type}
								</span>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Window Buttons */}
			<div className='flex-1 flex items-center ml-4 space-x-1'>
				{windows
					.filter((w) => !w.isMinimized)
					.map((window) => (
						<Button
							key={window.id}
							variant='ghost'
							size='sm'
							className='h-10 px-3 text-white hover:bg-white/10 max-w-48 truncate'
							onClick={() => onWindowClick(window.id)}
						>
							<span className='truncate'>{window.title}</span>
						</Button>
					))}
			</div>

			{/* System Tray */}
			<div className='flex items-center space-x-2 ml-4'>
				{/* WiFi */}
				<div className='relative'>
					<Button
						variant='ghost'
						size='sm'
						className='h-8 w-8 p-0 text-white hover:bg-white/10'
						onClick={() => setIsWifiOpen(!isWifiOpen)}
					>
						<Wifi className='w-4 h-4' />
					</Button>

					{isWifiOpen && (
						<div className='absolute bottom-10 right-0 w-64 bg-black/90 backdrop-blur-md border border-gray-600 rounded p-4 z-50'>
							<div className='text-white text-sm font-medium mb-3'>Wi-Fi</div>
							<div className='space-y-2'>
								<div className='flex items-center justify-between p-2 hover:bg-white/10 rounded'>
									<div>
										<div className='text-white text-sm'>Home Network</div>
										<div className='text-gray-400 text-xs'>
											Connected, secured
										</div>
									</div>
									<div className='text-green-400'>●</div>
								</div>
								<div className='flex items-center justify-between p-2 hover:bg-white/10 rounded'>
									<div>
										<div className='text-white text-sm'>Guest Network</div>
										<div className='text-gray-400 text-xs'>Secured</div>
									</div>
									<Wifi className='w-4 h-4 text-gray-400' />
								</div>
								<div className='flex items-center justify-between p-2 hover:bg-white/10 rounded'>
									<div>
										<div className='text-white text-sm'>Office WiFi</div>
										<div className='text-gray-400 text-xs'>Open</div>
									</div>
									<Wifi className='w-4 h-4 text-gray-400' />
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Volume */}
				<div className='relative'>
					<Button
						variant='ghost'
						size='sm'
						className='h-8 w-8 p-0 text-white hover:bg-white/10'
						onClick={() => setIsVolumeOpen(!isVolumeOpen)}
					>
						{isMuted ? (
							<VolumeX className='w-4 h-4' />
						) : volume > 50 ? (
							<Volume2 className='w-4 h-4' />
						) : (
							<Volume1 className='w-4 h-4' />
						)}
					</Button>

					{isVolumeOpen && (
						<div className='absolute bottom-10 right-0 w-48 bg-black/90 backdrop-blur-md border border-gray-600 rounded p-4 z-50'>
							<div className='text-white text-sm font-medium mb-3'>Volume</div>
							<div className='space-y-3'>
								<div className='flex items-center space-x-2'>
									<Button
										variant='ghost'
										size='sm'
										className='h-6 w-6 p-0 text-white hover:bg-white/10'
										onClick={() => setIsMuted(!isMuted)}
									>
										{isMuted ? (
											<VolumeX className='w-3 h-3' />
										) : (
											<Volume2 className='w-3 h-3' />
										)}
									</Button>
									<div className='flex-1'>
										<input
											type='range'
											min='0'
											max='100'
											value={isMuted ? 0 : volume}
											onChange={(e) => {
												setVolume(Number.parseInt(e.target.value));
												if (Number.parseInt(e.target.value) > 0)
													setIsMuted(false);
											}}
											className='w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider'
										/>
									</div>
									<span className='text-white text-xs w-8'>
										{isMuted ? 0 : volume}
									</span>
								</div>
							</div>
						</div>
					)}
				</div>

				<Button
					variant='ghost'
					size='sm'
					className='h-8 w-8 p-0 text-white hover:bg-white/10'
				>
					<Battery className='w-4 h-4' />
				</Button>

				{/* Clock */}
				<div className='text-white text-sm px-2 py-1 hover:bg-white/10 rounded cursor-pointer'>
					<div className='text-right'>
						<div>{formatTime(currentTime)}</div>
						<div className='text-xs'>{formatDate(currentTime)}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
