import { uuid } from "uuidv4";
import { ICreateProviderDTO } from "../../dto/ICreateProviderDTO";
import Provider from "../../entities/Provider";
import IProvidersRepository from "../IProvidersRepository";

class fakeProvidersRepository implements IProvidersRepository {
  private providers: Provider[] = [];

  register(data: ICreateProviderDTO): Promise<Provider> {
    return new Promise((resolve, reject) => {

      const { availability, images, location, size } = data;
      if (!availability || !images || !location || !size) {
        reject(new Error("Dados insuficientes para a criação de um Provider"))
      }

      const provider = new Provider({ id: uuid(), ...data });

      this.providers.push(provider);

      resolve(provider);
    });
  }

}

export default fakeProvidersRepository;
