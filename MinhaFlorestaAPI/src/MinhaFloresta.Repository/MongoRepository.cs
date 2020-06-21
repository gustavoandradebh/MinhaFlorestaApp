using MinhaFloresta.Repository.Interfaces;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace MinhaFloresta.Repository
{
    public class MongoRepository : IRepository 
    {
        protected readonly IMongoDatabase _db;
        private const string FIELD_ID = "Id";

        public MongoRepository(IMongoContext mongoContext)
        {
            _db = mongoContext.Database;
        }
       
        public async Task Add<T>(T obj) where T : class
        {
            await GetCollection<T>().InsertOneAsync(obj);
        }

        public async Task<T> GetById<T>(string id) where T : class
        {
            var data = await GetCollection<T>().FindAsync(FilterById<T>(id));
            return data.FirstOrDefault();
        }

        public async Task<List<T>> GetAll<T>() where T : class
        {
            var data = await GetCollection<T>().FindAsync(p => true);
            return data.ToList();
        }

        public async Task<List<T>> Get<T>(Expression<Func<T, bool>> filter) where T : class
        {
            var data = await GetCollection<T>().FindAsync(filter);
            return data.ToList();
        }

        public async Task Update<T>(string id, T obj) where T : class
        {
            await GetCollection<T>().ReplaceOneAsync(FilterById<T>(id), obj);
        }

        public async Task Remove<T>(string id) where T : class
        {
            await GetCollection<T>().DeleteOneAsync(FilterById<T>(id));
        }

        public async Task Remove<T>(Expression<Func<T, bool>> filter) where T : class
        {
            await GetCollection<T>().DeleteManyAsync(filter);
        }

        private IMongoCollection<T> GetCollection<T>() where T : class
        {
            return _db.GetCollection<T>(typeof(T).Name);
        }
        private static FilterDefinition<T> FilterById<T>(string id) where T : class
        {
            return Builders<T>.Filter.Eq(FIELD_ID, id);
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        
    }
}
