import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExercisesService } from 'src/exercises/exercises.service';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import { User } from 'src/users/entities/user.entity';
import { In, Repository } from 'typeorm';
import { CreateExerciseCategoryInput } from './dto/create-exercise-category.input';
import { UpdateExerciseCategoryInput } from './dto/update-exercise-category.input';
import { ExerciseCategory } from './entities/exercise-category.entity';

@Injectable()
export class ExerciseCategoriesService {
  constructor(
    @InjectRepository(ExerciseCategory)
    private exerciseCategoriesRepository: Repository<ExerciseCategory>,
    @Inject(forwardRef(() => ExercisesService))
    private exercisesService: ExercisesService,
  ) {}

  create(
    createExerciseCategoryInput: CreateExerciseCategoryInput,
  ): Promise<ExerciseCategory> {
    const newExerciseCategory = this.exerciseCategoriesRepository.create(
      createExerciseCategoryInput,
    );
    return this.exerciseCategoriesRepository.save(newExerciseCategory);
  }

  findAll(): Promise<ExerciseCategory[]> {
    return this.exerciseCategoriesRepository.find();
  }

  findOneById(id: number): Promise<ExerciseCategory> {
    return this.exerciseCategoriesRepository.findOneOrFail(id);
  }

  findAllByTrainerId(trainerId: number): Promise<ExerciseCategory[]> {
    return this.exerciseCategoriesRepository.find({ trainerId });
  }

  async update(
    updateExerciseCategoryInput: UpdateExerciseCategoryInput,
  ): Promise<ExerciseCategory> {
    const exerciseCategory =
      await this.exerciseCategoriesRepository.findOneOrFail(
        updateExerciseCategoryInput.id,
      );
    return this.exerciseCategoriesRepository.save({
      ...exerciseCategory,
      ...updateExerciseCategoryInput,
    });
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.exerciseCategoriesRepository.delete(id);
    return result.affected == 1;
  }

  async bulkRemove(ids: number[]): Promise<boolean> {
    // TODO: ids로 찾은 것들이 숫자가 안맞으면 false반환하고 삭제 중단
    const result = await this.exerciseCategoriesRepository.delete(ids);
    return result.affected == ids.length;
  }

  /**
   *
   * Helpers
   *
   */

  async canMutate(currentUser: User | Trainer, id: number): Promise<boolean> {
    if (currentUser instanceof User) return false;

    const exerciseCategory =
      await this.exerciseCategoriesRepository.findOneOrFail(id);

    if (exerciseCategory.trainerId !== currentUser.id) {
      return false;
    }

    return true;
  }

  async bulkCanMutate(
    currentUser: User | Trainer,
    ids: number[],
  ): Promise<boolean> {
    if (currentUser instanceof User) return false;

    ids = ids.sort();
    const exerciseCategoryIds = await this.exerciseCategoriesRepository.find({
      where: {
        id: In(ids),
      },
      order: {
        id: 'ASC',
      },
      select: ['id'],
    });

    if (
      exerciseCategoryIds.length !== ids.length ||
      ids.find((id, idx) => exerciseCategoryIds[idx].id !== id)
    ) {
      return false;
    }
  }

  async createDefault(trainerId: number) {
    const createParams = { trainerId };
    const exerciseCategoryNames = [
      '가슴',
      '어깨',
      '등',
      '하체',
      '팔',
      '바벨',
      '덤벨',
      '스미스 머신',
      '유산소',
    ];
    const exerciseCategories = await Promise.all(
      exerciseCategoryNames.map((name) =>
        this.create({ ...createParams, name }),
      ),
    );
    await this.exerciseCategoriesRepository.save(exerciseCategories);

    const exerciseNames = [
      ['벤치프레스', '펙덱 플라이', '체스트머신'],
      ['숄더프레스 머신', '래터럴레이즈 머신', '케이블 레이즈(프론트, 사이드)'],
      ['랫풀다운', '케이블 암풀다운', '티바로우'],
      ['레그 익스텐션', '레그 컬', '힙 어덕션, 어브덕션'],
      ['암 컬', '케이블 컬', '푸쉬다운 머신'],
      ['백 스쿼트', '프론트 스쿼트', '런지', '바벨 로우', '오버헤드 프레스'],
      [
        '덤벨 로우',
        '덤벨 플라이',
        '체스트 프레스',
        '숄더 프레스',
        '사이드 레터럴 레이즈',
      ],
      ['인클라인 프레스', '디클라인 프레스', '밀리터리 프레스'],
      ['트레드밀', '사이클', '마이 마운틴'],
    ];
    await Promise.all(
      exerciseCategories.map((exerciseCategory, idx) =>
        this.exercisesService.bulkCreateDefault(
          exerciseCategory.id,
          exerciseNames[idx],
        ),
      ),
    );

    return true;
  }
}
