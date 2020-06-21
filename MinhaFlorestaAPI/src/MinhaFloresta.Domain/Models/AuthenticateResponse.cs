using MinhaFloresta.Domain.Entity;

namespace MinhaFloresta.Domain.Models
{
    public class AuthenticateResponse
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }


        public AuthenticateResponse(User user, string token)
        {
            Id = user.Id;
            FirstName = user.Name;
            Email = user.Email;
            Token = token;
        }
    }
}