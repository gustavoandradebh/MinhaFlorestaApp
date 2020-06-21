using MinhaFloresta.Domain.Models;
using MinhaFloresta.Service.Class;

namespace MinhaFloresta.Service.Interfaces
{
    public interface IAuthentication
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
    }
}
