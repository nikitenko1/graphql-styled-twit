import { Injectable } from '@nestjs/common';
import { ProfileInputType } from './inputs/profile.input';
import { FilesService } from '../files/files.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '../auth/interfaces/user';
import { UserDto } from '../auth/dto/user-dto';

@Injectable()
export class ProfileService {
  constructor(
    private filesService: FilesService,
    @InjectModel('User') private userModel: Model<IUser>,
  ) {}

  private async saveImage(
    image: string | undefined,
    prevImage?: string,
  ): Promise<undefined | string> {
    if (!image) return;

    if (prevImage) {
      const indexOfSlash = prevImage.lastIndexOf('/');
      await this.filesService.deleteFile(prevImage.slice(indexOfSlash));
    }
    return await this.filesService.generateImage(image);
  }

  async updateProfile(profile: ProfileInputType, user: UserDto) {
    const userFromDb = await this.userModel.findById(user.id);

    if (!userFromDb) return;

    const profileBackground = await this.saveImage(
      profile.profileBackground,
      userFromDb.profileBackground,
    );
    const avatar = await this.saveImage(profile.avatar, userFromDb.avatar);

    const newData = {
      ...profile,
      profileBackground: profileBackground
        ? profileBackground
        : userFromDb.profileBackground,
      avatar: avatar ? avatar : userFromDb.avatar,
    };

    await this.userModel.findByIdAndUpdate(user.id, newData);

    return newData;
  }
}
