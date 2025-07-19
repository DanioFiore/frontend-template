"use client"

import { motion } from 'motion/react'
import { Code, ExternalLink, Github, Calendar, Star } from 'lucide-react'
import { Spotlight } from '@/components/ui/spotlight'
import { Magnetic } from '@/components/ui/magnetic'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'

const VARIANTS_CONTAINER = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
}

const VARIANTS_SECTION = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
    duration: 0.3,
}

const PROJECTS = [
    {
        id: 1,
        title: "Know Yourself AI",
        description: "Stop remembering everything. Know Yourself AI is a personal knowledge management system that uses AI to help you remember and organize your thoughts, ideas and experiences.",
        image: "/images/projects_logos/know-yourself-ai-logo.png",
        technologies: ["Python", "FastAPI", "PostgreSQL", "Vue.js", "Docker", 'OpenAI', "Redis"],
        category: "Full Stack",
        status: "In progress",
        year: "2025",
        is_public: false,
        is_online: false,
        has_docs: false,
        links: {
            github: "https://github.com/DanioFiore/know-yourself-ai",
            demo: "https://know-yourself-ai.inkeisoft.com"
        },
        highlights: [
            "Ask to the AI about your files",
            "User-friendly interface",
            "Secure data storage",
        ]
    },
    {
        id: 2,
        title: "Money Wizardry",
        description: "Track your finances with ease. Money Wizardry is a personal finance management tool that helps you budget, track expenses and achieve your financial goals.",
        image: "/images/projects_logos/money-wizardry-logo.png",
        technologies: ["Python", "FastAPI", "PostgreSQL", "Docker"],
        category: "Backend",
        status: "In progress",
        year: "2025",
        is_public: false,
        is_online: false,
        has_docs: false,
        links: {
            github: "https://github.com/DanioFiore/money-wizardry",
            demo: "https://api.taskmanager.inkeisoft.com/docs"
        },
        highlights: [
            "Telegram chat, no app required",
            "Real-time expense tracking",
            "Fast and easy, no waste of time"
        ]
    }
]

const CATEGORIES = [
    { name: "All", count: PROJECTS.length },
    { name: "Full Stack", count: PROJECTS.filter(p => p.category === "Full Stack").length },
    { name: "Backend", count: PROJECTS.filter(p => p.category === "Backend").length },
]

export default function Projects() {
    return (
        <div className="relative">
            <Spotlight
                className="fixed top-0 left-0 md:left-60 md:-top-20"
            />
            
            <motion.div
                initial="hidden"
                animate="visible"
                variants={VARIANTS_CONTAINER}
                className="space-y-20"
            >
                {/* Hero Section */}
                <motion.section
                    variants={VARIANTS_SECTION}
                    transition={TRANSITION_SECTION}
                    className="text-center space-y-8"
                >
                    <TextEffect
                        as="h1"
                        preset="fade"
                        className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-zinc-100"
                    >
                        My Projects
                    </TextEffect>
                    <TextEffect
                        as="p"
                        preset="fade"
                        delay={0.2}
                        className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto"
                    >
                        A showcase of my work, from backend APIs to full-stack applications. 
                        Each project represents a step in my journey as a software developer.
                    </TextEffect>
                </motion.section>

                {/* Categories Filter */}
                <motion.section
                    variants={VARIANTS_SECTION}
                    transition={TRANSITION_SECTION}
                    className="flex justify-center"
                >
                    <div className="flex flex-wrap gap-3 bg-zinc-100 dark:bg-zinc-800 p-2 rounded-xl">
                        {CATEGORIES.map((category, index) => (
                            <motion.button
                                key={category.name}
                                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-600"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                {category.name} ({category.count})
                            </motion.button>
                        ))}
                    </div>
                </motion.section>

                {/* Projects Grid */}
                <motion.section
                    variants={VARIANTS_SECTION}
                    transition={TRANSITION_SECTION}
                    className="space-y-8"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
                        {PROJECTS.map((project, index) => (
                            <Magnetic key={project.id}>
                                <motion.div
                                    className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden h-full flex flex-col"
                                    whileHover={{ scale: 1.02 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    {/* Project Image */}
                                    <div className="h-48 bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center overflow-hidden">
                                        {project.image ? (
                                            <img 
                                                src={project.image} 
                                                alt={`${project.title} logo`}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    // Fallback to icon if image fails to load
                                                    const img = e.currentTarget;
                                                    const fallback = img.nextElementSibling as HTMLElement;
                                                    img.style.display = 'none';
                                                    if (fallback) {
                                                        fallback.style.display = 'flex';
                                                    }
                                                }}
                                            />
                                        ) : null}
                                        <div className="w-full h-full flex items-center justify-center" style={{ display: project.image ? 'none' : 'flex' }}>
                                            <Code className="w-16 h-16 text-zinc-400" />
                                        </div>
                                    </div>
                                    
                                    {/* Project Content */}
                                    <div className="p-6 space-y-4 flex-1 flex flex-col">
                                        {/* Header */}
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                                                    {project.title}
                                                </h3>
                                                <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {project.year}
                                                    </span>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                        project.status === 'Active' 
                                                            ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                                                            : 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                                                    }`}>
                                                        {project.status}
                                                    </span>
                                                    <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-700 rounded-full text-xs font-medium">
                                                        {project.category}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                            {project.description}
                                        </p>

                                        {/* Technologies */}
                                        <div className="space-y-2">
                                            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                                Technologies Used:
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-2 py-1 bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded text-xs font-medium"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Highlights */}
                                        <div className="space-y-2">
                                            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                                Key Features:
                                            </h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                                                {project.highlights.map((highlight) => (
                                                    <div
                                                        key={highlight}
                                                        className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                                                    >
                                                        <Star className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                                                        <span>{highlight}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Links */}
                                        <div className="flex gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-700 mt-auto">
                                            {project.is_public ? (
                                                <Link
                                                    href={project.links.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors"
                                                >
                                                    <Github className="w-4 h-4" />
                                                    View Code
                                                </Link>
                                            ) : (
                                                <Link
                                                    href={`/projects/${project.id}`}
                                                    className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                    Show Docs
                                                </Link>
                                            )}
                                            {project.links.demo && (
                                                project.is_online ? (
                                                    <Link
                                                        href={project.links.demo}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                        Live Demo
                                                    </Link>
                                                ) : (
                                                    <button
                                                        disabled
                                                        className="flex items-center gap-2 px-4 py-2 bg-zinc-50 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 rounded-lg text-sm font-medium cursor-not-allowed opacity-50"
                                                        title="Demo is offline"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                        Offline
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </Magnetic>
                        ))}
                    </div>
                </motion.section>

                {/* Call to Action */}
                {/* <motion.section
                    variants={VARIANTS_SECTION}
                    transition={TRANSITION_SECTION}
                    className="text-center space-y-6 py-16"
                >
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                        Need help with your issues?
                    </h2>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                        Feel free to reach me out!
                    </p>
                    <Magnetic>
                        <motion.a
                            href="/contact"
                            className="inline-flex items-center px-8 py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Let's connect
                            <motion.div
                                className="ml-2"
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                →
                            </motion.div>
                        </motion.a>
                    </Magnetic>
                </motion.section> */}
            </motion.div>
        </div>
    )
}
