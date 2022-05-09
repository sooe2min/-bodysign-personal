import { Chat } from 'src/chats/entities/chat.entity';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateImgInput } from './dto/create-img.input';
import { FindImgsInput } from './dto/find-imgs.input';
import { Img } from './entities/img.entity';
import { ImgsService } from './imgs.service';
export declare class ImgsResolver {
    private imgsService;
    constructor(imgsService: ImgsService);
    findImgsByUserIdAndTrainerId(findImgsInput: FindImgsInput): Promise<Img[]>;
    getImg(id: number): Promise<Img>;
    removeImg(id: number, currentUser: User | Trainer): Promise<boolean>;
    bulkRemoveImg(ids: number[], currentUser: User | Trainer): Promise<boolean>;
    chat(img: Img): Promise<Chat>;
    createImg(createImgInput: CreateImgInput): Promise<Img>;
}
