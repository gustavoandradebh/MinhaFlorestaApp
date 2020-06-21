using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace MinhaFloresta.Repository.Interfaces
{
    public interface IRepository : IDisposable
    {
        Task Add<T>(T obj) where T : class;
        Task<T> GetById<T>(string id) where T : class;
        Task<List<T>> GetAll<T>() where T : class;
        Task<List<T>> Get<T>(Expression<Func<T, bool>> filter) where T : class;
        Task Update<T>(string id, T obj) where T : class;
        Task Remove<T>(string id) where T : class;
        Task Remove<T>(Expression<Func<T, bool>> filter) where T : class;
    }
}
