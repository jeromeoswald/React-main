import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useTitle from '../../hooks/useTitle';

const Welcome = () => {
	const { username, isManager, isAdmin } = useAuth();
	useTitle(`Notes: ${username}`);
	const date = new Date();
	const today = new Intl.DateTimeFormat('ru-RU', {
		dateStyle: 'full',
		timeStyle: 'short',
	}).format(date);

	return (
		<section className="welcome">
			<p>{today}</p>

			<h1>Welcome back {username}</h1>

			<p>
				<Link to="/dash/notes">Show Notes</Link>
			</p>

			<p>
				<Link to="/dash/notes/new">Add a New Note</Link>
			</p>

			{(isManager || isAdmin) && (
				<p>
					<Link to="/dash/users">Show User Settings</Link>
				</p>
			)}

			{(isManager || isAdmin) && (
				<p>
					<Link to="/dash/users/new">Add a New User</Link>
				</p>
			)}
		</section>
	);
};
export default Welcome;
