type Project = {
    name: string
    description: string
    link: string
    video?: string
    logo?: string
    is_public?: boolean
    id: string
}

type WorkExperience = {
    company: string
    title: string
    description: string
    start: string
    end: string
    link: string
    id: string
}

type BlogPost = {
    title: string
    description: string
    link: string
    uid: string
}

type SocialLink = {
    label: string
    link: string
}

export const SELECTED_PROJECTS: Project[] = [
    {
        name: 'Know Yourself AI',
        description:
        'Stop remembering everything. Know Yourself AI is a personal knowledge management system that uses AI to help you remember and organize your thoughts, ideas and experiences.',
        link: 'https://github.com/DanioFiore/know-yourself-ai',
        video:
        'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/newProfileItem/d898be8a-7037-4c71-af0c-8997239b050d.mp4?_a=DATAdtAAZAA0',
        logo: '/images/projects_logos/know-yourself-ai-logo.png',
        is_public: false,
        id: '1',
    },
    {
        name: 'Money Wizardry',
        description:
        'Track your finances with ease. Money Wizardry is a personal finance management tool that helps you budget, track expenses and achieve your financial goals.',
        link: 'https://github.com/DanioFiore/money-wizardry',
        video:
        'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/newProfileItem/d898be8a-7037-4c71-af0c-8997239b050d.mp4?_a=DATAdtAAZAA0',
        logo: '/images/projects_logos/money-wizardry-logo.png',
        is_public: false,
        id: '2',
    },

]

export const WORK_EXPERIENCE: WorkExperience[] = [
    {
        company: 'SysCo Srl',
        title: 'Software Developer',
        description: 'Railway Software Development',
        start: '2023',
        end: 'Present',
        link: 'https://sysco.biz/en',
        id: 'work1',
    },
    // {
    //   company: 'Freelance',
    //   title: 'Software Developer',
    //   description: "Helping companies and individuals to fix their software problems and build new features",
    //   start: '2025',
    //   end: 'Present',
    //   link: 'https://inkeisoft.com',
    //   id: 'work2',
    // }
]

export const BLOG_POSTS: BlogPost[] = [
    {
        title: 'Exploring the Intersection of Design, AI, and Design Engineering',
        description: 'How AI is changing the way we design',
        link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
        uid: 'blog-1',
    },
    {
        title: 'Why I left my job to start my own company',
        description:
        'A deep dive into my decision to leave my job and start my own company',
        link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
        uid: 'blog-2',
    },
    {
        title: 'What I learned from my first year of freelancing',
        description:
        'A look back at my first year of freelancing and what I learned',
        link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
        uid: 'blog-3',
    },
    {
        title: 'How to Export Metadata from MDX for Next.js SEO',
        description: 'A guide on exporting metadata from MDX files to leverage Next.js SEO features.',
        link: '/blog/example-mdx-metadata',
        uid: 'blog-4',
    },
]

export const SOCIAL_LINKS: SocialLink[] = [
    {
        label: 'Github',
        link: 'https://github.com/DanioFiore',
    },
    {
        label: 'LinkedIn',
        link: 'https://www.linkedin.com/in/danio-fiore/?locale=en_US',
    }
]

export const EMAIL = 'daniofioredev@gmail.com'
