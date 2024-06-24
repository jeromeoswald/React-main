import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../features/auth/authSlice';
import jwtDecode from 'jwt-decode';

const useAuth = () => {
	const token = useSelector(selectCurrentToken);
	let isManager = false;
	let isAdmin = false;
	let status = 'Работник';

	if (token) {
		const decoded = jwtDecode(token);
		const { username, roles } = decoded.UserInfo;

		isManager = roles.includes('Управляющий');
		isAdmin = roles.includes('Администратор');

		if (isManager) status = 'Управляющий';
		if (isAdmin) status = 'Администратор';

		return { username, roles, status, isManager, isAdmin };
	}

	return { username: '', roles: [], isManager, isAdmin, status };
};
export default useAuth;
