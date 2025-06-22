import { FeedbackForm } from '@/features/feedbackForm/ui'
import ReviewsComponent from '@/features/reviews/ui'

export default function ReviewPage() {
  return (
    <div className="w-full xl:w-[1440px] mx-auto">
      <div className="pt-[200px] w-[88%] mx-auto">
        <ReviewsComponent />
      </div>
      <div className="mt-[100px]">
        <FeedbackForm />
      </div>
    </div>
  )
}
