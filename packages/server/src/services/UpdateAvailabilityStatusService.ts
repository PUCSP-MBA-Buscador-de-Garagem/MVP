import { inject, injectable } from "tsyringe";
import IProviderRepository from "../repositories/interfaces/IProviderRepository";
import AppError from "../utils/errors/AppError";

interface IRequest {
  provider_id: string;
  status: boolean;
}

@injectable()
class UpdateAvailabilityStatusService {
  constructor(
    @inject('ProviderRepository')
    private providerRepository: IProviderRepository,
  ) {}

  public async execute({ provider_id, status }: IRequest) {
    const provider = await this.providerRepository.findById(provider_id);
    if (!provider) throw new AppError('Provider does not exist on Database');

    if (provider.availability === status) throw new AppError(`Provider already is on status ${status}. No effect on provider.`);

    provider.availability = status;
    this.providerRepository.updateProvider(provider);
  }
}


export default UpdateAvailabilityStatusService;
