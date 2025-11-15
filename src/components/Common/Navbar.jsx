import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiConnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropdown"

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)

  // Fetch categories for Catalog dropdown
  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res?.data?.data || [])
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div
      className={`flex h-14 items-center justify-center border-b border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>

        {/* NAV LINKS */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">

            {NavbarLinks.map((link, index) => (
              <li key={index}>

                {/* CATALOG DROPDOWN */}
                {link.title === "Catalog" ? (
                  <div
                    className={`group relative flex cursor-pointer items-center gap-1 ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                  >
                    <p>{link.title}</p>
                    <BsChevronDown />

                    {/* DROPDOWN MENU */}
                    <div
                      className="
                        invisible absolute left-1/2 top-full
                        z-[1000] w-[200px] lg:w-[300px]
                        -translate-x-1/2 translate-y-3
                        flex flex-col rounded-lg bg-richblack-5 
                        p-4 text-richblack-900 opacity-0
                        transition-all duration-150
                        group-hover:visible group-hover:translate-y-2 
                        group-hover:opacity-100
                      "
                    >
                      {/* Dropdown arrow */}
                      <div
                        className="
                          absolute left-1/2 top-0 h-4 w-4
                          -translate-x-1/2 -translate-y-1/2
                          rotate-45 bg-richblack-5
                        "
                      ></div>

                      {loading ? (
                        <p className="text-center text-sm">Loading...</p>
                      ) : subLinks.length > 0 ? (
                        subLinks.map((subLink) => (
                          <Link
                            key={subLink._id}
                            to={`/catalog/${subLink.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                            className="rounded-lg py-2 pl-2 hover:bg-richblack-50"
                          >
                            {subLink.name}
                          </Link>
                        ))
                      ) : (
                        <p className="text-center text-sm">
                          No Categories Found
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link.path}>
                    <p
                      className={
                        matchRoute(link.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }
                    >
                      {link.title}
                    </p>
                  </Link>
                )}

              </li>
            ))}
          </ul>
        </nav>

        {/* RIGHT SIDE BUTTONS */}
        <div className="hidden items-center gap-x-4 md:flex">

          {/* CART - only for students */}
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-richblack-600 text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {/* LOGIN / SIGNUP */}
          {!token && (
            <>
              <Link to="/login">
                <button className="rounded-md border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-md border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100">
                  Sign up
                </button>
              </Link>
            </>
          )}

          {/* PROFILE DROPDOWN */}
          {token && <ProfileDropdown />}
        </div>

        {/* MOBILE MENU ICON */}
        <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
    </div>
  )
}

export default Navbar
