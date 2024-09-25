export class ClientAlreadyExistsError extends Error {
    constructor() {
        super('Existe um cliente cadastrado com o mesmo email.')
    }
}