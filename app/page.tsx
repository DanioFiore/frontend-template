'use client'
import { motion } from 'motion/react'
import { X, Github, Code, Palette, Zap, Settings, Rocket } from 'lucide-react'
import { Spotlight } from '@/components/ui/spotlight'
import { Magnetic } from '@/components/ui/magnetic'
import {
	MorphingDialog,
	MorphingDialogTrigger,
	MorphingDialogContent,
	MorphingDialogClose,
	MorphingDialogContainer,
} from '@/components/ui/morphing-dialog'
import Link from 'next/link'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { APP_CONFIG } from '@/config/app.config'

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

const TEMPLATE_FEATURES = [
	{
		id: 'responsive',
		title: 'Responsive Design',
		description: 'Mobile-first design that works perfectly on all devices',
		icon: Palette,
		highlight: 'Tailwind CSS v4',
	},
	{
		id: 'animations',
		title: 'Smooth Animations',
		description: 'Beautiful micro-interactions powered by Motion',
		icon: Zap,
		highlight: 'Motion Library',
	},
	{
		id: 'configurable',
		title: 'Fully Configurable',
		description: 'Centralized configuration system for easy customization',
		icon: Settings,
		highlight: 'Config-Driven',
	},
	{
		id: 'modern',
		title: 'Modern Stack',
		description: 'Built with Next.js 15, React 19, and TypeScript',
		icon: Code,
		highlight: 'Latest Tech',
	},
]

const QUICK_START_STEPS = [
	{
		step: '1',
		title: 'Clone the template',
		description: 'Get started by cloning this repository to your local machine',
		code: 'git clone https://github.com/DanioFiore/frontend-template.git',
	},
	{
		step: '2',
		title: 'Install dependencies',
		description: 'Install all required packages using npm',
		code: 'npm install',
	},
	{
		step: '3',
		title: 'Configure your app',
		description: 'Update the configuration files with your project details',
		code: 'Edit /config/app.config.ts',
	},
	{
		step: '4',
		title: 'Start developing',
		description: 'Run the development server and start building',
		code: 'npm run dev',
	},
	{
		step: '5',
		title: 'Ask to AI',
		description: 'If you are using an AI agent copilot, you can ask it to help you with the development. For example, you can give this prompt:',
		code: 'Basing on the provided code, style and components structure, create a new page for XXXX. Add it to the navigation and make sure it is responsive and follows the design system.',
	},
]

function MagneticButton({
	children,
	href,
	target,
}: {
	children: React.ReactNode
	href?: string
	target?: string
}) {
	const Component = href ? 'a' : 'button'
	return (
		<Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
			<Component
				href={href}
				target={target}
				rel={target === '_blank' ? 'noopener noreferrer' : undefined}
				className="group relative inline-flex shrink-0 items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-sm text-white transition-all duration-200 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
			>
				{children}
			</Component>
		</Magnetic>
	)
}

function CodeBlock({ children }: { children: string }) {
	return (
		<div className="relative rounded-lg bg-zinc-950 p-4 text-sm text-green-400 font-mono overflow-x-auto">
			<pre className="whitespace-pre-wrap">{children}</pre>
		</div>
	)
}

