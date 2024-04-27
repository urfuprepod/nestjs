import { Body, Controller, Get, Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Post } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) {}

    @Post()
    create(@Body() roleDto: CreateRoleDto) {
        return this.rolesService.createRole(roleDto)
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.rolesService.getRoleByValue(id);
    }
}
