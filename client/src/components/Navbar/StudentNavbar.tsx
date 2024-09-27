import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import FavoriteIcon from "@mui/icons-material/Favorite";

const StudentNavbar = ({ getProfile }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const open = Boolean(anchorEl);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDesktopMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDesktopMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    handleDesktopMenuClose();
  };

  const handleLogout = () => {
    localStorage.setItem("token", null);
    setIsMenuOpen(false);
    handleDesktopMenuClose();
    navigate("/");
    getProfile();
  };

  const menuItems = [
    {
      icon: <PersonIcon className="mr-2" />,
      text: "Profile",
      path: "/student/profile",
    },
    {
      icon: <AutoStoriesIcon className="mr-2" />,
      text: "Purchased Courses",
      path: "/student/purchased-courses",
    },
    {
      icon: <AutoStoriesIcon className="mr-2" />,
      text: "All Courses",
      path: "/all-courses",
    },
    {
      icon: <FavoriteIcon className="mr-2" />,
      text: "Wishlist",
      path: "/student/wishlist",
    },
  ];

  return (
    <nav className="fixed top-0 w-full p-2 md:p-4 shadow-md bg-gray-800 text-white z-50">
      <div className="mx-auto flex flex-wrap justify-between items-center px-4 md:px-10">
        <div
          className="cursor-pointer text-2xl md:text-3xl font-bold"
          onClick={() => navigate("/")}
        >
          E-Kaksha
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          onClick={toggleMobileMenu}
        >
          <MenuIcon fontSize="large" />
        </button>

        {/* Desktop menu icon */}
        <div className="hidden md:block">
          <MenuIcon
            fontSize="large"
            onClick={handleDesktopMenuOpen}
            className="cursor-pointer text-white"
          />
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleDesktopMenuClose}
          >
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                onClick={() => handleMenuItemClick(item.path)}
              >
                {item.icon}
                {item.text}
              </MenuItem>
            ))}
            <MenuItem onClick={handleLogout}>
              <LogoutIcon className="mr-2" />
              Logout
            </MenuItem>
          </Menu>
        </div>

        {/* Mobile menu items */}
        <div
          className={`${
            isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          } md:hidden overflow-hidden transition-all duration-300 ease-in-out w-full`}
        >
          <div className="flex flex-col items-end text-base">
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                onClick={() => handleMenuItemClick(item.path)}
              >
                {item.icon}
                {item.text}
              </MenuItem>
            ))}
            <MenuItem onClick={handleLogout}>
              <LogoutIcon className="mr-2" />
              Logout
            </MenuItem>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default StudentNavbar;
