
import { AboutUs } from "@/components/home/about-us"
import { Hero } from "@/components/home/hero"
import { Materials } from "@/components/home/materials"
import { CommunityNews } from "@/components/projects/community-news"

export default function Home() {
    return (
        <main className="w-full">
            <CommunityNews />
            <Hero />
            <Materials />
            <AboutUs />

        </main>
    )
}
