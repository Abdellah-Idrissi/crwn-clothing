import logo from "../assets/crown.svg";
import { NavLink, Outlet } from "react-router-dom";
import Cart from "../components/Cart";
import {  useSelector } from "react-redux";
import { closeDropDownOnBodyClick } from "../store/cart/cartHandlers";
import { handleSignOut } from "../store/user/userHandlers";

export default function HeaderLayout() {
  let user = useSelector(state=> state.user.user)

  
  return (
    <div className="min-h-screen" onClick={closeDropDownOnBodyClick}>
      <header className="w-full bg-gray-500 p-4 px-5">
        <div className="container mx-auto flex items-center justify-between">
          <NavLink to="/">
            {" "}
            <img
              src={logo}
              alt="website-logo"
              className="w-[35px] sm:w-[40px] md:w-[50px]"
            />{" "}
          </NavLink>

          <ul className="flex items-center gap-x-3 sm:gap-x-5 md:gap-x-9">
            <NavLink
              className="uppercase text-[14px] mt-[3px] sm:text-[15px]"
              to="/shop"
            >
              shop
            </NavLink>
            <NavLink
              className="uppercase text-[14px] mt-[3px] sm:text-[15px]"
              to="/contact"
            >
              contact
            </NavLink>

            {user ? (
              <button
                className="uppercase text-[14px]  mt-[3px] sm:text-[15px]"
                onClick={handleSignOut}
              >
                sign out
              </button>
            ) : (
              <NavLink
                className="uppercase text-[14px] mt-[3px] sm:text-[15px]"
                to="/auth"
              >
                sign in
              </NavLink>
            )}

            <Cart />
          </ul>
        </div>
      </header>

      <main className="container mx-auto p-5">
        <Outlet />
      </main>
    </div>
  );
}
