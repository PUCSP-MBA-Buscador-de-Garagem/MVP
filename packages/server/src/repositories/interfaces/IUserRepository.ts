import ICreateUserDTO from "../../dtos/ICreateUserDTO";
import User from "../../entities/User";

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  updateUser(user: User): Promise<User>;
}

export default IUserRepository;
