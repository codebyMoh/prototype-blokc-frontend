/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import error from "next/error"
import React, { useContext, useState } from "react"
import { MdOutlineAddCircleOutline } from "react-icons/md"
import { ClipLoader } from "react-spinners"
import { ToastContainer, toast } from "react-toastify"
import { encodeFunctionData } from "viem"

import abi from "../contract/blokc.json"
import {
  type Wallet1,
  WalletContext,
  type WalletContextType,
} from "./WalletContext"
import { useWeb3AuthSigner } from "~/context/web3-auth-signer"

interface AddGardenerProps {
  setShowGardenerPopup: React.Dispatch<React.SetStateAction<boolean>>
}

const AddGardener: React.FC<AddGardenerProps> = ({ setShowGardenerPopup }) => {
  const { accountAddress, sessionKeyProvider } = useWeb3AuthSigner()
  //const accountAddress = "0x251286FEB640dd7f39Cebf1E9cB650C7E72d58B2"
  const contextData = useContext(WalletContext) as WalletContextType
  //console.log("userinfo from contextData:", contextData?.userinfo)
  const userinfo: Wallet1 | null = contextData?.userinfo
  const [userName, setUserName] = useState<string>(userinfo?.name ?? "")
  const [addressGardener, setAddressGardener] = useState<
    `0x${string}` | undefined
  >(accountAddress)
  const [loading, setLoading] = useState(false)
  // Function to update userName state
  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
    setLoading(false)
  }

  // Function to update addressGardener state
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress: `0x${string}` = `0x${e.target.value}`
    setAddressGardener(newAddress)
    setLoading(false)
  }

  const registerGardener = async () => {
    setLoading(true)
    const contractAddress = "0xc1b1d35BCb4145939E0b51663A9CdCb05EE1777A"
    const username = userinfo ? userinfo.name : ""

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      const { hash } = await sessionKeyProvider.sendUserOperation({
        target: contractAddress,
        data: encodeFunctionData({
          abi: abi,
          functionName: "registerGardener",
          args: [username, accountAddress],
        }),
      })
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      const thash = await sessionKeyProvider.waitForUserOperationTransaction(
        hash,
      )
      console.log("hash-->", thash)
      toast.success("successfully Created")
      setTimeout(() => {
        setShowGardenerPopup(false)
      }, 4000) // 2000 milliseconds = 2 seconds
    } catch {
      toast.error("Something wrong")
      console.error("Error interacting with contract:", error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className=" absolute inset-0  right-0 z-50 flex w-full items-center justify-center bg-black bg-opacity-50  ">
      <div className="w-full rounded-3xl border-2 bg-white md:w-96 lg:w-96">
        <div className="space-y-5 p-6">
          <div className="flex items-center justify-center gap-2 text-center ">
            <MdOutlineAddCircleOutline size={20} className="font-bold" />
            <p className="text-lg font-bold"> Register Gardener </p>
          </div>
          <div className="">
            <label htmlFor="gardenName" className="my-2 block">
              User Name
            </label>
            <input
              type="text"
              id="gardenName"
              name="gardenName"
              className="mb-2 h-[40px] w-full rounded-[6px] bg-[#F2F2F2] px-2 outline-none"
              value={userName}
              onChange={handleUserNameChange}
            />

            <label htmlFor="gardener" className="my-2 block">
              Address Gardener
            </label>
            <input
              type="text"
              id="gardener"
              name="gardener"
              className="mb-2 h-[40px] w-full rounded-[6px] bg-[#F2F2F2] px-2 outline-none"
              value={addressGardener}
              onChange={handleAddressChange}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="flex w-full items-center justify-center rounded-[6px] bg-[#1d3add] py-2 text-lg text-white"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={() => registerGardener()}
            >
              {loading ? <ClipLoader color="#ffff" size={28} /> : "Register"}
              <ToastContainer />
            </button>
          </div>
        </div>
        <div className="fixed inset-0 -z-40 bg-black opacity-30"></div>
      </div>
    </div>
  )
}

export default AddGardener
