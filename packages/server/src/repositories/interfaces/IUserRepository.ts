import ICreateUserDTO from "../../dtos/ICreateUserDTO";
import User from "../../entities/User";

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  // findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  // findById(id: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
}

export default IUserRepository;
