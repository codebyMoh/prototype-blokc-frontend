/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import React, { useContext, useRef, useState } from "react"
import { MdOutlineContentCopy } from "react-icons/md"

import {
  type Wallet1,
  WalletContext,
  type WalletContextType,
} from "./WalletContext"
import { useWeb3AuthSigner } from "~/context/web3-auth-signer"
import { env } from "~/env.mjs"

import "react-toastify/dist/ReactToastify.css"

interface ReferralProps {
  setOpenreferral: React.Dispatch<React.SetStateAction<boolean>>
  mycode: string
}

const Referral: React.FC<ReferralProps> = ({ mycode, setOpenreferral }) => {
  const [referralCode, setReferralCode] = useState<string | null>(null)
  const contextData = useContext(WalletContext) as WalletContextType
  const userinfo: Wallet1 | null = contextData?.userinfo
  const role = localStorage.getItem("userRole")
  const { accountAddress } = useWeb3AuthSigner()

  const handleReferralCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const inputValue = event.target.value
    setReferralCode(inputValue)
  }

  const sendApiRequest = async () => {
    const dataToSend = {
      wallet: accountAddress,
      email: userinfo?.email,
      username: userinfo?.name,
      role: role,
      refaral: referralCode,
    }

    await axios
      .post(`${env.NEXT_PUBLIC_BACKEND_URL}/registerUser`, dataToSend)
      .then((response) => {
        //console.log("API Response:", response)
        setOpenreferral(false)
      })
      .catch((error) => {
        console.error("API Error:", error)
      })
  }

  const copyToClipboard = () => {
    const textField = document.createElement("textarea")
    textField.innerText = mycode
    document.body.appendChild(textField)
    textField.select()
    document.execCommand("copy")
    textField.remove()
  }
  const modalRef = useRef<HTMLDivElement | null>(null)
  const closePopup = (abc: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
    if (modalRef.current && !modalRef.current.contains(abc.target)) {
      setOpenreferral(false)
    }
  }

  return (
    <>
      <div
        className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50"
        onClick={closePopup}
      >
        <div
          className=" mt-48 w-[500px] rounded-2xl bg-white md:mt-0 lg:mt-0"
          ref={modalRef}
        >
          <div className="my-3 flex justify-center gap-2 pb-2">
            <p className="flex place-items-center items-center gap-2 text-center">
              <span className="text-2xl font-bold"></span>{" "}
              <span className="text-2xl text-[#1D39DD]">Welcome to BLOKC</span>
            </p>
          </div>
          <div className="my-3 flex justify-center gap-2 text-base font-bold">
            <h4>My Referral Code: {mycode}</h4>
            <button className="" onClick={copyToClipboard}>
              <MdOutlineContentCopy size={18} />
            </button>
          </div>

          <div className="flex justify-center">
            <div className="">
              <label className="mb-2 block text-center text-lg font-bold text-gray-700">
                Referral Code
              </label>
              <input
                className="focus:shadow-outline w-60 appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="username"
                type="text"
                placeholder="Enter Code"
                value={referralCode !== null ? referralCode.toString() : ""}
                onChange={handleReferralCodeChange}
              />
            </div>
          </div>

          <div className="rounded-[10px] p-5">
            <div className="text-center">
              <button
                type="submit"
                className="focus:shadow-outline-blue hover-bg-blue-700 active-bg-blue-800 rounded bg-[#1D39DD] px-4 py-2 font-bold text-white focus:outline-none"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={() => sendApiRequest()}
              >
                Send
              </button>
            </div>
            <div
              className="flex justify-end"
              onClick={() => setOpenreferral(false)}
            >
              <button>Skip</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Referral
