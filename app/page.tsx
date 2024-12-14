import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-5xl font-bold mb-6">Job Journal</h1>
      <p className="text-xl mb-8 max-w-2xl text-center">
        Elevate your job search with AI-powered resume and cover letter customization. 
        Build a rich history of your professional experiences and let our tool craft 
        tailored applications that stand out.
      </p>
      <Link href="/signup">
        <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-100">
          Get Started
        </Button>
      </Link>
    </div>
  )
}

