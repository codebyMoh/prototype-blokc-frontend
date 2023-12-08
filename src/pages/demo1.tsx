/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import { FcPlus } from "react-icons/fc"
import {
  MdArrowBack,
  MdDelete,
  MdOutlineAddCircleOutline,
} from "react-icons/md"
import { ClipLoader } from "react-spinners"
import { ToastContainer, toast } from "react-toastify"
import { encodeFunctionData } from "viem"

import abi from "../contract/blokc.json"
import { useWeb3AuthSigner } from "~/context/web3-auth-signer"

// Define types for your input values
interface Demo1Props {
  setDemoOpen: (open: boolean) => void
}

type TokenAddress = string
type Percentage = number

interface Portfolio {
  name: string
  minInvestment: number
  maxInvestment: number
  tokens: TokenAddress[]
  percentages: Percentage[]
}

interface TokenData {
  [x: string]: string
  address: string
  symbol: string
}

const Demo1: React.FC<Demo1Props> = ({ setDemoOpen }) => {
  // const modalRef = React.useRef<HTMLDivElement | null>(null)
  const [selectApiData, setSelectApiData] = useState<TokenData[]>([])
  //console.log("🚀 ~ selectApiData:", selectApiData)
  const { sessionKeyProvider } = useWeb3AuthSigner()

  const [loading, setLoading] = useState(false)
  const [portfolio, setPortfolio] = useState<Portfolio>({
    name: "",
    minInvestment: 0,
    maxInvestment: 0,
    tokens: [""],
    percentages: [0, 0, 0], // Initialize with the correct number of items
  })
  //console.log(portfolio, "<------------")

  const close = () => {
    setDemoOpen(false)
  }

  const addTokenInput = () => {
    setPortfolio((prevPortfolio) => ({
      ...prevPortfolio,
      tokens: [...prevPortfolio.tokens, ""],
      percentages: [...prevPortfolio.percentages, 0],
    }))
  }

  const removeTokenInput = (index: number) => {
    setPortfolio((prevPortfolio) => {
      const updatedTokens = [...prevPortfolio.tokens]
      updatedTokens.splice(index, 1)
      const updatedPercentages = [...prevPortfolio.percentages]
      updatedPercentages.splice(index, 1)

      return {
        ...prevPortfolio,
        tokens: updatedTokens,
        percentages: updatedPercentages,
      }
    })
  }

  const handleTokenChange = (index: number, value: string) => {
    setPortfolio((prevPortfolio) => {
      const updatedTokens = [...prevPortfolio.tokens]
      updatedTokens[index] = value

      return {
        ...prevPortfolio,
        tokens: updatedTokens,
      }
    })
  }

  const newcreatestrategy = async () => {
    setLoading(true)
    const contractAddress = "0xc1b1d35BCb4145939E0b51663A9CdCb05EE1777A"
    const { name, minInvestment, maxInvestment, tokens, percentages } =
      portfolio
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const { hash } = await sessionKeyProvider.sendUserOperation({
        target: contractAddress,
        data: encodeFunctionData({
          abi: abi,
          functionName: "createStrategy",
          args: [minInvestment, maxInvestment, name, tokens, percentages],
        }),
        gasLimit: 3000,
      })
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      const thash = await sessionKeyProvider.waitForUserOperationTransaction(
        hash,
      )

      console.log("hash newcreatestrategy-->", thash)
      toast.success("successfully Created")
      setTimeout(() => {
        setDemoOpen(false)
      }, 4000)
    } catch (error) {
      toast.error("Something Want Wrong ")
      console.error("ERRROR", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchData = async () => {
    const apiData = await axios.get(
      "https://tokens.coingecko.com/uniswap/all.json",
    )
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const data = apiData?.data?.tokens

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setSelectApiData(data)
    //console.log("🚀 ~ fetchData ~ apiData:", data)
  }
  useEffect(() => {
    void fetchData()
  }, [])

  const modalRef = useRef<HTMLDivElement | null>(null)
  const closePopup = (abc: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    if (modalRef.current && !modalRef.current.contains(abc.target)) {
      setDemoOpen(false)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePercentageChange = (index: any, newValue: any) => {
    // Copy the current state of the percentages
    const newPercentages = [...portfolio.percentages]
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    newPercentages[index] = newValue
    // Calculate the sum of percentages
    const totalPercentage = newPercentages.reduce(
      (acc, value) => acc + value,
      0,
    )

    // Check if the total percentage is greater than 100
    if (totalPercentage > 100) {
      // You can display an error message or disable further input here
      console.log("Total percentage exceeds 100")
    } else {
      // Update the state with the new percentages
      setPortfolio({
        ...portfolio,
        percentages: newPercentages,
      })
    }
  }

  const [searchTerm, setSearchTerm] = useState("")
  const filteredOptions = selectApiData.filter((e) =>
    e.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const [selectedValue, setSelectedValue] = useState("")
  const [searchText, setSearchText] = useState("")
  const [isListVisible, setIsListVisible] = useState(false)

  const handleSearchChange = (e: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setSearchText(e.target.value)

    
  }

  const handleOptionClick = (value: string) => {
    setSelectedValue(value)
    setIsListVisible(false)
    handleTokenChange(0, value)
  }

  const filteredData = selectApiData.filter((e) =>
    e.symbol.toLowerCase().includes(searchText.toLowerCase()),
  )

  return (
    <>
      <div
        className="absolute inset-0 right-0 z-50 flex w-full items-end justify-center bg-black bg-opacity-30 md:items-center"
        onClick={closePopup}
      >
        <div className="w-full rounded-3xl border-2 bg-white md:w-96 lg:w-96">
          <div className="space-y-5 p-6" ref={modalRef}>
            <div
              className="flex cursor-pointer items-center gap-2 text-center"
              onClick={close}
            >
              <div className="flex items-center justify-center rounded-full bg-[#1D39DD] p-1 text-white">
                <MdArrowBack />
              </div>
              <p>Back</p>
            </div>
            <div className="flex items-center gap-2 text-center">
              <MdOutlineAddCircleOutline size={20} />
              <p>Add New Portfolio</p>
            </div>
            <div className="">
              <label htmlFor="gardenName" className="my-2 block">
                Portfolio Name:
              </label>
              <input
                type="text"
                id="portfolioName"
                name="portfolioName"
                className="mb-2 h-[40px] w-full rounded-[6px] bg-[#F2F2F2] px-2 outline-none"
                value={portfolio.name}
                onChange={(e) =>
                  setPortfolio({
                    ...portfolio,
                    name: e.target.value,
                  })
                }
              />

              <label htmlFor="usdtDeposit" className="my-2 block">
                Minimum Invest Required:
              </label>

              <input
                type="number"
                id="minInvest"
                name="minInvest"
                className="mb-2 h-[40px] w-full rounded-[6px] bg-[#F2F2F2] px-2 outline-none"
                value={
                  portfolio.minInvestment === 0 ? "" : portfolio.minInvestment
                }
                onChange={(e) =>
                  setPortfolio({
                    ...portfolio,
                    minInvestment:
                      e.target.value === ""
                        ? 0
                        : parseFloat(e.target.value) || 0,
                  })
                }
              />

              <label htmlFor="maxInvest" className="my-2 block">
                Maximum Invest Required:
              </label>
              <input
                type="number"
                id="maxInvest"
                name="maxInvest"
                className="mb-2 h-[40px] w-full rounded-[6px] bg-[#F2F2F2] px-2 outline-none"
                value={
                  portfolio.maxInvestment === 0 ? "" : portfolio.maxInvestment
                }
                onChange={(e) =>
                  setPortfolio({
                    ...portfolio,
                    maxInvestment:
                      e.target.value === ""
                        ? 0
                        : parseFloat(e.target.value) || 0,
                  })
                }
              />

              <div className="flex w-full items-center gap-2">
                <div className="w-full">
                  <label htmlFor="selectedToken" className="my-2 block">
                    Token (Address)
                  </label>

                  <div className="relative ">
                    <input
                      type="text"
                      value={selectedValue}
                      onClick={() => setIsListVisible(!isListVisible)}
                      placeholder="Select Token"
                      className="mb-2 h-[40px] w-full rounded-[6px] bg-[#F2F2F2] px-2 outline-none"
                    />

                    {isListVisible && (
                      <>
                        <div className="absolute z-10 mt-2 w-[330px] rounded border border-gray-300 bg-white p-2 shadow">
                          <input
                            type="text"
                            value={searchText}
                            onChange={handleSearchChange}
                            placeholder="Search Token"
                            className="mb-2 h-[40px] w-full rounded-[6px] bg-[#F2F2F2] px-2 outline-none"
                          />

                          <div className="max-h-[200px] overflow-y-auto">
                            {Array.isArray(filteredData)
                              ? filteredData.map((e, index) => (
                                  <div
                                    key={`tokenOption-${index}`}
                                    onClick={() =>
                                      e && e.name && handleOptionClick(e.name)
                                    }
                                    className="cursor-pointer px-2 py-1 hover:bg-gray-200"
                                  >
                                    {e && e.symbol}
                                  </div>
                                ))
                              : null}
                          </div>
                        </div>

                        {/* <div className="absolute  z-10 mt-2 w-full rounded border border-gray-300 bg-white p-2 shadow md:w-[330px] " >
                          <input
                            type="text"
                            value={searchText}
                            onChange={handleSearchChange}
                            placeholder="Search Token"
                            className="mb-2 h-[40px] w-full rounded-[6px] bg-[#F2F2F2] px-2 outline-none"
                          />

                          <div className="max-h-[200px] overflow-y-auto">
                            {Array.isArray(filteredData)
                              ? filteredData.map((e, index) => (
                                  <div
                                    key={`tokenOption-${index}`}
                                    onClick={() =>
                                      e && e.name && handleOptionClick(e.name)
                                    }
                                    className="cursor-pointer px-2 py-1 hover:bg-gray-200"
                                  >
                                    {e && e.symbol}
                                  </div>
                                ))
                              : null}
                          </div>
                        </div> */}
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="percentage" className="my-2 block">
                    Percentage
                  </label>
                  <input
                    type="number"
                    id="percentage"
                    name="percentage"
                    className="mb-2 h-[40px] w-24 rounded-[6px] bg-[#F2F2F2] px-2 outline-none"
                    value={portfolio.percentages[0] || ""}
                    onChange={(e) =>
                      handlePercentageChange(0, parseFloat(e.target.value) || 0)
                    }
                  />
                </div>
                <div className="cursor-pointer pt-8">
                  <FcPlus size={23} onClick={addTokenInput} />
                </div>
              </div>
              {portfolio.tokens.slice(1).map((token, index) => (
                <div className="flex items-center gap-2" key={index}>
                  <select
                    name="selectedToken"
                    id="selectedToken"
                    className="mb-2 h-[40px] w-full rounded-[6px] bg-[#F2F2F2] px-2 outline-none"
                    onChange={(e) =>
                      handleTokenChange(index + 1, e.target.value)
                    }
                  >
                    <option value="">Select Token </option>
                    {selectApiData?.map((e, ind) => (
                      <option key={ind} value={e?.address}>
                        <option>{e?.symbol}</option>
                      </option>
                    ))}
                  </select>
                  <div>
                    <input
                      type="number"
                      id={`percentage${index}`}
                      name={`percentage${index}`}
                      className="mb-2 h-[40px] w-24 rounded-[6px] bg-[#F2F2F2] px-2 outline-none"
                      value={portfolio.percentages[index + 1] || ""}
                      onChange={(e) =>
                        handlePercentageChange(
                          index + 1,
                          parseFloat(e.target.value) || 0,
                        )
                      }
                    />
                  </div>

                  <MdDelete
                    size={38}
                    onClick={() => removeTokenInput(index + 1)}
                    className="cursor-pointer"
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center">
              <button
                className="flex w-full items-center justify-center rounded-[6px] bg-[#1d3add] py-2 text-lg text-white"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={() => newcreatestrategy()}
              >
                {loading ? <ClipLoader color="#ffff" size={28} /> : "Add  "}
                <ToastContainer />
              </button>
            </div>
          </div>
          <div className="fixed inset-0 -z-40 bg-black opacity-30"></div>
        </div>
      </div>
    </>
  )
}

export default Demo1
