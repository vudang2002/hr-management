# HR System

## Mô tả
HR System là một hệ thống quản lý nhân sự được xây dựng bằng TypeScript và Next.js cho phần frontend. Backend được phát triển bằng Node.js với thư viện Express, và MongoDB được sử dụng để lưu trữ dữ liệu. Hệ thống cung cấp các tính năng quản lý nhân viên, theo dõi yêu cầu nghỉ phép, xử lý lương thưởng và quản lý hồ sơ nhân viên.

## Tính năng chính
- Quản lý thông tin nhân viên
- Yêu cầu và phê duyệt nghỉ phép
- Quản lý bảng lương
- Xem và chỉnh sửa hồ sơ cá nhân của nhân viên

## Cài đặt

### Yêu cầu hệ thống
- Node.js >= 14.x
- MongoDB >= 4.x
- Git

### Các bước cài đặt

1. Clone repository:
  
   git clone https://github.com/vudang2002/hr-management.git
   cd hr-system
Cài đặt các package phụ thuộc:
npm install
Cấu hình file môi trường: Tạo file .env trong thư mục gốc và cấu hình các biến môi trường sau:

MONGODB_URI=<MongoDB Connection URI>
JWT_SECRET=<Your Secret Key>
Khởi động ứng dụng:

Chạy server phát triển:
npm run dev
Server sẽ chạy ở địa chỉ http://localhost:3000
