import { FC, ReactElement } from 'react'
import { Button } from 'gatsby-theme-material-ui'
import Layout from '../components/Layout'

// markup
const Test: FC = (): ReactElement => {
  return (
    <Layout>
      <Button to='/'>To Index</Button>
      test
    </Layout>
  )
}

export default Test
