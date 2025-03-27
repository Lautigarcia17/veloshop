export const ERROR_MESSAGES: { [key: string]:  string} = {
    EMAIL_IN_USE: "El correo electrónico ya está en uso",
    EMAIL_NOT_FOUND: "El correo electrónico no existe",
    INCORRECT_PASSWORD: "La contraseña es incorrecta",
    USER_NOT_FOUND: "Usuario no encontrado",
    LOGGED_OUT_SUCCESS: "Sesión cerrada con éxito",
    LOGOUT_ERROR: "Error al cerrar sesión",
    AUTH_CREATION_FAILED: "Error al crear el usuario en la autenticación",
    DB_SAVE_FAILED: "Error al guardar el usuario en la base de datos",
    INVALID_CREDENTIALS: "El correo electrónico o la contraseña son incorrectos",
    USER_DATA_MISSING: "Faltan datos del usuario",
    TOKEN_EXPIRED: "El token ha expirado",
    INVALID_TOKEN: "Token inválido",
    INTERNAL_SERVER_ERROR: "Error interno del servidor",
    NO_TOKEN_PROVIDED: "No se proporcionó un token",
    AUTHORIZATION_DENIED: "No hay token, acceso denegado",
    SET_CUSTOM_CLAIMS_FAILED: "Error al establecer los permisos personalizados del usuario"
};