import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useTitle from '../../hooks/useTitle';

const Welcome = () => {
	const { username, isManager, isAdmin } = useAuth();
	useTitle(`заметки: ${username}`);
	const date = new Date();
	const today = new Intl.DateTimeFormat('ru-RU', {
		dateStyle: 'full',
		timeStyle: 'short',
	}).format(date);

	return (
		<section className="welcome">
			<p>{today}</p>

			<h1>с возвращением {username}</h1>

			<p>
				<Link to="/dash/notes">Показать заметки</Link>
			</p>

			<p>
				<Link to="/dash/notes/new">Добавить новую заметку</Link>
			</p>

			{(isManager || isAdmin) && (
				<p>
					<Link to="/dash/users">Показать настройки пользователей</Link>
				</p>
			)}

			{(isManager || isAdmin) && (
				<p>
					<Link to="/dash/users/new">Добавить нового пользователя</Link>
				</p>
			)}
		</section>
	);
};
export default Welcome;
