import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import UserType from 'src/types/user.types';
import { CreateRefreshTokenInput } from './dto/create-user-refreshToken.input';

import { RefreshToken } from './entities/refreshToken.entity';
import { RefreshTokenService } from './refresh-tokens.service';

@Resolver(() => RefreshToken)
export class RefreshTokensResolver {
  constructor(private readonly refreshTokensService: RefreshTokenService) {}

  /**
   *
   * Queries
   *
   */

  @Query(() => RefreshToken, { name: 'refreshToken' })
  findOneById(
    @Args('targetId', { type: () => Int }) targetId: number,
    @Args('targetType', { type: () => String }) targetType: UserType,
  ) {
    return this.refreshTokensService.findOneByTargetTypeAndTargetId(
      targetType,
      targetId,
    );
  }

  /**
   *
   * Mutations
   *
   */

  @Mutation(() => RefreshToken)
  async createRefreshToken(
    @Args('createRefreshTokenInput')
    createRefreshTokenInput: CreateRefreshTokenInput,
  ) {
    return await this.refreshTokensService.createRefreshToken(
      createRefreshTokenInput,
    );
  }
}
