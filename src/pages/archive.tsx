import { FC, ReactElement } from 'react'
import { useRecoilValue } from 'recoil'
import _ from 'lodash'
import { graphql, navigate } from 'gatsby'
import { useSetState } from 'ahooks'
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  AnnotationsDirective,
  AnnotationDirective,
  ChartAnnotation,
  Inject,
  Legend,
  Category,
  Tooltip,
  DateTime,
  DataLabel,
  SplineSeries
} from '@syncfusion/ej2-react-charts'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ExpandLess from '@material-ui/icons/ExpandLess'
import { List, ListItem, ListItemText, Collapse, Chip, Divider } from '@material-ui/core'
import { getBanner } from '../util/constant'
import { darkState } from '../store/base'
import { Node } from '../interface/asciidoc'
import Layout from '../components/Layout'

interface ArchiveProps {
  data: {
    allAsciidoc: {
      group: {
        nodes: Node[]
        totalCount: number
      }[]
      totalCount: number
    }
  }
}

interface Archive {
  year: number
  nodes: Node[]
  total: number
  date: Date
}

const ArchiveChart: FC<{ archives: Archive[]}> = ({ archives }): ReactElement => {
  const dark = useRecoilValue(darkState)
  const bad = archives.filter(archive => archive.total < 5)
  const good = archives.filter(archive => archive.total > 24)

  return (
    <ChartComponent
      data-sal='slide-up'
      data-sal-duration='1000'
      data-sal-repeat='true'
      id='charts'
      background={dark ? '#424242' : '#ffffff'}
      margin={{ top: 30, left: 15, right: 15, bottom: 30 }}
      primaryXAxis={{ title: '年份', valueType: 'DateTime', intervalType: 'Years', majorGridLines: { width: 0 }, labelIntersectAction: 'Rotate90', labelStyle: { color: dark ? '#fff' : '#000' } }}
      primaryYAxis={{ title: '文章数', labelFormat: '{value}篇', labelStyle: { color: dark ? '#fff' : '#000' } }}
      tooltip={{ enable: true, shared: true }}
    >
      <Inject services={[SplineSeries, Legend, Tooltip, DataLabel, Category, DateTime, ChartAnnotation]} />
      <AnnotationsDirective>
        {
          bad.map(item => (
            <AnnotationDirective
              key={`bad-${item.year}`}
              content='<div class="chart_cloud"><img className="w-6 h-6" src="https://ej2.syncfusion.com/react/demos/src/chart/images/cloud.png" /></div>'
              x={item.date} y={item.total}
              coordinateUnits='Point'
              verticalAlignment='Top'
            />
          ))
        }
        {
          good.map(item => (
            <AnnotationDirective
              key={`good-${item.year}`}
              content='<div id="chart_cloud"><img className="w-6 h-6" src="https://ej2.syncfusion.com/react/demos/src/chart/images/sunny.png"  /></div>'
              x={item.date} y={item.total}
              coordinateUnits='Point'
              verticalAlignment='Top'
            />
          ))
        }
      </AnnotationsDirective>
      <SeriesCollectionDirective>
        <SeriesDirective
          dataSource={archives}
          width={2}
          xName='date'
          yName='total'
          type='Spline'
          marker={{ visible: true, width: 10, height: 10 }}
        />
      </SeriesCollectionDirective>
    </ChartComponent>
  )
}

const ArchivePage: FC<ArchiveProps> = ({ data }): ReactElement => {
  const archives = data.allAsciidoc.group
    .map(item => ({
      year: item.nodes[0].fields.year,
      nodes: _.sortBy(item.nodes, o => o.fields.birthTime),
      total: item.totalCount,
      date: new Date(item.nodes[0].fields.year, 0, 1)
    }))
    .sort((a, b) => (b.year - a.year))
  const [open, setOpen] = useSetState<{[key: number]: boolean}>(
    archives.map(archive => archive.year)
      .reduce((acc, curr, currentIndex) => ({
        ...acc,
        [curr]: currentIndex === 0
      }), {}))
  return (
    <Layout title='归档' banner={getBanner(4)}>
      <List>
        <ListItem className='text-2xl font-bold'>共计 {data.allAsciidoc.totalCount} 篇文章</ListItem>
        <ArchiveChart archives={archives} />
        {
          archives.map(archive => (
            <List key={archive.year}>
              <ListItem
                onClick={() => setOpen({ [archive.year]: !open[archive.year] })}
                className='text-2xl font-bold'
                button
              >
                <ListItemText>
                  <span>
                    {archive.year}
                    <Chip className='ml-4' size='small' variant='outlined' label={`${archive.nodes.length} 篇`} />
                  </span>
                </ListItemText>
                {open[archive.year] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Divider />
              <Collapse in={open[archive.year]} timeout='auto' unmountOnExit>
                <List>
                  {
                    archive.nodes.map((node) => (
                      <div key={node.fields.slug}>
                        <ListItem
                          className='flex space-x-3 justify-between px-10 sm:text-sm md:text-base lg:text-xl hover:text-blue-400 duration-500 transition-colors'
                          onClick={() => navigate(node.fields.slug)}
                          button
                        >
                          <div className='w-4/5'>
                            {node.document.title}
                            <Chip className='ml-4 text-orange-500 border-orange-500' variant='outlined' size='small' label={node.pageAttributes.category} />
                          </div>
                          <div className='text-right w-1/5'>{node.fields.birthTime}</div>
                        </ListItem>
                        <Divider variant='middle' component='li' />
                      </div>
                    ))
                }
                </List>
              </Collapse>
            </List>
          ))
        }
      </List>
    </Layout>
  )
}

export const query = graphql`
  {
    allAsciidoc(sort: {order: DESC, fields: revision___date}) {
      group(field: fields___year) {
        nodes {
          id
          document {
            title
          }
          fields {
            year
            slug
            birthTime(formatString: "YYYY-MM-DD")
          }
          pageAttributes {
            category
          }
        }
        totalCount
      }
      totalCount
    }
  }
`

export default ArchivePage
