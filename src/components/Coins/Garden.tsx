//import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import React from "react"
//import { useEffect, useState } from "react"

const Garden = () => {
  //const [getDataCrypto, setDataCrypto] = useState([])

  //const FetchDataApi = () => {
  //    axios
  //      .get("http://localhost:8000/api/get")
  //      .then((responce) => setDataCrypto(responce.data))
  //      .catch((error) => console.log(error))
  //  }
  //  useEffect(() => {
  //    FetchDataApi()
  //  }, [])

  return (
    <>
      <div>
        <div>
          <div className="mt-5 flex items-center justify-between border-b pb-2 ">
            <div className="mx-[10px] flex items-center gap-2">
              <Image
                src="/icon/2.svg"
                height="16"
                width="16"
                alt="Icon"
                className=" self-center"
              />
              <p>Gardens</p>
              <Image
                src="/icon/Filter.svg"
                height="16"
                width="16"
                alt="Icon"
                className=" self-center"
              />
              <Image
                src="/icon/RoundPlus.svg"
                height="16"
                width="16"
                alt="Icon"
                className=" self-center"
              />
            </div>
            <div className=" mx-[10px]">
              <p className="text-[9px] text-[#12C802]">$0.99367</p>
              <p className="text-[7px] text-[#C80202]">-8.64%</p>
            </div>
          </div>
          <div className="mt-2 flex h-[330px] flex-wrap gap-5 overflow-y-scroll">
            {/*{getDataCrypto.length > 0 ? (
                getDataCrypto.map((data) => (*/}
            <>
              <Link
                href="/wallet/garden"
                className="flex  h-[132px] w-[136px] rounded-[10px] bg-[#F5F7FF] p-2"
              >
                <div className="flex justify-center">
                  <Image
                    src="/icon/Tree.svg"
                    height="40"
                    width="40"
                    alt="Icon"
                    className=" self-center"
                  />
                </div>
                <div className="mt-6 flex justify-between">
                  <p className="text-[9px]">#4 Herrington</p>
                  <p className="text-[9px] text-[#12C802]">$0.99367</p>
                </div>
                <div className="-mt-2 flex justify-between">
                  <p className="text-[6px]">
                    Cared <span className="text-[#12C802]">by Mariano</span>
                  </p>
                  <p className="text-[6px] text-[#C80202]">-8.64%</p>
                </div>
              </Link>
            </>
            {/*))*/}
            {/*) : (*/}
            <h1>Loading</h1>
            {/*)}*/}
          </div>
        </div>
      </div>
    </>
  )
}

export default Garden
