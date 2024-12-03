using Domain.Entities;
using Domain.Enum;
using MediatR;

namespace Application.Commands
{
    public class AddEventCommand : IRequest<Event>
    {
        public string Name { get; set; } = string.Empty;
        public TypeEnum Type { get; set; }
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Region { get; set; } = string.Empty;
        public string PostalCode { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }
        public string UserId { get; set; } = string.Empty;
    }
}
