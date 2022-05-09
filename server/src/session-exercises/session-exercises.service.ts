import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionExerciseVolume } from 'src/session-exercise-volumes/entities/session-exercise-volume.entity';
import { SessionExerciseVolumesService } from 'src/session-exercise-volumes/session-exercise-volumes.service';
import { Session } from 'src/sessions/entities/session.entity';
import { SessionsService } from 'src/sessions/sessions.service';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateSessionExerciseInput } from './dto/create-session-exercise.input';
import { SessionExercise } from './entities/session-exercise.entity';

@Injectable()
export class SessionExercisesService {
  constructor(
    @InjectRepository(SessionExercise)
    private sessionExercisesRepository: Repository<SessionExercise>,
    @Inject(forwardRef(() => SessionsService))
    private sessionsService: SessionsService,
    @Inject(forwardRef(() => SessionExerciseVolumesService))
    private sessionExerciseVolumesService: SessionExerciseVolumesService,
  ) {}

  create(
    createSessionExerciseInput: CreateSessionExerciseInput,
  ): Promise<SessionExercise> {
    const newSessionExercise = this.sessionExercisesRepository.create(
      createSessionExerciseInput,
    );

    return this.sessionExercisesRepository.save(newSessionExercise);
  }

  async bulkCreate(
    sessionId: number,
    names: string[],
    exerciseCategoryNames: string[],
  ): Promise<SessionExercise[]> {
    const newSessionExercises = await Promise.all(
      names.map((name, idx) =>
        this.create({
          sessionId,
          name,
          exerciseCategoryName: exerciseCategoryNames[idx],
        }),
      ),
    );
    return this.sessionExercisesRepository.save(newSessionExercises);
  }

  findAll(): Promise<SessionExercise[]> {
    return this.sessionExercisesRepository.find();
  }

  findOneById(id: number): Promise<SessionExercise> {
    return this.sessionExercisesRepository.findOneOrFail(id);
  }

  findAllBySessionId(sessionId: number): Promise<SessionExercise[]> {
    return this.sessionExercisesRepository.find({ sessionId });
  }

  getSession(sessionId: number): Promise<Session> {
    return this.sessionsService.findOneById(sessionId);
  }

  getSessionExerciseVolumes(id: number): Promise<SessionExerciseVolume[]> {
    return this.sessionExerciseVolumesService.findAllBySessionExerciseId(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.sessionExercisesRepository.delete(id);
    return result.affected === 1;
  }

  /**
   *
   * Helpers
   *
   */

  async canMutate(currentUser: User | Trainer, id: number): Promise<boolean> {
    if (currentUser instanceof User) return false;

    const sessionExercise = await this.sessionExercisesRepository.findOneOrFail(
      {
        where: { id },
        relations: ['session'],
      },
    );

    return sessionExercise.session.trainerId === currentUser.id;
  }
}
