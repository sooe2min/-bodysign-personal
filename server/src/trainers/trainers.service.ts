import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrainerInput } from './dto/create-trainer.input';
import { UpdateTrainerInput } from './dto/update-trainer.input';
import { Trainer } from './entities/trainer.entity';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { SessionsService } from 'src/sessions/sessions.service';
import { ExerciseCategoriesService } from 'src/exercise-categories/exercise-categories.service';
import { Session } from 'src/sessions/entities/session.entity';
import { ExerciseCategory } from 'src/exercise-categories/entities/exercise-category.entity';
import { NonRegisteredUser } from 'src/non-registered-users/entities/non-registered-user.entity';
import { NonRegisteredUsersService } from 'src/non-registered-users/non-registered-users.service';
import { UpdatePasswordTrainerInput } from './dto/updatePassword-trainer.input';
import { UserCategory } from 'src/user-categories/entities/user-category.entity';
import { UserCategoriesService } from 'src/user-categories/user-categories.service';
import { User } from 'src/users/entities/user.entity';
import GeneralStatusTypes from 'src/types/generalStatus.types';
import { SessionHistory } from 'src/session-histories/entities/session-history.entity';
import { SessionHistoriesService } from 'src/session-histories/session-histories.service';
import { CreateSocialTrainerInput } from './dto/create-socialTrainer.input';
import { TrainerInterestService } from 'src/trainer-interest/trainer-interest.service';
import { TrainerInterest } from 'src/trainer-interest/entities/trainerInterest.entity';
import { RefreshTokenService } from 'src/refresh-tokens/refresh-tokens.service';

@Injectable()
export class TrainersService {
  constructor(
    @InjectRepository(Trainer) private trainersRepository: Repository<Trainer>,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    @Inject(forwardRef(() => SessionsService))
    private sessionsService: SessionsService,
    @Inject(forwardRef(() => ExerciseCategoriesService))
    private exerciseCategoriesService: ExerciseCategoriesService,
    @Inject(forwardRef(() => NonRegisteredUsersService))
    private nonRegisteredUsersService: NonRegisteredUsersService,
    @Inject(forwardRef(() => UserCategoriesService))
    private userCategoriesService: UserCategoriesService,
    @Inject(forwardRef(() => SessionHistoriesService))
    private sessionHistoriesService: SessionHistoriesService,
    @Inject(forwardRef(() => TrainerInterestService))
    private trainerInterestService: TrainerInterestService,
    @Inject(forwardRef(() => RefreshTokenService))
    private refreshTokensService: RefreshTokenService,
  ) {}

  async create(
    createTrainerInput: CreateTrainerInput,
  ): Promise<Omit<Trainer, 'password' | 'dbPasswordSalt'>> {
    const user = await this.usersService.findOneByEmail(
      createTrainerInput.email,
    );
    const trainer = await this.findOneByEmail(createTrainerInput.email);

    if (trainer || user) {
      throw new ConflictException('Existing Email');
    }

    const { interests, ...createParams } = createTrainerInput;
    const newTrainer = this.trainersRepository.create(createParams);
    const salt = await bcrypt.genSalt();
    const password = newTrainer.password;
    const hash = await bcrypt.hash(password, salt);
    newTrainer.dbPasswordSalt = salt;
    newTrainer.password = hash;

    await this.trainersRepository.save(newTrainer);
    await this.trainerInterestService.bulkCreate(newTrainer.id, interests);

    this.exerciseCategoriesService.createDefault(newTrainer.id);
    this.userCategoriesService.createDefault(newTrainer.id);

    return this.trainersRepository.findOneOrFail(newTrainer.id);
  }

  async createSocialTrainer(
    createSocialTrainerInput: CreateSocialTrainerInput,
  ): Promise<Trainer> {
    const user = await this.usersService.findOneByEmail(
      createSocialTrainerInput.email,
    );
    const trainer = await this.findOneByEmail(createSocialTrainerInput.email);

    if (trainer || user) {
      throw new ConflictException('Existing Email');
    }

    const { interests, ...createParams } = createSocialTrainerInput;
    const newTrainer = this.trainersRepository.create(createParams);

    await this.trainersRepository.save(newTrainer);
    await this.trainerInterestService.bulkCreate(newTrainer.id, interests);

    this.exerciseCategoriesService.createDefault(newTrainer.id);
    this.userCategoriesService.createDefault(newTrainer.id);

    return this.trainersRepository.findOneOrFail(newTrainer.id);
  }

