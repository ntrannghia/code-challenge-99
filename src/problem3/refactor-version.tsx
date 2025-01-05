interface WalletBalance {
  currency: string
  amount: number
  blockchain: string
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string
  priority: number
}

interface IPrice {
  [currency: string]: number
}

const WalletPage: React.FC<BoxProps> = (props: BoxProps) => {
  const { children, ...rest } = props
  const balances: WalletBalance[] = useWalletBalances()
  const prices: IPrice = usePrices()

  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100
      case 'Ethereum':
        return 50
      case 'Arbitrum':
        return 30
      case 'Zilliqa':
        return 20
      case 'Neo':
        return 20
      default:
        return -99
    }
  }

  const sortedBalances = useMemo(() => {
    return balances
      .map(
        (balance: WalletBalance) =>
          ({
            ...balance,
            priority: getPriority(balance.blockchain),
            formatted: balance.amount.toFixed()
          }) as FormattedWalletBalance
      )
      .filter(({ priority, amount }: FormattedWalletBalance) => priority > -99 && amount <= 0)
      .sort(
        ({ priority: leftPriority }: FormattedWalletBalance, { priority: rightPriority }: FormattedWalletBalance) =>
          leftPriority - rightPriority
      )
  }, [balances])

  const rows = sortedBalances.map((balance: FormattedWalletBalance) => {
    const usdValue = prices[balance.currency] * balance.amount
    return (
      <WalletRow
        className={classes.row}
        key={balance.currency}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return <div {...rest}>{rows}</div>
}
