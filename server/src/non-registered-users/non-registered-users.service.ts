import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import { TrainersService } from 'src/trainers/trainers.service';
import { UserCategory } from 'src/user-categories/entities/user-category.entity';
import { UserCategoriesService } from 'src/user-categories/user-categories.service';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

import { CreateNonRegisteredUserInput } from './dto/create-non-registered-user.input';
import { UpdateNonRegisteredUserInput } from './dto/update-non-registered-user.input';
import { NonRegisteredUser } from './entities/non-registered-user.entity';

@Injectable()
export class NonRegisteredUsersService {
  constructor(
    @InjectRepository(NonRegisteredUser)
    private nonRegisteredUsersRepository: Repository<NonRegisteredUser>,
    @Inject(forwardRef(() => TrainersService))
    private trainersService: TrainersService,
    @Inject(forwardRef(() => UserCategoriesService))
    private userCategoriesService: UserCategoriesService,
  ) {}

  create(
    createNonRegisteredUserInput: CreateNonRegisteredUserInput,
  ): Promise<NonRegisteredUser> {
    const newNonRegisteredUser = this.nonRegisteredUsersRepository.create(
      createNonRegisteredUserInput,
    );
    return this.nonRegisteredUsersRepository.save(newNonRegisteredUser);
  }

  findAll(): Promise<NonRegisteredUser[]> {
    return this.nonRegisteredUsersRepository.find();
  }

  findOneById(id: number): Promise<NonRegisteredUser> {
    return this.nonRegisteredUsersRepository.findOneOrFail(id);
  }

  findAllByTrainerId(trainerId: number): Promise<NonRegisteredUser[]> {
    return this.nonRegisteredUsersRepository.find({ trainerId });
  }

  findAllByUserCategoryId(
    userCategoryId: number,
  ): Promise<NonRegisteredUser[]> {
    return this.nonRegisteredUsersRepository.find({ userCategoryId });
  }

  getTrainer(trainerId: number): Promise<Trainer> {
    return this.trainersService.findOneById(trainerId);
  }

  getUserCategory(userCategoryId: number): Promise<UserCategory> {
    return this.userCategoriesService.findOneById(userCategoryId);
  }

  async update(
    updateNonRegisteredUserInput: UpdateNonRegisteredUserInput,
  ): Promise<NonRegisteredUser> {
    const nonRegisteredUser =
      await this.nonRegisteredUsersRepository.findOneOrFail(
        updateNonRegisteredUserInput.id,
      );
    return this.nonRegisteredUsersRepository.save({
      ...nonRegisteredUser,
      ...updateNonRegisteredUserInput,
    });
  }

  async remove(id: number): Promise<NonRegisteredUser> {
    const nonRegisteredUser =
      await this.nonRegisteredUsersRepository.findOneOrFail(id);
    return this.nonRegisteredUsersRepository.remove(nonRegisteredUser);
  }

  /**
   *
   * Helpers
   *
   */

  async canMutate(currentUser: User | Trainer, id: number): Promise<boolean> {
    if (currentUser instanceof User) return false;

    const nonRegisteredUser =
      await this.nonRegisteredUsersRepository.findOneOrFail(id);
    if (nonRegisteredUser.trainerId !== currentUser.id) {
      return false;
    }

    return true;
  }
}
