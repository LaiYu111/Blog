using AutoMapper;

namespace Blog.Extension.AutoMapper
{
    public class AutoMapperConfig
    {
        public static MapperConfiguration RegisterMappings()
        {
            return new MapperConfiguration(config =>
            {
                config.AddProfile(new CustomProfile());
            });
        }
    }
}
