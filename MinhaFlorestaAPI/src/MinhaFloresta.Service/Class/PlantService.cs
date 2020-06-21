using MinhaFloresta.Domain.Entity;
using MinhaFloresta.Repository.Interfaces;
using System.Threading.Tasks;

namespace MinhaFloresta.Service.Class
{
    public class PlantService : BaseService
    {
        private readonly IRepository _repository;
        public PlantService(IRepository repository) : base(repository)
        {
            _repository = repository;
        }

        public async Task RemoveByUser(string userId)
        {
            await _repository.Remove<Plant>(p => p.UserId == userId);
        }
    }
}
