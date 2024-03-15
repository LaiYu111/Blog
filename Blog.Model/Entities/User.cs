using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Blog.Model.Entities
{
    public class User : RootEntityTkey<long>
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string LinkedIn { get; set; }
        public string GitHub {  get; set; }
        public string OtherContacts { set; get; }
    }

}
