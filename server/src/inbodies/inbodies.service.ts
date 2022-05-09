import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

import { CreateInbodyInput } from './dto/create-inbody.input';
import { UpdateInbodyInput } from './dto/update-inbody.input';
import { Inbody } from './entities/inbody.entity';

@Injectable()
export class InbodiesService {
  constructor(
    @InjectRepository(Inbody) private inbodiesRepository: Repository<Inbody>,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
  ) {}

  create(createInbodyInput: CreateInbodyInput): Promise<Inbody> {
    const newInbody = this.inbodiesRepository.create(createInbodyInput);
    return this.inbodiesRepository.save(newInbody);
  }

  findAll(): Promise<Inbody[]> {
    return this.inbodiesRepository.find();
  }

  findOneById(id: number): Promise<Inbody> {
    return this.inbodiesRepository.findOneOrFail(id);
  }

  findAllByUserId(userId: number): Promise<Inbody[]> {
    return this.inbodiesRepository.find({ userId });
  }

  getUser(userId: number): Promise<User> {
    return this.usersService.findOneById(userId);
  }

  async update(updateInbodyInput: UpdateInbodyInput): Promise<Inbody> {
    const inbody = await this.inbodiesRepository.findOneOrFail(
      updateInbodyInput.id,
    );
    return this.inbodiesRepository.save({
      ...inbody,
      ...updateInbodyInput,
    });
  }

  async remove(id: number): Promise<Inbody> {
    const inbody = await this.inbodiesRepository.findOneOrFail(id);
    return this.inbodiesRepository.remove(inbody);
  }

  /**
   *
   * Helpers
   *
   */

  async canMutate(currentUser: User | Trainer, id: number): Promise<boolean> {
    if (currentUser instanceof Trainer) return false;

    const inbody = await this.inbodiesRepository.findOneOrFail(id);
    if (inbody.userId !== currentUser.id) {
      return false;
    }

    return true;
  }
}
