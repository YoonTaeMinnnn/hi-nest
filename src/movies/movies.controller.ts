import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';

@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService: MoviesService){}

    @Get()
    getAll():Movie[]{
        return this.moviesService.getAll();
    }

    // /id 보다 위에 위치해야된다.
    @Get("/search")
    seatch(@Query("year") year:string){
        return `we are searching for a movie made after : ${year}`;
    }

    @Get("/:id")
    getOne(@Param("id") id:string):Movie{
        return this.moviesService.getOne(id);
    }
    //d
    @Post()
    create(@Body() movieData){
        this.moviesService.createMovie(movieData);
    }

    @Delete("/:id")
    remove(@Param("id") id : string){
        return this.moviesService.deleteOne(id);
    }


    @Patch("/:id")
    patch(@Param("id") movieId:string, @Body() updateData){
        return {
            updateMovie : movieId,
            ...updateData
        };
    }


}
