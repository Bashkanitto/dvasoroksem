import ArticlesComponent from '@/features/articles/ui'
import { Feedback } from '@/features/feedback/ui'

export default function ArticlesPage() {
  return (
    <div className="w-full xl:w-[1440px] mx-auto">
      <div className="pt-[150px] w-[88%] mx-auto">
        <ArticlesComponent />
      </div>
      <div className="mt-[100px]">
        <Feedback />
      </div>
    </div>
  )
}
