﻿namespace MinhaFloresta.Repository.DatabaseSettings
{
    public interface IDatabaseSettings
    {
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
