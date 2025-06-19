import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { BiUser } from 'react-icons/bi'
import { BsBox2Heart } from 'react-icons/bs'
import { GiCargoShip } from 'react-icons/gi'
import { LuLock } from 'react-icons/lu'

const Cargo = () => {
  const { data: session } = useSession()
  const user = session?.user
  return (
    <div>
      {/* Top Strip */}
      <div className="bg-gray-50 w-full p-2">
        <div className="flex justify-between items-center w-[95%] lg:w-[85%] mx-auto">
          <p className="text-sm hidden xl:block">
            Gift every single day on Weekends - New Coupon code - Happy 2025
          </p>

          <div className="flex gap-4 text-sm ml-auto">


            <Link href={user ? "/gift" : "/login"}>
              <p className="flex items-center gap-2 cursor-pointer hover:text-orange-600">
                <BsBox2Heart /> Gift <span>|</span>
              </p>
            </Link>


            <div className="flex gap-2 lg:gap-6 items-center">
              <Link href={user ? "/profile" : "/login"}>
                <div className="flex gap-1 items-center cursor-pointer hover:text-orange-600">

                  <span className="">
                    {user ? (
                      <div className="flex items-center gap-1">
                        <BiUser /> <span>|</span> {user.name || user.email}
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <LuLock /> Sign in or Register
                      </div>
                    )}
                  </span>
                </div>
              </Link>

              <span className="text-gray-400">|</span>

              <Link href={user ? "/track" : "/login"}>
                <div className="flex gap-1 items-center cursor-pointer hover:text-orange-600">
                  <GiCargoShip />
                  <span className="hidden md:block">Track Your Order</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Cargo
