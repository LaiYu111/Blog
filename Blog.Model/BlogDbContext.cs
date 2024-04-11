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
        public DbSet<Role> Roles { get; set; }

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
                e.Property(e=>e.PasswordHash).HasMaxLength(50);

                e.HasOne(e => e.UserDetail)
                .WithOne(e => e.User)
                .HasForeignKey<User>(e => e.UserDetailId)
                .OnDelete(DeleteBehavior.Cascade);

                e.HasOne(e => e.Role)
                .WithMany(e => e.Users)
                .HasForeignKey(e => e.RoleId);
            });

            modelBuilder.Entity<UserDetail>(e =>
            {
                e.ToTable("UserDetail");
                e.Property(e => e.Description).HasMaxLength(200);
                e.Property(e => e.GitHub).HasMaxLength(50);
                e.Property(e => e.LinkedIn).HasMaxLength(50);
            });


            modelBuilder.Entity<Article>(e =>
            {
                e.ToTable("Articles");
                e.Property(e => e.Title).HasMaxLength(100);
                e.Property(e => e.Description).HasMaxLength(500);
                e.Property(e => e.CoverImage).HasMaxLength(200);
            });

            modelBuilder.Entity<ArticleTag>()
                 .HasKey(at => new { at.ArticlesId, at.TagsId });

            modelBuilder.Entity<ArticleTag>()
                .HasOne(at => at.Article)
                .WithMany(a => a.ArticleTags)
                .HasForeignKey(at => at.ArticlesId);

            modelBuilder.Entity<ArticleTag>()
                .HasOne(at => at.Tag)
                .WithMany(t => t.ArticleTags)
                .HasForeignKey(at => at.TagsId);

            modelBuilder.Entity<Role>(e =>
            {
                e.ToTable("Roles");
                e.Property(r => r.RoleName).HasMaxLength(50);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
