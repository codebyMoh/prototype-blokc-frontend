import Image, { type StaticImageData } from "next/image"
import { useContext, useEffect, useState } from "react"
import { GrFormAdd } from "react-icons/gr"
import { VscSettings } from "react-icons/vsc"

import Gardens1 from "../../../public/icon/Gardens1.png"
import Portfolio1 from "../../../public/icon/Portfolio.svg"
import Addgarden from "../Add-Garden"
import Portfolio from "../Portfolio"
import Private from "../Private"
import { WalletContext, type WalletContextType } from "../WalletContext"

const Page = () => {
  const [Token, setToken] = useState<"Investor" | "Manager" | null>(null)
  const [activeButton, setActiveButton] = useState<number>(2)
  const [garden, setGarden] = useState<boolean>(false)
  const [portfolio, setPortfolio] = useState<boolean>(true)
  const contextData = useContext(WalletContext) as WalletContextType
  const opengarden = contextData?.opengarden
  const setOpengarden = contextData?.setOpengarden
  useEffect(() => {
    // Check if localStorage is available (only in the browser)
    if (typeof localStorage !== "undefined") {
      const userRole = localStorage.getItem("userRole")
      setToken(userRole as "Investor" | "Manager" | null)
    }
  }, [])

  // const Portpop = () => {
  //   setPortpop(true)
  // }

  const handleButtonClick = (param: number) => {
    if (param === 1) {
      setActiveButton(1)
      setGarden(true)
      setPortfolio(false)
    } else if (param === 2) {
      setActiveButton(2)
      setPortfolio(true)
      setGarden(false)
    }
  }

  return (
    <>
      <div className="mx-auto w-[90%] md:w-full ">
        <div className="block md:hidden ">
          {Token === "Manager" && (
            <div className="flex items-center justify-center py-2">
              <div className=" rounded-lg   bg-[#F1F1F1]">
                <button
                  className={`rounded-lg px-5 py-1 hover:bg-[#1D39DD] hover:text-white ${
                    activeButton === 1
                      ? ` rounded-lg bg-[#1D39DD] text-white`
                      : ""
                  } `}
                  onClick={() => handleButtonClick(1)}
                >
                  Garden
                </button>
                <button
                  className={`rounded-lg px-5 py-1 hover:bg-[#1D39DD] hover:text-white ${
                    activeButton === 2
                      ? ` rounded-lg bg-[#1D39DD] text-white`
                      : ""
                  } `}
                  onClick={() => handleButtonClick(2)}
                >
                  Portfolio
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="flex w-full items-center justify-between py-5 ">
          <div className="flex items-center justify-center gap-2">
            {Token === "Investor" ? (
              <>
                <Image src={Gardens1} alt="logo" height="25" width="25" />
                <p>Garden </p>
              </>
            ) : (
              <>
                <Image
                  src={Portfolio1 as StaticImageData}
                  alt="logo"
                  height="25"
                  width="25"
                />
                <p>Portfolio </p>
              </>
            )}
            <div className="rotate-90 cursor-pointer">
              <VscSettings size={20} />
            </div>
            <div
              onClick={() => setOpengarden(true)}
              className="cursor-pointer rounded-full border-2 border-[#1D39DD] bg-transparent text-[#1D39DD] "
            >
              <GrFormAdd size={20} />
            </div>
          </div>
          <div className="hidden md:block">
            {Token === "Manager" && (
              <div className="flex rounded-lg  bg-[#F1F1F1]">
                <button
                  className={`rounded-lg px-5 py-1 hover:bg-[#1D39DD] hover:text-white ${
                    activeButton === 1
                      ? ` rounded-lg bg-[#1D39DD] text-white`
                      : ""
                  } `}
                  onClick={() => handleButtonClick(1)}
                >
                  Garden
                </button>

                <button
                  className={`rounded-lg px-5 py-1 hover:bg-[#1D39DD] hover:text-white ${
                    activeButton === 2
                      ? ` rounded-lg bg-[#1D39DD] text-white`
                      : ""
                  } `}
                  onClick={() => handleButtonClick(2)}
                >
                  Portfolio
                </button>
              </div>
            )}
          </div>
          <div>
            <p className="text-[15px] text-[#12C802]">$0.9936 </p>
            <p className="text-[10px] text-[#C80202]">-8.64%</p>
          </div>
        </div>
      </div>

      <hr className="border-[#667CFF]" />

      {opengarden && <Addgarden setOpengarden={setOpengarden} />}

      {garden && (
        <>
          <Private />
        </>
      )}

      {portfolio && Token === "Manager" && (
        <>
          <Portfolio />
        </>
      )}

      {Token === "Investor" && (
        <>
          <Private />
        </>
      )}
    </>
  )
}

export default Page
