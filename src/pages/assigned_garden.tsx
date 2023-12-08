import Image from "next/image"

const Assigned: React.FC<{
  setAssignedOpen: (open: boolean) => void
}> = () => {
  return (
    <>
      <div className="flex items-center  py-2">
        <div className=" rounded-lg   bg-[#F1F1F1]">
          <button
            className={`rounded-lg px-5 py-1 hover:bg-[#12C802] hover:text-white `}
          >
            Details
          </button>
          <button
            className={`rounded-lg px-5 py-1 hover:bg-[#12C802] hover:text-white`}
          >
            8/6/2023
          </button>
        </div>
      </div>

      <div>
        <p className="font-semibold">Assigned Gardens  </p>
      </div>

      <div className="flex justify-between py-2">
        <div className="flex gap-3  ">
          <div className="flex items-center justify-center rounded-full bg-white shadow-2xl shadow-[#9F9F9F40]">
            <Image
              src="/icon/Self_garden.svg"
              alt="logo"
              height="22"
              width="22"
            />
          </div>
          <div>
            <p className="text-[15px]">#1 Pretty Patios </p>
            <p className="text-[10px]">
              Cared by <span className="text-[#88FF5F]">You</span>
            </p>
          </div>
        </div>
        <div>
          <p className="text-[15px] text-[#12C802]">$0.99367</p>
          <p className="text-[10px] text-[#C80202]">-8.64%</p>
        </div>
      </div>

      <div className="flex justify-between py-2">
        <div className="flex gap-3">
          <div className="flex items-center justify-center rounded-full bg-white shadow-2xl shadow-[#9F9F9F40] ">
            <Image
              src="/icon/Self_garden.svg"
              alt="logo"
              height="22"
              width="22"
            />
          </div>
          <div>
            <p className="text-[15px]"> #1 Pretty Patios </p>
            <p className="text-[10px]">
              Cared by <span className="text-[#88FF5F]">You</span>
            </p>
          </div>
        </div>
        <div>
          <p className="text-[15px] text-[#12C802]">$0.9936</p>
          <p className="text-[10px] text-[#C80202]">-8.64%</p>
        </div>
      </div>

      <div className="flex justify-between py-2">
        <div className="flex gap-3  ">
          <div className="flex items-center justify-center rounded-full bg-white shadow-2xl shadow-[#9F9F9F40]">
            <Image
              src="/icon/Self_garden.svg"
              alt="logo"
              height="22"
              width="22"
            />
          </div>
          <div>
            <p className="text-[15px]">#1 Pretty Patios</p>
            <p className="text-[10px]">
              Cared by <span className="text-[#88FF5F]">You</span>
            </p>
          </div>
        </div>
        <div>
          <p className="text-[15px] text-[#12C802]">$0.99367</p>
          <p className="text-[10px] text-[#C80202]">-8.64%</p>
        </div>
      </div>
    </>
  )
}

export default Assigned
