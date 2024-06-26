import { useParams } from 'react-router-dom';
import EditNoteForm from './EditNoteForm';
import { useGetNotesQuery } from './notesApiSlice';
import { useGetUsersQuery } from '../users/usersApiSlice';
import useAuth from '../../hooks/useAuth';
import { PuffLoader } from 'react-spinners';
import useTitle from '../../hooks/useTitle';

const EditNote = () => {
	useTitle('Editing note');
	const { id } = useParams();

	const { username, isManager, isAdmin } = useAuth();

	const { note } = useGetNotesQuery('notesList', {
		selectFromResult: ({ data }) => ({
			note: data?.entities[id],
		}),
	});

	const { users } = useGetUsersQuery('usersList', {
		selectFromResult: ({ data }) => ({
			users: data?.ids.map(id => data?.entities[id]),
		}),
	});

	if (!note || !users?.length) return <PuffLoader color={'#FFF'} />;

	if (!isManager && !isAdmin) {
		if (note.username !== username) {
			return <p className="errmsg">Access denied</p>;
		}
	}

	return <EditNoteForm note={note} users={users} />;
};
export default EditNote;