export default function TemplatePage() {
	return (
		<motion.main
			className="space-y-24"
			variants={VARIANTS_CONTAINER}
			initial="hidden"
			animate="visible"
		>
			{/* Hero Section */}
			<motion.section
				variants={VARIANTS_SECTION}
				transition={TRANSITION_SECTION}
			>
				<div className="flex-1 space-y-6">
					<div className="space-y-4">
						<h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
							Frontend Template
						</h1>
						<p className="text-xl text-zinc-600 dark:text-zinc-400">
							A modern, reusable frontend template for all your backend projects
						</p>
					</div>
					<p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
						This template provides a <strong>minimal yet powerful</strong> foundation for building modern web applications. 
						Built with <strong>Next.js 15</strong>, <strong>React 19</strong>, and <strong>TypeScript</strong>, 
						it features a clean design system, smooth animations, and a fully configurable architecture.
						<br /><br />
						<strong>Less is more</strong> – embrace simplicity and efficiency in your development workflow.
					</p>
					<div className="flex items-center gap-4">
						<MagneticButton href="https://github.com/DanioFiore/frontend-template" target="_blank">
							<Github className="h-4 w-4" />
							View on GitHub
						</MagneticButton>
					</div>
				</div>
			</motion.section>

			{/* Features Section */}
			<motion.section
				variants={VARIANTS_SECTION}
				transition={TRANSITION_SECTION}
			>
				<h3 className="mb-5 text-lg font-medium">Key Features</h3>
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
					{TEMPLATE_FEATURES.map((feature) => {
						const Icon = feature.icon
						return (
							<div key={feature.id} className="relative overflow-hidden rounded-2xl bg-zinc-300/30 p-[1px] dark:bg-zinc-600/30">
								<Spotlight
									className="from-zinc-900 via-zinc-800 to-zinc-700 blur-2xl dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-50"
									size={64}
								/>
								<div className="relative h-full w-full rounded-[15px] bg-white p-6 dark:bg-zinc-950">
									<div className="flex items-start gap-4">
										<div className="rounded-lg bg-zinc-100 p-2 dark:bg-zinc-800">
											<Icon className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
										</div>
										<div className="flex-1 space-y-2">
											<div className="flex items-center gap-2">
												<h4 className="font-medium text-zinc-900 dark:text-zinc-100">
													{feature.title}
												</h4>
												<span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
													{feature.highlight}
												</span>
											</div>
											<p className="text-sm text-zinc-600 dark:text-zinc-400">
												{feature.description}
											</p>
										</div>
									</div>
								</div>
							</div>
						)
					})}
				</div>
			</motion.section>

			{/* Quick Start Section */}
			<motion.section
				variants={VARIANTS_SECTION}
				transition={TRANSITION_SECTION}
			>
				<h3 className="mb-5 text-lg font-medium">Quick Start</h3>
				<div className="space-y-6">
					{QUICK_START_STEPS.map((step, index) => (
						<div key={step.step} className="relative">
							<div className="flex gap-4">
								<div className="flex-shrink-0">
									<div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">
										{step.step}
									</div>
								</div>
								<div className="flex-1 space-y-3">
									<div>
										<h4 className="font-medium text-zinc-900 dark:text-zinc-100">
											{step.title}
										</h4>
										<p className="text-sm text-zinc-600 dark:text-zinc-400">
											{step.description}
										</p>
									</div>
									<CodeBlock>{step.code}</CodeBlock>
								</div>
							</div>
							{index < QUICK_START_STEPS.length - 1 && (
								<div className="absolute left-4 top-8 h-6 w-px bg-zinc-200 dark:bg-zinc-800" />
							)}
						</div>
					))}
				</div>
			</motion.section>

			{/* Configuration Section */}
			<motion.section
				variants={VARIANTS_SECTION}
				transition={TRANSITION_SECTION}
			>
				<h3 className="mb-5 text-lg font-medium">Configuration</h3>
				<div className="space-y-4">
					<p className="text-zinc-600 dark:text-zinc-400">
						The template uses a centralized configuration system. Update <code className="rounded bg-zinc-100 px-1 py-0.5 text-sm dark:bg-zinc-800">/config/app.config.ts</code> to customize your application:
					</p>
					<CodeBlock>{`export const APP_CONFIG = {
	name: '${APP_CONFIG.name}',
	tagline: '${APP_CONFIG.tagline}',
	description: '${APP_CONFIG.description}',
	url: '${APP_CONFIG.url}',
	
	// Company info, social links, SEO settings...
	// Navigation configuration...
	// Feature flags...
}`}</CodeBlock>
				</div>
			</motion.section>

			{/* Get Started Section */}
			<motion.section
				variants={VARIANTS_SECTION}
				transition={TRANSITION_SECTION}
			>
				<div className="rounded-2xl border border-zinc-200 p-8 dark:border-zinc-800">
					<div className="flex items-center gap-3 mb-4">
						<Rocket className="h-6 w-6 text-zinc-600 dark:text-zinc-400" />
						<h3 className="text-lg font-medium">Ready to Get Started?</h3>
					</div>
					<p className="mb-6 text-zinc-600 dark:text-zinc-400">
						This template provides everything you need to build a modern, performant web application. 
						Start by configuring your project settings and begin building your next great project.
					</p>
					<div className="flex items-center gap-4">
						<MagneticButton href="https://github.com/DanioFiore/frontend-template" target="_blank">
							<Github className="h-4 w-4" />
							Clone Template
						</MagneticButton>
					</div>
				</div>
			</motion.section>
		</motion.main>
	)
}
