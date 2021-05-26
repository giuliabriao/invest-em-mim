export class AuthError extends Error {
  constructor(){
    super('Error with autentication token ')
  }
}