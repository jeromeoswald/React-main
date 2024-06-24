import { useGetUsersQuery } from './usersApiSlice';
import User from './User';
import { PuffLoader } from 'react-spinners';
import useTitle from '../../hooks/useTitle';

const UsersList = () => {
	useTitle('Список пользователей');
	const {
		data: users,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetUsersQuery('usersList', {
		pollingInterval: 60000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	});

	let content;

	if (isLoading) content = <PuffLoader color={'#FFF'} />;

	if (isError) {
		content = <p className="errmsg">{error?.data?.message}</p>;
	}

	if (isSuccess) {
		const { ids } = users;

		const tableContent =
			ids?.length && ids.map(userId => <User key={userId} userId={userId} />);

		content = (
			<table className="table table--users">
				<thead className="table__thead">
					<tr>
						<th scope="col" className="table__th user__username">
							Username
						</th>
						<th scope="col" className="table__th user__roles">
							Роли
						</th>
						<th scope="col" className="table__th user__edit">
							Редактирован
						</th>
					</tr>
				</thead>
				<tbody>{tableContent}</tbody>
			</table>
		);
	}

	return content;
};
export default UsersList;
