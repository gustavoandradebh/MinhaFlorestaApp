using Microsoft.AspNetCore.Mvc;
using MinhaFloresta.Domain.Entity;
using MinhaFloresta.Service.Class;
using System.Threading.Tasks;

namespace MinhaFloresta.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserService _userService;

        public UsersController(UserService userService)
        {
            _userService = userService;
        }

        //[HttpGet]
        //public async Task<ActionResult> Get() => Ok(await _userService.Get<User>());

        [HttpGet("{id}", Name = "GetUser")]
        public async Task<ActionResult> GetUser(string id)
        {
            var user = await _userService.Get<User>(id);

            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [HttpGet("", Name = "GetUserByEmail")]
        public async Task<ActionResult> GetUserByEmail([FromQuery] string email)
        {
            var user = await _userService.GetUserByEmail(email);

            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [HttpGet("{id}/plants", Name = "GetUserPlants")]
        public async Task<ActionResult> GetUserPlants(string id)
        {
            var user = await _userService.GetUserPlants(id);

            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult> Create(User user)
        {
            await _userService.Create(user);

            return CreatedAtRoute("GetUser", new { id = user.Id.ToString() }, user);
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult> Update(string id, User userIn)
        {
            var user = await _userService.Get<User>(id);

            if (user == null)
                return NotFound();

            await _userService.Update(id, userIn);

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var user = await _userService.Get<User>(id);

            if (user == null)
                return NotFound();

            await _userService.Remove<User>(user.Id);

            return Ok();
        }
    }
}
