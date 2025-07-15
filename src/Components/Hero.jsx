import { Button } from "@heroui/react"

export default function Hero() {
    return (
        <div className="relative h-full flex items-center justify-center text-center px-10 overflow-hidden">
            <div className="flex flex-col gap-8 z-10">
                <h2 className="text-4xl md:text-6xl font-bold">
                    Inside the De<span className="text-danger italic line-through">bug</span> Diary
                </h2>
                <p className="text-stone-400">
                    Exploring malware, red teaming ops, exploit dev, and the mind of an offensive security nerd
                </p>
                <div className="flex gap-4 justify-center">
                    <a href="/blog">
                        <Button color="primary" variant="shadow">
                            View all blog
                        </Button>
                    </a>                    
                </div>
            </div>
        </div>
    );
}
