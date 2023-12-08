/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { SafeEventEmitterProvider } from "@web3auth/base"
import React, { useContext, useRef, useState } from "react"
import { MdArrowBack, MdOutlineAddCircleOutline } from "react-icons/md"
import { ClipLoader } from "react-spinners"
import { ToastContainer, toast } from "react-toastify"
import { encodeFunctionData } from "viem"

import abi from "../contract/blokc.json"
import { WalletContext, type WalletContextType } from "./WalletContext"
import { useWeb3AuthSigner } from "~/context/web3-auth-signer"

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */ 0

interface AddProps {
  setOpengarden: React.Dispatch<
    React.SetStateAction<SafeEventEmitterProvider | undefined | boolean>
  >
}

const Addgarden: React.FC<AddProps> = ({ setOpengarden }) => {
  const contextData = useContext(WalletContext) as WalletContextType
  const allgardener = contextData?.allgardener
  const [gardenname, setGardenname] = useState<string>("")
  const [amount, setAmount] = useState<number | undefined>(undefined)
  const [selectgardener, setSelectgardener] = useState<number | undefined>(
    undefined,
  )
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [filteredData, setFilteredData] = useState<any>(allgardener)

  //console.log("selectgardener--->", selectgardener)

  const [loading, setLoading] = useState(false)
  const { sessionKeyProvider } = useWeb3AuthSigner()

  const close = () => {
    setOpengarden(false)
  }

  const newgarden = async () => {
    setLoading(true)
    const contractAddress = "0xc1b1d35BCb4145939E0b51663A9CdCb05EE1777A"
    const Gardenname = gardenname
    const gaamount = amount
    const selectg = selectgardener
    console.log(typeof Gardenname)
    console.log("Gardenname:", Gardenname)
    console.log(typeof gaamount)
    console.log("gaamount:", gaamount)
    console.log(typeof selectg)
    console.log("selectg:", selectg)

    if (selectg !== undefined && gaamount !== undefined && Gardenname !== "") {
      const { hash } = await sessionKeyProvider.sendUserOperation({
        target: contractAddress,
        data: encodeFunctionData({
          abi: abi,
          functionName: "createGarden",
          args: [selectg, gaamount, Gardenname],
        }),
      })

      const thash = await sessionKeyProvider.waitForUserOperationTransaction(
        hash,
      )
      if (thash) {
        console.log("hash create garden -->", thash)
        toast.success("successfully Created")
        setTimeout(() => {
          setOpengarden(false)
        }, 4000)
      } else {
        console.error("sessionKeyProvider or hash is undefined")
      }
    } else {
      console.error("One or more of the variables is undefined.")
    }
    setLoading(false)
  }

  const modalRef = useRef<HTMLDivElement | null>(null)
  const closePopup = (abc: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(abc.target as Node)) {
      setOpengarden(false)
    }
  }

  const [isListVisible, setIsListVisible] = useState(false)
  const [selectedValue, setSelectedValue] = useState("")
  console.log("selectedValue------->", selectedValue)

  const [searchText, setSearchText] = useState("")
  const handleOptionClick = (value: string, index: number) => {
    console.log("value------->", value)
    setSelectedValue(value)
    setIsListVisible(false)
    setSelectgardener(index)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    setSearchText(text)
    filterData(text)
  }

  const filterData = (text: string) => {
    const filtered =
      Array.isArray(allgardener) &&
      allgardener.filter((item) =>
        item[1].toLowerCase().includes(text.toLowerCase()),
      )
    setFilteredData(filtered)
  }

  return (
    <div
      className="absolute inset-0 right-0 z-50 flex w-full items-end justify-center md:items-center  "
      onClick={closePopup}
    >
      <div className="w-full rounded-3xl border-2 bg-white md:w-96 lg:w-96">
        <div className="space-y-5 p-6" ref={modalRef}>
          <div
            className="flex cursor-pointer items-center gap-2 text-center"
            onClick={() => {
              close()
            }}
          >
            <div className="flex items-center justify-center rounded-full bg-[#1D39DD] p-1 text-white ">
              <MdArrowBack />
            </div>

            <p>Back</p>
          </div>
          <div className="flex place-items-center gap-2 text-center">
            <MdOutlineAddCircleOutline size={20} />
            <p className=""> Add New Garden </p>
          </div>
          <div className="">
            <label htmlFor="gardenName" className="my-2 block">
              Garden Name
            </label>
            <input
              type="text"
              id="gardenName"
              name="gardenName"
              className="mb-2 h-[40px] w-full rounded-[6px] bg-[#F2F2F2] px-2 outline-none"
              value={gardenname}
              onChange={(e) => {
                setGardenname(e.target.value)
              }}
            />
            <label htmlFor="usdtDeposit" className="my-2 block">
              USDT to Deposit
            </label>

            <input
              type="number"
              id="usdtDeposit"
              name="usdtDeposit"
              className="mb-2 h-[40px] w-full rounded-[6px] bg-[#F2F2F2] px-2 outline-none"
              value={amount}
              onChange={(e) => {
                setAmount(parseInt(e.target.value))
              }}
            />

            <label htmlFor="gardener" className="my-2 block">
              Gardener
            </label>

            <div className="relative">
              <input
                type="text"
                value={selectedValue}
                onClick={() => setIsListVisible(!isListVisible)}
                placeholder="Select Gardener"
                className="mb-2 h-[40px] w-full rounded-[6px] bg-[#F2F2F2] px-2 outline-none"
              />

              {isListVisible && (
                <>
                  {/* <div className="absolute z-10 mt-2 w-[330px] rounded border border-gray-300 bg-white p-2 shadow">
                    <input
                      type="text"
                      value={searchText}
                      onChange={handleSearchChange}
                      placeholder="Search Gardener"
                      className="mb-2 h-[40px] w-full rounded-[6px] bg-[#F2F2F2] px-2 outline-none"
                    />

                    <div className="max-h-[200px] overflow-y-auto">
                      {Array.isArray(filteredData)
                        ? filteredData.map((e, index) => (
                            <div
                              key={`allGardeners-${index}`}
                              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                              onClick={() => handleOptionClick(e[1], index)}
                              className="cursor-pointer px-2 py-1 hover:bg-gray-200"
                            >
                              {e[1]}
                            </div>
                          ))
                        : null}
                    </div>

                  </div> */}
                  <div className="absolute z-10 mt-2 w-full rounded border border-gray-300 bg-white p-2 shadow sm:w-[330px]">
                    <input
                      type="text"
                      value={searchText}
                      onChange={handleSearchChange}
                      placeholder="Search Gardener"
                      className="mb-2 h-[40px] w-full rounded-[6px] bg-[#F2F2F2] px-2 outline-none"
                    />
                    <div className="max-h-[200px] overflow-y-auto">
                      {Array.isArray(filteredData)
                        ? filteredData.map((e, index) => (
                            <div
                              key={`allGardeners-${index}`}
                              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                              onClick={() => handleOptionClick(e[1], index)}
                              className="cursor-pointer px-2 py-1 hover:bg-gray-200"
                            >
                              {e[1]}
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              className="flex w-full items-center justify-center rounded-[6px] bg-[#1d3add] py-2 text-lg text-white"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={() => newgarden()}
            >
              {loading ? <ClipLoader color="#ffff" size={28} /> : "Add"}
              <ToastContainer />
            </button>
          </div>
        </div>
        <div className="fixed inset-0 -z-40 bg-black opacity-30"></div>
      </div>
    </div>
  )
}

export default Addgarden
