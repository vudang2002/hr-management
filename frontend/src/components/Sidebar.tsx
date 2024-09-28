import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white">
      <div className="p-6">
        <h1 className="text-2xl font-bold">HR DASHBOARD</h1>
      </div>
      <nav>
        <ul>
          <li className="p-4 hover:bg-gray-700">
            <Link href="/admin">Trang Chủ</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link href="/messages">Message</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link href="/candidates">Ứng Viên</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link href="/employees">Nhân Viên</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link href="/reports">Báo Cáo</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link href="/settings">Cài Đặt</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
