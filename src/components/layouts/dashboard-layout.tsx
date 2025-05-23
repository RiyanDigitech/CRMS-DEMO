import { useState, useEffect } from "react";
import { MdDashboard, MdOutlineSupportAgent } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { GiTeamIdea } from "react-icons/gi";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu, MenuProps, theme } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "../../index.css";
import tokenService from "@/services/token.service";
import { RiCustomerService2Fill, RiLineChartLine } from "react-icons/ri";
import { UserType } from "@/lib/types/user";
import { BsClipboard2CheckFill, BsFillCalendarPlusFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

const { Header, Sider, Content } = Layout;

const DashboardLayout = () => {
  const role = tokenService.getRole();
  console.log(role);
  const [collapsed, setCollapsed] = useState(false);
  const [see, setSee] = useState(true);
  const [lastPersonData, setLastPersonData] = useState<UserType>();
  const [currentPage, setCurrentPage] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    token: { colorPrimary },
  } = theme.useToken();
  useEffect(() => {
    const token = tokenService?.getLocalAccessToken();
    if (token) {
      try {
        const decodedToken = jwtDecode<{ exp?: number }>(token);
        const currentTime = dayjs()?.unix();
        console.log(
          "check kar bhai",
          decodedToken?.exp,
          "current time",
          currentTime
        );
        if (decodedToken?.exp && decodedToken?.exp < currentTime) {
          tokenService?.clearStorage();
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
    const user = tokenService.getUser();
    const pathSegments = pathname.split("/").filter(Boolean);

    if (pathSegments.length > 0) {
      // Get the last segment without any trailing numbers
      const cleanedSegment = pathSegments
        .filter((segment) => !/^\d+$/.test(segment)) // Ignore segments that are only numbers
        .join(" "); // Join remaining segments with a space

      // Replace dashes with spaces and capitalize words
      const readableTitle = cleanedSegment
        .replace(/-/g, " ") // Replace dashes with spaces
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize words
      console.log(readableTitle, "readableTitle");
      if (readableTitle === "Team Memebers Kpi") {
        setCurrentPage("Team Members Kpi Report");
      } else if (readableTitle === "Kpi") {
        setCurrentPage("Key Performance Indicator (KPI)");
      } else if (readableTitle === "Sales Journey Plan") {
        setCurrentPage("Sales Journey Plan (PJP)");
      } else {
        setCurrentPage(readableTitle);
      }
      console.log("Current Page:", readableTitle);
    } else {
      setCurrentPage("Dash Board");
    }
    if (user && user.id !== undefined) {
      setLastPersonData(user);
    }
    const handleResize = () => {
      if (window.outerWidth < 768) {
        setSee(false);
      } else {
        setSee(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [pathname]);
  const getSiderWidth = () => {
    if (!see && collapsed) return 0;
    if (see && collapsed) return 70;
    if (see && !collapsed) return 240;
    if (!see && !collapsed) return 70;
    return 220;
  };
  const getMarginLeft = () => {
    if (!see && collapsed) return "ml-0";
    if (see && collapsed) return "ml-[82px] mr-[10px]";
    if (see && !collapsed) return "ml-[255px] mr-[10px]";
    if (!see && !collapsed) return "ml-[69px]";
    return "ml-[220px]";
  };
  const logout = () => {
    tokenService.clearStorage();
    navigate("/login");
  };
  const HomeNavigate = () => {
    navigate("/");
  };
  const items: MenuProps["items"] = [
    {
      key: "",
      label: (
        <div className="flex justify-center" onClick={HomeNavigate}>
          <img src="/logo.png" className="h-10 w-10" alt="" />
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <button
          onClick={logout}
          className="mx-auto flex justify-center font-manrope text-xs  font-semibold"
        >
          LogOut
        </button>
      ),
    },
  ];
  console.log("lastPersonData", lastPersonData);
  return (
    <Layout className="">
      <Sider
        className={`transition-all duration-300 h-full hide-scrollbar`}
        trigger={null}
        width={getSiderWidth()}
        style={{
          overflowY: "auto",
          position: "fixed",
          left: 0,
          background: colorPrimary,
          zIndex: 1000,
        }}
        collapsible
      >
        {getSiderWidth() > 70 && (
          <div className="w-full flex justify-center items-center">
            <img
              className="py-5"
              src={"/Logo.svg"}
              alt="logo"
              width={180}
              height={39}
            />
          </div>
        )}
        {getSiderWidth() === 70 && (
          <div className="w-full flex justify-center items-center">
            <img className="py-5" src={"/LogoIcon.svg"} alt="logo" />
          </div>
        )}
        <Menu
          className=" mb-[80px] ant-dashboard-layout"
          style={{ background: colorPrimary }}
          mode={!see || (see && collapsed) ? "vertical" : "inline"}
          defaultSelectedKeys={[pathname]}
          onClick={({ key }) => navigate(key)}
          items={[
            {
              key: "/",
              icon: (
                <MdDashboard
                  className={` ${
                    collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                  }`}
                />
              ),
              label: <div className="">Dashboard</div>,
            },
            {
              key: "/trade-Customers",
              icon: (
                <RiCustomerService2Fill
                  className={`${
                    collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                  }`}
                />
              ),
              label: <div className=" ">Trade Customers</div>,
            },
            {
              key: "/meetings",
              icon: (
                <BsFillCalendarPlusFill
                  className={`${
                    collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                  }`}
                />
              ),
              label: <div className=" ">Meetings</div>,
            },
            {
              key: "/stock",
              icon: (
                <BsFillCalendarPlusFill
                  className={`${
                    collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                  }`}
                />
              ),
              label: <div className=" ">Stock</div>,
            },
            {
              key: "/employee",
              icon: (
                <FaUser
                  className={`${
                    collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                  }`}
                />
              ),
              label: <div>Employees</div>,
              children: [
                {
                  key: "/user-details",
                  label: "User Management",
                },
                {
                  key: "/team",
                  label: "Team Management",
                },
                {
                  key: "/routes-monitoring",
                  label: "Routes Monitoring",
                },
              ],
            },
            {
              key: "/product",
              className: "",
              icon: (
                <GiTeamIdea
                  className={`${
                    collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                  }`}
                />
              ),
              label: <div>Product Management</div>,
              children: [
                {
                  key: "/product-list",
                  label: "View Products",
                },
                {
                  key: "/stock-take",
                  label: "Stock Take",
                },
              ],
            },
            {
              key: "/sales",
              className: "",
              icon: (
                <GiTeamIdea
                  className={`${
                    collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                  }`}
                />
              ),
              label: <div>Sales</div>,
              children: [
                {
                  key: "/order-list",
                  label: "Sales Orders",
                },
                {
                  key: "/sales-target",
                  label: "Sales Target",
                },
                {
                  key: "/sales-pjp",
                  label: "Sales Journey Plan",
                },
                {
                  key: "/sales-activity",
                  className: "",
                  label: <div>Sales Activites</div>,
                },
              ],
            },
            {
              key: "/complaints",
              className: "",
              icon: (
                <MdOutlineSupportAgent
                  className={`${
                    collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                  }`}
                />
              ),
              label: <div>Complaints</div>,
            },
            {
              key: "/marketing",
              className: "",
              icon: (
                <RiLineChartLine
                  className={`${
                    collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                  }`}
                />
              ),
              label: <div>Marketing</div>,
            },
            {
              key: "/survey",
              className: "",
              icon: (
                <GiTeamIdea
                  className={`${
                    collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                  }`}
                />
              ),
              label: <div>Survey</div>,
              children: [
                {
                  key: "/survey",
                  label: "View Surveys Details",
                },
              ],
            },
            {
              key: "/discounts",
              className: "",
              icon: (
                <GiTeamIdea
                  className={`${
                    collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                  }`}
                />
              ),
              label: <div>Discounts</div>,
            },

            {
              key: "/organizationchart",
              className: "",
              icon: (
                <IoMdSettings
                  className={`${
                    collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                  }`}
                />
              ),
              label: <div>Hirarchy Chart</div>,
            },
            {
              key: "/kpi",
              className: "",
              icon: (
                <MdOutlineSupportAgent
                  className={`${
                    collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                  }`}
                />
              ),
              label: <div>KPIs</div>,
              children: [
                {
                  key: "/kpi",
                  label: "KPI Summary",
                },
                {
                  key: "/KPI-master",
                  label: "KPI Master",
                },
                {
                  key: "/kPI-report",
                  label: "KPI Report",
                },
                // {
                //   key: "/report-details",
                //   label: "Report Details",
                // },
                {
                  key: "/KPI-target",
                  label: "KPI Target",
                },
              ],
            },
            // {
            //   key: "/product",
            //   className: "",
            //   icon: (
            //     <GiTeamIdea
            //       className={`${
            //         collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
            //       }`}
            //     />
            //   ),
            //   label: <div>Product Management</div>,
            //   children: [
            //     {
            //       key: "/product-list",
            //       label: "View Products",
            //     },
            //     {
            //       key: "/stock-take",
            //       label: "Stock Take",
            //     },
            //   ],
            // },
            {
              key: "/settings/taxes",
              className: "",
              icon: (
                <IoMdSettings
                  className={`${
                    collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                  }`}
                />
              ),
              label: <div>Settings</div>,
            },
            role === 1
              ? {
                  key: "/roles-permissions",
                  icon: (
                    <BsClipboard2CheckFill
                      className={
                        collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                      }
                    />
                  ),
                  label: <div>Roles & Permissions</div>,
                }
              : null, // If role !== 1, return `null`
            {
              key: "/sales-journey-plan",
              className: "",
              icon: (
                <RiCustomerService2Fill
                  className={`${
                    collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                  }`}
                />
              ),
              label: <div>Sales Journey Plan</div>,
            },
          ].filter(Boolean)}
        />
        {getSiderWidth() > 70 && (
          <div className="w-full flex px-4 cursor-pointer  justify-center items-center">
            <img className="py-5" src={"/Banner.svg"} />
          </div>
        )}
      </Sider>

      <Layout>
        <Header
          className={`flex justify-between items-center ${getMarginLeft()} transition-all duration-300 `}
          style={{
            padding: 0,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className="flex items-center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "17px",
                width: 54,
                height: 54,
              }}
            />
            <div className="text-2xl first-letter:uppercase font-semibold max-sm:hidden">
              {currentPage}
            </div>
          </div>
          <div className="flex items-center">
            <div className="relative">
              <IoMdNotificationsOutline className="text-[#008444] mr-6 text-xl" />
              <div className="bg-red-500 h-3 w-3 rounded-full absolute top-0 left-3 flex justify-center items-center text-[9px] text-white">
                1
              </div>
            </div>
            <Dropdown
              className="profile-dropdown ml-auto"
              menu={{ items }}
              placement="top"
              arrow
            >
              <div className="flex h-[54px] w-full md:w-fit  leading-3 items-center cursor-pointer">
                <div>
                  <img
                    src={`${
                      lastPersonData?.image
                        ? lastPersonData?.image
                        : "/logo.png"
                    }`}
                    alt=""
                    className={`h-10 w-10 ${
                      lastPersonData?.image ? "rounded-full" : ""
                    }`}
                  />
                </div>
                <div>
                  <div className="ml-1  font-manrope">
                    <p className="text-[11px] font-semibold leading-3">
                      {lastPersonData?.firstName}
                      {lastPersonData?.lastName}
                    </p>
                    <p className="mt-[2px] text-[10px] leading-3">
                      {lastPersonData?.role}
                    </p>
                  </div>
                </div>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content
          className={`${getMarginLeft()} transition-all duration-300 `}
          style={{
            padding: 1,
            minHeight: "calc(100vh - 65px)",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
