import Image, { type StaticImageData } from "next/image"
import { useState } from "react"

import discover1 from "../../public/icon/Discover1.png"
import discover from "../../public/icon/Discover.png"
import Gardens1 from "../../public/icon/Gardens1.png"
import Gardens from "../../public/icon/Gardens.png"
import growth1 from "../../public/icon/Growth1.png"
import growth from "../../public/icon/Growth.png"
import home1 from "../../public/icon/Home1.png"
import setting1 from "../../public/icon/Settings1.png"
import setting from "../../public/icon/Settings.png"
import home from "../../public/icon/home.png"

interface FooterItem {
  id: number
  pathname: string
  pagename: string
  Title: string
  logo: StaticImageData
  colorlogo: StaticImageData
}

const Footer = () => {
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(0)
  const [activeMenu, setActiveMenu] = useState<number | null>(0)

  const handleMenuMouseEnter = (id: number) => {
    setHoveredItemId(id)
  }

  const handleMenuMouseLeave = () => {
    setHoveredItemId(null)
  }

  const handleMenuClick = (id: number) => {
    setActiveMenu(id)
  }

  const footerbar: FooterItem[] = [
    {
      id: 0,
      pathname: "/Wallet",
      pagename: "Home",
      Title: "Home",
      logo: home,
      colorlogo: home1,
    },
    {
      id: 1,
      pathname: "/Wallet/coin",
      pagename: "Growth",
      Title: "Growth",
      logo: growth,
      colorlogo: growth1,
    },
    {
      id: 2,
      pathname: "/Wallet",
      pagename: "Gardens",
      Title: "Gardens",
      logo: Gardens,
      colorlogo: Gardens1,
    },
    {
      id: 3,
      pathname: "/Wallet",
      pagename: "Discover",
      Title: "Discover",
      logo: discover,
      colorlogo: discover1,
    },
    {
      id: 4,
      pathname: "/Wallet",
      pagename: "Settings",
      Title: "Settings",
      logo: setting,
      colorlogo: setting1,
    },
  ]
  return (
    <div className="p-4">
      <div className="flex items-center justify-center gap-5 text-center">
        {footerbar.map((e) => (
          <div
            key={e.id}
            onMouseEnter={() => handleMenuMouseEnter(e.id)}
            onMouseLeave={handleMenuMouseLeave}
            onClick={() => handleMenuClick(e.id)}
          >
            <div className="flex flex-col items-center justify-center space-x-1 text-center">
              <div className="">
                {hoveredItemId === e.id || activeMenu === e.id ? (
                  <Image src={e.colorlogo} alt="logo" height={25} width={25} />
                ) : (
                  <Image src={e.logo} alt="logo" height={25} width={25} />
                )}
              </div>
              <div
                className={`py-2 ${
                  activeMenu === e.id ? "text-[#1D39DD]" : "text-[#5F5F5F]"
                }`}
              >
                <p className="hover: text-sm">{e.Title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Footer
