import GeneralStatusTypes from 'src/types/generalStatus.types';
import { CreateUserCategoryInput } from './create-user-category.input';
declare const UpdateUserCategoryInput_base: import("@nestjs/common").Type<Partial<CreateUserCategoryInput>>;
export declare class UpdateUserCategoryInput extends UpdateUserCategoryInput_base {
    id: number;
    name?: string;
    status?: GeneralStatusTypes;
}
export {};
