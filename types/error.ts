export class ExtendedError extends Error {
	statusCode: number

	constructor(message: string) {
		super(message)
		this.statusCode = 400
	}
}

export class MissingArgumentsError extends ExtendedError {
	constructor(message: string) {
		super(message)
		this.statusCode = 400
	}
}

export class NotImplementedError extends ExtendedError {
	constructor(message: string) {
		super(message)
		this.statusCode = 400
	}
}
