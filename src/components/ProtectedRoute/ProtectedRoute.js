import React from "react";
import { Navigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function ProtectedRoute({ element: Component, ...props }) {
	return props.loggedIn ? (
		<Component {...props} />
	) : (
		<Navigate to="/signin" replace />
	);
}
