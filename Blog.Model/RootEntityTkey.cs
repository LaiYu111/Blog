using System.ComponentModel.DataAnnotations;


namespace Blog.Model
{
    public class RootEntityTkey<Tkey> where Tkey : IEquatable<Tkey>
    {
        [Key]
        public Tkey Id { get; set; }
        public DateTime CreateTime { get; set; } = DateTime.Now;
    }

   
}
