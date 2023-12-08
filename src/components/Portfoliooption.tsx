/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import Image, { type StaticImageData } from "next/image"
import React, { useContext, useEffect, useState } from "react"
import { HiOutlineChevronDown } from "react-icons/hi"
import portfolioswap from "../../public/icon/portfolio_swap.svg"
import {
  type StrategyItem,
  WalletContext,
  type WalletContextType,
} from "./WalletContext"

const Portfolioselect: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [selectedOption, setSelectedOption] = useState<any | undefined | []>([])
  const contextData = useContext(WalletContext) as WalletContextType
  const [portfolio, setPortfolio] = useState<StrategyItem | undefined>(
    undefined,
  )
  const [showSelectMessage,setShowSelectMessage] = useState(false)
  //console.log("portfolio", portfolio)
  //console.log("selectedOption", selectedOption)

  useEffect(() => {
    const strategy = contextData?.strategy
    setPortfolio(strategy)
    //console.log("strategy---?", strategy)
  }, [contextData.strategy])

  const toggleOptions = () => {
    setIsOpen(!isOpen)
    setShowSelectMessage(false)
  }

  const selectOption = (option: any) => {
    setSelectedOption([option])
    setIsOpen(false)
  }

  return (
    <div className="relative">
      {portfolio ? (
        <>
          <div
            className="relative flex cursor-pointer items-center justify-between  px-2  py-3"
            onClick={toggleOptions}
          >
            <div className="">
              {selectedOption && selectedOption.length > 0 ? (
                selectedOption.map(
                  (
                    e: (
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | React.PromiseLikeOfReactNode
                      | null
                      | undefined
                    )[],
                    index: React.Key | null | undefined,
                  ) => (
                    <div
                      className="flex cursor-pointer items-center"
                      key={index}
                    >
                      <Image
                        src={portfolioswap as StaticImageData}
                        alt="logo"
                        className="mr-2 h-6 w-6"
                      />
                      <span>{e[2]}</span>
                    </div>
                  ),
                )
              ) : (
                <div className="cursor-pointer">
                  {showSelectMessage
                    ? "Please select an option"
                    : "Select option"}
                </div>
              )}
            </div>
            <div>
              <HiOutlineChevronDown size={18} />
            </div>
          </div>
          <div className="">
            {isOpen && (
              <div className="absolute top-10 z-10 mt-3 w-full rounded-md">
                <ul className="space-y-3 rounded-md border border-gray-300 bg-[#f8f8f8] p-2">
                  {portfolio.map(
                    (
                      option: (
                        | string
                        | number
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | React.PromiseLikeOfReactNode
                        | null
                        | undefined
                      )[],
                      index: React.Key | null | undefined,
                    ) => (
                      <li
                        key={index}
                        className="flex cursor-pointer items-center rounded-md p-1 hover:bg-[#eeeeee]"
                        onClick={() => selectOption(option)}
                      >
                        <Image
                          src={portfolioswap as StaticImageData}
                          alt="logo"
                          className="mr-2 h-6 w-6"
                        />
                        <span>{option[2]} xccc</span> 
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}
          </div>
        </>
      ) : null}
    </div>
  )
}

export default Portfolioselect
