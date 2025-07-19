"use client"

import { motion } from 'motion/react'
import { Code, Database, Globe, Star, Calendar, MapPin, Heart, Award } from 'lucide-react'
import { Spotlight } from '@/components/ui/spotlight'
import { Magnetic } from '@/components/ui/magnetic'
import { TextEffect } from '@/components/ui/text-effect'
import { WORK_EXPERIENCE } from '@/app/data'

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

const SKILLS = [
    {
        icon: Code,
        title: 'Frontend Development',
        description: 'HTML, CSS, JavaScript, Vue.JS, Bootstrap',
        level: 70,
    },
    {
        icon: Database,
        title: 'Backend Development',
        description: 'Python, FastAPI, Flask, PHP, Laravel, SQL, MySQL, PostgreSQL',
        level: 85,
    },
    {
        icon: Globe,
        title: 'Infrastructure',
        description: 'Google Cloud, Docker, Kubernetes, CI/CD',
        level: 65,
    },
]

// const STATS = [
//     { 
//         label: 'Years of Experience', 
//         // Calculate years since February 2023
//         value: `${Math.max(1, Math.floor((new Date().getTime() - new Date('2023-02-01').getTime()) / (1000 * 60 * 60 * 24 * 365)))}+` 
//     },
//     { label: 'Projects Completed', value: '2+' },
//     { label: 'Happy Clients', value: '10+' },
//     { label: 'Lines of Code', value: '100K+' },
// ]

const VALUES = [
    {
        icon: Heart,
        title: 'Passion for Quality',
        description: 'I love to write clean, maintainable and efficient code. (Docs too!)',
    },
    {
        icon: Star,
        title: 'Continuous Learning',
        description: 'Technology evolves rapidly, and I stay up-to-date with the latest trends and best practices.',
    },
    {
        icon: Code,
        title: 'Problem Solving',
        description: 'I enjoy transforming complex problems into minimal and simple solutions.',
    },
]

