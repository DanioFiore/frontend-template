"use client"

import { motion } from 'motion/react'
import { Mail, Phone, MapPin, Send, Github, Linkedin, ExternalLink } from 'lucide-react'
import { Spotlight } from '@/components/ui/spotlight'
import { Magnetic } from '@/components/ui/magnetic'
import { TextEffect } from '@/components/ui/text-effect'
import { COMPANY_INFO } from '@/lib/navbar-config'
import { EMAIL, SOCIAL_LINKS } from '@/app/data'
import { useState } from 'react'

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

const CONTACT_METHODS = [
    {
        icon: Mail,
        label: 'Email',
        value: EMAIL,
        href: `mailto:${EMAIL}`,
        description: 'Send me an email and I\'ll get back to you within 24 hours',
    },
    {
        icon: Phone,
        label: 'Phone',
        value: COMPANY_INFO.phone,
        href: `tel:${COMPANY_INFO.phone}`,
        description: 'Call me during business hours (9 AM - 6 PM CET)',
    },
    {
        icon: MapPin,
        label: 'Location',
        value: 'Bari, Italy',
        href: 'https://maps.google.com/?q=Bari,Italy',
        description: 'Based in Bari, Italy - available worldwide',
    },
]

interface ContactFormData {
    name: string
    email: string
    subject: string
    message: string
}

function ContactForm() {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        subject: '',
        message: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
        ...prev,
        [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        setIsSubmitting(false)
        setIsSubmitted(true)
        
        // Reset form after success
        setTimeout(() => {
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
        })
        setIsSubmitted(false)
        }, 3000)
    }

    if (isSubmitted) {
        return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center p-8 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
        >
            <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mb-4"
            >
            <Send className="w-8 h-8 text-green-600 dark:text-green-400" />
            </motion.div>
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                Message Sent!
            </h3>
            <p className="text-green-600 dark:text-green-400 text-center">
                Thank you for reaching out. I'll get back to you within 24 hours.
            </p>
        </motion.div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
            <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Name
            </label>
            <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Your name"
            />
            </div>
            <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Email
            </label>
            <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="your@email.com"
            />
            </div>
        </div>
        
        <div>
            <label htmlFor="subject" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Subject
            </label>
            <input
            type="text"
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="What's this about?"
            />
        </div>
        
        <div>
            <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Message
            </label>
            <textarea
            id="message"
            name="message"
            required
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
            placeholder="Tell me about your project or idea..."
            />
        </div>
        
        <Magnetic>
            <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            >
            {isSubmitting ? (
                <span className="flex items-center justify-center">
                <motion.div
                    className="w-5 h-5 border-2 border-white dark:border-zinc-900 border-t-transparent rounded-full mr-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Sending...
                </span>
            ) : (
                <span className="flex items-center justify-center">
                <Send className="w-5 h-5 mr-2" />
                Send Message
                </span>
            )}
            </motion.button>
        </Magnetic>
        </form>
    )
}

export default function Contact() {
    return (
        <div className="relative">
        <Spotlight
            className="fixed top-0 left-0 md:left-60 md:-top-20"
        />
        
        <motion.div
            initial="hidden"
            animate="visible"
            variants={VARIANTS_CONTAINER}
            className="space-y-16"
        >
            {/* Header */}
            <motion.section
            variants={VARIANTS_SECTION}
            transition={TRANSITION_SECTION}
            className="text-center space-y-6"
            >
            <TextEffect
                as="h1"
                preset="fade"
                className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-zinc-100"
            >
                Get In Touch
            </TextEffect>
            <TextEffect
                as="p"
                preset="fade"
                delay={0.2}
                className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"
            >
                Do you need help with your issues or just want to say hello? I'm always excited to hear from you
            </TextEffect>
            </motion.section>

            {/* Contact Methods */}
            <motion.section
            variants={VARIANTS_SECTION}
            transition={TRANSITION_SECTION}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4"
            >
            {CONTACT_METHODS.map((method, index) => {
                const Icon = method.icon
                return (
                <Magnetic key={method.label}>
                    <motion.a
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : undefined}
                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="block p-6 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors group h-64 flex flex-col"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    >
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-700 rounded-lg flex items-center justify-center group-hover:bg-zinc-200 dark:group-hover:bg-zinc-600 transition-colors">
                        <Icon className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
                        </div>
                        <ExternalLink className="w-4 h-4 text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors" />
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                        {method.label}
                    </h3>
                    <p className="text-zinc-700 dark:text-zinc-300 font-medium mb-2 break-all text-sm">
                        {method.value}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        {method.description}
                    </p>
                    </motion.a>
                </Magnetic>
                )
            })}
            </motion.section>

            {/* Contact Form */}
            {/* THIS IS A FORM TO SEND EMAIL BUT THE WEBSITE IS STATIC, SO NO API CALLS FOR NOW */}
            {/* <motion.section
            variants={VARIANTS_SECTION}
            transition={TRANSITION_SECTION}
            className="max-w-2xl mx-auto"
            >
            <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-8">
                <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                    Send me a message
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                    Fill out the form below and I'll get back to you as soon as possible.
                </p>
                </div>
                <ContactForm />
            </div>
            </motion.section> */}

            {/* Social Links */}
            <motion.section
            variants={VARIANTS_SECTION}
            transition={TRANSITION_SECTION}
            className="text-center space-y-6 px-4 pb-8"
            >
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Connect with me
            </h2>
            <div className="flex justify-center space-x-8 py-4">
                {SOCIAL_LINKS.map((link, index) => (
                <Magnetic key={link.label}>
                    <motion.a
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    >
                    {link.label === 'Github' && (
                        <Github className="w-6 h-6 text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" />
                    )}
                    {link.label === 'LinkedIn' && (
                        <Linkedin className="w-6 h-6 text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" />
                    )}
                    </motion.a>
                </Magnetic>
                ))}
            </div>
            </motion.section>
        </motion.div>
        </div>
    )
}
