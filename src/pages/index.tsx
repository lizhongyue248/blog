import { FC, ReactElement } from 'react'
import Layout from '../components/Layout'
import Banner from '../components/Banner'

const IndexPage: FC = (): ReactElement => {
  return (
    <Layout>
      <Banner />
      123
    </Layout>
  )
}

export default IndexPage
