import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "@/pages/dashboard";
import LoginPage from "@/pages/auth/login-page";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import Forgetpassword from "@/pages/auth/forget-password";
import CustomersDetails from "@/pages/customers/customers-list";
import TeamManagment from "@/pages/team-management/team-details";
import UsersManagment from "@/pages/users/users-details";
import MarketingManagment from "@/pages/marketing-collaterals/marketing-details";
import UpdateUserManagement from "@/pages/users/update-user-managment";
import RemoveTeamMembers from "@/pages/team-management/update-team-members-team-managment";
import OrdersList from "@/pages/sales-order/orders-list";
import OrdersDetails from "@/pages/sales-order/orders-details";
import ProductGrid from "@/pages/products/product-grid";
import ProductDetail from "@/pages/products/product-details";
import UpdateTeamMembers from "@/pages/team-management/update-team-members-team-managment";
import OtpForgetPassword from "@/pages/auth/OTP-validate";
import CreateNewPassword from "@/pages/auth/newpassword-confirmpassword";
import ComplaintListPage from "@/pages/complaints/complaint-list-page";
import SurveyDetails from "@/pages/survey/survey-details";
import SurveyResponseSummary from "@/pages/survey/survey-response-summary";
import SurveyResponseDetails from "@/pages/survey/survey-response-details";
import CreateResponse from "@/pages/survey/create-response";
import SurveyUpdate from "@/pages/survey/update-survey";
import SalesTargetListPage from "@/pages/sales-target/sales-target-list-page";
import ProtectedRoute from "./protected-routes";
import SalesActivityListPage from "@/pages/sales-activity/sales-activity-list-page";
import SurveyCreate from "@/pages/survey/Survey-create";
import EmailVerification from "@/pages/auth/Email-verification";
// import CreateCustomer from "@/components/modules/trade-customer/create-cutomer";
import DiscountForm from "@/components/modules/discounts/discount-form";
import ViewDiscounts from "@/pages/discount/view-discounts";
import SalesLocation from "@/pages/sales-routes/sales-location";
import CustomerEditProfile from "@/pages/customers/customer-edit-profile";
import CustomerDetailsProfile from "@/components/modules/trade-customer/customer-details-profile";
import SettingsPage from "@/pages/settings";
import MeetingsCalendar from "@/pages/meetings/view-meeting";
import TaxSettings from "@/components/modules/settings/taxes/tax-settings";
import StockTakeManagment from "@/pages/stock-take/stock-take";
import ProductList from "@/pages/products/product-list";
import PermissionManagement from "@/pages/permissions/permission-management";
import OrganizationChart from "@/pages/organization-chart/organization-chart";
import SalesPjp from "@/pages/sales-pjp/sales-pjp";
import CreateSalesPjP from "@/components/sales-pjp/create-sales-pjp";
import KpiManagment from "@/pages/Kpis/kpi";
import KpiDetails from "@/pages/Kpis/kpi-details";
import TeamMembersKpiDetails from "@/pages/team-management/team-members-kpi-details";
import AllKpiDetails from "@/pages/Kpis/all-kpi-details";
import UserKpiSummary from "@/pages/Kpis/user-kpi-summary";
import CommulativeKpiDetailsReport from "@/pages/Kpis/kpi-commulative-report";
import NationalSalesMAnagerKpiDetails from "@/pages/team-management/national-sales-manager-kpi-details";
import ReportMaster from "@/pages/Kpis/report-master";
import ReportTarget from "@/pages/Kpis/report-target";
import KpiMaster from "@/pages/Kpis/kpi-master";
import ReportDetails from "@/pages/Kpis/report-details";
import ReportDetailsId from "@/pages/Kpis/report-details-id";
import SalesPjpDetails from "@/pages/sales-pjp/sales-pjp-details";
const router = createBrowserRouter([
  {
    path: "/admin/forgot-password",
    element: <Forgetpassword />,
    index: true,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
        index: true,
      },

      {
        path: "/otpforgetpassword",
        element: <OtpForgetPassword />,
        index: true,
      },
      {
        path: "/createnewpassword",
        element: <CreateNewPassword />,
        index: true,
      },
      {
        path: "/auth/email-verification",
        element: <EmailVerification />,
        index: true,
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/survey-details/:id",
            element: <SurveyUpdate />,
          },
          {
            path: "/survey-create",
            element: <SurveyCreate />,
          },
          {
            path: "/stock-take",
            element: <StockTakeManagment />,
          },
          {
            path: "/survey-response-stats/:id",
            element: <SurveyResponseSummary />,
          },
          {
            path: "/survey-response/:id",
            element: <SurveyResponseDetails />,
          },
          {
            path: "/sales-pjp",
            element: <SalesPjp />,
          },
          {
            path: "/create-sales-journey",
            element: <CreateSalesPjP />,
          },
          {
            path: "/survey/:id/create-survey-response",
            element: <CreateResponse />,
          },
          {
            path: "/",
            element: <DashboardPage />,
          },
          {
            path: "/organizationchart",
            element: <OrganizationChart />,
          },

          {
            path: "/team",
            element: <TeamManagment />,
          },
          {
            path: "/kpi",
            element: <KpiManagment />,
          },
          {
            path: "/KPI-master",
            element: <KpiMaster />,
          },
          {
            path: "/KPI-report",
            element: <ReportMaster />,
          },
          {
            path: "/kPI-target",
            element: <ReportTarget />,
          },
          {
            path: "/report-details",
            element: <ReportDetails />,
          },
          {
            path: "/report-master/:id",
            element: <ReportDetailsId />,
          },
          {
            path: "/kpi-details/:id",
            element: <KpiDetails />,
          },
          {
            path: "/KPI-report/:id",
            element: <TeamMembersKpiDetails />,
          },
          {
            path: "/sales-person-kPI-report/:id",
            element: <NationalSalesMAnagerKpiDetails />,
          },
          {
            path: "/commulative-report",
            element: <CommulativeKpiDetailsReport />,
          },
          {
            path: "/team-details/:id",
            element: <UpdateTeamMembers />,
          },

          {
            path: "/user-details",
            element: <UsersManagment />,
          },
          {
            path: "/edit-profile/:id",
            element: <UpdateUserManagement />,
          },
          {
            path: "/order-list",
            element: <OrdersList />,
          },
          {
            path: "/orders-details/:id",
            element: <OrdersDetails />,
          },
          {
            path: "/product-list",
            element: <ProductList />,
          },
          {
            path: "/survey",
            element: <SurveyDetails />,
          },
          {
            path: "/stock-management",
            element: <ProductDetail />,
          },
          {
            path: "/order-details",
            element: <OrdersDetails />,
          },
          {
            path: "/team-remove",
            element: <RemoveTeamMembers />,
            index: true,
          },
          {
            path: "/trade-Customers",
            element: <CustomersDetails />,
          },
          {
            path: "/routes-monitoring",
            element: <SalesLocation />,
          },
          // {
          //   path: "/create-customer",
          //   element: <CreateCustomer />,
          // },
          {
            path: "/customer-details/:id",
            element: <CustomerDetailsProfile />,
          },
          {
            path: "/customer-edit-profile/:id",
            element: <CustomerEditProfile />,
          },
          {
            path: "/complaints",
            element: <ComplaintListPage />,
          },
          {
            path: "/marketing",
            element: <MarketingManagment />,
          },
          {
            path: "/sales-target",
            element: <SalesTargetListPage />,
          },
          {
            path: "/discounts",
            element: <ViewDiscounts />,
          },
          {
            path: "/discounts-create",
            element: <DiscountForm />,
          },
          {
            path: "/sales-activity",
            element: <SalesActivityListPage />,
          },
          {
            path: "/settings",
            element: <SettingsPage />,
          },

          {
            path: "/settings/taxes",
            element: <TaxSettings />,
          },

          {
            path: "/meetings",
            element: <MeetingsCalendar />,
          },
          {
            path: "/all-kpi-details",
            element: <AllKpiDetails />,
          },
          {
            path: "/roles-permissions",
            element: <PermissionManagement />,
          },
          {
            path: "/stock",
            element: <StockTakeManagment />,
          },
          {
            path: "/user-kpi-summary-details/:id",
            element: <UserKpiSummary />,
          },
          { path: "/sales-journey-plan", element: <SalesPjp /> },
          {
            path: "/sales-journey-plan/details/:id",
            element: <SalesPjpDetails />,
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <p>404 Error - Nothing here...</p>,
  },
]);

export default router;
