'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateUserEmailFrequency } from '@/lib/databaseService'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function EmailPreferencesPage({ userId }: { userId: string }) {
  const [frequency, setFrequency] = useState('weekly')

  const handleFrequencyChange = async (value: string) => {
    setFrequency(value)
    await updateUserEmailFrequency(userId, value)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Email Preferences</h1>
      <div className="space-y-4">
        <div>
          <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">
            Email Frequency
          </label>
          <Select onValueChange={handleFrequencyChange} defaultValue={frequency}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="twice-weekly">Twice Weekly</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => console.log('Preferences saved')}>Save Preferences</Button>
      </div>
    </div>
  )
}