export default function About() {
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
                        About Me
                    </TextEffect>
                    <TextEffect
                        as="p"
                        preset="fade"
                        delay={0.2}
                        className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto"
                    >
                        Hi, I'm Danio Fiore, Software Developer
                    </TextEffect>
                    
                    {/* Personal Info Cards */}
                    <motion.div
                        variants={VARIANTS_SECTION}
                        transition={TRANSITION_SECTION}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12 px-4"
                    >
                        <Magnetic>
                            <motion.div
                                className="p-6 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <MapPin className="w-8 h-8 text-zinc-700 dark:text-zinc-300 mb-4 mx-auto" />
                                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Location</h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">Bari, Italy</p>
                                <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">Available worldwide</p>
                            </motion.div>
                        </Magnetic>
                        
                        <Magnetic>
                            <motion.div
                                className="p-6 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Calendar className="w-8 h-8 text-zinc-700 dark:text-zinc-300 mb-4 mx-auto" />
                                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Experience</h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">{Math.max(1, Math.floor((new Date().getTime() - new Date('2023-02-01').getTime()) / (1000 * 60 * 60 * 24 * 365)))}+ Years</p>
                                <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">Software Developer</p>
                            </motion.div>
                        </Magnetic>
                        
                        <Magnetic>
                            <motion.div
                                className="p-6 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Code className="w-8 h-8 text-zinc-700 dark:text-zinc-300 mb-4 mx-auto" />
                                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Focus</h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">Minimal Software</p>
                                <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">Quality over quantity</p>
                            </motion.div>
                        </Magnetic>
                    </motion.div>
                </motion.section>

                {/* Skills Section */}
                <motion.section
                    variants={VARIANTS_SECTION}
                    transition={TRANSITION_SECTION}
                    className="space-y-8"
                >
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Skills & Expertise</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                            I love the Backend part, but don't shy away from the Frontend
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                        {SKILLS.map((skill, index) => {
                            const Icon = skill.icon
                            return (
                                <Magnetic key={skill.title}>
                                    <motion.div
                                        className="p-6 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 h-80 flex flex-col overflow-hidden"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Icon className="w-10 h-10 text-zinc-700 dark:text-zinc-300 mb-4" />
                                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2 break-words">
                                            {skill.title}
                                        </h3>
                                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 flex-1 break-words leading-relaxed">
                                            {skill.description}
                                        </p>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-xs">
                                                <span className="text-zinc-500">Proficiency</span>
                                                <span className="text-zinc-700 dark:text-zinc-300">{skill.level}%</span>
                                            </div>
                                            <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                                                <motion.div
                                                    className="bg-zinc-900 dark:bg-zinc-100 h-2 rounded-full"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${skill.level}%` }}
                                                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                </Magnetic>
                            )
                        })}
                    </div>
                </motion.section>

                {/* Stats Section */}
                {/* <motion.section
                    variants={VARIANTS_SECTION}
                    transition={TRANSITION_SECTION}
                    className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-8 mx-4"
                >
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">By the Numbers</h2>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            A quick overview of my journey so far
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {STATS.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="text-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section> */}

                {/* Work Experience */}
                <motion.section
                    variants={VARIANTS_SECTION}
                    transition={TRANSITION_SECTION}
                    className="space-y-8"
                >
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Work Experience</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                            My professional journey and the companies I've had the pleasure to work with
                        </p>
                    </div>
                    
                    <div className="max-w-3xl mx-auto px-4">
                        {WORK_EXPERIENCE.map((work, index) => (
                            <Magnetic key={work.id}>
                                <motion.div
                                    className="flex items-start space-x-6 p-6 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 mb-4"
                                    whileHover={{ scale: 1.01 }}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-700 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Award className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                            {work.title}
                                        </h3>
                                        <p className="text-blue-500 font-medium">{work.company}</p>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                                            {work.start} - {work.end}
                                        </p>
                                        {work.description && (
                                            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-3 leading-relaxed">
                                                {work.description}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            </Magnetic>
                        ))}
                    </div>
                </motion.section>

                {/* Values Section */}
                <motion.section
                    variants={VARIANTS_SECTION}
                    transition={TRANSITION_SECTION}
                    className="space-y-8"
                >
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">What Drives Me</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                            The principles and values that guide my work and approach to software development
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                        {VALUES.map((value, index) => {
                            const Icon = value.icon
                            return (
                                <Magnetic key={value.title}>
                                    <motion.div
                                        className="text-center p-6 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 h-80 flex flex-col justify-between"
                                        whileHover={{ scale: 1.02 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <div className="flex flex-col items-center">
                                            <Icon className="w-12 h-12 text-zinc-700 dark:text-zinc-300 mb-4" />
                                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 break-words">
                                                {value.title}
                                            </h3>
                                        </div>
                                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm break-words flex-1 flex items-center">
                                            {value.description}
                                        </p>
                                    </motion.div>
                                </Magnetic>
                            )
                        })}
                    </div>
                </motion.section>

                {/* About Inkeisoft Section */}
                <motion.section
                    variants={VARIANTS_SECTION}
                    transition={TRANSITION_SECTION}
                    className="space-y-8"
                >
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">What is Inkeisoft</h2>
                    </div>
                    
                    <div className="max-w-4xl mx-auto px-4">
                        <motion.div
                            className="p-8 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700"
                            whileHover={{ scale: 1.01 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            
                            <div className="space-y-6 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                <div>
                                    <p>
                                        <strong className="text-zinc-900 dark:text-zinc-100">Inkeisoft</strong> is an idea, a minimal approach to software development.
                                    </p>
                                    <p>
                                        It's not just a name, but a philosophy that emphasizes simplicity, efficiency, and purpose in every line of code.
                                    </p>
                                    <p>
                                        In a world that relentlessly competes for our attention, true strength lies in simplicity. Choosing to eliminate distractions is the first step toward staying focused on what truly matters.
                                    </p>
                                    <div className="text-center mt-6">
                                        <strong className="text-zinc-900 dark:text-zinc-100">Less is more.</strong>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Call to Action */}
                {/* <motion.section
                    variants={VARIANTS_SECTION}
                    transition={TRANSITION_SECTION}
                    className="text-center space-y-6 py-16"
                >
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                        Do you want to talk about your ideas?
                    </h2>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                        I'm all ears!
                    </p>
                    <Magnetic>
                        <motion.a
                            href="/contact"
                            className="inline-flex items-center px-8 py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Get In Touch
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
