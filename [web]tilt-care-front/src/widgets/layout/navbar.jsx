import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Navbar as MTNavbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon, CubeTransparentIcon } from "@heroicons/react/24/outline";

export function Navbar({ brandName, routes, action }) {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    // 창 크기가 960px 이상일 때 모바일 네비게이션 닫기
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  // 네비게이션 리스트
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-12">
      {routes.map(({ name, path, icon, href, target }) => (
        <Typography
          key={name}
          as="li"
          variant="small"
          color="inherit"
          className="capitalize text-md"
        >
          {href ? (
            <a
              href={href}
              target={target}
              className="flex items-center gap-1 p-1 font-bold text-purple-500 hover:text-purple-700 text-xl"
            >
              {icon &&
                React.createElement(icon, {
                  className: "w-[18px] h-[18px] opacity-75 mr-1",
                })}
              {name}
            </a>
          ) : (
            <Link
              to={path}
              target={target}
              className="flex items-center gap-1 p-1 font-bold text-purple-500"
            >
              {icon &&
                React.createElement(icon, {
                  className: "w-[18px] h-[18px] opacity-75 mr-1",
                })}
              {name}
            </Link>
          )}
        </Typography>
      ))}
    </ul>
  );

  return (
    <MTNavbar color="transparent" className="p-3 !bg-transparent shadow-none">
      <div className="container mx-auto flex items-center justify-between text-purple-500">
        {/* 브랜드 로고와 이름 */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/img/tiltcare-transparent.png"
            alt="TiltCare Logo"
            className="h-12 w-12"
          /> {/* 이미지를 아이콘 대신 사용 */}
          <Typography className="mr-4 ml-2 cursor-pointer py-1.5 font-bold text-xl">
            {brandName} {/* 브랜드 이름 */}
          </Typography>
        </Link>

        {/* 네비게이션 메뉴 */}
        <div className="hidden lg:block">{navList}</div>

        {/* 구글 로그인 버튼 */}
        <div className="hidden gap-2 lg:flex">
          <button
            className="flex items-center gap-2 rounded-lg bg-white border border-gray-300 px-2 py-2 text-sm text-purple-500 shadow hover:bg-gray-100 focus:outline-none font-bold"

          >
            {/* 구글 로고 */}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
              alt="Google Icon"
              className="h-5 w-5"
            />
            <span>Sign in</span> {/* 구글 로그인 텍스트 */}
          </button>
        </div>

        {/* 햄버거 메뉴 버튼 */}
        <IconButton
          variant="text"
          size="sm"
          color="purple"
          className="ml-auto text-inherit hover:bg-purple-100 focus:bg-purple-100 active:bg-purple-200 lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6 text-purple-500" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6 text-purple-500" />
          )}
        </IconButton>
      </div>

      {/* 모바일 네비게이션 메뉴 */}
      <MobileNav
        className="rounded-xl bg-white px-4 pt-2 pb-4 text-purple-500"
        open={openNav}
      >
        <div className="container mx-auto">
          {navList}
          {React.cloneElement(action, {
            className: "w-full block",
          })}
        </div>
      </MobileNav>
    </MTNavbar>
  );
}

// 기본 props 설정
Navbar.defaultProps = {
  brandName: "Tilt Care",
  action: (
    <a
      href="https://www.creative-tim.com/product/material-tailwind-kit-react"
      target="_blank"
    >
      <Button variant="gradient" size="sm" fullWidth>
        free download
      </Button>
    </a>
  ),
};

// PropTypes 설정
Navbar.propTypes = {
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.node,
};

Navbar.displayName = "/src/widgets/layout/navbar.jsx";

export default Navbar;
