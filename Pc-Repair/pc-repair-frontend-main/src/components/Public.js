import { Link } from 'react-router-dom';

const Public = () => {
	return (
		<section className="public">
			<header>
				<h1>
					
				Welcome to <span className="nowrap"> PC REPAIRS 😉 How can I assist you today?</span>
				</h1>
			</header>
			<main className="public__main">
				<p>
				We are located in the beautiful city of TamilNadu. PC Repairs offers qualified personnel ready to meet your technical repair needs.
				</p>
				<address className="public__addr">
					PC Repairs
					<br />
					Tiruchirappalli
					<br />
					Tamil Nadu, 246005
					<br />
					<a href="tel:+91 9944011840">(91) 9944011840</a>
				</address>
				<br />
				<p>Owner: Jerome Oswald</p>
			</main>
			<footer>
				<Link to="/login">Sign in</Link>
			</footer>
		</section>
	);
};
export default Public;
