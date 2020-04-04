import React from "react";
import { useLocation } from "react-router-dom";
import '../../../../public/css/notFound.css'

function NotFound() {
  const location = useLocation();

  return (
     <div id="notfound">
		<div className="notfound">
			<div className="notfound-404">
				<h1>Oops!</h1>
				<h2>404 - The Page <b>{location.pathname}</b> can't be found</h2>
			</div>
			<a href="/">Go TO Homepage</a>
		</div>
	</div>
  );
}

export default NotFound;