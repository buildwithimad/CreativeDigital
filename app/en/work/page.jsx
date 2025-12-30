// app/en/work/page.jsx (or wherever your portfolio page is)

import WorkHero from '@/components/work/WorkHero'
import WorkContent from '@/components/work/Work'
import { client } from '@/sanity/lib/client'
import { WORK_QUERY } from '@/sanity/queries/work'

export const dynamic = 'force-dynamic' // optional (SSG)

const PortfolioPage = async () => {
  const projects = await client.fetch(WORK_QUERY)


  return (
    <>
      <WorkHero />
      <WorkContent projects={projects} />
    </>
  )
}

export default PortfolioPage
