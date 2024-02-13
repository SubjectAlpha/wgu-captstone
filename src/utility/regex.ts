export const UUIDRegex = RegExp(
	/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
);
export const EmailRegex = RegExp(
	/^[a-zA-Z0-9._-]{2,}@[a-zA-Z0-9.-]{2,63}\.[a-zA-Z]{2,4}$/i
);
export const PasswordRegex = RegExp(
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i
);
export const PasswordComplexityMessage =
	"Your password must contain at minimum: eight characters, one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).";
