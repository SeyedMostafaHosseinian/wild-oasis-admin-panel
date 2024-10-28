import { SignUpDto } from "./sign-up.dto";

export interface UpdateUserDto extends Partial<SignUpDto> {
  data?: Record<string, any>;
}
