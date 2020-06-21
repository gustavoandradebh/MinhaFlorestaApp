using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MinhaFloresta.Domain.Entity
{
    public class User: BaseEntity
    {
        [Required]
        public string Email { get; set; }

        [BsonIgnore]
        public List<Plant> Plants { get; set; }
    }
}
