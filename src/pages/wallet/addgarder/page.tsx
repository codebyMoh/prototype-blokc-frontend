import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"

const Page: React.FC = () => {
  const [getState, setState] = useState<boolean>(false)
  const open = () => {
    setState(!getState)
  }

  return (
    <>
      <div className="container relative mx-auto h-[100%] w-full">
        {getState === true ? (
          <div className="container absolute mx-auto my-20 flex h-[378px] items-center justify-center bg-white md:mt-20 lg:top-2 lg:h-[600px] lg:w-full">
            <div className="w-auto rounded-[40px] border-2 p-3 lg:h-[532px] lg:w-[556px] ">
              <div className="mt-10 flex gap-2 ">
                <div className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-[#1D39DD] p-2">
                  <Image
                    src="/icon/right.svg"
                    alt="logo"
                    height={8}
                    width={9}
                    onClick={open}
                  />
                </div>

                <p>Back</p>
              </div>
              <div className="mt-10 flex gap-2 ">
                <Image
                  src="/icon/RoundPlus.svg"
                  alt="logo"
                  height={18}
                  width={18}
                />
                <p></p>
              </div>
              <div className="p-5">
                <label htmlFor="" className="my-2 block">
                  Garden Name
                </label>
                <input
                  type="text"
                  className="mb-2 h-[40px] w-full rounded-[6px] bg-[#F2F2F2]"
                />
                <label htmlFor="" className="my-2 block">
                  USDT to Deposit 
                </label>
                <input
                  type="text"
                  className="mb-2 h-[40px] w-full rounded-[6px] bg-[#F2F2F2]"
                />
                <label htmlFor="" className="my-2 block">
                  Gardener
                </label>
                <input
                  type="text"
                  className="mb-2 h-[40px] w-full rounded-[6px] bg-[#F2F2F2]"
                />
              </div>
              <div className="flex justify-center">
                <button className="h-[36px] w-[96px] rounded-[6px] bg-[#1D39DD] text-white">
                  Add
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="container mx-auto w-[90%] md:w-full">
              <div className="flex h-[89px] w-full items-center justify-between p-2 ">
                <div className="flex gap-2">
                  <Image
                    src="/icon/garden.svg"
                    alt="logo"
                    height={27}
                    width={27}
                  />
                  <p>Gardens</p>
                  <Image
                    src="/icon/Short.svg"
                    alt="logo"
                    height={27}
                    width={27}
                  />
                  <Image
                    src="/icon/RoundPlus.svg"
                    alt="logo"
                    height={27}
                    width={27}
                    onClick={open}
                  />
                </div>
                <div>
                  <p className="text-[15px] text-[#12C802]">$0.99367</p>
                  <p className="text-[10px] text-[#C80202]">-8.64%</p>
                </div>
              </div>
              <hr className="py-1" />
              <div className="mt-3 flex gap-2 ">
                <div className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-[#1D39DD]">
                  <Image
                    src="/icon/right.svg"
                    alt="logo"
                    height={8}
                    width={9}
                  />
                </div>
                <p>Back</p>
              </div>
              <div className="mx-auto w-[90%] py-4 md:mx-0 md:w-full">
                <div className="mt-2 h-[80px] rounded-[10px] border-2 border-[#AEAEAE] p-5 ">
                  <div className="flex justify-between ">
                    <div className="flex gap-3 ">
                      <div className="border-1 flex h-[35px] w-[35px] items-center justify-center rounded-full border-[#9F9F9F]">
                        <Image
                          src="/icon/Flower.svg"
                          alt="logo"
                          height={22}
                          width={22}
                        />
                      </div>
                      <div>
                        <p className="text-[15px]">Private Garden</p>
                        <p className="text-[10px]">Cared by You</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[15px] text-[#12C802]">$0.99367</p>
                      <p className="text-[10px] text-[#C80202]">-8.64%</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mx-auto mt-4 w-[90%] rounded-[10px] border-2 border-[#AEAEAE] md:mx-0 md:w-full">
                <Link
                  href="/Wallet/coin"
                  className="flex h-[300px]  w-full flex-col items-center justify-center "
                >
                  <Image
                    src="/icon/fullDesignRound.svg"
                    alt="logo"
                    height={135}
                    width={135}
                  />
                  <div className="flex items-center gap-2">
                    <p className="text-[22px]">Add Garden</p>
                    <Image
                      src="/icon/plus.svg"
                      alt="logo"
                      height={20}
                      width={20}
                    />
                  </div>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Page

//Page.getLayout = function getLayout(page) {
//  return <WalletLayout>{page}</WalletLayout>
//}
