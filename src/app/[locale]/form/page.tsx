import { FeedbackForm } from '@/features/feedbackForm/ui'

export default function FormPage() {
  return (
    <div className="bg-[url('/images/formBackground.webp')] bg-no-repeat bg-cover">
      <div className="pt-[100px]">
        <FeedbackForm noBackground />
      </div>
    </div>
  )
}
