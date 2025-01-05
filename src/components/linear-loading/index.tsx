import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'

function LinearIndeterminate() {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress
        sx={{
          height: '2px'
        }}
      />
    </Box>
  )
}

export default function LinearLoading() {
  return <LinearIndeterminate />
}
