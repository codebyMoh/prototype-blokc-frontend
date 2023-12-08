/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios"
import { log } from "console"
import Image from "next/image"
import React, { type Key, useEffect, useState } from "react"
import { CiSearch } from "react-icons/ci"
import { MdOutlineArrowBackIos } from "react-icons/md"
import { PulseLoader } from "react-spinners"

interface GetAllTokensProps {
  isCardOpen: boolean
  setIsCardOpen: (open: boolean) => void
  setSelectedName: (name: string) => void
  setSelectedName1: (name: string) => void
  setselectedDescription: (description: string) => void
  setselectedDescription1: (description: string) => void
  setSelectedLogo: (logo: string) => void
  setSelectedLogo1: (logo: string) => void
  setselectdecimalfrom: (decimal: number | undefined) => void
  setSelectFromaddress: (address: `0x${string}` | undefined) => void
  setselectdecimalto: (decimal: number | undefined) => void
  setSelectToaddress: (address: `0x${string}` | undefined) => void
  selectFromName: (name: string, logo: string, symbol: string) => void
  selectToName: (name: string, logo: string, symbol: string) => void
  toknselect: any
}
interface DataItem {
  address: `0x${string}` | undefined
  decimals: number | undefined
  id: Key | null | undefined
  name: string
  symbol: string
  logoURI: string
}
const GetAllTokens: React.FC<GetAllTokensProps> = ({
  isCardOpen,
  setIsCardOpen,
  setselectdecimalto,
  setSelectToaddress,
  setselectdecimalfrom,
  setSelectFromaddress,
  selectFromName,
  toknselect,
  selectToName,
  setSelectedName1,
  setselectedDescription1,
  setSelectedLogo1,
  setSelectedName,
  setselectedDescription,
  setSelectedLogo,
}) => {
  //
  const [originalData, setOriginalData] = useState<DataItem[]>([])
  console.log("toknselect---?", toknselect)

  const [searchInput, setSearchInput] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [filteredData, setFilteredData] = useState<DataItem[]>([])
  const [displayedData, setDisplayedData] = useState<DataItem[]>([])
  const [tokenizedData, setTokenizedData] = useState<string[]>([])

  useEffect(() => {
    const fetchDataAndCache = async () => {
      try {
        const response = await axios.get(
          "https://tokens.coingecko.com/uniswap/all.json",
        )
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
        const data = response?.data?.tokens
        //console.log("🚀 ~ fetchDataAndCache ~ data:", data)

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setOriginalData(data)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setFilteredData(data)

        const cache = await caches.open("my-cache")
        void cache.put("/api/data", new Response(JSON.stringify(data)))

        setLoading(false)
      } catch (error) {
        console.error("Error fetching and caching data:", error)
        setLoading(false)
      }
    }

    // if (isCardOpen) {
    void fetchDataAndCache()
    // }
  }, [isCardOpen])

  useEffect(() => {
    if (filteredData) {
      setDisplayedData(filteredData)
    }
  }, [filteredData])
  // 🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢 untill loading data not comes

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setSearchInput(inputValue)

    const filtered = originalData.filter(
      (item) =>
        item?.name?.toLowerCase().includes(inputValue.toLowerCase()) ||
        item?.symbol?.toLowerCase().includes(inputValue.toLowerCase()),
    )

    setFilteredData(inputValue ? filtered : originalData)
  }

  const closeCard = () => {
    setIsCardOpen(false)
  }
  // const selectFromName = (name: string, description: string, logo: string) => {
  //   setSelectedName(name)
  //   setselectedDescription(description)
  //   setSelectedLogo(logo)
  //   setIsCardOpen(false)
  // }

  // console.log("filteredData", filteredData)

  const searchData = displayedData?.filter((item) => {
    const walletAddress = item?.symbol
    const userId = item?.name
    if (walletAddress == "USDT") {
      return userId
    } else if (walletAddress === "MATIC") {
      return userId
    } else if (walletAddress === "AVAX") {
      return userId
    } else if (walletAddress === "SETH") {
      return userId
    }
  })
  // console.log("searchData------->", searchData)

  const selecttokens = (e: DataItem) => {
    if (toknselect === 0) {
      setSelectedLogo(e.logoURI)
      setselectedDescription(e.symbol)
      setSelectedName(e.name)
      setselectdecimalfrom(e.decimals)
      setSelectFromaddress(e.address)
      setIsCardOpen(false)
    } else if (toknselect === 1) {
      setSelectedLogo1(e.logoURI)
      setselectedDescription1(e.symbol)
      setSelectedName1(e.name)
      setSelectToaddress(e.address)
      setselectdecimalto(e.decimals)
      setIsCardOpen(false)
    } else {
      console.log("somethng wrong")
    }
  }
  return (
    <>
      <div
        className="fixed rounded-3xl shadow-2xl"
        style={{
          position: "absolute",
          top: "50%",
          left: " 50%",
          transform: " translate(-50%, -50%)",
        }}
      >
        <div className="rounded-xl border-black bg-white px-7 py-5 shadow-2xl ">
          <div>
            <div className="relative  ">
              <div className="flex items-center justify-center pb-3">
                <h1 className="text-xl">Select a Token </h1>
              </div>
              <div
                className="absolute top-1  cursor-pointer"
                onClick={closeCard}
              >
                <MdOutlineArrowBackIos />
              </div>
            </div>
            {/* Search bar */}
            <div className="relative ">
              <div className="absolute inset-y-0 left-0 flex items-center pl-1 text-[#8899FA] sm:pl-3">
                <CiSearch size={20} />
              </div>
              <input
                type="text"
                className="2xs:py-1 w-full rounded-lg border border-[#1D39DD] bg-[#EFEFEF] pl-10 text-lg  outline-none  sm:py-2 sm:text-base"
                placeholder="Search..."
                value={searchInput}
                onChange={handleSearchInputChange}
              />
            </div> 
            <div className="">
              <div className="mt-2 grid grid-cols-2 space-x-2 space-y-2 md:grid-cols-4 md:space-y-0 ">
                {searchData?.map((item) => (
                  <>
                    <button
                      className="flex items-center justify-center  gap-3 rounded border border-[#E8E8E8] px-2 py-1 "
                      onClick={() => selecttokens(item)}
                    >
                      <Image
                        src={item.logoURI}
                        height={25}
                        width={25}
                        alt="ETH"
                      />
                      <span className="text-sm">{item.symbol} </span>
                    </button>
                  </>
                ))}
              </div>
            </div>

            <div className="h-[330px] w-full items-center overflow-y-scroll p-2 py-4 md:h-64 lg:h-[455px]">
              {/* Display filtered data */}
              {loading ? (
                <div className="w-full text-center ">
                  <PulseLoader color="#368ed6" />
                </div>
              ) : (
                displayedData?.map((e, ind) => (
                  <>
                    <div
                      className="my-3 flex cursor-pointer place-items-center  rounded-lg p-2"
                      onClick={() => selecttokens(e)}
                      key={ind}
                    >
                      <div className="flex gap-2 text-sm">
                        <Image
                          src={e?.logoURI}
                          alt={e?.name}
                          height={38}
                          width={38}
                          className="rounded-full"
                        />
                        <div>
                          <div>{e.symbol}</div>
                          <div className="text-xs text-[#717171]">{e.name}</div>
                        </div>
                      </div>
                    </div>
                  </>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GetAllTokens
