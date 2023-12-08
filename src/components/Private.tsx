import Image, { type StaticImageData } from "next/image"
import React, { useState, useContext } from "react"
import { GrAdd } from "react-icons/gr"
import { MdArrowBack } from "react-icons/md"

import AddGarden from "../../public/icon/AddGarden.svg"
import Self_garden from "../../public/icon/Self_garden.svg"
import Addgarden from "./Add-Garden"
import {
  WalletContext,
  type WalletContextType,
} from "~/components/WalletContext"

const Private = () => {
  const [assignedOpen, setAssignedOpen] = useState<boolean>(false)
  //const [assignedOpen1, setAssignedOpen1] = useState<number>(0)
  const [showImage, setShowImage] = useState(true)
  const contextData = useContext(WalletContext) as WalletContextType
  const garden = contextData?.garden
  const opengarden = contextData?.opengarden
  const setOpengarden = contextData?.setOpengarden
  //console.log("garden--->", garden)

  const close = () => {
    setAssignedOpen(false)
    setShowImage(true)
  }

  return (
    <>
      {opengarden && <Addgarden setOpengarden={setOpengarden} />}

      <div className=" h-[350px] w-full overflow-y-scroll p-2 py-4 md:h-[435px] ">
        {assignedOpen && (
          <>
            <div
              className="flex items-center gap-2 py-2 text-center"
              onClick={() => {
                close()
              }}
            >
              <div className=" flex cursor-pointer items-center justify-center rounded-full bg-[#1D39DD] p-1 text-white ">
                <MdArrowBack />
              </div>

              <p>Back</p>
            </div>
          </>
        )}

        {garden
          ? // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            garden.map(
              (
                item: (
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      unknown,
                      string | React.JSXElementConstructor<unknown>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | React.PromiseLikeOfReactNode
                  | null
                  | undefined
                )[],
                index: React.Key | null | undefined,
              ) => (
                <div key={index}>
                  <div
                    className="my-5 mt-2 rounded-[10px] border-2 border-[#3E58F14D] p-5 "
                    //onClick={() => handleClick(item[3])}
                  >
                    <div className="flex cursor-pointer justify-between">
                      <div className="flex gap-3  ">
                        <div className="flex items-center justify-center rounded-full bg-white px-2 shadow-2xl shadow-[#9F9F9F40]">
                          <Image
                            src={Self_garden as StaticImageData}
                            alt="logo"
                            height="22"
                            width="22"
                          />
                        </div>

                        <div>
                          <p className="text-[15px]">{item[7]}</p>
                          <p className="text-[10px]">Cared by You</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-[15px] text-[#12C802]">{100}</p>
                        <p className="text-[10px] text-[#C80202]">-8.64%</p>
                      </div>
                    </div>
                  </div>
                </div>
              ),
            )
          : null}

        <div>
          <div
            className="my-5 mt-2 rounded-[10px] border-2 border-[#3E58F14D] p-5 "
            //onClick={() => handleClick(item[3])}
          >
            <div className="flex cursor-pointer justify-between">
              <div className="flex gap-3  ">
                <div className="flex items-center justify-center rounded-full bg-white px-2 shadow-2xl shadow-[#9F9F9F40]">
                  <Image
                    src={Self_garden as StaticImageData}
                    alt="logo"
                    height="22"
                    width="22"
                  />
                </div>

                <div>
                  <p className="text-[15px]">Private Garden </p>
                  <p className="text-[10px]">Cared by You</p>
                </div>
              </div>

              <div>
                <p className="text-[15px] text-[#12C802]">{100}</p>
                <p className="text-[10px] text-[#C80202]">-8.64%</p>
              </div>
            </div>
          </div>
        </div>

        

    

        {showImage && (
          <div className="mx-auto mt-4 w-[90%] rounded-[10px] shadow sm:w-[50%] md:mx-0 md:w-full">
            <div className="flex h-[454px] w-full  flex-col items-center justify-center  ">
              <div
                onClick={() => setOpengarden(true)}
                className="cursor-pointer"
              >
                <Image
                  src={AddGarden as StaticImageData}
                  alt="logo"
                  height="135"
                  width="135"
                />

                <div className="flex items-center gap-2">
                  <p className="text-xl"> Add Garden  </p>
                  <GrAdd className="text-[#1D39DD]" size={20} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Private
