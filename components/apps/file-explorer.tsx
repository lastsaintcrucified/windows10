/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Folder,
	File,
	Home,
	ChevronRight,
	ArrowLeft,
	ArrowRight,
	Search,
	MoreVertical,
	Grid3X3,
	List,
	HardDrive,
	ImageIcon,
	Music,
	Video,
	FileText,
} from "lucide-react";
import Image from "next/image";

interface FileItem {
	name: string;
	type: "folder" | "file";
	size?: string;
	modified?: string;
	icon: any;
}

interface FolderStructure {
	[key: string]: FileItem[];
}

export default function FileExplorer() {
	const [currentPath, setCurrentPath] = useState(["This PC"]);
	const [selectedItem, setSelectedItem] = useState<string | null>(null);
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [searchQuery, setSearchQuery] = useState("");

	// Mock file system structure
	const fileSystem: FolderStructure = {
		"This PC": [
			{
				name: "Local Disk (C:)",
				type: "folder",
				icon: HardDrive,
				size: "256 GB",
			},
			{ name: "Documents", type: "folder", icon: Folder },
			{ name: "Downloads", type: "folder", icon: Folder },
			{ name: "Pictures", type: "folder", icon: Folder },
			{ name: "Music", type: "folder", icon: Folder },
			{ name: "Videos", type: "folder", icon: Folder },
			{ name: "Desktop", type: "folder", icon: Folder },
		],
		Documents: [
			{ name: "Work", type: "folder", icon: Folder },
			{ name: "Personal", type: "folder", icon: Folder },
			{
				name: "Resume.pdf",
				type: "file",
				icon: FileText,
				size: "245 KB",
				modified: "2024-01-15",
			},
			{
				name: "Budget.xlsx",
				type: "file",
				icon: File,
				size: "89 KB",
				modified: "2024-01-10",
			},
			{
				name: "Notes.txt",
				type: "file",
				icon: FileText,
				size: "12 KB",
				modified: "2024-01-08",
			},
		],
		Downloads: [
			{
				name: "installer.exe",
				type: "file",
				icon: File,
				size: "45.2 MB",
				modified: "2024-01-20",
			},
			{
				name: "document.pdf",
				type: "file",
				icon: FileText,
				size: "1.2 MB",
				modified: "2024-01-18",
			},
			{
				name: "image.jpg",
				type: "file",
				icon: ImageIcon,
				size: "2.8 MB",
				modified: "2024-01-16",
			},
			{
				name: "archive.zip",
				type: "file",
				icon: File,
				size: "15.6 MB",
				modified: "2024-01-14",
			},
		],
		Pictures: [
			{ name: "Vacation 2024", type: "folder", icon: Folder },
			{ name: "Screenshots", type: "folder", icon: Folder },
			{
				name: "wallpaper.jpg",
				type: "file",
				icon: ImageIcon,
				size: "4.2 MB",
				modified: "2024-01-12",
			},
			{
				name: "photo1.png",
				type: "file",
				icon: ImageIcon,
				size: "1.8 MB",
				modified: "2024-01-10",
			},
			{
				name: "photo2.jpg",
				type: "file",
				icon: ImageIcon,
				size: "3.1 MB",
				modified: "2024-01-09",
			},
		],
		Music: [
			{ name: "Playlists", type: "folder", icon: Folder },
			{
				name: "song1.mp3",
				type: "file",
				icon: Music,
				size: "4.5 MB",
				modified: "2024-01-05",
			},
			{
				name: "song2.mp3",
				type: "file",
				icon: Music,
				size: "3.8 MB",
				modified: "2024-01-03",
			},
			{
				name: "album.mp3",
				type: "file",
				icon: Music,
				size: "5.2 MB",
				modified: "2024-01-01",
			},
		],
		Videos: [
			{ name: "Movies", type: "folder", icon: Folder },
			{ name: "Clips", type: "folder", icon: Folder },
			{
				name: "video1.mp4",
				type: "file",
				icon: Video,
				size: "125 MB",
				modified: "2024-01-15",
			},
			{
				name: "tutorial.mp4",
				type: "file",
				icon: Video,
				size: "89 MB",
				modified: "2024-01-12",
			},
		],
		Work: [
			{ name: "Projects", type: "folder", icon: Folder },
			{ name: "Meetings", type: "folder", icon: Folder },
			{
				name: "presentation.pptx",
				type: "file",
				icon: File,
				size: "12.4 MB",
				modified: "2024-01-20",
			},
			{
				name: "report.docx",
				type: "file",
				icon: FileText,
				size: "456 KB",
				modified: "2024-01-18",
			},
		],
		Personal: [
			{
				name: "diary.txt",
				type: "file",
				icon: FileText,
				size: "23 KB",
				modified: "2024-01-19",
			},
			{
				name: "recipes.pdf",
				type: "file",
				icon: FileText,
				size: "2.1 MB",
				modified: "2024-01-17",
			},
		],
	};

	const getCurrentItems = () => {
		const pathKey = currentPath[currentPath.length - 1];
		const items = fileSystem[pathKey] || [];

		if (searchQuery.trim()) {
			return items.filter((item) =>
				item.name.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}

		return items;
	};

	const navigateToFolder = (folderName: string) => {
		if (fileSystem[folderName]) {
			setCurrentPath([...currentPath, folderName]);
			setSelectedItem(null);
			setSearchQuery("");
		}
	};

	const navigateBack = () => {
		if (currentPath.length > 1) {
			setCurrentPath(currentPath.slice(0, -1));
			setSelectedItem(null);
			setSearchQuery("");
		}
	};

	const navigateToPath = (index: number) => {
		if (index < currentPath.length - 1) {
			setCurrentPath(currentPath.slice(0, index + 1));
			setSelectedItem(null);
			setSearchQuery("");
		}
	};

	const formatFileSize = (size: string | undefined) => {
		return size || "--";
	};

	const formatDate = (date: string | undefined) => {
		if (!date) return "--";
		return new Date(date).toLocaleDateString();
	};

	const currentItems = getCurrentItems();

	return (
		<div className='h-full flex flex-col bg-white'>
			{/* Toolbar */}
			<div className='border-b border-gray-200 p-2 flex items-center space-x-2'>
				<Button
					variant='ghost'
					size='sm'
					onClick={navigateBack}
					disabled={currentPath.length <= 1}
					className='h-8'
				>
					<ArrowLeft className='w-4 h-4' />
				</Button>
				<Button
					variant='ghost'
					size='sm'
					disabled
					className='h-8'
				>
					<ArrowRight className='w-4 h-4' />
				</Button>
				<Button
					variant='ghost'
					size='sm'
					className='h-8'
				>
					<Home className='w-4 h-4' />
				</Button>

				<div className='flex-1'></div>

				{/* Search */}
				<div className='relative w-64'>
					<Search className='absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
					<input
						type='text'
						placeholder='Search in folder'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className='w-full h-8 pl-8 pr-3 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500'
					/>
				</div>

				{/* View Options */}
				<Button
					variant={viewMode === "grid" ? "default" : "ghost"}
					size='sm'
					className='h-8'
					onClick={() => setViewMode("grid")}
				>
					<Grid3X3 className='w-4 h-4' />
				</Button>
				<Button
					variant={viewMode === "list" ? "default" : "ghost"}
					size='sm'
					className='h-8'
					onClick={() => setViewMode("list")}
				>
					<List className='w-4 h-4' />
				</Button>

				<Button
					variant='ghost'
					size='sm'
					className='h-8'
				>
					<MoreVertical className='w-4 h-4' />
				</Button>
			</div>

			{/* Address Bar */}
			<div className='border-b border-gray-200 p-2 bg-gray-50'>
				<div className='flex items-center space-x-1 text-sm'>
					{currentPath.map((path, index) => (
						<div
							key={index}
							className='flex items-center'
						>
							{index > 0 && <ChevronRight className='w-4 h-4 text-gray-400' />}
							<button
								className='px-2 py-1 hover:bg-gray-200 rounded cursor-pointer text-blue-600'
								onClick={() => navigateToPath(index)}
							>
								{path}
							</button>
						</div>
					))}
				</div>
			</div>

			{/* Content */}
			<div className='flex-1 flex'>
				{/* Sidebar */}
				<div className='w-48 border-r border-gray-200 p-2 bg-gray-50'>
					<div className='space-y-1'>
						<div className='text-xs font-semibold text-gray-600 px-2 py-1'>
							Quick access
						</div>
						<Button
							variant='ghost'
							className='w-full justify-start text-sm h-8'
							onClick={() => navigateToFolder("Desktop")}
						>
							<Image
								src='/folder.png'
								alt='My Pc'
								width={48}
								height={48}
								className='w-4 h-4 mb-1 group-hover:opacity-80 transition-opacity'
							/>
							Desktop
						</Button>
						<Button
							variant='ghost'
							className='w-full justify-start text-sm h-8'
							onClick={() => navigateToFolder("Documents")}
						>
							<Image
								src='/folder.png'
								alt='My Pc'
								width={48}
								height={48}
								className='w-4 h-4 mb-1 group-hover:opacity-80 transition-opacity'
							/>
							Documents
						</Button>
						<Button
							variant='ghost'
							className='w-full justify-start text-sm h-8'
							onClick={() => navigateToFolder("Downloads")}
						>
							<Image
								src='/folder.png'
								alt='My Pc'
								width={48}
								height={48}
								className='w-4 h-4 mb-1 group-hover:opacity-80 transition-opacity'
							/>
							Downloads
						</Button>
						<Button
							variant='ghost'
							className='w-full justify-start text-sm h-8'
							onClick={() => navigateToFolder("Pictures")}
						>
							<Image
								src='/folder.png'
								alt='My Pc'
								width={48}
								height={48}
								className='w-4 h-4 mb-1 group-hover:opacity-80 transition-opacity'
							/>
							Pictures
						</Button>
						<Button
							variant='ghost'
							className='w-full justify-start text-sm h-8'
							onClick={() => navigateToFolder("Music")}
						>
							<Music className='w-4 h-4 mr-2' />
							Music
						</Button>
						<Button
							variant='ghost'
							className='w-full justify-start text-sm h-8'
							onClick={() => navigateToFolder("Videos")}
						>
							<Video className='w-4 h-4 mr-2' />
							Videos
						</Button>

						<div className='border-t border-gray-300 my-2'></div>
						<div className='text-xs font-semibold text-gray-600 px-2 py-1'>
							This PC
						</div>
						<Button
							variant='ghost'
							className='w-full justify-start text-sm h-8'
							onClick={() => setCurrentPath(["This PC"])}
						>
							<Image
								src='/folder.png'
								alt='My Pc'
								width={48}
								height={48}
								className='w-4 h-4 mb-1 group-hover:opacity-80 transition-opacity'
							/>
							Local Disk (C:)
						</Button>
					</div>
				</div>

				{/* Main Content */}
				<div className='flex-1 p-4'>
					{viewMode === "grid" ? (
						<div className='grid grid-cols-6 gap-4'>
							{currentItems.map((item, index) => (
								<div
									key={index}
									className={`flex flex-col items-center p-3 rounded cursor-pointer hover:bg-blue-50 ${
										selectedItem === item.name
											? "bg-blue-100 ring-1 ring-blue-300"
											: ""
									}`}
									onClick={() => setSelectedItem(item.name)}
									onDoubleClick={() =>
										item.type === "folder" && navigateToFolder(item.name)
									}
								>
									{item.type === "folder" ? (
										<Image
											src='/folder.png'
											alt='My Pc'
											width={48}
											height={48}
											className='w-8 h-8 mb-1 group-hover:opacity-80 transition-opacity'
										/>
									) : (
										<item.icon className='w-8 h-8 mb-2 text-blue-600' />
									)}

									<span className='text-sm text-center break-words'>
										{item.name}
									</span>
								</div>
							))}
						</div>
					) : (
						<div className='space-y-1'>
							{/* Header */}
							<div className='grid grid-cols-12 gap-4 p-2 border-b border-gray-200 text-xs font-medium text-gray-600'>
								<div className='col-span-6'>Name</div>
								<div className='col-span-2'>Date modified</div>
								<div className='col-span-2'>Type</div>
								<div className='col-span-2'>Size</div>
							</div>

							{/* Items */}
							{currentItems.map((item, index) => (
								<div
									key={index}
									className={`grid grid-cols-12 gap-4 p-2 rounded cursor-pointer hover:bg-blue-50 ${
										selectedItem === item.name ? "bg-blue-100" : ""
									}`}
									onClick={() => setSelectedItem(item.name)}
									onDoubleClick={() =>
										item.type === "folder" && navigateToFolder(item.name)
									}
								>
									<div className='col-span-6 flex items-center space-x-2'>
										<item.icon
											className={`w-4 h-4 ${
												item.type === "folder"
													? "text-yellow-600"
													: "text-blue-600"
											}`}
										/>
										<span className='text-sm truncate'>{item.name}</span>
									</div>
									<div className='col-span-2 text-sm text-gray-600'>
										{formatDate(item.modified)}
									</div>
									<div className='col-span-2 text-sm text-gray-600 capitalize'>
										{item.type}
									</div>
									<div className='col-span-2 text-sm text-gray-600'>
										{formatFileSize(item.size)}
									</div>
								</div>
							))}
						</div>
					)}

					{currentItems.length === 0 && (
						<div className='flex items-center justify-center h-64 text-gray-500'>
							{searchQuery
								? "No items match your search"
								: "This folder is empty"}
						</div>
					)}
				</div>
			</div>

			{/* Status Bar */}
			<div className='border-t border-gray-200 px-4 py-1 text-xs text-gray-600 flex justify-between bg-gray-50'>
				<span>{currentItems.length} items</span>
				{selectedItem && <span>1 item selected</span>}
			</div>
		</div>
	);
}
