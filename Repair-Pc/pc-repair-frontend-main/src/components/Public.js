import { Link } from 'react-router-dom';

const Public = () => {
	return (
		<section className="public">
			<header>
				<h1>
					Добро пожаловать <span className="nowrap">к нам в PC REPAIRS 😉</span>
				</h1>
			</header>
			<main className="public__main">
				<p>
					Мы расположены в красивом городе Гомель, компания PC Repairs предоставляет
					квалифицированный персонал, готовый удовлетворить ваши потребности в техническом
					ремонте.
				</p>
				<address className="public__addr">
					PC Repairs
					<br />
					Проспект ленина
					<br />
					город Гомель, 246005
					<br />
					<a href="tel:+37555555555">(375) 55-555-555</a>
				</address>
				<br />
				<p>Владелец: NikDoe</p>
			</main>
			<footer>
				<Link to="/login">Войти</Link>
			</footer>
		</section>
	);
};
export default Public;
