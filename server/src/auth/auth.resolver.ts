import { Args, Context, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { EmailService } from 'src/email/email.service';

import { LoginModel } from './entities/login.model';
import { UserModel } from './entities/user.model';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { VerificationModel } from './entities/verification.model';
import { PasswordResetCodeModel } from './inputs/pwdResetCode.input';
import { PasswordResetDataModel } from './inputs/pwdResetData.input';
import { LoginInputModel } from './inputs/login.input';
import { AuthGuard } from 'src/utils/auth.guard';
import { ContextWithUser } from 'src/declarations/graphqlContext';

@Resolver((of) => UserModel)
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private emailService: EmailService,
  ) {}

  @Query((returns) => LoginModel)
  async refresh(@Context() context: ContextWithUser) {
    const refreshToken = context.req.cookies.refreshToken;
    const userData = await this.authService.refresh(refreshToken);
    context.res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    delete userData.refreshToken;

    return userData;
  }

  @Mutation((returns) => UserModel)
  async checkRegisterData(@Args('user') variable: UserModel) {
    if (variable.password.includes(' '))
      throw new HttpException(
        'Password must not contain whitespaces',
        HttpStatus.BAD_REQUEST,
      );
    return await this.authService.checkRegisterData(variable);
  }

  @Mutation((returns) => String)
  async checkLoginData(@Args('user', { type: () => String }) variable: string) {
    const response = await this.authService.checkLoginData(variable);
    return response.email;
  }

  @Mutation((returns) => LoginModel)
  async checkVerificationCode(
    @Args('verification') variable: VerificationModel,
    @Context() context: ContextWithUser,
  ) {
    const validationResult = await this.authService.verifyAndRegister(variable);
    context.res.cookie('refreshToken', validationResult.refreshToken, {
      maxAge: 30 * 24 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    delete validationResult.refreshToken;
    return validationResult;
  }

  @Mutation((returns) => Boolean)
  async checkPasswordResetCode(
    @Args('verification') variable: PasswordResetCodeModel,
  ) {
    return await this.authService.checkCode(variable.userEmail, variable.code);
  }

  @Mutation((returns) => String)
  async sendVerificationCode(
    @Args('email', { type: () => String }) variable: string,
  ) {
    return await this.emailService.saveAndSendVerificationCode(variable);
  }

  @Mutation((returns) => Boolean)
  async resetPassword(
    @Args('newPasswordData') variable: PasswordResetDataModel,
  ) {
    return await this.authService.resetPassword(variable);
  }

  @Mutation((returns) => LoginModel)
  async login(
    @Args('loginInput') variable: LoginInputModel,
    @Context() context: ContextWithUser,
  ) {
    const loggedInUser = await this.authService.login(variable);
    context.res.cookie('refreshToken', loggedInUser.refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    delete loggedInUser.refreshToken;
    return loggedInUser;
  }

  @Mutation((returns) => ID)
  async logout(@Context() context: ContextWithUser) {
    const refreshToken = context.req.cookies.refreshToken;

    context.res.clearCookie('refreshToken');

    return await this.authService.logout(refreshToken);
  }

  @UseGuards(AuthGuard)
  @Mutation((returns) => Boolean)
  async setFontSize(
    @Args('fontSize', { type: () => String }) variable: string,
    @Context() context: ContextWithUser,
  ) {
    const userId = context.req.user.id;
    return await this.authService.setFontSize(variable, userId);
  }

  @UseGuards(AuthGuard)
  @Mutation((returns) => Boolean)
  async setTheme(
    @Args('theme', { type: () => String }) variable: string,
    @Context() context: ContextWithUser,
  ) {
    const userId = context.req.user.id;
    return await this.authService.setTheme(variable, userId);
  }

  @UseGuards(AuthGuard)
  @Mutation((returns) => Boolean)
  async setColor(
    @Args('color', { type: () => String }) variable: string,
    @Context() context: ContextWithUser,
  ) {
    const userId = context.req.user.id;
    return await this.authService.setColor(variable, userId);
  }
}
