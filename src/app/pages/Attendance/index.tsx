import { useNavbar } from '@/shared/components/Navbar/hooks/useNavbar';
import { Navbar } from '@/shared/components/Navbar/Navbar';
import { Template } from '@/shared/layout/template/template';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Attendance() {

  const { attendanceId } = useParams();
	const { setActions } = useNavbar('navbar');

	useEffect(() => {
		setActions([
			<Navbar.Link to='/' variant='text' color='slate'>Agenda</Navbar.Link>,
			<Navbar.Link to='/exames' variant='text' color='slate'>Exames</Navbar.Link>,
		]);
	}, [setActions]);

	return (
		<Template.Root sidebar={<Navbar.Root devices={[{ view: 'mobile', enabled: false }, { view: 'default', context: 'navbar', enabled: true }]}></Navbar.Root>}>
      <div className="p-4">
        <h1 className="text-xl font-bold">Atendimento {attendanceId}</h1>
      </div>
    </Template.Root>
	);
}
