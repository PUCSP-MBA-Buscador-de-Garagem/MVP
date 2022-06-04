interface IUserDTO {
  id: string
  name: string
  email: string
  password: string
  vehicle_id: string | false,
  provider_id: string | false
}

class User {
    id: string
    name: string
    email: string
    password: string
    vehicle_id: string | false
    provider_id: string | false

    constructor({ id, name, email, password }: IUserDTO) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.password = password;
      this.vehicle_id = false;
      this.provider_id = false;
    }
}

export default User;
