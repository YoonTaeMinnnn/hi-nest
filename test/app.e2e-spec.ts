import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, //데코레이터가 없는 property에는 저장 x
        forbidNonWhitelisted: true, // dto에 존재하지 않는 property를 포함하는 경우, 요청 차단
        transform: true, // spring:httpmessageconvertor역할 ("3" -> 3)
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('welcome to nestjs!');
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    it('POST', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: '테스트',
          year: 2020,
          genres: ['test1', 'test2'],
        })
        .expect(201);
    });

    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer())
        .get('/movies/1')
        .expect(200)
        .expect({
          id: 1,
          title: '테스트',
          year: 2020,
          genres: ['test1', 'test2'],
        });
    });

    it('GET 404', () => {
      return request(app.getHttpServer()).get('/movies/999').expect(404);
    });

    it('PATCH', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: '변경된영화' })
        .expect(200)
        .expect({
          updateMovie: 1,
          title: '변경된영화',
        });
    });

    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });
  });
});
