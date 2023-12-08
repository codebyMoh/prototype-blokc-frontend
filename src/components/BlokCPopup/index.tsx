import Image from "next/image"
import React, { useRef, type Dispatch, type SetStateAction } from "react"
import { MdArrowBack } from "react-icons/md"

interface AddProps {
  presale: boolean
  youPay: number
  handleYouPayChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleYouSellChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  youSell: number
  Setpresale: Dispatch<SetStateAction<boolean>>
}

const BuyBlokCPopUP: React.FC<AddProps> = ({
  presale,
  youPay,
  handleYouPayChange,
  handleYouSellChange,
  youSell,
  Setpresale,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null)
  const closePopup = (abc: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    if (modalRef.current && !modalRef.current.contains(abc.target)) {
      Setpresale(false)
    }
  }
  return (
    <>
      {presale && (
        <div
          className="fixed left-0  top-0 z-50 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50"
          onClick={closePopup}
        >
          <div
            className=" mt-48 rounded-3xl bg-white md:mt-0 lg:mt-0 "
            ref={modalRef}
          >
            <div
              className="mx-7 my-3 flex cursor-pointer items-center gap-2 pt-3 text-center"
              onClick={() => {
                Setpresale(false)
              }}
            >
              <div className=" flex items-center justify-center rounded-full bg-[#1D39DD] p-1 text-white ">
                <MdArrowBack />
              </div>
              <p>Back </p>
            </div>
            <div className="my-8 flex justify-center gap-2 pb-2">
              <p className="flex place-items-center items-center gap-2 text-center">
                <span className="text-2xl font-bold"></span>{" "}
                <span className="text-2xl text-[#1D39DD]">Buy BLOKC </span>
              </p>
            </div>

            <div className="border-t">
              <div className="rounded-[10px] p-5">
                <div className="flex justify-between ">
                  <div className="">
                    <label className="text-sm font-bold text-[#1D39DD]">
                      You Pay
                    </label>
                  </div>
                  <div className="">
                    <p className="text-right text-xs text-[#828282]">
                      Price: 0.01 USDT/BLOKC 
                    </p>
                  </div>
                </div>
        
                <div className="flex items-center justify-between rounded-lg border bg-[#F6F6F6] p-3">
                  <input
                    type="number"
                    id="youPay"
                    name="youPay"
                    placeholder="Enter Your Amount."
                    className="appearance-none bg-transparent outline-none"
                    value={youPay !== 0 ? youPay : ""} // Only set the value when youPay is not zero
                    onChange={handleYouPayChange}
                  />
                  <span className="bold ml-2 text-[#1D39DD]">USDT</span>
                </div>
                <div className="text-xs text-[#A7A7A7]">Minimum 100 USDT</div>
                <div className="flex justify-center">
                  <Image
                    src="icon/Recive.svg"
                    alt="logo"
                    height={35}
                    width={35}
                    className="mx-1"
                  />
                </div>
                <div className="flex justify-between">
                  <div className="">
                    <label className="text-sm font-bold text-[#1D39DD]">
                      You Sell
                    </label>
                  </div>
                </div>
                <div className="">
                  {" "}
                  {/* Add margin-bottom to create space */}
                  <div className="flex items-center justify-between rounded-lg border bg-[#F6F6F6] p-3">
                    <input
                      type="number"
                      id="youSell"
                      name="youSell"
                      placeholder="Enter Your Amount."
                      className="bg-transparent outline-none"
                      value={youSell !== 0 ? youSell : ""} // Only set the value when youPay is not zero
                      onChange={handleYouSellChange}
                    />
                    <span className="bold ml-2 text-[#1D39DD]">BLOKC</span>
                  </div>
                </div>{" "}
                {/* Close the wrapper div with margin-bottom to create space */}
                <div className="text-xs text-[#A7A7A7]">
                  Minimum 10000 BLOKC
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="focus:shadow-outline-blue rounded bg-[#1D39DD] px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none active:bg-blue-800"
                  >
                    Buy
                  </button>
                </div>
                <hr className="mt-4" />
                <div className="mt-6 text-xs">
                  {" "}
                  <p>
                    *Price of Pre-Sale is 0.01 USDT/BLOKC is only available for
                    this round of Pre-Sale. After
                    <hr />
                    this, We will have Launch pad pre sale via Pinksale and
                    Gempad. Starting Price will be
                    <hr />
                    0.02USDT/BLOKC at launchpads. We are happy to have you as a
                    community!ddd
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default BuyBlokCPopUP
