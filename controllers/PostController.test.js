const PostController = require('./PostController');
const errorController = require('./errorController');
const PostService = require('../services/PostService');

describe('Testing Post Controller', () => {
  describe('Testing New Post in POST Method.', () => {
    test('Verify if rescue catch\'s invalid body with JoI.', async () => {
      // Arrange
      const errorMock = { error: { message: 'Campos inválidos', code: 'Invalid_fields' } };
      const mockReq = {
        body: { title: 'Felipe' },
      };
      const nextMock = jest.fn();
      const mockJson = jest.fn();
      const mockRes = { status: jest.fn().mockReturnValueOnce({ json: mockJson }) };
      // Act
      await errorController(errorMock, null, mockRes);
      await PostController.newPost(mockReq, mockRes, nextMock);
      // Assert
      expect(nextMock).toBeCalledWith(errorMock);
      expect(mockRes.status).toBeCalledWith(400);
      expect(mockJson).toBeCalledWith(errorMock);
    });

    test('Creating Post catch Invalid User', async () => {
      // Arrange
      const errorMock = { error: { message: 'Usuário não existe', code: 'Invalid_data' } };
      const mockReq = { user: { id: 1 }, body: { title: 'lalala', content: 'lalalala' } };
      const nextMock = jest.fn();
      const mockJson = jest.fn();
      const mockRes = { status: jest.fn().mockReturnValue({ json: mockJson }) };
      const PostServiceSpy = jest
        .spyOn(PostService, 'newPost')
        .mockImplementation(() => {
          throw errorMock;
        });
      // Act
      await errorController(errorMock, null, mockRes);
      await PostController.newPost(mockReq, mockRes, nextMock);
      // Assert
      expect(PostServiceSpy).toBeCalledTimes(1);
      expect(nextMock).toBeCalledWith(errorMock);
      expect(mockRes.status).toBeCalledWith(422);
      expect(mockJson).toBeCalledWith(errorMock);

      PostServiceSpy.mockRestore();
    });
    test('Creating Post', async () => {
      // Arrange
      const postMock = {
        id: 4,
        title: 'lalalalala',
        content: 'lalalala',
        userId: 1,
        updated: '2020-08-19T20:33:03.527Z',
        published: '2020-08-19T20:33:03.527Z',
      };
      const mockReq = { user: { id: 1 }, body: { title: 'lalala', content: 'lalalala' } };
      const mockJson = jest.fn();
      const mockRes = { status: jest.fn().mockReturnValue({ json: mockJson }) };
      const PostServiceSpy = jest
        .spyOn(PostService, 'newPost')
        .mockImplementation(() => postMock);
      // Act
      await PostController.newPost(mockReq, mockRes);
      // Assert
      expect(PostServiceSpy).toBeCalledTimes(1);
      expect(mockRes.status).toBeCalledWith(201);
      expect(mockJson).toBeCalledWith(postMock);

      PostServiceSpy.mockRestore();
    });
  });

  describe('Testing getAllPosts in GET Method', () => {
    test('Testing if rescue catch \'Dados não encontrados\' of findAll function', async () => {
      // Arrange
      const errorMock = { error: { message: 'Dados não encontrados', code: 'Not_found' } };
      const nextMock = jest.fn();
      const mockJson = jest.fn();
      const mockRes = { status: jest.fn().mockReturnValue({ json: mockJson }) };

      const PostServiceSpy = jest
        .spyOn(PostService, 'getAllPosts')
        .mockImplementation(() => {
          throw errorMock;
        });
      // Act
      await errorController(errorMock, null, mockRes, nextMock);
      await PostController.getAllPosts(null, mockRes, nextMock);
      // Assert
      expect(PostServiceSpy).toBeCalledTimes(1);
      expect(mockRes.status).toBeCalledWith(404);
      expect(nextMock).toBeCalledWith(errorMock);
      expect(mockJson).toBeCalledWith(errorMock);

      PostServiceSpy.mockRestore();
    });

    test('Returning all Posts', async () => {
      // Arrange
      const postsMock = {
        id: 1,
        published: '2011-08-01T19:58:00.000Z',
        updated: '2011-08-01T19:58:51.947Z',
        title: 'Lalala',
        content: 'lalala astrid',
        user: {
          id: 1,
          displayName: 'Felipe',
          email: 'lipe@lipe.com',
          image: '',
        },
      };
      const mockJson = jest.fn();
      const mockRes = { status: jest.fn().mockReturnValue({ json: mockJson }) };

      const UserServiceSpy = jest
        .spyOn(PostService, 'getAllPosts')
        .mockImplementation(() => postsMock);
      // Act
      await PostController.getAllPosts(null, mockRes);
      // Assert
      expect(UserServiceSpy).toBeCalledTimes(1);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockJson).toBeCalledWith(postsMock);

      UserServiceSpy.mockRestore();
    });
  });

  describe('Testing updateById in PUT METHOD', () => {
    test('Rescue catch invalid body with Joi', async () => {
      // Arrange
      const errorMock = { error: { message: 'Campos inválidos', code: 'Invalid_fields' } };
      const mockReq = { body: { title: 'lalala' } };
      const nextMock = jest.fn();
      const mockJson = jest.fn();
      const mockRes = { status: jest.fn().mockReturnValue({ json: mockJson }) };

      // Act
      await errorController(errorMock, null, mockRes, nextMock);
      await PostController.updateById(mockReq, mockRes, nextMock);
      // Assert
      expect(mockRes.status).toBeCalledWith(400);
      expect(nextMock).toBeCalledWith(errorMock);
      expect(mockJson).toBeCalledWith(errorMock);
    });

    test('Service throw post not found', async () => {
      // Arrange
      const errorMock = { error: { message: 'Post não encontrado', code: 'Not_found' } };
      const mockReq = {
        body: { title: 'lalala', content: 'lalala' },
        params: { id: 1 },
        user: { id: 1 },
      };
      const nextMock = jest.fn();
      const mockJson = jest.fn();
      const mockRes = { status: jest.fn().mockReturnValue({ json: mockJson }) };
      const updateByIdSpy = jest
        .spyOn(PostService, 'updateById')
        .mockImplementation(() => {
          throw errorMock;
        });

      // Act
      await errorController(errorMock, null, mockRes, nextMock);
      await PostController.updateById(mockReq, mockRes, nextMock);
      // Assert
      expect(updateByIdSpy).toBeCalledTimes(1);
      expect(mockRes.status).toBeCalledWith(404);
      expect(nextMock).toBeCalledWith(errorMock);
      expect(mockJson).toBeCalledWith(errorMock);

      updateByIdSpy.mockRestore();
    });
    test('Service throw user not found', async () => {
      // Arrange
      const errorMock = { error: { message: 'Usuário não encontrado', code: 'Not_found' } };
      const mockReq = {
        body: { title: 'lalala', content: 'lalala' },
        params: { id: 1 },
        user: { id: 1 },
      };
      const nextMock = jest.fn();
      const mockJson = jest.fn();
      const mockRes = { status: jest.fn().mockReturnValue({ json: mockJson }) };
      const updateByIdSpy = jest
        .spyOn(PostService, 'updateById')
        .mockImplementation(() => {
          throw errorMock;
        });

      // Act
      await errorController(errorMock, null, mockRes, nextMock);
      await PostController.updateById(mockReq, mockRes, nextMock);
      // Assert
      expect(updateByIdSpy).toBeCalledTimes(1);
      expect(mockRes.status).toBeCalledWith(404);
      expect(nextMock).toBeCalledWith(errorMock);
      expect(mockJson).toBeCalledWith(errorMock);

      updateByIdSpy.mockRestore();
    });
    test('Service throw acess denied', async () => {
      // Arrange
      const errorMock = { error: { message: 'Acesso negado', code: 'Forbidden' } };
      const mockReq = {
        body: { title: 'lalala', content: 'lalala' },
        params: { id: 1 },
        user: { id: 1 },
      };
      const nextMock = jest.fn();
      const mockJson = jest.fn();
      const mockRes = { status: jest.fn().mockReturnValue({ json: mockJson }) };
      const updateByIdSpy = jest
        .spyOn(PostService, 'updateById')
        .mockImplementation(() => {
          throw errorMock;
        });

      // Act
      await errorController(errorMock, null, mockRes, nextMock);
      await PostController.updateById(mockReq, mockRes, nextMock);
      // Assert
      expect(updateByIdSpy).toBeCalledTimes(1);
      expect(mockRes.status).toBeCalledWith(403);
      expect(nextMock).toBeCalledWith(errorMock);
      expect(mockJson).toBeCalledWith(errorMock);

      updateByIdSpy.mockRestore();
    });
    test('Service update post successful', async () => {
      // Arrange
      const mockReq = {
        body: { title: 'lalala', content: 'lalala' },
        params: { id: 1 },
        user: { id: 1 },
      };
      const dataMock = {
        id: 1,
        title: 'lalalalala',
        content: 'testando 1 dois tres',
        published: '2020-08-19T19:37:51.000Z',
        updated: '2020-08-19T23:59:50.000Z',
        userId: 1,
      };
      const mockJson = jest.fn();
      const mockRes = { status: jest.fn().mockReturnValue({ json: mockJson }) };
      const updateByIdSpy = jest
        .spyOn(PostService, 'updateById')
        .mockImplementation(() => dataMock);

      // Act
      await PostController.updateById(mockReq, mockRes);
      // Assert
      expect(updateByIdSpy).toBeCalledTimes(1);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockJson).toBeCalledWith(dataMock);

      updateByIdSpy.mockRestore();
    });
  });

  describe('Testing getPostById in GET Method', () => {
    test('Rescue catch post not found', async () => {
      // Arrange
      const errorMock = { error: { message: 'Post não encontrado', code: 'Not_found' } };
      const mockReq = { params: { id: 50 } };
      const mockNext = jest.fn();
      const mockJson = jest.fn();
      const mockRes = { status: jest.fn().mockReturnValueOnce({ json: mockJson }) };
      const updateByIdSpy = jest
        .spyOn(PostService, 'getPostById')
        .mockImplementation(() => {
          throw errorMock;
        });
      // Act
      await errorController(errorMock, null, mockRes);
      await PostController.getPostById(mockReq, mockRes, mockNext);
      // Assert
      expect(updateByIdSpy).toBeCalledTimes(1);
      expect(mockRes.status).toBeCalledWith(404);
      expect(mockNext).toBeCalledWith(errorMock);
      expect(mockJson).toBeCalledWith(errorMock);

      updateByIdSpy.mockRestore();
    });
    test('getPostById return Post', async () => {
      // Arrange
      const dataMock = {
        id: 1,
        title: 'lalalalala',
        content: 'testando 1 dois tres',
        published: '2020-08-19T19:37:51.000Z',
        updated: '2020-08-19T23:59:50.000Z',
        user: {
          id: 1,
          displayName: 'Felipe',
          email: 'lipe@lipe.com',
          image: '',
        },
      };
      const mockReq = { params: { id: 1 } };
      const mockJson = jest.fn();
      const mockRes = { status: jest.fn().mockReturnValueOnce({ json: mockJson }) };
      const updateByIdSpy = jest
        .spyOn(PostService, 'getPostById')
        .mockImplementation(() => dataMock);
      // Act
      await PostController.getPostById(mockReq, mockRes);
      // Assert
      expect(updateByIdSpy).toBeCalledTimes(1);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockJson).toBeCalledWith(dataMock);

      updateByIdSpy.mockRestore();
    });
  });

  describe('Testing searchPost in GET Method', () => {
    test('Return empty array if doens\'t match nothing', async () => {
      // Arrange
      const mockData = [];
      const mockReq = { query: { q: 'asnjsadlkaç' } };
      const mockJson = jest.fn();
      const mockRes = { status: jest.fn().mockReturnValueOnce({ json: mockJson }) };
      const searchPostSpy = jest
        .spyOn(PostService, 'searchPost')
        .mockImplementation(() => mockData);
      // Act
      await PostController.searchPost(mockReq, mockRes);
      // Assert
      expect(searchPostSpy).toBeCalledTimes(1);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockJson).toBeCalledWith(mockData);

      searchPostSpy.mockRestore();
    });

    test('Return match result', async () => {
      // Arrange
      const postsMock = [{
        id: 1,
        published: '2011-08-01T19:58:00.000Z',
        updated: '2011-08-01T19:58:51.947Z',
        title: 'Lalala',
        content: 'lalala astrid',
        user: {
          id: 1,
          displayName: 'Felipe',
          email: 'lipe@lipe.com',
          image: '',
        },
      }];
      const mockReq = { query: { q: 'lala' } };
      const mockJson = jest.fn();
      const mockRes = { status: jest.fn().mockReturnValueOnce({ json: mockJson }) };
      const searchPostSpy = jest
        .spyOn(PostService, 'searchPost')
        .mockImplementation(() => postsMock);
      // Act
      await PostController.searchPost(mockReq, mockRes);
      // Assert
      expect(searchPostSpy).toBeCalledTimes(1);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockJson).toBeCalledWith(postsMock);

      searchPostSpy.mockRestore();
    });
  });
  describe('Testing deleteById in DELETE Method', () => {
    test('Return error post not found', async () => {
      // Arrange
      const errorMock = { error: { message: 'Post não encontrado', code: 'Not_found' } };
      const mockReq = { params: { id: 10 }, user: { id: 1 } };
      const mockJson = jest.fn();
      const mockNext = jest.fn();
      const mockRes = { status: jest.fn().mockReturnValueOnce({ json: mockJson }) };
      const deleteByIdSpy = jest
        .spyOn(PostService, 'deleteById')
        .mockImplementation(() => {
          throw errorMock;
        });
      // Act
      await errorController(errorMock, null, mockRes);
      await PostController.deleteById(mockReq, mockRes, mockNext);
      // Assert
      expect(deleteByIdSpy).toBeCalledTimes(1);
      expect(mockRes.status).toBeCalledWith(404);
      expect(mockJson).toBeCalledWith(errorMock);

      deleteByIdSpy.mockRestore();
    });

    test('Return error with userId acess denied', async () => {
      // Arrange
      const errorMock = { error: { message: 'Acesso negado', code: 'Forbidden' } };
      const mockReq = { params: { id: 10 }, user: { id: 2 } };
      const mockJson = jest.fn();
      const mockNext = jest.fn();
      const mockRes = { status: jest.fn().mockReturnValueOnce({ json: mockJson }) };
      const deleteByIdSpy = jest
        .spyOn(PostService, 'deleteById')
        .mockImplementation(() => {
          throw errorMock;
        });
      // Act
      await errorController(errorMock, null, mockRes);
      await PostController.deleteById(mockReq, mockRes, mockNext);
      // Assert
      expect(deleteByIdSpy).toBeCalledTimes(1);
      expect(mockRes.status).toBeCalledWith(403);
      expect(mockJson).toBeCalledWith(errorMock);

      deleteByIdSpy.mockRestore();
    });

    test('Return end if delete sucess', async () => {
      // Arrange
      const mockReq = { params: { id: 10 }, user: { id: 2 } };
      const mockEnd = jest.fn();
      const mockRes = { status: jest.fn().mockReturnValueOnce({ end: mockEnd }) };
      const deleteByIdSpy = jest
        .spyOn(PostService, 'deleteById')
        .mockImplementation();
      // Act
      await PostController.deleteById(mockReq, mockRes);
      // Assert
      expect(deleteByIdSpy).toBeCalledTimes(1);
      expect(mockRes.status).toBeCalledWith(204);
      expect(mockEnd).toBeCalled();

      deleteByIdSpy.mockRestore();
    });
  });
});
