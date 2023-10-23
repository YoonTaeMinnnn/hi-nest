import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';
import serveStatic from 'serve-static';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should be 4", () => {
    expect(2+2).toEqual(4);
  });

  describe("getAll", () => {

    it("should be return array", () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    })

  });

  describe("getOne", () => {

    it("should be return movie", () => {
      service.createMovie({
        title : "테스트영화",
        year : 2020,
        genres : ["테스트1", "테스트2"]
      });

      const movie = service.getOne(1);
      expect(movie.id).toEqual(1);
      expect(movie).toBeDefined();
    }); 

    it("should throw 404 error", () => {
      try{
        const result = service.getOne(1);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual("movie with id : not found");
      }
    })
  })

  describe("deleteOne", () => {

    it("deletes a movie", () => {
      service.createMovie({
        title : "테스트영화",
        year : 2020,
        genres : ["테스트1", "테스트2"]
      });
      const before = service.getAll();
      service.deleteOne(1);
      const after = service.getAll();

      expect(after.length).toEqual(before.length-1);
    })

    it("should return 404", () => {
      try{
        const result = service.deleteOne(1);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })

  })


  describe("createMovie", () => {

    it("create a movie", () => {

      service.createMovie({
        title : "테스트영화",
        year : 2020,
        genres : ["테스트1", "테스트2"]
      });

      const after = service.getAll();
      expect(after.pop().title).toEqual("테스트영화");
    })


  })

  describe("udpate", () => {

    it("shuld update a movie", () => {
      service.createMovie({
        title : "테스트영화",
        year : 2020,
        genres : ["테스트1", "테스트2"]
      });
      service.update(1, {
        title : "변경된영화"
      });
      const result = service.getOne(1);
      expect(result.title).toEqual("변경된영화");
    })

    it("should return 404", () => {
      try{
        service.update(1, {
          title : "변경된영화"
        })
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })

  })

});
