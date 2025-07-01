export const ROLES = {
  STAFF: "staff",
  MANAGER: "manager",
};

export const PUBLIC_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/confirm-OTP",
];

export const ROUTE_PERMISSIONS = {
  // Trang tổng quan - chung cho tất cả
  "/": [ROLES.STAFF, ROLES.MANAGER],

  // Quản lý sản phẩm - chung cho tất cả
  "/information/:userId": [ROLES.STAFF, ROLES.MANAGER],
  "/createdProduct": [ROLES.STAFF, ROLES.MANAGER],
  "/editProduct/:productId": [ROLES.STAFF, ROLES.MANAGER],
  "/listProduct": [ROLES.STAFF, ROLES.MANAGER],
  "/infoProduct/:productId": [ROLES.STAFF, ROLES.MANAGER],
  "/confirmDeleteProduct": [ROLES.MANAGER],

  // Quản lý nguồn hàng - chung cho tất cả
  "/createdAgency": [ROLES.STAFF, ROLES.MANAGER],
  "/inforAgency/:type/:supplyId": [ROLES.STAFF, ROLES.MANAGER],
  "/listAgency": [ROLES.STAFF, ROLES.MANAGER],

  // Xuất nhập kho - chung cho tất cả
  "/listImportSlip/:type": [ROLES.STAFF, ROLES.MANAGER],
  "/createdImportSlip/:type": [ROLES.STAFF, ROLES.MANAGER],
  "/inforImportSlip/:importSlipId": [ROLES.STAFF, ROLES.MANAGER],
  "/listExportSlip/:type": [ROLES.STAFF, ROLES.MANAGER],
  "/createdExportSlip/:type": [ROLES.STAFF, ROLES.MANAGER],
  "/inforExportSlip/:exportSlipId": [ROLES.STAFF, ROLES.MANAGER],

  // Kiểm kê - chỉ manager
  "/createdInventory": [ROLES.MANAGER],
  "/inforInventory/:recordInventoryId": [ROLES.MANAGER],
  "/listInventory": [ROLES.MANAGER],

  // Báo cáo - chỉ manager
  "/report-import": [ROLES.MANAGER],
  "/report-inventory": [ROLES.MANAGER],
  "/report-export-import-inventory": [ROLES.MANAGER],
};
