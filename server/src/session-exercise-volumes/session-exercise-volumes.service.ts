import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionExercise } from 'src/session-exercises/entities/session-exercise.entity';
import { SessionExercisesService } from 'src/session-exercises/session-exercises.service';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

import { CreateSessionExerciseVolumeInput } from './dto/create-session-exercise-volume.input';
import { UpdateSessionExerciseVolumeInput } from './dto/update-session-exercise-volume.input';
import { SessionExerciseVolume } from './entities/session-exercise-volume.entity';

@Injectable()
export class SessionExerciseVolumesService {
  constructor(
    @InjectRepository(SessionExerciseVolume)
    private sessionExerciseVolumesRepository: Repository<SessionExerciseVolume>,
    @Inject(forwardRef(() => SessionExercisesService))
    private sessionExercisesService: SessionExercisesService,
  ) {}

  async create(
    createSessionExerciseVolumeInput: CreateSessionExerciseVolumeInput,
  ): Promise<SessionExerciseVolume> {
    const [lastSeqSessionExerciseVolume] =
      await this.sessionExerciseVolumesRepository.find({
        where: {
          sessionExerciseId: createSessionExerciseVolumeInput.sessionExerciseId,
        },
        order: {
          seq: 'DESC',
        },
        take: 1,
      });
    const newSessionExerciseVolume =
      this.sessionExerciseVolumesRepository.create(
        createSessionExerciseVolumeInput,
      );

    if (lastSeqSessionExerciseVolume) {
      newSessionExerciseVolume.seq = lastSeqSessionExerciseVolume.seq + 1;
    }

    return this.sessionExerciseVolumesRepository.save(newSessionExerciseVolume);
  }

  findAll(): Promise<SessionExerciseVolume[]> {
    return this.sessionExerciseVolumesRepository.find();
  }

  findOneById(id: number): Promise<SessionExerciseVolume> {
    return this.sessionExerciseVolumesRepository.findOneOrFail(id);
  }

  findAllBySessionExerciseId(
    sessionExerciseId: number,
  ): Promise<SessionExerciseVolume[]> {
    return this.sessionExerciseVolumesRepository.find({
      sessionExerciseId,
    });
  }

  getSessionExercise(sessionExerciseId: number): Promise<SessionExercise> {
    return this.sessionExercisesService.findOneById(sessionExerciseId);
  }

  async update(
    updateSessionExerciseVolumeInput: UpdateSessionExerciseVolumeInput,
  ): Promise<SessionExerciseVolume> {
    const sessionExerciseVolume =
      await this.sessionExerciseVolumesRepository.findOneOrFail(
        updateSessionExerciseVolumeInput.id,
      );
    return this.sessionExerciseVolumesRepository.save({
      ...sessionExerciseVolume,
      ...updateSessionExerciseVolumeInput,
    });
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.sessionExerciseVolumesRepository.delete(id);
    return result.affected === 1;
  }

  /**
   *
   * Helpers
   *
   */

  async canMutate(currentUser: User | Trainer, id: number): Promise<boolean> {
    if (currentUser instanceof User) return false;

    const sessionExerciseVolume =
      await this.sessionExerciseVolumesRepository.findOneOrFail({
        where: { id },
        relations: ['sessionExercise', 'sessionExercise.session'],
      });

    return (
      sessionExerciseVolume.sessionExercise.session.trainerId === currentUser.id
    );
  }
}
