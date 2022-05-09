import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { TrainersService } from 'src/trainers/trainers.service';
import { SessionsService } from 'src/sessions/sessions.service';
import { InbodiesService } from 'src/inbodies/inbodies.service';
import { Inbody } from 'src/inbodies/entities/inbody.entity';
import { SessionHistory } from 'src/session-histories/entities/session-history.entity';
import { SessionHistoriesService } from 'src/session-histories/session-histories.service';
import GeneralStatusTypes from 'src/types/generalStatus.types';
import { UpdatePasswordUserInput } from './dto/updatePassword-user.input';
import { Session } from 'src/sessions/entities/session.entity';
import { CreateSocialUserInput } from './dto/create-socialUser.input';
import { Trainer } from 'src/trainers/entities/trainer.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @Inject(forwardRef(() => TrainersService))
    private trainersService: TrainersService,
    @Inject(forwardRef(() => SessionsService))
    private sessionsService: SessionsService,
    @Inject(forwardRef(() => InbodiesService))
    private inbodiesService: InbodiesService,
    @Inject(forwardRef(() => SessionHistoriesService))
    private sessionHistoriesService: SessionHistoriesService,
  ) {}

  async create(
    createUserInput: CreateUserInput,
  ): Promise<Omit<User, 'password' | 'dbPasswordSalt'>> {
    try {
      const user = await this.findOneByEmail(createUserInput.email);
      const trainer = await this.trainersService.findOneByEmail(
        createUserInput.email,
      );

      if (user || trainer) {
        throw new Error('This email is already in use.');
      }

      const newUser = this.usersRepository.create(createUserInput);
      const salt = await bcrypt.genSalt();
      const newUserPassword = newUser.password;
      const hash = await bcrypt.hash(newUserPassword, salt);
      newUser.dbPasswordSalt = salt;
      newUser.password = hash;
      const { password, dbPasswordSalt, ...savedNewUser } =
        await this.usersRepository.save(newUser);
      return savedNewUser;
    } catch (err) {
      throw err;
    }
  }

  async createSocialUser(
    createSocialUserInput: CreateSocialUserInput,
  ): Promise<User> {
    try {
      const user = await this.findOneByEmail(createSocialUserInput.email);
      const trainer = await this.trainersService.findOneByEmail(
        createSocialUserInput.email,
      );

      if (user || trainer) {
        throw new Error('This email is already in use.');
      }

      const newUser = this.usersRepository.create(createSocialUserInput);
      return await this.usersRepository.save(newUser);
    } catch (err) {
      throw err;
    }
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      where: { status: GeneralStatusTypes.ACTIVE },
    });
  }

  findOneById(id: number): Promise<User> {
    return this.usersRepository.findOneOrFail({
      where: { id, status: GeneralStatusTypes.ACTIVE },
    });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email, status: GeneralStatusTypes.ACTIVE },
    });
  }

  findOneByPhoneNumber(
    trainerId: number | null,
    phoneNumber: string,
  ): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { trainerId, phoneNumber, status: GeneralStatusTypes.ACTIVE },
    });
  }

  findAllByTrainerId(trainerId: number): Promise<User[]> {
    return this.usersRepository.find({
      where: { trainerId, status: GeneralStatusTypes.ACTIVE },
    });
  }

  findAllSessionsByUserId(userId: number): Promise<Session[]> {
    return this.sessionsService.findAllByUserId(userId);
  }

  findAllByUserCategoryId(userCategoryId: number): Promise<User[]> {
    return this.usersRepository.find({ userCategoryId });
  }

  findAllInbodiesByUserId(userId: number): Promise<Inbody[]> {
    return this.inbodiesService.findAllByUserId(userId);
  }

  findAllSessionHistoriesByUserId(userId: number): Promise<SessionHistory[]> {
    return this.sessionHistoriesService.findAllByUserId(userId);
  }

  async update(updateUserInput: UpdateUserInput): Promise<User> {
    const newUser = await this.findOneById(updateUserInput.id);
    return this.usersRepository.save({ ...newUser, ...updateUserInput });
  }

  async updatePasswordUser(
    updatePasswordUserInput: UpdatePasswordUserInput,
  ): Promise<Omit<User, 'password' | 'dbPasswordSalt'>> {
    const id = updatePasswordUserInput.id;
    const user = await this.findOneById(id);
    const currPassword = await this.findPasswordByEmailUsingQueryBuilder(
      user.email,
    );
    const checkPassword = await bcrypt.compare(
      updatePasswordUserInput.prevPassword,
      currPassword,
    );
    if (!checkPassword) {
      throw new Error('Invalid Password.');
    }

    const findSelectUser = await this.usersRepository
      .createQueryBuilder('users')
      .where('users.id = :id', { id })
      .addSelect('users.dbPasswordSalt')
      .getOne();

    const updatePassword = await bcrypt.hash(
      updatePasswordUserInput.nowPassword,
      findSelectUser.dbPasswordSalt,
    );

    const { password, dbPasswordSalt, ...savedUser } =
      await this.usersRepository.save({
        ...findSelectUser,
        password: updatePassword,
      });
    return savedUser;
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOneById(id);
    user.status = GeneralStatusTypes.REMOVED;
    return this.usersRepository.save(user);
  }

  // TODO: add guard for trainer
  async removeTrainerId(id: number): Promise<User> {
    const user = await this.findOneById(id);
    user.trainerId = null;
    return this.usersRepository.save(user);
  }

  // TODO: add guard for trainer
  async bulkRemoveTrainerId(trainerId: number, ids: number[]): Promise<User[]> {
    await this.usersRepository.update(
      {
        trainerId,
        id: In(ids),
      },
      { trainerId: null },
    );
    return this.usersRepository.find({ where: { id: In(ids), trainerId } });
  }

  async findPasswordByEmailUsingQueryBuilder(email: string): Promise<any> {
    const user = await this.usersRepository
      .createQueryBuilder('users')
      .where('users.email = :email', { email })
      .addSelect('users.password')
      .getOne();
    return user.password;
  }

  async canMutate(currentUser: User | Trainer, id: number): Promise<boolean> {
    if (currentUser instanceof Trainer) return false;

    const user = await this.usersRepository.findOneOrFail(id);
    return user.id === currentUser.id;
  }
}
