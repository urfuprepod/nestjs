import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/roles.model';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('Чурка');
    await user.$set('roles', [role.id]);
    // set добавляет роли в бд, о не дает их полученному объекту
    user.roles = [role];
    return user.dataValues;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({
      include: { model: Role, as: 'hueta', all: true, attributes: ['value'] },
    });
    return users;
  }

  async getUsersByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async addRole(AddRoleDto: AddRoleDto) {
    const user = await this.userRepository.findByPk(AddRoleDto.userId);
    const currentRole = await this.roleService.getRoleByValue(AddRoleDto.value);
    if (currentRole && user) {
      //  user.update({ roles: [...user.roles, currentRole] });
      await user.$add('role', currentRole.id);
      return AddRoleDto;
    }
    throw new HttpException('Сосииии шлюха', HttpStatus.NOT_FOUND);
  }

  async banUser(banUserDto: BanUserDto) {
    const user = await this.userRepository.findByPk(banUserDto.userId);
    if (!user)
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    user.banned = true;
    const random = Math.random();
    user.banReason = random > 0.5 ? banUserDto.banReason : 'По причине пидорас';
    await user.save();
    return user;
  }
}
