import { Link } from "react-router-dom";

import { useUserMenu } from "../../hooks"

import { motion } from "framer-motion";
import { MdAdd } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

import UserImg from "../../assets/img/user_profile.png";

const UserButton = () => {
  const {user, login, logout, isMenu, setIsMenu} = useUserMenu()

  return (
    <div className="relative">
      <motion.img
        whileTap={{ scale: 0.6 }}
        src={user ? user.photoURL : UserImg}
        className="w-8 min-w-[40px] h-8 min-h-[40px] drop-shadow-xl ml-4 cursor-pointer rounded-full"
        alt={user?.displayName ? user.displayName : "User profile"}
        referrerPolicy="no-referrer"
        onClick={login}
      />
      {/* Only show this option if isMenu is true */}
      {isMenu && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          className="w-40 bg-gray-50 shadow-xl rounded-lg absolute flex-col top-12 right-0"
        >
          {/* Only show this option if the user is authenticated and is admin */}
          {user && user.email === process.env.REACT_APP_ADMIN_MAIL && (
            <Link to={"/createProduct"}>
              <p
                className="px-4 py-2 flex items-center  ml-auto gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base"
                onClick={() => setIsMenu(false)}
              >
                <MdAdd /> New item{" "}
              </p>
            </Link>
          )}
          <p
            className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base"
            onClick={logout}
          >
            <FiLogOut /> Logout{" "}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default UserButton;
