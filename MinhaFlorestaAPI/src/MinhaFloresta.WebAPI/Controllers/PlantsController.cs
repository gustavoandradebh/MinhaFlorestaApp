using Microsoft.AspNetCore.Mvc;
using MinhaFloresta.Domain.Entity;
using MinhaFloresta.Service.Class;
using System.Threading.Tasks;

namespace MinhaFloresta.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlantsController : ControllerBase
    {
        private readonly PlantService _plantService;

        public PlantsController(PlantService plantService)
        {
            _plantService = plantService;
        }

        [HttpGet]
        public async Task<ActionResult> Get() => Ok(await _plantService.Get<Plant>());

        [HttpGet("{id:length(24)}", Name = "GetPlant")]
        public async Task<ActionResult> Get(string id)
        {
            var plant = await _plantService.Get<Plant>(id);

            if (plant == null)
                return NotFound();

            return Ok(plant);
        }

        [HttpPost]
        public async Task<ActionResult> Create(Plant plant)
        {
            await _plantService.Create(plant);

            return CreatedAtRoute("GetPlant", new { id = plant.Id.ToString() }, plant);
        }

        [HttpPatch("{id:length(24)}")]
        public async Task<ActionResult> Update(string id, Plant plantIn)
        {
            var plant = await _plantService.Get<Plant>(id);

            if (plant == null)
                return NotFound();

            await _plantService.Update(id, plantIn);

            return Ok();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<ActionResult> Delete(string id)
        {
            var plant = await _plantService.Get<Plant>(id);

            if (plant == null)
                return NotFound();

            await _plantService.Remove<Plant>(plant.Id);

            return Ok();
        }
    }
}
