import { Prop } from '@nestjs/mongoose';
import { Area } from '../../models/Area.model';

export class AreaEntity {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  constructor(id: string, name: string) {
    this._id = id;
    this.name = name;
  }

  static toDomain(areaEntity: AreaEntity): Area {
    return Area.load(areaEntity._id, areaEntity.name);
  }

  static fromDomain(area: Area): AreaEntity {
    return new AreaEntity(area.id, area.name);
  }
}