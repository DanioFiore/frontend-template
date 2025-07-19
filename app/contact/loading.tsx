export default function ContactLoading() {
    return (
        <div className="space-y-16">
        {/* Header skeleton */}
        <div className="text-center space-y-6">
            <div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse max-w-md mx-auto" />
            <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse max-w-2xl mx-auto" />
            <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse max-w-xl mx-auto" />
        </div>

        {/* Contact methods skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
            <div key={i} className="p-6 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
                <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-700 rounded-lg animate-pulse" />
                <div className="w-4 h-4 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
                </div>
                <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse mb-2" />
                <div className="h-5 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse mb-2" />
                <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse w-3/4" />
            </div>
            ))}
        </div>

        {/* Form skeleton */}
        {/* <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-8">
            <div className="text-center mb-8">
                <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse max-w-sm mx-auto mb-2" />
                <div className="h-5 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse max-w-md mx-auto" />
            </div>
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-12 bg-zinc-200 dark:bg-zinc-700 rounded-lg animate-pulse" />
                <div className="h-12 bg-zinc-200 dark:bg-zinc-700 rounded-lg animate-pulse" />
                </div>
                <div className="h-12 bg-zinc-200 dark:bg-zinc-700 rounded-lg animate-pulse" />
                <div className="h-32 bg-zinc-200 dark:bg-zinc-700 rounded-lg animate-pulse" />
                <div className="h-12 bg-zinc-200 dark:bg-zinc-700 rounded-lg animate-pulse" />
            </div>
            </div>
        </div> */}

        {/* Social links skeleton */}
        <div className="text-center space-y-6">
            <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse max-w-sm mx-auto" />
            <div className="flex justify-center space-x-6">
            {[...Array(2)].map((_, i) => (
                <div key={i} className="w-12 h-12 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
            ))}
            </div>
        </div>
        </div>
    )
}
