import { useGetNotesQuery } from './notesApiSlice';
import Note from './Note';
import useAuth from '../../hooks/useAuth';
import { PuffLoader } from 'react-spinners';
import useTitle from '../../hooks/useTitle';

const NotesList = () => {
	useTitle('Список заметок');
	const { username, isManager, isAdmin } = useAuth();
	const {
		data: notes,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetNotesQuery('notesList', {
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
		const { ids, entities } = notes;

		let filteredIds;
		if (isManager || isAdmin) {
			filteredIds = [...ids];
		} else {
			filteredIds = ids.filter(noteId => entities[noteId].username === username);
		}

		const tableContent =
			ids?.length && filteredIds.map(noteId => <Note key={noteId} noteId={noteId} />);

		content = (
			<table className="table table--notes">
				<thead className="table__thead">
					<tr>
						<th scope="col" className="table__th note__status">
							Username
						</th>
						<th scope="col" className="table__th note__created">
							Создана
						</th>
						<th scope="col" className="table__th note__updated">
							Обновлено
						</th>
						<th scope="col" className="table__th note__title">
							заголовок
						</th>
						<th scope="col" className="table__th note__username">
							Исполнитель
						</th>
						<th scope="col" className="table__th note__edit">
							Редактировать
						</th>
					</tr>
				</thead>
				<tbody>{tableContent}</tbody>
			</table>
		);
	}

	return content;
};
export default NotesList;
