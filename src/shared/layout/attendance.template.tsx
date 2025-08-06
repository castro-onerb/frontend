import { Outlet } from 'react-router-dom';
import { AttendanceProvider } from '@/shared/hooks/medical-attendances/provider/AttendanceProvider';

export default function AttendanceLayout() {
  return (
    <AttendanceProvider>
      <Outlet />
    </AttendanceProvider>
  );
}
