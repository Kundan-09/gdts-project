import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUser(
    name: string,
    email: string,
    password: string,
    role: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return this.userRepository.save(user);
  }
}
