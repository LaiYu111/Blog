using Blog.Model.Entities;
using Blog.Model.Views;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Model
{
    public class BlogDBContext : DbContext
    {        
        public BlogDBContext(DbContextOptions<BlogDBContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Article> Articles { get; set; }
        public DbSet<Tag> Tags { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(e =>
            {
                e.ToTable("Users");
                e.Property(e => e.Email).HasMaxLength(50);
                e.Property(e =>e.Name).HasMaxLength(50);
                e.Property(e => e.GitHub).HasMaxLength(50);
                e.Property(e => e.OtherContacts).HasMaxLength(500);
                e.Property(e => e.LinkedIn).HasMaxLength(50);
            });

            modelBuilder.Entity<Article>(e =>
            {
                e.ToTable("Articles");
                e.HasMany(a => a.Tags)
                .WithMany(a => a.Articles)
                .UsingEntity(a => a.ToTable("ArticleTags"));
            });

            modelBuilder.Entity<Tag>(e =>
            {
                e.ToTable("Tags");
                e.Property(t => t.TagName).HasMaxLength(50);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
