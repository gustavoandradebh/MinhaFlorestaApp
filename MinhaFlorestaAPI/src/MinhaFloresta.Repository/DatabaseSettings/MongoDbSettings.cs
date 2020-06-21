namespace MinhaFloresta.Repository.DatabaseSettings
{
    public class MongoDbSettings : IDatabaseSettings
    {
        public string PlantsCollectionName { get; set; }
        public string UsersCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}
