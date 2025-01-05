I copied the code block of Problem 3: Messy React into file origin-version.tsx

There are several issues with this code block
- line 12: There's no need to define an additional `Props` interface if you're only extending `BoxProps`.
- line 13: `children` is destructured from props without using it
- line 19: function `getPriority`, according to usage of switch condition, type of `blockchain` should be string to avoid type any
- in line 39: 
  - `blockchain` does not exist in interface `WalletBalance`
  - `balancePriority` is declared but in line 40 is comparision with unknown variable `lhsPriority`
- sort function in line 47 should be optimize
- line 56 dependency on `prices` in useMemo is redundant
- line 58 map `sortedBalances` for nothing, if we want to map formatted, we should move it to `sortedBalances` with useMemo to memoize 
- line 70: using index as the key here is an anti-pattern, especially for lists where order may change

----
To improve readability, maintainability, and type safety while retaining the original functionality, I have these improvements:
1. Interface Enhancements:
- Added the `blockchain` property to the `WalletBalance` interface.
- Changed `FormattedWalletBalance` to extend `WalletBalance`, including `formatted` and `priority` properties.
- Defined a new `IPrice` interface to explicitly type the prices object.
2. Type Improvements:
- Updated `useWalletBalances` and `usePrices` hooks to return strongly typed data (`WalletBalance[]` and `IPrice`).
- Replaced `any` type for `blockchain` in the `getPriority` function with `string`.
3. Logic Optimization:
- Combined map and filter operations:
  - Merged the logic for adding `formatted` and `priority` directly into the map step of `sortedBalances`.
  - In the original code, balances were first filtered and then mapped for formatting.
  - In the refactored code, a single map operation handles both formatting and assigning priority. Then filter to excludes balances with condition `priority > -99 && amount <= 0`.
4. Sorting Simplification:
- Simplified the sort logic:
  - Original code used multiple conditional checks in sort.
  - Refactored code simplifies sorting with `rhs.priority - lhs.priority`.
5. Clean code:
- Removed unnecessary code and variables
- Replaced index as a key in the rows mapping with `balance.currency`.
6. Enhanced the type safety of the WalletPage component:
- Removed the interface `Props` extends `BoxProps` and are using `BoxProps` directly.
- Ensured all functions and variables are typed correctly.
