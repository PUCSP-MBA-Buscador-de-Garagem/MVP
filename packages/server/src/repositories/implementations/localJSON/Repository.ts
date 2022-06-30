import { randomUUID } from 'node:crypto';
import { promises as fs } from 'node:fs';

class Repository<Entity extends { id: string }> {
  constructor(private jsonFilePath: string) {}

  public async insert(data: Entity): Promise<void> {
    const entityCollection = await this.read();
    entityCollection.push(data);

    await this.save(entityCollection);
  }

  public async read(): Promise<Entity[]> {
    const bufferData = await fs.readFile(this.jsonFilePath, 'utf8');
    return JSON.parse(bufferData);
  }

  public async save(dataCollection: Entity[]): Promise<void> {
    const stringData = JSON.stringify(dataCollection);
    await fs.writeFile(this.jsonFilePath, stringData);
  }

  public async update(dataObj: Entity): Promise<void> {
    const entityCollection = await this.read();
    const foundItemIndex = entityCollection.findIndex((entity: Entity) => entity.id == dataObj.id);

    entityCollection[foundItemIndex] = dataObj;

    await this.save(entityCollection);
  }
}

export default Repository;
