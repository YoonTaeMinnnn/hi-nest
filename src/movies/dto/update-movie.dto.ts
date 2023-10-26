import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

// CreateMovieDto와 동일하지만, 모든 속성에 대해 선택사항으로 바꿔줌.
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