  findAll(): Promise<Trainer[]> {
    return this.trainersRepository.find({
      where: { status: GeneralStatusTypes.ACTIVE },
    });
  }

  findOneById(id: number): Promise<Trainer> {
    return this.trainersRepository.findOneOrFail({
      where: { id, status: GeneralStatusTypes.ACTIVE },
    });
  }

  findOneByEmail(email: string): Promise<Trainer> {
    return this.trainersRepository.findOne({
      where: { email, status: GeneralStatusTypes.ACTIVE },
    });
  }

  // phoneNumber로 trainerId가 지정되지 않은 유저를 찾는다.
  findOneUserByPhoneNumber(phoneNumber: string): Promise<User | undefined> {
    return this.usersService.findOneByPhoneNumber(null, phoneNumber);
  }

  findAllUsers(id: number): Promise<User[]> {
    return this.usersService.findAllByTrainerId(id);
  }

  findAllSessionsByTrainerId(trainerId: number): Promise<Session[]> {
    return this.sessionsService.findAllByTrainerId(trainerId);
  }

  findAllExerciseCategoriesByTrainerId(
    trainerId: number,
  ): Promise<ExerciseCategory[]> {
    return this.exerciseCategoriesService.findAllByTrainerId(trainerId);
  }

  findAllNonRegisteredUsersByTrainerId(
    trainerId: number,
  ): Promise<NonRegisteredUser[]> {
    return this.nonRegisteredUsersService.findAllByTrainerId(trainerId);
  }

  findAllUserCategoriesByTrainerId(trainerId: number): Promise<UserCategory[]> {
    return this.userCategoriesService.findAllByTrainerId(trainerId);
  }

  findAllSessionHistoriesByTrainerId(
    trainerId: number,
  ): Promise<SessionHistory[]> {
    return this.sessionHistoriesService.findAllByTrainerId(trainerId);
  }

  findAllTrainerInterestsByTrainerId(
    trainerId: number,
  ): Promise<TrainerInterest[]> {
    return this.trainerInterestService.findAllByTrainerId(trainerId);
  }

  async update(updateTrainerInput: UpdateTrainerInput): Promise<Trainer> {
    const trainer = await this.findOneById(updateTrainerInput.id);
    const { interests, ...updateParams } = updateTrainerInput;
    if (interests && interests.length > 0) {
      await this.trainerInterestService.bulkRemove(trainer.id);
      await this.trainerInterestService.bulkCreate(trainer.id, interests);
    }
    await this.trainersRepository.save({ ...trainer, ...updateParams });

    return this.trainersRepository.findOneOrFail(trainer.id);
  }

  async updatePasswordTrainer(
    updatePasswordTrainerInput: UpdatePasswordTrainerInput,
  ): Promise<Omit<Trainer, 'password' | 'dbPasswordSalt'>> {
    const id = updatePasswordTrainerInput.id;
    const trainer = await this.findOneById(id);
    const currPassword = await this.findPasswordByEmailUsingQueryBuilder(
      trainer.email,
    );
    const checkPassword = await bcrypt.compare(
      updatePasswordTrainerInput.prevPassword,
      currPassword,
    );
    if (!checkPassword) {
      throw new Error('Invalid Password.');
    }
    const findSelectTrainer = await this.trainersRepository
      .createQueryBuilder('trainers')
      .where('trainers.id = :id', { id })
      .addSelect('trainers.dbPasswordSalt')
      .getOne();

    const updatePassword = await bcrypt.hash(
      updatePasswordTrainerInput.nowPassword,
      findSelectTrainer.dbPasswordSalt,
    );

    const { password, dbPasswordSalt, ...updatedTrainer } =
      await this.trainersRepository.save({
        ...trainer,
        password: updatePassword,
      });
    return updatedTrainer;
  }

  async remove(id: number) {
    const trainer = await this.findOneById(id);
    trainer.status = GeneralStatusTypes.REMOVED;
    return this.trainersRepository.save(trainer);
  }

  async findPasswordByEmailUsingQueryBuilder(email: string): Promise<any> {
    const trainer = await this.trainersRepository
      .createQueryBuilder('trainers')
      .where('trainers.email = :email', { email })
      .addSelect('trainers.password')
      .getOne();

    return trainer.password;
  }

  async canMutate(currentUser: User | Trainer, id: number): Promise<boolean> {
    if (currentUser instanceof User) return false;

    const trainer = await this.trainersRepository.findOneOrFail(id);
    return trainer.id === currentUser.id;
  }
}
