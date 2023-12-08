/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/restrict-plus-operands */

/* eslint-disable @typescript-eslint/no-unsafe-call */
import Image, { type StaticImageData } from "next/image"
import React, { useState, useContext, useEffect } from "react"
import { GrAdd } from "react-icons/gr"
import { MdArrowBack } from "react-icons/md"

import AddGarden from "../../public/icon/AddGarden.svg"
import Self_garden from "../../public/icon/Self_garden.svg"
import {
  type StrategyItem,
  WalletContext,
  type WalletContextType,
} from "~/components/WalletContext"
import Demo1 from "~/pages/demo1"

type MyItem = number[]
const Private: React.FC = () => {
  const [assignedOpen, setAssignedOpen] = useState<boolean>(false)
  const [assignedOpen1, setAssignedOpen1] = useState<
    number | boolean | string[] | []
  >([])
  const [showImage, setShowImage] = useState<boolean>(true)
  const [demoOpen, setDemoOpen] = useState<boolean>(false)
  const [newstrategy, setNewstrategy] = useState<StrategyItem | undefined>(
    undefined,
  )

  //const [filterAddress, setFilterAddress] = useState("")
  const contextData = useContext(WalletContext) as WalletContextType
  const alltoken = contextData?.alltoken
  //console.log(alltoken)

  useEffect(() => {
    const strategy = contextData?.strategy
    setNewstrategy(strategy)
    //console.log("strategy---?", strategy)
  }, [contextData.strategy])

  const close = () => {
    setAssignedOpen(false)
    setShowImage(true)
  }
  function calculateSum(arr: MyItem, index = 0, sum = 0): number {
    if (index >= arr.length) {
      return sum
    }

    const valueToAdd = arr[index] || 0 // Ensure a default of 0 if the value is undefined
    return calculateSum(arr, index + 1, sum + valueToAdd)
  }

  return (
    <>
      {demoOpen && <Demo1 setDemoOpen={setDemoOpen} />}

      <div className=" h-[400px] w-full overflow-y-scroll p-2 py-4 md:h-[435px] ">
        {assignedOpen && (
          <>
            <div className="flex  items-center gap-2 py-2 text-center ">
              <div className=" flex cursor-pointer items-center justify-center rounded-full bg-[#1D39DD] p-1 text-white">
                <MdArrowBack
                  onClick={() => {
                    close()
                    setAssignedOpen1(!assignedOpen1)
                  }}
                />
              </div>
              <p>Back</p>
            </div>
          </>
        )}

        {newstrategy
          ? newstrategy.map(
              (item: MyItem, index: React.Key | null | undefined) => (
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                <div key={index} className="">
                  <div
                    className="my-5 mt-2 rounded-[10px] border-2 border-[#3E58F14D] p-5 "
                    onClick={() => {
                      // if (item && typeof item[3] === "number") {
                      // handleClick(item[3])
                      if (item) {
                        //console.log("item[777]", item[3])
                        setAssignedOpen1(item[3] || [])
                        setAssignedOpen(true)
                      }
                      // }
                    }}
                  >
                    <div className="flex cursor-pointer justify-between">
                      <div className="flex gap-3">
                        <div className="flex items-center justify-center rounded-full bg-white px-2 shadow-2xl shadow-[#9F9F9F40]">
                          <Image
                            src={Self_garden as StaticImageData}
                            alt="logo"
                            height="22"
                            width="22"
                          />
                        </div>

                        <div>
                          <p className="text-sm md:text-base">{item[2]} </p>
                          <p className="text-xs md:text-xs">Cared by You</p>
                        </div>
                      </div>
                      {/*{sum}*/}
                      <div>
                        <p className="text-[15px] text-[#12C802]">
                          {Array.isArray(item[4])
                            ? calculateSum(item[4] as MyItem)
                            : 0}
                        </p>
                        <p className="text-[10px] text-[#C80202]">-8.64%</p>
                      </div>
                    </div>

                    {assignedOpen1 === item[3] && (
                      <div className="mt-5">
                        <div className="flex  items-center py-2">
                          <div className="rounded-lg bg-[#F1F1F1]">
                            <button
                              className={`rounded-lg bg-[#12C802] px-3 text-white md:py-1 `}
                            >
                              Details{" "}
                            </button>

                            <button
                              className={`rounded-lg px-3 hover:bg-[#12C802] hover:text-white md:py-1`}
                            >
                              8/6/2023{" "}
                            </button>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-semibold md:text-base">
                            Assigned Gardens{" "}
                          </p>
                        </div>

                        <div className="flex justify-between py-2">
                          <div className="flex gap-3">
                            <div className="">
                              {Array.isArray(item[3]) &&
                                item[3].map((e: string, index: number) => {
                                  // Find the matching data using the object
                                  const lowercaseE = e.toLowerCase()

                                  // Find the matching data using the lowercase value
                                  const matchedToken = alltoken
                                    ? alltoken.find(
                                        (token) =>
                                          token.address &&
                                          token.address.toLowerCase() ===
                                            lowercaseE,
                                      )
                                    : undefined

                                  // Now you can use matchedToken safely

                                  return (
                                    <div
                                      key={index}
                                      className="my-5 flex items-center gap-3"
                                    >
                                      <p className="block flex-col text-xs md:hidden md:text-base">
                                        {matchedToken?.name || "Data not found"}
                                      </p>
                                      <p className="hidden flex-col text-xs md:block md:text-base">
                                        {matchedToken?.symbol ||
                                          "Data not found"}
                                      </p>
                                    </div>
                                  )
                                })}

                              <p className="text-[10px]">
                                Cared by
                                <span className="text-[#88FF5F]">You</span>
                              </p>
                            </div>
                          </div>

                          <div className="">
                            {Array.isArray(item[4]) &&
                              item[4].map((e, index) => (
                                <div key={index} className="my-3">
                                  <p className="flex-col items-center text-[15px]">
                                    {e}
                                  </p>

                                  <p className="text-[10px] text-[#c80202]">
                                    -8.64%
                                  </p>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ),
            )
          : null}

        {showImage && (
          <>
            <div className="mx-auto mt-4 w-[90%] rounded-[10px] shadow sm:w-[50%] md:mx-0 md:w-full">
              <div className="flex h-[454px] w-full  flex-col items-center justify-center  ">
                <div
                  onClick={() => setDemoOpen(true)}
                  className="cursor-pointer"
                >
                  <Image
                    src={AddGarden as StaticImageData}
                    alt="logo"
                    height="135"
                    width="135"
                  />

                  <div className="flex items-center gap-2 ">
                    <p className="text-xl">Add PortFolio</p>
                    <GrAdd className="text-[#1D39DD]" size={20} />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Private
