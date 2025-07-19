"use client"

import { motion } from 'motion/react'
import { ArrowLeft, Clock, ExternalLink, Calendar, Star } from 'lucide-react'
import { Spotlight } from '@/components/ui/spotlight'
import { Magnetic } from '@/components/ui/magnetic'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'
import { useParams } from 'next/navigation'

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

const PROJECTS_DATA = [
    {
        id: "1",
        title: "Know Yourself AI",
        description: "Stop remembering everything. Know Yourself AI is a personal knowledge management system that uses AI to help you remember and organize your thoughts, ideas and experiences.",
        image: "/images/projects_logos/know-yourself-ai-logo.png",
        technologies: ["Python", "FastAPI", "PostgreSQL", "Vue.js", "Docker", "OpenAI", "Redis"],
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
        ],
        documentation: {
            overview: "Know Yourself AI is a revolutionary personal knowledge management system that leverages artificial intelligence to help users organize, remember, and retrieve their thoughts, ideas, and experiences effortlessly.",
            features: [
                {
                    title: "AI-Powered Search",
                    description: "Ask natural language questions about your files and get instant, contextual answers."
                },
                {
                    title: "Intelligent Organization",
                    description: "Automatically categorize and tag your content for easy retrieval."
                },
                {
                    title: "Secure Storage",
                    description: "Your data is encrypted and stored securely with enterprise-grade security."
                },
                {
                    title: "Multi-format Support",
                    description: "Works with text files, PDFs, images, and more."
                }
            ],
            technicalSpecs: {
                "Backend": "FastAPI with Python 3.9+",
                "Database": "PostgreSQL for relational data, Redis for caching",
                "AI Integration": "OpenAI GPT models for natural language processing",
                "Frontend": "Vue.js 3 with TypeScript",
                "Deployment": "Docker containers with Docker Compose",
                "Authentication": "JWT-based authentication system"
            },
            installation: `
# Clone the repository
git clone https://github.com/DanioFiore/know-yourself-ai.git
cd know-yourself-ai

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run with Docker Compose
docker-compose up -d

# Or run locally
pip install -r requirements.txt
python main.py
            `,
            usage: `
# Basic usage examples

## Upload a file
curl -X POST "http://localhost:8000/api/files" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -F "file=@document.pdf"

## Ask a question
curl -X POST "http://localhost:8000/api/ask" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"question": "What did I write about AI last week?"}'
            `
        }
    },
    {
        id: "2",
        title: "Money Wizardry",
        description: "Track your finances with ease. Money Wizardry is a personal finance management tool that helps you budget, track expenses and achieve your financial goals.",
        image: "/images/projects_logos/money-wizardry-logo.png",
        technologies: ["Python", "FastAPI", "PostgreSQL", "Redis", "Docker"],
        category: "Full Stack",
        status: "In progress",
        year: "2025",
        has_docs: false,
        links: {
            github: "https://github.com/DanioFiore/money-wizardry",
            demo: "https://api.taskmanager.inkeisoft.com/docs"
        },
        highlights: [
            "Integrated with OpenAI for financial insights",
            "Real-time expense tracking",
            "Budgeting tools and financial goal setting",
            "Integration with Telegram chat"
        ]
    }
]

