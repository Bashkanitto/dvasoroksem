'use client'
import { FeedbackForm } from '@/features/feedbackForm/ui'
import PortfolioComponent from 'features/portfolio/ui'

export default function PortfolioPage() {
  return (
    <div className="w-full xl:w-[1440px] mx-auto">
      <div className="pt-[200px] w-[88%] mx-auto">
        <PortfolioComponent />
      </div>
      <div className="mt-[100px]">
        <FeedbackForm />
      </div>
    </div>
  )
}
