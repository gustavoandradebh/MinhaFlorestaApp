using Microsoft.IdentityModel.Tokens;
using MinhaFloresta.Domain.Entity;
using MinhaFloresta.Domain.Models;
using MinhaFloresta.Repository.Interfaces;
using MinhaFloresta.Service.Interfaces;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace MinhaFloresta.Service.Class
{
    public class AuthenticationService : IAuthentication
    {
        private readonly IRepository _repository;
        public AuthenticationService(IRepository repository)
        {
            _repository = repository;
        }
        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            var user =  _repository
                .Get<User>(x => x.Email == model.Email && x.Password == model.Password)
                .Result.FirstOrDefault();

            if (user == null) return null;

            var token = generateJwtToken(user);

            return new AuthenticateResponse(user, token);
        }

        private string generateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("MOTHERFUCKING_KEY");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddYears(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}

