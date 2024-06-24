import { useParams } from 'react-router-dom';
import EditUserForm from './EditUserForm';
import { useGetUsersQuery } from './usersApiSlice';
import { PuffLoader } from 'react-spinners';
import useTitle from '../../hooks/useTitle';

const EditUser = () => {
	useTitle('Редактирование пользователя');
	const { id } = useParams();

	const { user } = useGetUsersQuery('usersList', {
		selectFromResult: ({ data }) => ({
			user: data?.entities[id],
		}),
	});

	if (!user) return <PuffLoader color={'#FFF'} />;

	return <EditUserForm user={user} />;
};
export default EditUser;
