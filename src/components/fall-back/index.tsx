import { Box } from '@mui/material'
import { ReactNode, Suspense } from 'react'
import LinearLoading from '../linear-loading'

interface FallbackProps {
  children: ReactNode
}

const Fallback = ({ children }: FallbackProps) => {
  return (
    <Suspense
      fallback={
        <Box
          sx={{
            width: '100%',
            height: '100vh',
            display: 'flex'
          }}
        >
          <LinearLoading />
        </Box>
      }
    >
      {children}
    </Suspense>
  )
}

export default Fallback
