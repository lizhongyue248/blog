import { FC, ReactElement } from 'react'
import { useRecoilValue } from 'recoil'
import { graphql } from 'gatsby'
import {
  Inject, AccumulationDataLabel,
  AccumulationDataLabelSettingsModel,
  TooltipSettingsModel,
  LegendSettingsModel,
  AccumulationTooltip,
  AccumulationLegend,
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective
} from '@syncfusion/ej2-react-charts'
import { Chip, Avatar } from '@material-ui/core'
import { getBgColors, getBorderColors, getTextColors } from '../util/constant'
import { darkState } from '../store/base'
import { CategoryProps } from '../interface/page'
import Layout from '../components/Layout'

const dataLabel: AccumulationDataLabelSettingsModel = { name: 'text', visible: true, position: 'Outside' }
const toolTip: TooltipSettingsModel = { enable: true, header: '类别' }

interface CategoryChartProps {
  category: {
    total: number
    category: string
    text: string
  }[]
}

const CategoryChart: FC<CategoryChartProps> = ({ category }): ReactElement => {
  const dark = useRecoilValue(darkState)
  const legend: LegendSettingsModel = { position: 'Bottom', shapeHeight: 15, shapeWidth: 15, textStyle: { color: dark ? '#fff' : '#000' } }

  return (
    <AccumulationChartComponent
      id='charts'
      background={dark ? '#424242' : '#ffffff'}
      tooltip={toolTip}
      legendSettings={legend}
    >
      <Inject services={[AccumulationDataLabel, AccumulationTooltip, AccumulationLegend]} />
      <AccumulationSeriesCollectionDirective>
        <AccumulationSeriesDirective
          explode
          explodeOffset='20%'
          legendShape='Pentagon'
          dataSource={category}
          xName='category'
          yName='total'
          dataLabel={dataLabel}
        />
      </AccumulationSeriesCollectionDirective>
    </AccumulationChartComponent>
  )
}

const CategoryPage: FC<CategoryProps> = ({ data }): ReactElement => {
  const category = data.allAsciidoc.group
    .map(g => ({ total: g.totalCount, category: g.nodes[0].pageAttributes.category }))
    .map((c) => ({ ...c, text: `${c.category} ${c.total}` }))
  return (
    <Layout title='分类'>
      <div className='text-2xl font-bold'>共计 {category.length} 个类别</div>
      <CategoryChart category={category} />
      {
        category.map((c, index) => (
          <Chip
            className={`mr-5 mt-5 ${getBorderColors(index)} ${getTextColors(index)} `}
            key={c.category}
            avatar={<Avatar className={`${getBgColors(index)} text-white`}>{c.total}</Avatar>}
            label={c.category}
            clickable
            variant='outlined'
          />
        ))
      }
    </Layout>
  )
}

export const query = graphql`
  {
    allAsciidoc {
      category: distinct(field: pageAttributes___category)
      group(field: pageAttributes___category) {
        nodes {
          pageAttributes {
            category
          }
        }
        totalCount
      }
    }
  }
`

export default CategoryPage
