import { UserRole } from '../user.entity'

export class CreateUserDto {
  name: string;
  cpf: string;
  phone: string;
  password: string;
  email: string;
  role: UserRole;
}
