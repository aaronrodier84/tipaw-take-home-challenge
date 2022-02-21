export default interface IUser {
  id?: any | null,
  first_name?: string | null,
  last_name?: string | null,
  phone?: string | null,
  email?: string,
  password?: string,
  roles?: Array<string>
}