import { type SafeEventEmitterProvider } from "@web3auth/base"
import { type BigNumber } from "ethers"
import React, {
  createContext,
  useState,
  type ReactNode,
  type SetStateAction,
  type Key,
} from "react"

export interface Wallet1 {
  email: string
  name: string
  profileImage: string
  verifier: string
  verifierId: string
  typeOfLogin: string
  accessToken: string
  idToken: string
  state: {
    instanceId: string
    verifier: string
    typeOfLogin: string
    redirectToOpener: boolean
  }
  token_type: string
  expires_in: string
  scope: string
  authuser: string
  prompt: string
  version_info: string
}

export interface Gardener {
  toLowerCase(): string
  0: BigNumber
  1: string
  2: string
  3: [Array<[number, number]>, Array<[number, number]>, Array<[number, number]>]
  4: [Array<[number, number, number, number, number]>]
  gardenerAddress: string
  gardens: [
    Array<[number, number]>,
    Array<[number, number]>,
    Array<[number, number]>,
  ]
  id: BigNumber
  strategies: [Array<[number, number, number, number, number]>]
  username: string
}

export interface StrategyItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
  0: BigNumber
  1: BigNumber
  2: string
  3: [number, number][]
  4: number[]
  cryptos: string[]
  maxAmount: BigNumber
  minAmount: BigNumber
  percentages: number[]
  strategyName: string
}

export interface DataItem {
  decimals: SetStateAction<number | undefined>
  address: `0x${string}` | undefined
  id: Key | null | undefined
  name: string
  symbol: string
  logoURI: string
}

export interface WalletContextType {
  userinfo: Wallet1 | null
  setUserinfo: React.Dispatch<React.SetStateAction<Wallet1 | null>>
  setUser: (user: Wallet1 | null) => void
  rgardener?: boolean | undefined
  setRgardener: React.Dispatch<React.SetStateAction<boolean | undefined>>

  allgardener?: Gardener | undefined
  setAllgardener: React.Dispatch<React.SetStateAction<Gardener | undefined>>

  strategy?: StrategyItem | undefined
  setStrategy: React.Dispatch<React.SetStateAction<StrategyItem | undefined>>

  garden?: StrategyItem | undefined
  setGarden: React.Dispatch<React.SetStateAction<StrategyItem | undefined>>

  alltoken?: DataItem[]
  setAlltoken: React.Dispatch<React.SetStateAction<DataItem[]>>

  opengarden?: SafeEventEmitterProvider | undefined | boolean
  setOpengarden: React.Dispatch<
    React.SetStateAction<SafeEventEmitterProvider | undefined | boolean>
  >
}

interface WalletProviderProps {
  children: ReactNode
}
export const WalletContext = createContext<
  WalletContextType | Gardener | Wallet1 | DataItem[] | undefined
>(undefined)

export function WalletProvider({ children }: WalletProviderProps) {
  const [userinfo, setUserinfo] = useState<Wallet1 | null>(null)
  const [rgardener, setRgardener] = useState<boolean | undefined>(undefined)
  const [allgardener, setAllgardener] = useState<Gardener | undefined>(
    undefined,
  )
  const [opengarden, setOpengarden] = useState<
    SafeEventEmitterProvider | undefined | boolean
  >(undefined)
  // Add the setUser function to set the user data
  const setUser = (user: Wallet1 | null) => {
    setUserinfo(user)
  }

  const [strategy, setStrategy] = useState<StrategyItem | undefined>(undefined)
  const [garden, setGarden] = useState<StrategyItem | undefined>(undefined)
  const [alltoken, setAlltoken] = useState<DataItem[]>([])

  //console.log("alltoken", alltoken)

  return (
    <WalletContext.Provider
      value={{
        userinfo,
        setUserinfo,
        setUser,
        setRgardener,
        rgardener,
        allgardener,
        setAllgardener,
        setOpengarden,
        opengarden,
        strategy,
        setStrategy,
        garden,
        setGarden,
        alltoken,
        setAlltoken,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}
