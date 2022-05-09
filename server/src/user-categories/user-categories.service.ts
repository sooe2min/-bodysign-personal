import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NonRegisteredUser } from 'src/non-registered-users/entities/non-registered-user.entity';
import { NonRegisteredUsersService } from 'src/non-registered-users/non-registered-users.service';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import { TrainersService } from 'src/trainers/trainers.service';
import GenderTypes from 'src/types/gender.types';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { getManager, Repository } from 'typeorm';
import { CreateUserCategoryInput } from './dto/create-user-category.input';
import { UpdateUserCategoryInput } from './dto/update-user-category.input';
import { UserCategory } from './entities/user-category.entity';

interface TLoungInfoResponse {
  userCategoryId: number;
  userCategoryName: string;
  userId: number;
  userName: string;
  gender: GenderTypes;
  usedCount: number;
  totalCount: number;
  hasUnreadMessages: boolean;
}

@Injectable()
export class UserCategoriesService {
  constructor(
    @InjectRepository(UserCategory)
    private userCategoriesRepository: Repository<UserCategory>,
    @Inject(forwardRef(() => TrainersService))
    private trainersService: TrainersService,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    @Inject(forwardRef(() => NonRegisteredUsersService))
    private nonRegisteredUsersService: NonRegisteredUsersService,
  ) {}

  create(
    createUserCategoryInput: CreateUserCategoryInput,
  ): Promise<UserCategory> {
    const newUserCategory = this.userCategoriesRepository.create(
      createUserCategoryInput,
    );
    return this.userCategoriesRepository.save(newUserCategory);
  }

  findAll(): Promise<UserCategory[]> {
    return this.userCategoriesRepository.find();
  }

  findOneById(id: number): Promise<UserCategory> {
    return this.userCategoriesRepository.findOneOrFail(id);
  }

  findAllByTrainerId(trainerId: number): Promise<UserCategory[]> {
    return this.userCategoriesRepository.find({ trainerId });
  }

  getTrainer(trainerId: number): Promise<Trainer> {
    return this.trainersService.findOneById(trainerId);
  }

  getUsers(id: number): Promise<User[]> {
    return this.usersService.findAllByUserCategoryId(id);
  }

  getNonRegisteredUsers(id: number): Promise<NonRegisteredUser[]> {
    return this.nonRegisteredUsersService.findAllByUserCategoryId(id);
  }

  async getLoungeInfo(trainerId: number): Promise<TLoungInfoResponse[]> {
    const entityManager = getManager();
    const data = await entityManager.query(`
    SELECT uc.id              as userCategoryId,
          uc.name            as userCategoryName,
          u.id               as userId,
          u.userName         as userName,
          u.gender           as gender,
          SUM(sh.usedCount)  as usedCount,
          SUM(sh.totalCount) as totalCount,
          CASE
              WHEN EXISTS(SELECT id FROM chats WHERE u.id = userId AND seen = false)
                  THEN true
              ELSE false
              END            as hasUnreadMessages
    FROM userCategories uc
          LEFT JOIN users u ON uc.id = u.userCategoryId
          LEFT JOIN sessionHistories sh ON u.id = sh.userId
    WHERE uc.trainerId = ${trainerId}
    GROUP BY u.id, uc.id
    ORDER BY uc.id, u.id
    `);
    return data;
  }

  async update(
    updateUserCategoryInput: UpdateUserCategoryInput,
  ): Promise<UserCategory> {
    const userCategory = await this.userCategoriesRepository.findOneOrFail(
      updateUserCategoryInput.id,
    );
    return this.userCategoriesRepository.save({
      ...userCategory,
      ...updateUserCategoryInput,
    });
  }

  async remove(id: number): Promise<UserCategory> {
    const userCategory = await this.userCategoriesRepository.findOneOrFail(id);
    return this.userCategoriesRepository.remove(userCategory);
  }

  /**
   *
   * Helpers
   *
   */

  async canMutate(currentUser: User | Trainer, id: number): Promise<boolean> {
    if (currentUser instanceof User) return false;

    const userCategory = await this.userCategoriesRepository.findOneOrFail(id);
    if (userCategory.trainerId !== currentUser.id) {
      return false;
    }

    return true;
  }

  async createDefault(trainerId: number) {
    const createParams = { trainerId };
    const userCategoryNames = ['다이어트', '바디프로필', '강남점', '선릉점'];
    const userCategories = await Promise.all(
      userCategoryNames.map((name) => this.create({ ...createParams, name })),
    );
    await this.userCategoriesRepository.save(userCategories);

    return true;
  }
}
