using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ExamBanking.Models
{
    public partial class ExamBankingContext : DbContext
    {
        public ExamBankingContext()
        {
        }

        public ExamBankingContext(DbContextOptions<ExamBankingContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Account> Accounts { get; set; } = null!;
        public virtual DbSet<Answer> Answers { get; set; } = null!;
        public virtual DbSet<Bank> Banks { get; set; } = null!;
        public virtual DbSet<Question> Questions { get; set; } = null!;
        public virtual DbSet<QuestionMode> QuestionModes { get; set; } = null!;
        public virtual DbSet<Repository> Repositories { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<Section> Sections { get; set; } = null!;
        public virtual DbSet<Solution> Solutions { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var builder = new ConfigurationBuilder()
                                              .SetBasePath(Directory.GetCurrentDirectory())
                                              .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                IConfigurationRoot configuration = builder.Build();
                optionsBuilder.UseSqlServer(configuration.GetConnectionString("MyCnn"));

            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>(entity =>
            {
                entity.ToTable("Account");

                entity.Property(e => e.AccountId)
                    .ValueGeneratedNever()
                    .HasColumnName("accountId");

                entity.Property(e => e.Accname)
                    .HasMaxLength(255)
                    .HasColumnName("accname");

                entity.Property(e => e.DateJoin)
                    .HasColumnType("datetime")
                    .HasColumnName("dateJoin");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.RoleId).HasColumnName("roleId");

                entity.Property(e => e.Username)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("username");

                entity.Property(e => e.Userpass)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("userpass");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Accounts)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("FK__Account__roleId__398D8EEE");
            });

            modelBuilder.Entity<Answer>(entity =>
            {
                entity.ToTable("Answer");

                entity.Property(e => e.AnswerId)
                    .ValueGeneratedNever()
                    .HasColumnName("answerId");

                entity.Property(e => e.AccountId).HasColumnName("accountId");

                entity.Property(e => e.AnswerStatus).HasColumnName("answerStatus");

                entity.Property(e => e.QuestionId).HasColumnName("questionId");

                entity.HasOne(d => d.Question)
                    .WithMany(p => p.Answers)
                    .HasForeignKey(d => d.QuestionId)
                    .HasConstraintName("FK__Answer__question__4AB81AF0");
            });

            modelBuilder.Entity<Bank>(entity =>
            {
                entity.ToTable("Bank");

                entity.Property(e => e.BankId)
                    .ValueGeneratedNever()
                    .HasColumnName("bankId");

                entity.Property(e => e.AccountId).HasColumnName("accountId");

                entity.Property(e => e.BankStatus).HasColumnName("bankStatus");

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Banks)
                    .HasForeignKey(d => d.AccountId)
                    .HasConstraintName("FK__Bank__accountId__3C69FB99");
            });

            modelBuilder.Entity<Question>(entity =>
            {
                entity.ToTable("Question");

                entity.Property(e => e.QuestionId)
                    .ValueGeneratedNever()
                    .HasColumnName("questionId");

                entity.Property(e => e.QMode).HasColumnName("qMode");

                entity.Property(e => e.QQuestion)
                    .HasMaxLength(255)
                    .HasColumnName("qQuestion");

                entity.Property(e => e.QSolution)
                    .HasMaxLength(255)
                    .HasColumnName("qSolution");

                entity.Property(e => e.QType)
                    .HasMaxLength(255)
                    .HasColumnName("qType");

                entity.Property(e => e.SectionId).HasColumnName("sectionId");

                entity.HasOne(d => d.QModeNavigation)
                    .WithMany(p => p.Questions)
                    .HasForeignKey(d => d.QMode)
                    .HasConstraintName("FK__Question__qMode__46E78A0C");

                entity.HasOne(d => d.Section)
                    .WithMany(p => p.Questions)
                    .HasForeignKey(d => d.SectionId)
                    .HasConstraintName("FK__Question__sectio__47DBAE45");
            });

            modelBuilder.Entity<QuestionMode>(entity =>
            {
                entity.HasKey(e => e.QModeId)
                    .HasName("PK__Question__7FC60E7C6329A746");

                entity.ToTable("QuestionMode");

                entity.Property(e => e.QModeId)
                    .ValueGeneratedNever()
                    .HasColumnName("qModeId");

                entity.Property(e => e.QTitle)
                    .HasMaxLength(255)
                    .HasColumnName("qTitle");
            });

            modelBuilder.Entity<Repository>(entity =>
            {
                entity.HasKey(e => e.RepoId)
                    .HasName("PK__Reposito__217368C9D45472EF");

                entity.ToTable("Repository");

                entity.Property(e => e.RepoId)
                    .ValueGeneratedNever()
                    .HasColumnName("repoId");

                entity.Property(e => e.BankId).HasColumnName("bankId");

                entity.Property(e => e.FrepoId).HasColumnName("frepoId");

                entity.Property(e => e.RepoTitle)
                    .HasMaxLength(255)
                    .HasColumnName("repoTitle");

                entity.HasOne(d => d.Bank)
                    .WithMany(p => p.Repositories)
                    .HasForeignKey(d => d.BankId)
                    .HasConstraintName("FK__Repositor__bankI__412EB0B6");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("Role");

                entity.Property(e => e.RoleId)
                    .ValueGeneratedNever()
                    .HasColumnName("roleId");

                entity.Property(e => e.RoleTitle)
                    .HasMaxLength(255)
                    .HasColumnName("roleTitle");
            });

            modelBuilder.Entity<Section>(entity =>
            {
                entity.ToTable("Section");

                entity.Property(e => e.SectionId)
                    .ValueGeneratedNever()
                    .HasColumnName("sectionId");

                entity.Property(e => e.RepoId).HasColumnName("repoId");

                entity.Property(e => e.SecDate)
                    .HasColumnType("date")
                    .HasColumnName("secDate");

                entity.Property(e => e.SecTitle)
                    .HasMaxLength(255)
                    .HasColumnName("secTitle");

                entity.HasOne(d => d.Repo)
                    .WithMany(p => p.Sections)
                    .HasForeignKey(d => d.RepoId)
                    .HasConstraintName("FK__Section__repoId__440B1D61");
            });

            modelBuilder.Entity<Solution>(entity =>
            {
                entity.HasKey(e => e.SoluId)
                    .HasName("PK__Solution__144C5C90194C5D06");

                entity.ToTable("Solution");

                entity.Property(e => e.SoluId)
                    .ValueGeneratedNever()
                    .HasColumnName("soluId");

                entity.Property(e => e.QuestionId).HasColumnName("questionId");

                entity.Property(e => e.SoluContent)
                    .HasMaxLength(1024)
                    .HasColumnName("soluContent");

                entity.HasOne(d => d.Question)
                    .WithMany(p => p.Solutions)
                    .HasForeignKey(d => d.QuestionId)
                    .HasConstraintName("FK__Solution__questi__4D94879B");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
