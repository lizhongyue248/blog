import { FC, ReactElement } from 'react'
import { Button } from 'gatsby-theme-material-ui'
import Layout from '../components/Layout'

// markup
const IndexPage: FC = (): ReactElement => {
  return (
    <Layout>
      <Button to='/test'>To test</Button>
      test
    </Layout>
  )
}

export default IndexPage
