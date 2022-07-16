interface IUserDTO {
  id: string
  name: string
  email: string
  password: string
  vehicle_id?: string | false,
  provider_id?: string | false
}

export default IUserDTO;
