import { ChangeEvent, KeyboardEvent, FC, ReactElement, useState } from 'react'
import { useRecoilState } from 'recoil'
import { Close } from 'mdi-material-ui'
import { useStaticQuery, graphql, navigate } from 'gatsby'
import Fuse from 'fuse.js'
import { useBoolean } from 'ahooks'
import { SearchSharp } from '@material-ui/icons'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  useTheme,
  LinearProgress,
  ListItemText,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  Chip,
  Divider,
  Typography
} from '@material-ui/core'
import { searchState } from '../store/base'
import { Node } from '../interface/asciidoc'

interface PostQuery {
  allAsciidoc: {
    nodes: Node[]
  }
}

const options = {
  includeScore: true,
  findAllMatches: true,
  includeMatches: true,
  keys: ['document.title', 'content']
}

const Search: FC = (): ReactElement => {
  const data = useStaticQuery<PostQuery>(graphql`
    {
      allAsciidoc {
        nodes {
          content
          fields {
            slug
            birthTime
            modifiedTime(formatString: "YYYY-MM-DD")
            year
          }
          document {
            title
          }
        }
      }
    }
  `)
  const posts = data.allAsciidoc.nodes
  const fuse = new Fuse(posts, options)

  const [open, setOpen] = useRecoilState(searchState)
  const [loading, { setTrue, setFalse }] = useBoolean(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [searchString, setSearchString] = useState('')
  const [result, setResult] = useState<Fuse.FuseResult<Node>[]>([])

  const handleSearch = () => {
    setTrue()
    setResult(fuse.search(searchString))
    setFalse()
  }
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setSearchString(event.target.value)
  const handleKeyDown = (event: KeyboardEvent) => event.code === 'Enter' && handleSearch()

  return (
    <Dialog
      maxWidth='md'
      open={open}
      fullWidth
      fullScreen={fullScreen}
      onClose={() => setOpen(false)}
      aria-describedby='搜索框'
      aria-labelledby='搜索框'
    >
      <DialogTitle disableTypography id='search-title' className='flex flex-row'>
        <Typography variant='h6' className='flex-none'>搜索</Typography>
        <div className='flex-grow' />
        <IconButton size='small' className='flex-none' onClick={() => setOpen(false)}>
          <Close />
        </IconButton>
      </DialogTitle>
      {loading && <LinearProgress />}
      <DialogContent dividers>
        <TextField
          label='关键字'
          fullWidth
          autoFocus
          value={searchString}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          helperText='可以对文章的标题、内容进行模糊搜索，支持简单的正则表达式。'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton aria-label='search' onClick={handleSearch}>
                  <SearchSharp />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <div className='text-xl mt-6'>搜索结果（{result.length}）</div>
        <div className='my-3'>
          {result.length === 0
            ? <div className='text-gray-600 dark:text-gray-300'>┭┮﹏┭┮ 没有找到符合条件结果哦。。。</div>
            : (
              <List>
                {
                  result.map(item => (
                    <div key={item.refIndex}>
                      <ListItem className='pl-0 flex' button onClick={() => navigate(item.item.fields.slug)}>
                        <ListItemText className='flex-auto mr-1'>
                          <Chip size='small' className='mr-2 md:mr-4' color='primary' label={item.item.fields.year} variant='outlined' />
                          <span className='text-xs md:text-base flex-wrap'>{item.item.document.title}</span>
                        </ListItemText>
                        <div className='flex-grow' />
                        <div className='flex-none text-xs md:text-base'>
                          {item.item.fields.modifiedTime}
                        </div>
                      </ListItem>
                      <Divider />
                    </div>
                  ))
              }
              </List>)}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Search
