import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
  SnackbarOrigin,
  Snackbar
} from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { CURRENCY_DATA } from './currency'

interface IExchange {
  inputAmount?: string
  outputAmount?: string
}

interface State extends SnackbarOrigin {
  open: boolean
  errorMessage: string
}

const decimalRegex = /^[1-9]\d*(\.\d+)?$|^0(\.\d+)?$/

const schema = yup.object().shape({
  inputAmount: yup.string().test('input-or-output', 'Amount to send is required', function (value) {
    const { outputAmount } = this.parent
    if (value) {
      const valueTest = decimalRegex.test(value)

      if (!valueTest) {
        return this.createError({ message: 'Amount to send requires valid decimal number' })
      }

      return true
    }
    return outputAmount && decimalRegex.test(outputAmount)
  }),
  outputAmount: yup.string().test('input-or-output', 'Amount to receive is required', function (value) {
    const { inputAmount } = this.parent
    if (value) {
      const valueTest = decimalRegex.test(value)

      if (!valueTest) {
        return this.createError({ message: 'Amount to receive requires valid decimal number' })
      }

      return true
    }
    return inputAmount && decimalRegex.test(inputAmount)
  })
})

const Problem2Component = () => {
  const currencyData = Object.keys(CURRENCY_DATA)
  const [listToken] = useState(currencyData)
  const [inputToken, setInputToken] = useState(currencyData[0])
  const [outputToken, setOutputToken] = useState(currencyData[0])

  const [state, setState] = useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'right',
    errorMessage: 'Error'
  })
  const { vertical, horizontal, open, errorMessage } = state

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const showToast = (msg: string) => {
    setState({
      ...state,
      open: true,
      errorMessage: msg
    })
  }

  const hideClose = () => {
    setState({ ...state, open: false })
  }

  const getExchangeRate = (input: string, output: string): number | null => {
    if (!CURRENCY_DATA[input] || !CURRENCY_DATA[output]) return null

    const inputData = CURRENCY_DATA[input]
    const outputData = CURRENCY_DATA[output]

    const inputPrice = inputData?.price || 0
    const outputPrice = outputData?.price || 0

    if (inputPrice && outputPrice) {
      return inputPrice / outputPrice // Exchange rate = input / output
    }
    return null
  }

  const onSubmit = (data: IExchange) => {
    const rate = getExchangeRate(inputToken, outputToken)

    if (!rate) {
      showToast('Exchange rate not available.')
      return
    }

    const { inputAmount, outputAmount } = data

    if (inputAmount) {
      const calculatedOutputAmount = (parseFloat(inputAmount) * rate).toString()
      setValue('outputAmount', calculatedOutputAmount, { shouldValidate: true })
    } else if (!inputAmount && outputAmount) {
      const calculatedInputAmount = (parseFloat(outputAmount) / rate).toString()
      setValue('inputAmount', calculatedInputAmount, { shouldValidate: true })
    }
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={hideClose}
        key={'top_right'}
        autoHideDuration={6000}
      >
        <Box className='flex bg-[#E01839] rounded-[0.5rem] gap-[0.5rem] p-[0.875rem] shadow-lg'>
          <ErrorOutlineIcon className='text-white' />
          <Typography className='text-white' component='span'>
            {errorMessage}
          </Typography>
        </Box>
      </Snackbar>
      <Box className='flex flex-col flex-1 items-center justify-center p-4 w-2/4 max-w-7xl'>
        <Paper elevation={3} className='w-full w-2/3 p-6 rounded-lg shadow-lg'>
          <Typography variant='h5' gutterBottom align='center'>
            Swap
          </Typography>

          <Box component='form' onSubmit={handleSubmit(onSubmit)} className='w-full'>
            {/* Input Row */}
            <Box className='flex items-center mb-4 gap-4'>
              <FormControl variant='outlined' className='self-baseline w-32'>
                <InputLabel id='input-token-label'>Token</InputLabel>
                <Select
                  labelId='input-token-label'
                  label='Token'
                  value={inputToken}
                  onChange={(event: SelectChangeEvent) => {
                    setInputToken(event.target.value)
                  }}
                >
                  {listToken.map((token) => (
                    <MenuItem key={token} value={token}>
                      {token}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                {...register('inputAmount')}
                label='Amount to send'
                variant='outlined'
                fullWidth
                error={!!errors.inputAmount}
                helperText={errors.inputAmount?.message}
                slotProps={{
                  inputLabel: {
                    shrink: true
                  },
                  htmlInput: { maxLength: 12 }
                }}
              />
            </Box>

            {/* Output Row */}
            <Box className='flex items-center mb-4 gap-4'>
              <FormControl variant='outlined' className='self-baseline w-32'>
                <InputLabel id='output-token-label'>Token</InputLabel>
                <Select
                  labelId='output-token-label'
                  label='Token'
                  value={outputToken}
                  onChange={(event: SelectChangeEvent) => {
                    setOutputToken(event.target.value)
                  }}
                >
                  {listToken.map((token) => (
                    <MenuItem key={token} value={token}>
                      {token}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                {...register('outputAmount')}
                label='Amount to receive'
                variant='outlined'
                fullWidth
                error={!!errors.outputAmount}
                helperText={errors.outputAmount?.message}
                slotProps={{
                  inputLabel: {
                    shrink: true
                  },
                  htmlInput: { maxLength: 12 }
                }}
              />
            </Box>
            <Box className='flex w-full justify-end'>
              <Button type='submit' variant='contained' color='primary'>
                CONFIRM SWAP
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  )
}

export default Problem2Component
