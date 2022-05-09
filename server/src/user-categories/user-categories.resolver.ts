import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UserCategoriesService } from './user-categories.service';
import { UserCategory } from './entities/user-category.entity';
import { CreateUserCategoryInput } from './dto/create-user-category.input';
import { UpdateUserCategoryInput } from './dto/update-user-category.input';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import { User } from 'src/users/entities/user.entity';
import { NonRegisteredUser } from 'src/non-registered-users/entities/non-registered-user.entity';
import { CurrentUser } from 'src/auth/dto/currentUser.param';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';

@Resolver(() => UserCategory)
@UseGuards(JwtAuthGuard)
export class UserCategoriesResolver {
  constructor(private readonly userCategoriesService: UserCategoriesService) {}

  /**
   *
   * Queries
   *
   */

  @Query(() => [UserCategory], { name: 'userCategories' })
  findAll(): Promise<UserCategory[]> {
    return this.userCategoriesService.findAll();
  }

  @Query(() => UserCategory, { name: 'userCategory' })
  findOneById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<UserCategory> {
    return this.userCategoriesService.findOneById(id);
  }

  /**
   *
   * Mutations
   *
   */

  @Mutation(() => UserCategory)
  createUserCategory(
    @Args('createUserCategoryInput')
    createUserCategoryInput: CreateUserCategoryInput,
  ): Promise<UserCategory> {
    return this.userCategoriesService.create(createUserCategoryInput);
  }

  @Mutation(() => UserCategory)
  updateUserCategory(
    @Args('updateUserCategoryInput')
    updateUserCategoryInput: UpdateUserCategoryInput,
    @CurrentUser() currentUser: User | Trainer,
  ): Promise<UserCategory> {
    const canMutate = this.userCategoriesService.canMutate(
      currentUser,
      updateUserCategoryInput.id,
    );
    if (!canMutate) {
      throw new ForbiddenException();
    }

    return this.userCategoriesService.update(updateUserCategoryInput);
  }

  @Mutation(() => UserCategory)
  removeUserCategory(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() currentUser: User | Trainer,
  ): Promise<UserCategory> {
    const canMutate = this.userCategoriesService.canMutate(currentUser, id);
    if (!canMutate) {
      throw new ForbiddenException();
    }

    return this.userCategoriesService.remove(id);
  }

  /**
   *
   * Resolve Fields
   *
   */

  @ResolveField((returns) => Trainer)
  trainer(@Parent() userCategory: UserCategory): Promise<Trainer> {
    const { trainerId } = userCategory;
    return this.userCategoriesService.getTrainer(trainerId);
  }

  @ResolveField((returns) => [User])
  users(@Parent() userCategory: UserCategory): Promise<User[]> {
    const { id } = userCategory;
    return this.userCategoriesService.getUsers(id);
  }

  @ResolveField((returns) => [NonRegisteredUser])
  nonRegisteredUsers(
    @Parent() userCategory: UserCategory,
  ): Promise<NonRegisteredUser[]> {
    const { id } = userCategory;
    return this.userCategoriesService.getNonRegisteredUsers(id);
  }
}
