using MinhaFloresta.Domain.Entity;
using MinhaFloresta.Repository.Interfaces;
using System.Linq;
using System.Threading.Tasks;

namespace MinhaFloresta.Service.Class
{

    public class UserService: BaseService
    {
        private readonly IRepository _repository;
        private readonly PlantService _plantService;

        public UserService(IRepository repository, PlantService plantService): base(repository)
        {
            _repository = repository;
            _plantService = plantService;
        }

        public async Task<User> GetUserByEmail(string email)
        {
            var users = await _repository.Get<User>(x => x.Email == email);

            var user = users.FirstOrDefault();

            if(user != null)
                user.Password = null;

            return user;
            
        }

        public async Task<User> GetUserPlants(string userId)
        {
            var user = await base.Get<User>(userId);
            if (user != null)
            {
                user.Password = null;
                user.Plants = await _repository.Get<Plant>(p => p.UserId == userId);
            }


            return user;
        }
        public override async Task Remove<T>(string userId)
        {
            await _plantService.RemoveByUser(userId);
            await _repository.Remove<User>(userId);
        }
    }
}
