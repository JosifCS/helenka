/** The error that is thrown when the format of an argument is invalid,
 * or when a format string is not well formed. */
export class FormatError extends Error {}

/** The error that is thrown when the value of an argument is outside
 * the allowable range of values as defined by the invoked method. */
export class ArgumentOutOfRangeError extends Error {}

/** The error that is thrown when a null or undefined reference is passed to
 * a method that does not accept it as a valid argument. */
export class ArgumentNullError extends Error {}

/** The error that is thrown when a requested method or operation is not implemented. */
export class NotImplementedError extends Error {}

/** The error that is thrown when one of the arguments provided to a method is not valid. */
export class ArgumentsError extends Error {}

/** The error that is thrown when there is an attempt to dynamically
 * access a field that does not exist. If a field in a class library has
 * been removed or renamed, recompile any assemblies that reference that library. */
export class MissingFieldError extends Error {}
