import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/roles.model';
import { AddRoleDto } from './dto/add-role.dto';

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
    
  }
}
