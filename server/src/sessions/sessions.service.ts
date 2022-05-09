import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionHistoriesService } from 'src/session-histories/session-histories.service';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import { TrainersService } from 'src/trainers/trainers.service';
import SessionStatusTypes from 'src/types/sessionStatus.types';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { getManager, Repository } from 'typeorm';

import { CreateSessionInput } from './dto/create-session.input';
import { UpdateSessionInput } from './dto/update-session.input';
import { Session } from './entities/session.entity';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session) private sessionsRepository: Repository<Session>,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    @Inject(forwardRef(() => TrainersService))
    private trainersService: TrainersService,
    @Inject(forwardRef(() => SessionHistoriesService))
    private sessionHistoriesService: SessionHistoriesService,
  ) {}

  create(createSessionInput: CreateSessionInput) {
    const newSession = this.sessionsRepository.create(createSessionInput);

    return this.sessionsRepository.save(newSession);
  }

  findAll(): Promise<Session[]> {
    return this.sessionsRepository.find();
  }

  findOneById(id: number): Promise<Session> {
    return this.sessionsRepository.findOneOrFail(id);
  }

  findAllByTrainerId(trainerId: number): Promise<Session[]> {
    return this.sessionsRepository.find({
      where: {
        trainerId,
        status: SessionStatusTypes.ACTIVE,
      },
      order: {
        userId: 'ASC',
      },
    });
  }

  findAllByUserId(userId: number): Promise<Session[]> {
    return this.sessionsRepository.find({
      where: {
        userId,
        status: SessionStatusTypes.ACTIVE,
      },
      order: {
        userId: 'ASC',
      },
    });
  }

  getUser(userId: number): Promise<User> {
    return this.usersService.findOneById(userId);
  }

  getTrainer(trainerId: number): Promise<Trainer> {
    return this.trainersService.findOneById(trainerId);
  }

  async update(updateSessionInput: UpdateSessionInput): Promise<Session> {
    const session = await this.sessionsRepository.findOneOrFail(
      updateSessionInput.id,
    );

    if (session.completedSession && updateSessionInput.completedSession) {
      throw new BadRequestException('Session is already completed');
    }

    if (
      'completedSession' in updateSessionInput &&
      updateSessionInput.completedSession != session.completedSession
    ) {
      const { completedSession } = updateSessionInput;
      let sessionHistory;
      if (completedSession) {
        sessionHistory =
          await this.sessionHistoriesService.findOneToAddUsedCountByUserIdAndTrainerId(
            session.userId,
            session.trainerId,
          );
      } else {
        sessionHistory =
          await this.sessionHistoriesService.findOneToSubtractUsedCountByUserIdAndTrainerId(
            session.userId,
            session.trainerId,
          );
      }

      if (!sessionHistory) {
        throw new BadRequestException('User does not have available session');
      }

      await this.sessionHistoriesService.update({
        id: sessionHistory.id,
        usedCount: sessionHistory.usedCount + (completedSession ? 1 : -1),
      });
    }
    return this.sessionsRepository.save({
      ...session,
      ...updateSessionInput,
    });
  }

  async remove(id: number): Promise<Session> {
    const session = await this.sessionsRepository.findOneOrFail(id);
    return this.sessionsRepository.remove(session);
  }

  /**
   *
   * Helpers
   *
   */

  async canMutate(currentUser: User | Trainer, id: number): Promise<boolean> {
    const session = await this.findOneById(id);
    if (currentUser instanceof User) {
      return session.userId === currentUser.id;
    } else {
      // currentUser instanceof Trainer
      return session.trainerId === currentUser.id;
    }
  }

  find;
}
