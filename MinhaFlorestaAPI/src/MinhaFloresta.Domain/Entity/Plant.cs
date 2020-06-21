using System;
using System.ComponentModel.DataAnnotations;

namespace MinhaFloresta.Domain.Entity
{
    public class Plant: BaseEntity
    {
        public string Description { get; set; }

        public int Quantity { get; set; }
        public int WaterDaysInterval { get; set; }
        public DateTime StartDate { get; set; }

        public DateTime? DeathDate { get; set; }

        [Required]
        public string UserId { get; set; }

        public Plant()
        {
            StartDate = DateTime.Now;
        }
    }
}