export default function ProjectDocumentation() {
    const params = useParams()
    const projectId = params.id as string
    
    const project = PROJECTS_DATA.find(p => p.id === projectId)
    
    if (!project) {
        return (
            <div className="relative">
                <Spotlight className="fixed top-0 left-0 md:left-60 md:-top-20" />
                
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={VARIANTS_CONTAINER}
                    className="space-y-12"
                >
                    <motion.div
                        variants={VARIANTS_SECTION}
                        transition={TRANSITION_SECTION}
                        className="text-center space-y-6"
                    >
                        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
                            Project Not Found
                        </h1>
                        <p className="text-lg text-zinc-600 dark:text-zinc-400">
                            The project you're looking for doesn't exist.
                        </p>
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Projects
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        )
    }
    
    if (!project.has_docs) {
        return (
            <div className="relative">
                <Spotlight className="fixed top-0 left-0 md:left-60 md:-top-20" />
                
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={VARIANTS_CONTAINER}
                    className="space-y-12"
                >
                    {/* Header */}
                    <motion.div
                        variants={VARIANTS_SECTION}
                        transition={TRANSITION_SECTION}
                        className="space-y-6"
                    >
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Projects
                        </Link>
                        
                        <div className="flex items-center gap-4">
                            <img
                                src={project.image}
                                alt={`${project.title} logo`}
                                className="w-16 h-16 rounded-xl object-cover"
                            />
                            <div>
                                <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                                    {project.title}
                                </h1>
                                <p className="text-zinc-600 dark:text-zinc-400">
                                    Documentation
                                </p>
                            </div>
                        </div>
                    </motion.div>
                    
                    {/* In Progress Message */}
                    <motion.div
                        variants={VARIANTS_SECTION}
                        transition={TRANSITION_SECTION}
                        className="text-center space-y-8 py-16"
                    >
                        <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto">
                            <Clock className="w-12 h-12 text-zinc-400" />
                        </div>
                        
                        <div className="space-y-4">
                            <TextEffect
                                as="h2"
                                preset="fade"
                                className="text-2xl font-bold text-zinc-900 dark:text-zinc-100"
                            >
                                Documentation In Progress
                            </TextEffect>
                            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                                I'm currently working on the documentation for {project.title}. 
                                Check back soon for detailed guides, API references, and usage examples.
                            </p>
                        </div>
                        
                        <div className="space-y-4">
                            <p className="text-sm text-zinc-500 dark:text-zinc-500">
                                In the meantime, you can:
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center">
                                {project.links.demo && (
                                    project.is_online ? (
                                        <Link
                                            href={project.links.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            View Live Demo
                                        </Link>
                                    ) : (
                                        <button
                                            disabled
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-50 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 rounded-lg text-sm font-medium cursor-not-allowed opacity-50"
                                            title="Demo is offline"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            Demo Offline
                                        </button>
                                    )
                                )}
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                                >
                                    Contact for More Info
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        )
    }
    
    return (
        <div className="relative">
            <Spotlight className="fixed top-0 left-0 md:left-60 md:-top-20" />
            
            <motion.div
                initial="hidden"
                animate="visible"
                variants={VARIANTS_CONTAINER}
                className="space-y-12"
            >
                {/* Header */}
                <motion.div
                    variants={VARIANTS_SECTION}
                    transition={TRANSITION_SECTION}
                    className="space-y-6"
                >
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Projects
                    </Link>
                    
                    <div className="flex items-center gap-4">
                        <img
                            src={project.image}
                            alt={`${project.title} logo`}
                            className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div>
                            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                                {project.title}
                            </h1>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                Documentation
                            </p>
                        </div>
                    </div>
                </motion.div>
                
                {/* Project Info */}
                <motion.section
                    variants={VARIANTS_SECTION}
                    transition={TRANSITION_SECTION}
                    className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 space-y-4"
                >
                    <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                        <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {project.year}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 rounded-full text-xs font-medium">
                            {project.status}
                        </span>
                        <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-700 rounded-full text-xs font-medium">
                            {project.category}
                        </span>
                    </div>
                    
                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {project.documentation?.overview}
                    </p>
                    
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
                </motion.section>
                
                {/* Features */}
                <motion.section
                    variants={VARIANTS_SECTION}
                    transition={TRANSITION_SECTION}
                    className="space-y-6"
                >
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                        Key Features
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {project.documentation?.features.map((feature, index) => (
                            <Magnetic key={index}>
                                <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-zinc-100 dark:bg-zinc-700 rounded-lg flex items-center justify-center">
                                            <Star className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                                        </div>
                                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                                            {feature.title}
                                        </h3>
                                    </div>
                                    <p className="text-zinc-600 dark:text-zinc-400">
                                        {feature.description}
                                    </p>
                                </div>
                            </Magnetic>
                        ))}
                    </div>
                </motion.section>
                
                {/* Technical Specifications */}
                <motion.section
                    variants={VARIANTS_SECTION}
                    transition={TRANSITION_SECTION}
                    className="space-y-6"
                >
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                        Technical Specifications
                    </h2>
                    
                    <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(project.documentation?.technicalSpecs || {}).map(([key, value]) => (
                                <div key={key} className="flex justify-between items-center py-2 border-b border-zinc-200 dark:border-zinc-700 last:border-b-0">
                                    <span className="font-medium text-zinc-900 dark:text-zinc-100">{key}</span>
                                    <span className="text-zinc-600 dark:text-zinc-400 text-sm">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>
                
                {/* Installation */}
                <motion.section
                    variants={VARIANTS_SECTION}
                    transition={TRANSITION_SECTION}
                    className="space-y-6"
                >
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                        Installation
                    </h2>
                    
                    <div className="bg-zinc-900 dark:bg-zinc-800 rounded-2xl p-6 overflow-x-auto">
                        <pre className="text-zinc-100 dark:text-zinc-200 text-sm whitespace-pre-wrap">
                            {project.documentation?.installation}
                        </pre>
                    </div>
                </motion.section>
                
                {/* Usage */}
                <motion.section
                    variants={VARIANTS_SECTION}
                    transition={TRANSITION_SECTION}
                    className="space-y-6"
                >
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                        Usage Examples
                    </h2>
                    
                    <div className="bg-zinc-900 dark:bg-zinc-800 rounded-2xl p-6 overflow-x-auto">
                        <pre className="text-zinc-100 dark:text-zinc-200 text-sm whitespace-pre-wrap">
                            {project.documentation?.usage}
                        </pre>
                    </div>
                </motion.section>
                
                {/* Links */}
                <motion.section
                    variants={VARIANTS_SECTION}
                    transition={TRANSITION_SECTION}
                    className="space-y-6"
                >
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                        Links
                    </h2>
                    
                    <div className="flex gap-4">
                        {project.links.demo && (
                            project.is_online ? (
                                <Link
                                    href={project.links.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Live Demo
                                </Link>
                            ) : (
                                <button
                                    disabled
                                    className="flex items-center gap-2 px-6 py-3 bg-zinc-50 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 rounded-lg font-medium cursor-not-allowed opacity-50"
                                    title="Demo is offline"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Demo Offline
                                </button>
                            )
                        )}
                        <Link
                            href="/contact"
                            className="flex items-center gap-2 px-6 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                        >
                            Need Help?
                        </Link>
                    </div>
                </motion.section>
            </motion.div>
        </div>
    )
}
