import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { InbodiesService } from './inbodies.service';
import { Inbody } from './entities/inbody.entity';
import { CreateInbodyInput } from './dto/create-inbody.input';
import { UpdateInbodyInput } from './dto/update-inbody.input';
import { User } from 'src/users/entities/user.entity';
import { CurrentUser } from 'src/auth/dto/currentUser.param';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';

@Resolver(() => Inbody)
@UseGuards(JwtAuthGuard)
export class InbodiesResolver {
  constructor(private readonly inbodiesService: InbodiesService) {}

  /**
   *
   * Queries
   *
   */

  @Query(() => [Inbody], { name: 'inbodies' })
  findAll(): Promise<Inbody[]> {
    return this.inbodiesService.findAll();
  }

  @Query(() => Inbody, { name: 'inbody' })
  findOneById(@Args('id', { type: () => Int }) id: number): Promise<Inbody> {
    return this.inbodiesService.findOneById(id);
  }

  /**
   *
   * Mutations
   *
   */

  @Mutation(() => Inbody)
  createInbody(
    @Args('createInbodyInput') createInbodyInput: CreateInbodyInput,
  ): Promise<Inbody> {
    return this.inbodiesService.create(createInbodyInput);
  }

  @Mutation(() => Inbody)
  async updateInbody(
    @Args('updateInbodyInput') updateInbodyInput: UpdateInbodyInput,
    @CurrentUser() currentUser: User | Trainer,
  ): Promise<Inbody> {
    const canMutate = await this.inbodiesService.canMutate(
      currentUser,
      updateInbodyInput.id,
    );
    if (!canMutate) {
      throw new ForbiddenException();
    }

    return this.inbodiesService.update(updateInbodyInput);
  }

  @Mutation(() => Inbody)
  async removeInbody(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() currentUser: User | Trainer,
  ): Promise<Inbody> {
    const canMutate = await this.inbodiesService.canMutate(currentUser, id);
    if (!canMutate) {
      throw new ForbiddenException();
    }

    return this.inbodiesService.remove(id);
  }

  /**
   *
   * Resolve Fields
   *
   */

  @ResolveField((returns) => User)
  user(@Parent() inbody: Inbody): Promise<User> {
    const { userId } = inbody;
    return this.inbodiesService.getUser(userId);
  }
}
