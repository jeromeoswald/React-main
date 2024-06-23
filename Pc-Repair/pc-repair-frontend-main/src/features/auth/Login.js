import { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useLoginMutation } from './authApiSlice';
import usePersist from '../../hooks/usePersist';
import { PuffLoader } from 'react-spinners';
import useTitle from '../../hooks/useTitle';

const Login = () => {
	useTitle('Log in to your account');
	const userRef = useRef();
	const errRef = useRef();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [persist, setPersist] = usePersist();

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [login, { isLoading }] = useLoginMutation();

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setErrMsg('');
	}, [username, password]);

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const { accessToken } = await login({ username, password }).unwrap();
			dispatch(setCredentials({ accessToken }));
			setUsername('');
			setPassword('');
			navigate('/dash');
		} catch (err) {
			if (!err.status) {
				setErrMsg('No response from the server');
			} else if (err.status === 400) {
				setErrMsg(err.data?.message);
			} else if (err.status === 401) {
				setErrMsg(err.data?.message);
			} else {
				setErrMsg(err.data?.message);
			}
			errRef.current.focus();
		}
	};

	const handleUserInput = e => setUsername(e.target.value);
	const handlePwdInput = e => setPassword(e.target.value);
	const handleTogglePersist = () => setPersist(prev => !prev);

	const errClass = errMsg ? 'errmsg' : 'offscreen';

	if (isLoading) return <PuffLoader color={'#FFF'} />;

	return (
		<section className="public">
			<header>
				<h1>Employee login</h1>
			</header>
			<main className="login">
				<p ref={errRef} className={errClass} aria-live="assertive">
					{errMsg}
				</p>

				<form className="form" onSubmit={handleSubmit}>
					<label htmlFor="username">Username:</label>
					<input
						className="form__input"
						type="text"
						id="username"
						ref={userRef}
						value={username}
						onChange={handleUserInput}
						autoComplete="off"
						required
					/>

					<label htmlFor="password">Password:</label>
					<input
						className="form__input"
						type="password"
						id="password"
						onChange={handlePwdInput}
						value={password}
						required
					/>
					<label htmlFor="persist" className="form__persist">
						<input
							type="checkbox"
							className="form__checkbox"
							id="persist"
							onChange={handleTogglePersist}
							checked={persist}
						/>
						Remember me
					</label>
					<button className="form__submit-button">Sign in</button>
				</form>
			</main>
			<footer>
				<Link to="/">Return to the main page</Link>
			</footer>
		</section>
	);
};
export default Login;
