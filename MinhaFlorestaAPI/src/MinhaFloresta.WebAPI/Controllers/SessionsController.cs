using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MinhaFloresta.Domain.Models;
using MinhaFloresta.Service.Interfaces;

namespace MinhaFloresta.WebAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SessionsController : ControllerBase
    {
        private readonly IAuthentication _authService;

        public SessionsController(IAuthentication authService)
        {
            _authService = authService;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] AuthenticateRequest model)
        {
            var response = _authService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Email or password is incorrect" });

            return Ok(response);
        }
    }
}
