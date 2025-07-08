import { Feedback } from '@/features/feedback/ui'

export default function FormPage() {
  return (
    <div className="bg-[url('/images/formBackground.webp')] bg-no-repeat bg-cover">
      <div className="pt-[100px]">
        <Feedback noBackground />
      </div>
    </div>
  )
}
