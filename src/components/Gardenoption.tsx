// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import Image, { StaticImageData } from "next/image"
import React, { useContext, useEffect, useState } from "react"
import { HiOutlineChevronDown } from "react-icons/hi"

import Self_garden from "../../public/icon/Self_garden.svg"
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { StrategyItem, WalletContext, WalletContextType } from "./WalletContext"

interface Option {
  id: number
  name: string
  age: number
}

const Gardenselect: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<Option[]>([])
  const contextData = useContext(WalletContext) as WalletContextType
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [portfolio, setPortfolio] = useState<StrategyItem | undefined>(
    undefined,
  )
  const [showSelectMessage, setShowSelectMessage] = useState(false)

  useEffect(() => {
    const strategy = contextData?.strategy
    setPortfolio(strategy)
  }, [contextData.strategy])

  const toggleOptions = () => {
    setIsOpen(!isOpen)
    setShowSelectMessage(false)
  }

  const selectOption = (option: Option) => {
    setSelectedOption([option])
    setIsOpen(false)
  }

  const options: Option[] = [
    { id: 1, name: "Private Garden 1", age: 30 },
    // { id: 2, name: "Private Garden 2", age: 25 },
    // { id: 3, name: "Private Garden 3", age: 35 },
    // { id: 4, name: "Private Garden 4", age: 28 },
  ]

  return (
    <div className="relative">
      <>
        <div
          className="relative flex cursor-pointer items-center justify-between  px-2  py-3"
          onClick={toggleOptions}
        >
          <div className="">
            {selectedOption && selectedOption.length > 0 ? (
              selectedOption.map((option: Option, index: number) => (
                <div className="flex cursor-pointer items-center" key={index}>
                  <Image
                    src={Self_garden as StaticImageData}
                    alt="logo"
                    className="mr-2 h-6 w-6"
                  />
                  <span>{option.name} </span>
                </div>
              ))
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
            <>
              <div className="absolute top-10 z-10 mt-3 w-full rounded-md">
                <ul className="space-y-3 rounded-md border border-gray-300 bg-[#f8f8f8] p-2">
                  {options.map((option: Option, index: number) => (
                    <li
                      key={index}
                      className="flex cursor-pointer items-center rounded-md p-1 hover:bg-[#eeeeee]"
                      onClick={() => selectOption(option)}
                    >
                      <Image
                        src={Self_garden as StaticImageData}
                        alt="logo"
                        className="mr-2 h-6 w-6"
                      />
                      <span>{option.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </>
    </div>
  )
}

export default Gardenselect
