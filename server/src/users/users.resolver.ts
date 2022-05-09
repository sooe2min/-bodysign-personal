import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { UpdatePasswordUserInput } from './dto/updatePassword-user.input';
import { CreateSocialUserInput } from './dto/create-socialUser.input';
import { CurrentUser } from 'src/auth/dto/currentUser.param';
import { Trainer } from 'src/trainers/entities/trainer.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  /**
   *
   * Queries
   *
   */

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOneById(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOneById(id);
  }

  @Query(() => User, { name: 'userEmail' })
  findOneByEmail(@Args('email') email: string): Promise<User> {
    return this.usersService.findOneByEmail(email);
  }

  /**
   *
   * Mutations
   *
   */

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<Omit<User, 'password' | 'dbPasswordSalt'>> {
    return this.usersService.create(createUserInput);
  }

  @Mutation(() => User)
  createSocialUser(
    @Args('createSocialUserInput') createSocialUserInput: CreateSocialUserInput,
  ) {
    return this.usersService.createSocialUser(createSocialUserInput);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  updateUser(
    @CurrentUser() currentUser: User | Trainer,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    const canMutate = this.usersService.canMutate(
      currentUser,
      updateUserInput.id,
    );
    if (!canMutate) {
      throw new ForbiddenException();
    }
    return this.usersService.update(updateUserInput);
  }

  // 유저가 회원 탈퇴할 시 사용하는 resolver
  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  updatePasswordUser(
    @Args('updatePasswordUserInput')
    updatePasswordUserInput: UpdatePasswordUserInput,
    @CurrentUser() currentUser: User | Trainer,
  ): Promise<Omit<User, 'password' | 'dbPasswordSalt'>> {
    const canMutate = this.usersService.canMutate(
      currentUser,
      updatePasswordUserInput.id,
    );
    if (!canMutate) {
      throw new ForbiddenException();
    }
    return this.usersService.updatePasswordUser(updatePasswordUserInput);
  }

  /**
   *
   * Resolve Fields
   *
   */
  @ResolveField()
  sessions(@Parent() user: User) {
    const { id } = user;
    return this.usersService.findAllSessionsByUserId(id);
  }

  @ResolveField()
  inbodies(@Parent() user: User) {
    const { id } = user;
    return this.usersService.findAllInbodiesByUserId(id);
  }

  @ResolveField()
  sessionHistories(@Parent() user: User) {
    const { id } = user;
    return this.usersService.findAllSessionHistoriesByUserId(id);
  }
}
