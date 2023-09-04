import { HashLink } from "react-router-hash-link";

function NavTab() {
	return (
		<section className="navtab">
			<div className="navtab__links">
				<HashLink to="#aboutproject" className="navtab__link">
					О проекте
				</HashLink>
				<HashLink to="#techs" className="navtab__link">
					Технологии
				</HashLink>
				<HashLink to="#aboutme" className="navtab__link">
					Студент
				</HashLink>
			</div>
		</section>
	);
}

export default NavTab;
