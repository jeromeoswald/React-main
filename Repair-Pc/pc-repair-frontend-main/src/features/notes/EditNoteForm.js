import { useEffect, useState } from 'react';
import { useDeleteNoteMutation, useUpdateNoteMutation } from './notesApiSlice';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../hooks/useAuth';

const EditNoteForm = ({ note, users }) => {
	const { isManager, isAdmin } = useAuth();
	const [updateNote, { isLoading, isSuccess, isError, error }] = useUpdateNoteMutation();

	const [deleteNote, { isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError }] =
		useDeleteNoteMutation();

	const navigate = useNavigate();

	const [title, setTitle] = useState(note.title);
	const [text, setText] = useState(note.text);
	const [completed, setCompleted] = useState(note.completed);
	const [userId, setUserId] = useState(note.user);

	useEffect(() => {
		if (isSuccess || isDeleteSuccess) {
			setTitle('');
			setText('');
			setUserId('');
			navigate('/dash/notes');
		}
	}, [isSuccess, isDeleteSuccess, navigate]);

	const onTitleChanged = e => setTitle(e.target.value);
	const onTextChanged = e => setText(e.target.value);
	const onCompletedChanged = () => setCompleted(prev => !prev);
	const onUserIdChanged = e => setUserId(e.target.value);

	const canSave = [title, text, userId].every(Boolean) && !isLoading;

	const onSaveNoteClicked = async () => {
		if (canSave) {
			await updateNote({ id: note.id, user: userId, title, text, completed });
		}
	};

	const onDeleteNoteClicked = async () => {
		await deleteNote({ id: note.id });
	};

	const created = new Date(note.createdAt).toLocaleString('ru-RU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
	});
	const updated = new Date(note.updatedAt).toLocaleString('ru-RU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
	});

	const options = users.map(user => {
		return (
			<option key={user.id} value={user.id}>
				{' '}
				{user.username}
			</option>
		);
	});

	const errClass = isError || isDeleteError ? 'errmsg' : 'offscreen';
	const validTitleClass = !title ? 'form__input--incomplete' : '';
	const validTextClass = !text ? 'form__input--incomplete' : '';

	const errContent = (error?.data?.message || deleteError?.data?.message) ?? '';

	let deleteButton = null;
	if (isManager || isAdmin) {
		deleteButton = (
			<button className="icon-button" title="Удалить" onClick={onDeleteNoteClicked}>
				<FontAwesomeIcon icon={faTrashCan} />
			</button>
		);
	}

	return (
		<>
			<p className={errClass}>{errContent}</p>

			<form className="form" onSubmit={e => e.preventDefault()}>
				<div className="form__title-row">
					<h2>Редактирование заметки #{note.ticket}</h2>
					<div className="form__action-buttons">
						<button
							className="icon-button"
							title="Сохранить"
							onClick={onSaveNoteClicked}
							disabled={!canSave}
						>
							<FontAwesomeIcon icon={faSave} />
						</button>
						{deleteButton}
					</div>
				</div>
				<label className="form__label" htmlFor="note-title">
					Заголовок:
				</label>
				<input
					className={`form__input ${validTitleClass}`}
					id="note-title"
					name="title"
					type="text"
					autoComplete="off"
					value={title}
					onChange={onTitleChanged}
				/>

				<label className="form__label" htmlFor="note-text">
					Текст:
				</label>
				<textarea
					className={`form__input form__input--text ${validTextClass}`}
					id="note-text"
					name="text"
					value={text}
					onChange={onTextChanged}
				/>
				<div className="form__row">
					<div className="form__divider">
						<label
							className="form__label form__checkbox-container"
							htmlFor="note-completed"
						>
							Выполнено:
							<input
								className="form__checkbox"
								id="note-completed"
								name="completed"
								type="checkbox"
								checked={completed}
								onChange={onCompletedChanged}
							/>
						</label>

						<label
							className="form__label form__checkbox-container"
							htmlFor="note-username"
						>
							Исполнитель:
						</label>
						<select
							id="note-username"
							name="username"
							className="form__select"
							value={userId}
							onChange={onUserIdChanged}
						>
							{options}
						</select>
					</div>
					<div className="form__divider">
						<p className="form__created">
							Создана:
							<br />
							{created}
						</p>
						<p className="form__updated">
							Обновлена:
							<br />
							{updated}
						</p>
					</div>
				</div>
			</form>
		</>
	);
};

export default EditNoteForm;
