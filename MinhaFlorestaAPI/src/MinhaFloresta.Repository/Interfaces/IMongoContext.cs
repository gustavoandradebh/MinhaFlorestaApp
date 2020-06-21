using MongoDB.Driver;
using System;

namespace MinhaFloresta.Repository.Interfaces
{
    public interface IMongoContext : IDisposable
    {
        IMongoDatabase Database { get; set; }
    }
}
