using MinhaFloresta.Repository.DatabaseSettings;
using MinhaFloresta.Repository.Interfaces;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using System;

namespace MinhaFloresta.Repository
{
    public class MongoContext : IMongoContext
    {
        private MongoClient _mongoClient { get; set; }
        public IMongoDatabase Database { get; set; }

        public MongoContext(IDatabaseSettings dbSettings)
        {
            BsonDefaults.GuidRepresentation = GuidRepresentation.CSharpLegacy;

            RegisterConventions();

            _mongoClient = new MongoClient(dbSettings.ConnectionString);
            Database = _mongoClient.GetDatabase(dbSettings.DatabaseName);
        }

        private void RegisterConventions()
        {
            var pack = new ConventionPack {
                new IgnoreExtraElementsConvention(true),
                new IgnoreIfDefaultConvention(true)
            };
            ConventionRegistry.Register("Minha Floresta Conventions", pack, t => true);
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
