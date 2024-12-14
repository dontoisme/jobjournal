'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function QuestionFrequencyPage() {
  const [frequency, setFrequency] = useState('weekly')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the frequency setting to your backend
    console.log('Selected frequency:', frequency)
    // For now, we'll just redirect to a thank you page
    router.push('/onboarding/complete')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Set Question Frequency</h2>
        <div className="space-y-4">
          <Label>How often would you like to receive questions?</Label>
          <RadioGroup value={frequency} onValueChange={setFrequency}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="daily" id="daily" />
              <Label htmlFor="daily">Daily</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="twice-weekly" id="twice-weekly" />
              <Label htmlFor="twice-weekly">Twice Weekly</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="weekly" id="weekly" />
              <Label htmlFor="weekly">Weekly</Label>
            </div>
          </RadioGroup>
          <Button type="submit" className="w-full">
            Complete Setup
          </Button>
        </div>
      </form>
    </div>
  )
}

