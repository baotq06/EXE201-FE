/* eslint-disable */
import React from "react";
import { useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./role/ProtectedRoute";

import Home from "./pages/home/Home";
import ConfirmOTP from "./pages/auth/confirmOTP/ConfirmOTP";
import ResetPassword from "./pages/auth/resetPassword/ResetPassword";
import ForgetPassword from "./pages/auth/forgetPassword/ForgetPassword";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import CreatedProduct from "./pages/product/createdProduct/CreatedProduct";
import EditProduct from "./pages/product/editProduct/EditProduct";
import ListProduct from "./pages/product/listProduct/ListProduct";
import ConfirmDeleteProduct from "./components/confirmDeleteProduct/ConfirmDeleteProduct";
import Information from "./pages/auth/information/Information";
import CreatedAgency from "./pages/agency/createdAgency/CreatedAgency";
import InforAgency from "./pages/agency/inforAgency/InforAgency";
import ListAgency from "./pages/agency/listAgency/ListAgency";
import InforProduct from "./pages/product/inforProduct/InforProduct";
import ListImportSlip from "./pages/importSlip/listImportSlip/ListImportSlip";
import CreatedImportSlip from "./pages/importSlip/createdImportSlip/CreatedImportSlip";
import InforImportSlip from "./pages/importSlip/inforImportSlip/InforImportSlip";
import ListExportSlip from "./pages/exportSlip/listExportSlip/ListExportSlip";
import CreatedExportSlip from "./pages/exportSlip/createdExportSlip/CreatedExportSlip";
import InforExportSlip from "./pages/exportSlip/inforExportSlip/InforExportSlip";
import CreatedInventory from "./pages/inventory/createdInventory/CreatedInventory";
import InforInventory from "./pages/inventory/inforInventory/InforInventory";
import ListInventory from "./pages/inventory/listInventory/ListInventory";
import ReportImport from "./pages/report/reportImport/ReportImport";
import ReportInventory from "./pages/report/reportInventory/ReportInventory";
import ReportEII from "./pages/report/reportExportImportInventory/ReportEII";
import AccessDenied from "./pages/accessDenied/AccessDenied";
import NotFound from "./pages/notFound/NotFound";

const App = () => {
  const routes = useRoutes([
    // Public routes (no login required)
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/forgot-password", element: <ForgetPassword /> },
    { path: "/confirm-OTP", element: <ConfirmOTP /> },
    { path: "/reset-password", element: <ResetPassword /> },
    { path: "/access-denied", element: <AccessDenied /> },

    // Protected routes
    {
      path: "/",
      element: (
        <ProtectedRoute userRole={localStorage.getItem("userRole")}>
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path: "/information/:userId",
      element: (
        <ProtectedRoute userRole={localStorage.getItem("userRole")}>
          <Information />
        </ProtectedRoute>
      ),
    },
    {
      path: "/createdProduct",
      element: (
        <ProtectedRoute userRole={localStorage.getItem("userRole")}>
          <CreatedProduct />
        </ProtectedRoute>
      ),
    },
    {
      path: "/editProduct/:productId",
      element: (
        <ProtectedRoute userRole={localStorage.getItem("userRole")}>
          <EditProduct />
        </ProtectedRoute>
      ),
    },
    {
      path: "/listProduct",
      element: (
        <ProtectedRoute userRole={localStorage.getItem("userRole")}>
          <ListProduct />
        </ProtectedRoute>
      ),
    },
    {
      path: "/infoProduct/:productId",
      element: (
        <ProtectedRoute userRole={localStorage.getItem("userRole")}>
          <InforProduct />
        </ProtectedRoute>
      ),
    },
    {
      path: "/confirmDeleteProduct",
      element: (
        <ProtectedRoute userRole={localStorage.getItem("userRole")}>
          <ConfirmDeleteProduct />
        </ProtectedRoute>
      ),
    },
    {
      path: "/createdAgency",
      element: (
        <ProtectedRoute userRole={localStorage.getItem("userRole")}>
          <CreatedAgency />
        </ProtectedRoute>
      ),
    },
    {
      path: "/inforAgency/:type/:supplyId",
      element: (
        <ProtectedRoute userRole={localStorage.getItem("userRole")}>
          <InforAgency />
        </ProtectedRoute>
      ),
    },
    {
      path: "/listAgency",
      element: (
        <ProtectedRoute userRole={localStorage.getItem("userRole")}>
          <ListAgency />
        </ProtectedRoute>
      ),
    },
    {
      path: "/listImportSlip/:type",
      element: (
        <ProtectedRoute userRole={localStorage.getItem("userRole")}>
          <ListImportSlip />
        </ProtectedRoute>
      ),
    },
    {
      path: "/createdImportSlip/:type",
      element: (
        <ProtectedRoute userRole={localStorage.getItem("userRole")}>
          <CreatedImportSlip />
        </ProtectedRoute>
      ),
    },
    {
      path: "/inforImportSlip/:importSlipId",
      element: (
        <ProtectedRoute userRole={localStorage.getItem("userRole")}>
          <InforImportSlip />
        </ProtectedRoute>
      ),
    },
    {
      path: "/listExportSlip/:type",
      element: (
        <ProtectedRoute userRole={localStorage.getItem("userRole")}>
          <ListExportSlip />
        </ProtectedRoute>
      ),
    },
    {
      path: "/createdExportSlip/:type",
      element: (
        <ProtectedRoute userRole={localStorage.getItem("userRole")}>
          <CreatedExportSlip />
        </ProtectedRoute>
      ),
    },
    {
      path: "/inforExportSlip/:exportSlipId",
      element: (
        <ProtectedRoute userRole={localStorage.getItem("userRole")}>
          <InforExportSlip />
        </ProtectedRoute>
      ),
    },
    {
      path: "/createdInventory",
      element: (
        <ProtectedRoute userRole={localStorage.getItem("userRole")}>
          <CreatedInventory />
        </ProtectedRoute>
      ),
    },
    {
      path: "/inforInventory/:recordInventoryId",
      element: (
        <ProtectedRoute userRole={localStorage.getItem("userRole")}>
          <InforInventory />
        </ProtectedRoute>
      ),
    },
    {
      path: "/listInventory",
      element: (
        <ProtectedRoute userRole={localStorage.getItem("userRole")}>
          <ListInventory />
        </ProtectedRoute>
      ),
    },
    {
      path: "/report-import",
      element: (
        <ProtectedRoute userRole={localStorage.getItem("userRole")}>
          <ReportImport />
        </ProtectedRoute>
      ),
    },
    {
      path: "/report-inventory",
      element: (
        <ProtectedRoute userRole={localStorage.getItem("userRole")}>
          <ReportInventory />
        </ProtectedRoute>
      ),
    },
    {
      path: "/report-export-import-inventory",
      element: (
        <ProtectedRoute userRole={localStorage.getItem("userRole")}>
          <ReportEII />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },

    { path: "*", element: <NotFound /> },
  ]);

  return (
    <>
      <ToastContainer />
      {routes}
    </>
  );
};

export default App;
