
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'th';

interface Translations {
  [key: string]: {
    en: string;
    th: string;
  };
}

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations: Translations = {
  'app.name': {
    en: 'PetFeed WMS',
    th: 'PetFeed WMS'
  },
  'nav.dashboard': {
    en: 'Dashboard',
    th: 'แดชบอร์ด'
  },
  'nav.stock': {
    en: 'Stock Update',
    th: 'อัพเดทสต๊อก'
  },
  'nav.receiving': {
    en: 'Receiving',
    th: 'รับสินค้า'
  },
  'nav.requestForPicking': {
    en: 'Request for Picking',
    th: 'ขอการหยิบสินค้า'
  },
  'nav.packingPTW': {
    en: 'Packing/PTW',
    th: 'บรรจุภัณฑ์/PTW'
  },
  'nav.settings': {
    en: 'Settings',
    th: 'ตั้งค่า'
  },
  'warehouse.current': {
    en: 'Current Warehouse',
    th: 'คลังสินค้าปัจจุบัน'
  },
  'warehouse.select': {
    en: 'Select a warehouse',
    th: 'เลือกคลังสินค้า'
  },
  'action.signOut': {
    en: 'Sign Out',
    th: 'ออกจากระบบ'
  },
  'settings.product': {
    en: 'Product',
    th: 'สินค้า'
  },
  'settings.location': {
    en: 'Location',
    th: 'ตำแหน่ง'
  },
  'settings.department': {
    en: 'Department & Staffs',
    th: 'แผนกและพนักงาน'
  },
  'settings.customer': {
    en: 'Customer',
    th: 'ลูกค้า'
  },
  'settings.vendor': {
    en: 'Vendor',
    th: 'ผู้ขาย'
  },
  'settings.transactionModel': {
    en: 'Transaction Model',
    th: 'โมเดลการทำธุรกรรม'
  },
  'settings.lotModel': {
    en: 'Lot Model',
    th: 'โมเดลล็อต'
  },
  'settings.permission': {
    en: 'Permission',
    th: 'การอนุญาต'
  },
  'settings.users': {
    en: 'Users',
    th: 'ผู้ใช้งาน'
  },
  'settings.usersDescription': {
    en: 'Manage system users and their permissions',
    th: 'จัดการผู้ใช้ระบบและสิทธิ์ของพวกเขา'
  },
  'common.loading': {
    en: 'Loading...',
    th: 'กำลังโหลด...'
  },
  'common.search': {
    en: 'Search...',
    th: 'ค้นหา...'
  },
  'common.filters': {
    en: 'Filters',
    th: 'ตัวกรอง'
  },
  'common.all': {
    en: 'All',
    th: 'ทั้งหมด'
  },
  'common.reset': {
    en: 'Reset',
    th: 'รีเซ็ต'
  },
  'common.apply': {
    en: 'Apply',
    th: 'นำไปใช้'
  },
  'common.noResults': {
    en: 'No results found.',
    th: 'ไม่พบผลลัพธ์'
  },
  'common.actions': {
    en: 'Actions',
    th: 'การดำเนินการ'
  },
  'common.viewDetails': {
    en: 'View Details',
    th: 'ดูรายละเอียด'
  },
  'common.edit': {
    en: 'Edit',
    th: 'แก้ไข'
  },
  'common.delete': {
    en: 'Delete',
    th: 'ลบ'
  },
  'common.addNew': {
    en: 'Add New',
    th: 'เพิ่มใหม่'
  },
  'common.close': {
    en: 'Close',
    th: 'ปิด'
  },
  'common.save': {
    en: 'Save',
    th: 'บันทึก'
  },
  'common.cancel': {
    en: 'Cancel',
    th: 'ยกเลิก'
  },
  'permission.userPermissions': {
    en: 'User Permissions',
    th: 'สิทธิ์ผู้ใช้'
  },
  'permission.userPermissionsDesc': {
    en: 'Manage user access permissions to different modules',
    th: 'จัดการสิทธิ์การเข้าถึงโมดูลต่างๆ ของผู้ใช้'
  },
  'permission.managePermissions': {
    en: 'Manage user permissions and access control for the system',
    th: 'จัดการสิทธิ์ผู้ใช้และการควบคุมการเข้าถึงระบบ'
  },
  'permission.name': {
    en: 'Name',
    th: 'ชื่อ'
  },
  'permission.firstName': {
    en: 'First Name',
    th: 'ชื่อ'
  },
  'permission.lastName': {
    en: 'Last Name',
    th: 'สกุล'
  },
  'permission.email': {
    en: 'Email',
    th: 'อีเมล'
  },
  'permission.position': {
    en: 'Position',
    th: 'ตำแหน่ง'
  },
  'permission.department': {
    en: 'Department',
    th: 'แผนก'
  },
  'permission.permissions': {
    en: 'Permissions',
    th: 'สิทธิ์'
  },
  'permission.status': {
    en: 'Status',
    th: 'สถานะ'
  },
  'permission.active': {
    en: 'Active',
    th: 'ใช้งาน'
  },
  'permission.inactive': {
    en: 'Inactive',
    th: 'ไม่ใช้งาน'
  },
  'permission.activeDesc': {
    en: 'User will be able to log in and access the system',
    th: 'ผู้ใช้จะสามารถเข้าสู่ระบบและเข้าถึงระบบได้'
  },
  'permission.addUser': {
    en: 'Add User',
    th: 'เพิ่มผู้ใช้'
  },
  'permission.addUserDesc': {
    en: 'Add a new user and set their permissions',
    th: 'เพิ่มผู้ใช้ใหม่และกำหนดสิทธิ์ของพวกเขา'
  },
  'permission.editUser': {
    en: 'Edit User',
    th: 'แก้ไขผู้ใช้'
  },
  'permission.editUserDesc': {
    en: 'Edit user information and permissions',
    th: 'แก้ไขข้อมูลผู้ใช้และสิทธิ์'
  },
  'permission.confirmDelete': {
    en: 'Confirm Deletion',
    th: 'ยืนยันการลบ'
  },
  'permission.deleteWarning': {
    en: 'Are you sure you want to delete this user',
    th: 'คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้นี้'
  },
  'permission.userName': {
    en: 'User Name',
    th: 'ชื่อผู้ใช้'
  },
  'permission.userDeleted': {
    en: 'User Deleted',
    th: 'ลบผู้ใช้แล้ว'
  },
  'permission.userDeletedDesc': {
    en: 'The user has been successfully deleted',
    th: 'ผู้ใช้ถูกลบเรียบร้อยแล้ว'
  },
  'permission.userAdded': {
    en: 'User Added',
    th: 'เพิ่มผู้ใช้แล้ว'
  },
  'permission.userAddedDesc': {
    en: 'The user has been successfully added',
    th: 'เพิ่มผู้ใช้เรียบร้อยแล้ว'
  },
  'permission.userUpdated': {
    en: 'User Updated',
    th: 'อัปเดตผู้ใช้แล้ว'
  },
  'permission.userUpdatedDesc': {
    en: 'The user has been successfully updated',
    th: 'อัปเดตผู้ใช้เรียบร้อยแล้ว'
  },
  'permission.selectPosition': {
    en: 'Select a position',
    th: 'เลือกตำแหน่ง'
  },
  'permission.selectDepartment': {
    en: 'Select a department',
    th: 'เลือกแผนก'
  },
  'permission.assignedPermissions': {
    en: 'Assigned Permissions',
    th: 'สิทธิ์ที่ได้รับมอบหมาย'
  },
  'permission.noPermissions': {
    en: 'No permissions assigned yet',
    th: 'ยังไม่ได้กำหนดสิทธิ์'
  },
  'permission.accessDenied': {
    en: 'Access Denied',
    th: 'การเข้าถึงถูกปฏิเสธ'
  },
  'permission.adminOnly': {
    en: 'This section is only accessible to administrators',
    th: 'ส่วนนี้สามารถเข้าถึงได้เฉพาะผู้ดูแลระบบเท่านั้น'
  },
  'permission.contactAdmin': {
    en: 'Please contact your administrator for access',
    th: 'โปรดติดต่อผู้ดูแลระบบของคุณเพื่อขอสิทธิ์การเข้าถึง'
  },
  'validation.nameRequired': {
    en: 'Name is required',
    th: 'จำเป็นต้องระบุชื่อ'
  },
  'validation.emailValid': {
    en: 'Please enter a valid email',
    th: 'กรุณาใส่อีเมลที่ถูกต้อง'
  },
  'validation.positionRequired': {
    en: 'Position is required',
    th: 'จำเป็นต้องระบุตำแหน่ง'
  },
  'validation.departmentRequired': {
    en: 'Department is required',
    th: 'จำเป็นต้องระบุแผนก'
  },
  'validation.required': {
    en: 'This field is required',
    th: 'จำเป็นต้องกรอกข้อมูลนี้'
  },
  'validation.email': {
    en: 'Please enter a valid email address',
    th: 'กรุณาใส่อีเมลที่ถูกต้อง'
  },
  'validation.minLength': {
    en: 'Must be at least 6 characters',
    th: 'ต้องมีอย่างน้อย 6 ตัวอักษร'
  },
  'permission.isAdmin': {
    en: 'Admin Status',
    th: 'สถานะผู้ดูแลระบบ'
  },
  'permission.yes': {
    en: 'Yes',
    th: 'ใช่'
  },
  'permission.no': {
    en: 'No',
    th: 'ไม่'
  },
  'permission.title': {
    en: 'User Permissions',
    th: 'สิทธิ์การใช้งานของผู้ใช้'
  },
  'permission.description': {
    en: 'Manage user access and permissions',
    th: 'จัดการการเข้าถึงและสิทธิ์ของผู้ใช้'
  },
  'permission.userDetails': {
    en: 'User Details',
    th: 'รายละเอียดผู้ใช้'
  },
  'permission.userDetailsDesc': {
    en: 'View detailed information about this user',
    th: 'ดูข้อมูลโดยละเอียดเกี่ยวกับผู้ใช้นี้'
  },
  'permission.deleteUser': {
    en: 'Delete User',
    th: 'ลบผู้ใช้'
  },
  'permission.deleteUserConfirmation': {
    en: 'Are you sure you want to delete this user? This action cannot be undone.',
    th: 'คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้นี้? การกระทำนี้ไม่สามารถยกเลิกได้'
  },
  // Location settings translations
  'location.title': {
    en: 'Location Management',
    th: 'การจัดการตำแหน่ง'
  },
  'location.addNew': {
    en: 'Add New Location',
    th: 'เพิ่มตำแหน่งใหม่'
  },
  'location.editLocation': {
    en: 'Edit Location',
    th: 'แก้ไขตำแหน่ง'
  },
  'location.deleteLocation': {
    en: 'Delete Location',
    th: 'ลบตำแหน่ง'
  },
  'location.warehouse': {
    en: 'Warehouse',
    th: 'คลังสินค้า'
  },
  'location.zone': {
    en: 'Zone',
    th: 'โซน'
  },
  'location.area': {
    en: 'Area',
    th: 'พื้นที่'
  },
  'location.subArea': {
    en: 'Sub Area',
    th: 'พื้นที่ย่อย'
  },
  'location.type': {
    en: 'Location Type',
    th: 'ประเภทตำแหน่ง'
  },
  'location.capacity': {
    en: 'Capacity',
    th: 'ความจุ'
  },
  'location.selectWarehouse': {
    en: 'Select Warehouse',
    th: 'เลือกคลังสินค้า'
  },
  'location.selectZone': {
    en: 'Select Zone',
    th: 'เลือกโซน'
  },
  'location.selectArea': {
    en: 'Select Area',
    th: 'เลือกพื้นที่'
  },
  'location.selectSubArea': {
    en: 'Select Sub Area',
    th: 'เลือกพื้นที่ย่อย'
  },
  'location.enterLocationId': {
    en: 'Enter Location ID',
    th: 'ป้อนรหัสตำแหน่ง'
  },
  'location.enterCapacity': {
    en: 'Enter Initial Capacity (%)',
    th: 'ป้อนความจุเริ่มต้น (%)'
  },
  
  // Stock update translations
  'stock.title': {
    en: 'Stock Update',
    th: 'อัพเดทสต็อก'
  },
  'stock.search': {
    en: 'Search stocks...',
    th: 'ค้นหาสต็อก...'
  },
  'stock.filters': {
    en: 'Filters',
    th: 'ตัวกรอง'
  },
  'stock.export': {
    en: 'Export',
    th: 'ส่งออก'
  },
  'stock.product': {
    en: 'Product',
    th: 'สินค้า'
  },
  'stock.quantity': {
    en: 'Quantity',
    th: 'จำนวน'
  },
  'stock.lastUpdate': {
    en: 'Last Update',
    th: 'อัพเดทล่าสุด'
  },

  // Common form actions
  'action.save': {
    en: 'Save',
    th: 'บันทึก'
  },
  'action.cancel': {
    en: 'Cancel',
    th: 'ยกเลิก'
  },
  'action.delete': {
    en: 'Delete',
    th: 'ลบ'
  },
  'action.edit': {
    en: 'Edit',
    th: 'แก้ไข'
  },
  'action.add': {
    en: 'Add',
    th: 'เพิ่ม'
  },
  'action.search': {
    en: 'Search',
    th: 'ค้นหา'
  },
  'action.clear': {
    en: 'Clear',
    th: 'ล้าง'
  },
  'action.confirm': {
    en: 'Confirm',
    th: 'ยืนยัน'
  },
  'action.update': {
    en: 'Update',
    th: 'อัพเดท'
  },

  // Messages
  'message.confirmDelete': {
    en: 'Are you sure you want to delete this item?',
    th: 'คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?'
  },
  'message.deleteSuccess': {
    en: 'Item deleted successfully',
    th: 'ลบรายการเรียบร้อยแล้ว'
  },
  'message.updateSuccess': {
    en: 'Updated successfully',
    th: 'อัพเดทเรียบร้อยแล้ว'
  },
  'message.addSuccess': {
    en: 'Added successfully',
    th: 'เพิ่มเรียบร้อยแล้ว'
  },
  'message.error': {
    en: 'An error occurred',
    th: 'เกิดข้อผิดพลาด'
  },
  'message.required': {
    en: 'This field is required',
    th: 'จำเป็นต้องกรอกข้อมูลนี้'
  },
  'message.loading': {
    en: 'Loading...',
    th: 'กำลังโหลด...'
  },
  'message.noData': {
    en: 'No data found',
    th: 'ไม่พบข้อมูล'
  },
  'message.selectOption': {
    en: 'Please select an option',
    th: 'กรุณาเลือกตัวเลือก'
  },

  // Validation messages - removed duplicate entry
  'validation.invalidFormat': {
    en: 'Invalid format',
    th: 'รูปแบบไม่ถูกต้อง'
  },
  // Note: validation.minLength was moved up to avoid duplication
  'validation.maxLength': {
    en: 'Must not exceed {0} characters',
    th: 'ต้องไม่เกิน {0} ตัวอักษร'
  },
  'validation.numberOnly': {
    en: 'Must be a number',
    th: 'ต้องเป็นตัวเลขเท่านั้น'
  },
  'profile.title': {
    en: 'My Profile',
    th: 'โปรไฟล์ของฉัน'
  },
  'profile.editProfile': {
    en: 'Edit Profile',
    th: 'แก้ไขโปรไฟล์'
  },
  'profile.updateProfileInfo': {
    en: 'Update your profile information',
    th: 'อัปเดตข้อมูลโปรไฟล์ของคุณ'
  },
  'profile.fullName': {
    en: 'Full Name',
    th: 'ชื่อเต็ม'
  },
  'profile.email': {
    en: 'Email',
    th: 'อีเมล'
  },
  'profile.jobTitle': {
    en: 'Job Title',
    th: 'ตำแหน่งงาน'
  },
  'profile.phone': {
    en: 'Phone',
    th: 'โทรศัพท์'
  },
  'profile.department': {
    en: 'Department',
    th: 'แผนก'
  },
  'ui.cancel': {
    en: 'Cancel',
    th: 'ยกเลิก'
  },
  'ui.save': {
    en: 'Save',
    th: 'บันทึก'
  },
  'profile.profileUpdated': {
    en: 'Profile Updated',
    th: 'อัปเดตโปรไฟล์แล้ว'
  },
  'profile.profileUpdateSuccess': {
    en: 'Your profile has been updated successfully',
    th: 'โปรไฟล์ของคุณได้รับการอัปเดตเรียบร้อยแล้ว'
  },
  'profile.preferences': {
    en: 'Preferences',
    th: 'การตั้งค่า'
  },
  'profile.customizeExperience': {
    en: 'Customize your experience',
    th: 'ปรับแต่งประสบการณ์ของคุณ'
  },
  'profile.darkMode': {
    en: 'Dark Mode',
    th: 'โหมดมืด'
  },
  'profile.darkModeDesc': {
    en: 'Toggle dark mode',
    th: 'สลับโหมดมืด'
  },
  'profile.compactMode': {
    en: 'Compact Mode',
    th: 'โหมดกะทัดรัด'
  },
  'profile.compactModeDesc': {
    en: 'Use a more compact layout',
    th: 'ใช้รูปแบบที่กะทัดรัดยิ่งขึ้น'
  },
  'profile.language': {
    en: 'Language',
    th: 'ภาษา'
  },
  'profile.selectLanguage': {
    en: 'Select your preferred language',
    th: 'เลือกภาษาที่คุณต้องการ'
  },
  'profile.receiveEmails': {
    en: 'Receive Emails',
    th: 'รับอีเมล'
  },
  'profile.receiveEmailsDesc': {
    en: 'Receive updates and notifications via email',
    th: 'รับการอัปเดตและการแจ้งเตือนทางอีเมล'
  },
  'profile.preferencesUpdated': {
    en: 'Preferences Updated',
    th: 'อัปเดตการตั้งค่าแล้ว'
  },
  'profile.preferencesUpdateSuccess': {
    en: 'Your preferences have been updated successfully',
    th: 'การตั้งค่าของคุณได้รับการอัปเดตเรียบร้อยแล้ว'
  },
  'profile.notifications': {
    en: 'Notifications',
    th: 'การแจ้งเตือน'
  },
  'profile.manageNotifications': {
    en: 'Manage your notification settings',
    th: 'จัดการการตั้งค่าการแจ้งเตือนของคุณ'
  },
  'profile.stockAlerts': {
    en: 'Stock Alerts',
    th: 'การแจ้งเตือนสต็อก'
  },
  'profile.stockAlertsDesc': {
    en: 'Receive alerts when stock levels are low',
    th: 'รับการแจ้งเตือนเมื่อระดับสต็อกต่ำ'
  },
  'profile.orderUpdates': {
    en: 'Order Updates',
    th: 'การอัปเดตคำสั่งซื้อ'
  },
  'profile.orderUpdatesDesc': {
    en: 'Receive updates on your orders',
    th: 'รับการอัปเดตเกี่ยวกับคำสั่งซื้อของคุณ'
  },
  'profile.shipmentNotifications': {
    en: 'Shipment Notifications',
    th: 'การแจ้งเตือนการจัดส่ง'
  },
  'profile.shipmentNotificationsDesc': {
    en: 'Receive notifications about shipments',
    th: 'รับการแจ้งเตือนเกี่ยวกับการจัดส่ง'
  },
  'profile.systemAlerts': {
    en: 'System Alerts',
    th: 'การแจ้งเตือนระบบ'
  },
  'profile.systemAlertsDesc': {
    en: 'Receive important system alerts',
    th: 'รับการแจ้งเตือนระบบที่สำคัญ'
  },
  'profile.dailyReports': {
    en: 'Daily Reports',
    th: 'รายงานประจำวัน'
  },
  'profile.dailyReportsDesc': {
    en: 'Receive daily reports',
    th: 'รับรายงานประจำวัน'
  },
  'profile.weeklyReports': {
    en: 'Weekly Reports',
    th: 'รายงานประจำสัปดาห์'
  },
  'profile.weeklyReportsDesc': {
    en: 'Receive weekly reports',
    th: 'รับรายงานประจำสัปดาห์'
  },
  'profile.notificationsUpdated': {
    en: 'Notifications Updated',
    th: 'อัปเดตการแจ้งเตือนแล้ว'
  },
  'profile.notificationsUpdateSuccess': {
    en: 'Your notification settings have been updated successfully',
    th: 'การตั้งค่าการแจ้งเตือนของคุณได้รับการอัปเดตเรียบร้อยแล้ว'
  },
  'action.changeLanguage': {
    en: 'Change Language',
    th: 'เปลี่ยนภาษา'
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language];
    }
    console.warn(`Translation missing for key: ${key}`);
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
