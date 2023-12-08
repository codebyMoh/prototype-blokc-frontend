// Use 'import type' for types-only imports
import { useState, type ReactNode } from "react"
import type { FC } from "react"

import Footer from "../Footer"
import Navbar from "../Navbar"
import Wallet from "../Wallet"

interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [lodingsome, setLodingsome] = useState<boolean>(true)
  return (
    <>
      <div className="mt-0 md:mx-10 lg:mx-auto">
        <div className="mx-auto flex flex-col">
          <div className="mb-0 w-[100%] justify-between p-0 md:p-2">
            <Navbar />
          </div>
          <hr className=" my-3 hidden md:block" />
          <div className="flex w-[100%] flex-col justify-between rounded-b-3xl bg-blue-700 md:rounded-2xl lg:h-[30%]">
            <Wallet setLodingsome={setLodingsome} lodingsome={lodingsome} />
          </div>
          <div className="h-[62%] w-[100%] justify-between">{children}</div>
          <div className="fixed bottom-0 flex w-full justify-center rounded-t-3xl bg-white md:hidden">
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
