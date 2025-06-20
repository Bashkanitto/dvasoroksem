import AnimationSection from '@/components/AnimationSection'
import Paper from '@/components/Paper'
import { colors } from '@/shared/constants/colors'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

export default function PortfolioComponent() {
  const t = useTranslations('portfolio')
  const portfolioCategories = [
    'branding',
    'marketing',
    'trands',
    'userful',
    'psychology',
    'strategy',
    'any',
    'collections',
    'tiktok',
  ]
  type PortfolioType = {
    id: number
    image: string
    link: string
    width: number
    height: number
  }
  const portfolios: PortfolioType[] = [
    {
      id: 0,
      image: '/images/box1.png',
      link: '',
      width: 400,
      height: 360,
    },
    {
      id: 1,
      image: '/images/box2.png',
      link: '',
      width: 400,
      height: 360,
    },
    {
      id: 2,
      image: '/images/box3.png',
      link: '',
      width: 400,
      height: 360,
    },
    {
      id: 3,
      image: '/images/box4.png',
      link: '',
      width: 615,
      height: 360,
    },
    {
      id: 4,
      image: '/images/box5.png',
      link: '',
      width: 615,
      height: 360,
    },
    {
      id: 5,
      image: '/images/box6.png',
      link: '',
      width: 400,
      height: 360,
    },
    {
      id: 6,
      image: '/images/box7.png',
      link: '',
      width: 400,
      height: 360,
    },
    {
      id: 8,
      image: '/images/box8.png',
      link: '',
      width: 400,
      height: 360,
    },
  ]

  return (
    <AnimationSection aria-label="Секция потфолио">
      <div className="categories mt-[20px] flex flex-col lg:flex-row justify-center flex-wrap gap-[15px] overflow-x-scroll w-full lg:w-[80%] mx-auto">
        {portfolioCategories.map((category) => (
          <Paper style={{ color: colors.text }} className="py-2 px-4 rounded-full " key={category}>
            <h4>{t(category)}</h4>
          </Paper>
        ))}
      </div>
      <div className="mt-[50px] flex flex-wrap justify-center gap-[30px] p-4">
        {portfolios.map((portfolio) => (
          <Link href={portfolio.link} key={portfolio.id}>
            <Image
              width={portfolio.width}
              height={portfolio.height}
              src={portfolio.image}
              alt="portfolio image"
              className="lg:min-w-[400px] max-h-[360px] rounded-[30px]"
            />
          </Link>
        ))}
      </div>
    </AnimationSection>
  )
}
