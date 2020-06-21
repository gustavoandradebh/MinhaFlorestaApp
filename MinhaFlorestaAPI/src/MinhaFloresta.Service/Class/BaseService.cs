using MinhaFloresta.Repository.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MinhaFloresta.Service.Class
{
    public class BaseService
    {
        private readonly IRepository _repository;
        public BaseService(IRepository repository)
        {
            _repository = repository;
        }

        public async virtual Task<List<T>> Get<T>() where T : class
        {
            return await _repository.GetAll<T>();
        }

        public async virtual Task<T> Get<T>(string id) where T : class => await _repository.GetById<T>(id);

        public async virtual Task<T> Create<T>(T user) where T : class
        {
            await _repository.Add<T>(user);
            return user;
        }

        public async virtual Task Update<T>(string id, T entityUpdated) where T : class
        {
            await _repository.Update<T>(id, entityUpdated);
        }

        public async virtual Task Remove<T>(string id) where T : class
        {
            await _repository.Remove<T>(id);
        }
    }
}
